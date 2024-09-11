// const userDB = {
//     users: require('../data/user.json'),
//     setUsers: function (data) {
//         this.users = data
//     }
// }
// const fsPromises = require('fs').promises;
// const path = require('path');

const User = require('../models/User');

const handleLogout = async (req, res) => {
    // on client, also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    //Is refresh token in db?
    const refreshToken = cookies.jwt;
    // const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    const foundUser = await User.findOne({refreshToken : refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(403);
    }

    // delete refreshToken in db
    // const otherUser = userDB.users.filter(x => x.refreshToken !== foundUser.refreshToken);
    // const currentUser = { ...foundUser, refreshToken: '' };
    // userDB.setUsers([...otherUser, currentUser]);

    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'data', 'user.json'),
    //     JSON.stringify(userDB.users)
    // );
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https

    return res.sendStatus(204);
}

module.exports = { handleLogout }
