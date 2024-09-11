// const userDB = {
//     users: require('../data/user.json'),
//     setUsers: function (data) {
//         this.users = data
//     }
// }

// const fs = require('fs');
// const path = require('path');

const User = require('../models/User');
const bcrypt = require('bcrypt');

const handlerNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({
            'message': 'Username and password are required!'
        });

    // check for dublicate usernames in the db

    // const dublicate = userDB.users.find(person => person.username === username);
    const dublicate = await User.findOne({ username: username }).exec();
    if (dublicate) return res.sendStatus(409); // conflict

    try {
        //emcrypt the password
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // store the new user
        const newUser = User.create({
            'username': username,
            'password': hashedPassword
        });

        // const newUser1 = new User({
        //     'username': username,
        //     'password': hashedPassword
        // })
        // await newUser1.save();

        // userDB.setUsers([...userDB.users, newUser]);
        // await fs.promises.writeFile(
        //     path.join(__dirname, '..', 'data', 'user.json'),
        //     JSON.stringify(userDB.users)
        // );



        res.status(201).json({
            'success': `New user ${username} created!`
        });
    }
    catch (error) {
        res.status(500).json({
            'message': error.message
        })
    }
}

module.exports = { handlerNewUser };
