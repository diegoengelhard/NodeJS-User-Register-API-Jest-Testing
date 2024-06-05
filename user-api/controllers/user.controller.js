const userService = require('../services/user.services');

const controller = {};

controller.register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        if (error.message === 'E-mail already exists') {
            res.status(409).json({ message: error.message });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

controller.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = controller;
