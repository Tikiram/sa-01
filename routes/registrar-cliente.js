const express = require('express');
const { instance, url, extractField, Http400Error, handleResponse } = require("./sa-utils");
const router = express.Router();

const KEYS = {
    NOMBRE: 'nombre',
    APELLIDO: 'apellido',
    EMAIL: 'email',
    CONTRASENA: 'contrasena',
    CELULAR: 'celular'
}

router.post('/', async (req, res) => {

    await handleResponse(res, async () => {

        const payload = {
            nombre: extractField(req.body, KEYS.NOMBRE),
            apellido: extractField(req.body, KEYS.APELLIDO, false),
            correo: extractField(req.body, KEYS.EMAIL),
            password: extractField(req.body, KEYS.CONTRASENA),
            telefono: extractField(req.body, KEYS.CELULAR, false),
            direccion: 'Guatemala',
            rol: 'CLIENTE',
        };

        const { data } = await instance.post(`${url}/user`, payload);

        if (data.status === false) {
            throw new Http400Error('Usuario ya existente');
        }

        const user = data.result[0];

        const result = {
            status: 'success',
            data: {
                'id': user.id,
                [KEYS.NOMBRE]: user.nombre,
                [KEYS.APELLIDO]: user.apellido,
                [KEYS.EMAIL]: user.correo,
                [KEYS.CONTRASENA]: user.password,
                [KEYS.CELULAR]: user.telefono
            },
            message: 'Usuario creado de manera exitosa'
        };

        res.json(result);

    });

});

module.exports = router;
