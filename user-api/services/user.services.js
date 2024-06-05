const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwtTools = require('../utils/jwtTools');

const service = {};

service.register = async (req, res) => {
    const data = req.body;

    try {
        // check input isnt empty
        if (!data.name || !data.email || !data.password || !data.phones) {
            return res.status(400).send({ message: 'Missing required fields' });
        }
        // Check if the email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(data.email)) {
            return res.status(400).send({ message: 'Invalid email' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            return res.status(409).send({ message: 'E-mail already exists' });
        }

        // check if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(data.password)) {
            return res.status(400).send({ message: 'Invalid password: must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and one special character' });
        }

        // salt & hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // create token
        const token = jwtTools.createToken(data.email);

        // create the user
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            phones: data.phones,
            token: token

        });

        return user.toJSON();

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

service.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = service;