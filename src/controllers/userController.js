// src/controllers/userController.js
import * as userService from '../services/userServices.js';

export async function register(req, res) {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function login(req, res) {
    try {
        const { user, accessToken, refreshToken } = await userService.loginUser(req.body);
        res.json({ user, accessToken, refreshToken });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function logout(req, res) {
    try {
        await userService.logoutUser(req.user.id);
        res.json({ message: 'Logged out' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function getUsers(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
}

export async function getUser(req, res) {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
}

export async function updateUser(req, res) {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
}

export async function deleteUser(req, res) {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
}
