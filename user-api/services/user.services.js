const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwtTools = require('../utils/jwtTools');

const service = {};

service.register = async (data) => {
    // Validate required fields
    if (!data.name || !data.email || !data.password || !data.phones) {
        throw new Error('Missing required fields');
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
        throw new Error('Invalid email');
    }

    // check if email already exists
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
        throw new Error('E-mail already exists');
    }

    // Validate password requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data.password)) {
        throw new Error('Invalid password: must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and one special character');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create token
    const token = jwtTools.createToken(data.email);

    // Create user
    const user = await User.create({
        id: uuidv4(),
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phones: data.phones,
        token: token,
        created: new Date(),
        modified: new Date(),
        last_login: new Date(),
        isactive: true,
    });


    return user.toJSON();
};

service.getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

module.exports = service;
