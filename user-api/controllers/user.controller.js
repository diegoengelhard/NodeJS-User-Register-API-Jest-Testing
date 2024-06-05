const userService = require('../services/user.services');

const controller = {};

controller.register = async (req, res, next) => {
    try {
        const user = await userService.register(req, res);
        res.status(201).send({message: 'User created successfully!', user});
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: error.message })
    }
}

controller.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers(req, res);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: error.message })
    }
}

module.exports = controller;