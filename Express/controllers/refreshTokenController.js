// const userDB = {
//     users: require('../data/user.json'),
//     setUsers: function (data) {
//         this.users = data
//     }
// }

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    // const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {
                    'UserInfo': {
                        'username': foundUser.username,
                        'roles': Object.values(foundUser.roles)
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            res.json({ accessToken });
        }
    )
}

module.exports = { handleRefreshToken }
