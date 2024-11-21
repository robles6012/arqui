import { createUser, deleteUser, getUsuario, updateUser } from "../models/auth.model.js";
import { generateToken } from "../services/token.service.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        let data = await getUsuario(username, password);

        console.log(`Usuario ${username} se ha logueado`);

        if (!data) {
            throw new Error("Los datos son incorrectos");
        }
        res.status(200).json({
            token: generateToken(data),
            success: true,
            msg: "Logeado Correctamente"
        });
    } catch (error) {
        // Error de login
        console.error(`Intento de login fallido para el usuario ${req.body.username}: ${error.message}`);

        res.status(401).json({
            token: ' ',
            success: false,
            msg: error.message
        });
    }
}


export const deleteU = async (req, res) => {
    try {
        let { id } = req.query;
        let data = await deleteUser(id);

        if (!data) {
            return res.status(200).json({ success: true, data: data, message: "Usuario eliminado correctamente" });
        }
        res.status(404).json({ success: false, message: "No se encuentra el usuario" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        let { username, password, id } = req.query;
        let data = await updateUser(username, password, id);

        if (!data) {
            return res.status(200).json({ success: true, message: "Usuario actualizado correctamente" });
        }
        res.status(404).json({ success: false, message: "No se encuentra el usuario" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const create = async (req, res) => {
    try {
        let { username, password } = req.body;
        let data = await createUser(username, password);

        if (!data) {
            return res.status(200).json({ success: true, message: "Usuario creado exitosamente" });
        }
        res.status(404).json({ success: false, message: "Error al crear usuario" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
