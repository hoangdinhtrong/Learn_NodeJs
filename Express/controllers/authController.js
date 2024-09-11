// const userDB = {
//     users: require('../data/user.json'),
//     setUsers: function (data) {
//         this.users = data
//     }
// }
// const fsPromises = require('fs').promises;
// const path = require('path');

const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({
        'message': 'Username and password are required!'
    });

    // const foundUser = userDB.users.find(person => person.username === username);
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    // evaluate password
    const match = await bcrypt.compareSync(password, foundUser.password);
    if (match) {
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

        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        // const currentUser = { ...foundUser, refreshToken };
        // userDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'data', 'user.json'),
        //     JSON.stringify(userDB.users)
        // );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }
