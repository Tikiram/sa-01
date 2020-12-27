const express = require('express');
const { instance, url, extractField, Http400Error, handleResponse } = require("./sa-utils");
const router = express.Router();

const KEYS = {
    NOMBRE: 'nombre',
    APELLIDO: 'apellido',
    EMPRESA: 'empresa',
    EMAIL: 'email',
    CONTRASENA: 'contrasena',
    DIRECCION: 'direccion'
}

router.post('/', async (req, res) => {
    await handleResponse(res, async () => {

        const payload = {
            nombre: extractField(req.body, KEYS.EMPRESA),
            apellido: extractField(req.body, KEYS.NOMBRE) + ' ' + extractField(req.body, KEYS.APELLIDO, false),
            correo: extractField(req.body, KEYS.EMAIL),
            password: extractField(req.body, KEYS.CONTRASENA),
            telefono: '',
            direccion: extractField(req.body, KEYS.DIRECCION, false),
            rol: 'PROVEEDOR',
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
                [KEYS.NOMBRE]: user.apellido,
                [KEYS.APELLIDO]: user.apellido,
                [KEYS.EMPRESA]: user.nombre,
                [KEYS.EMAIL]: user.correo,
                [KEYS.CONTRASENA]: user.password,
                [KEYS.DIRECCION]: user.direccion
            },
            message: 'Usuario creado de manera exitosa'
        };

        res.json(result);

    });
});

module.exports = router;
