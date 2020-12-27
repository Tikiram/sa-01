const express = require('express');
const { instance, url, extractField, Http400Error, handleResponse } = require("./sa-utils");
const router = express.Router();

const KEYS = {
    EMAIL: 'email',
    CONTRASENA: 'contrasena',
}

router.post('/', async (req, res) => {

    await handleResponse(res, async () => {

        const payload = {
            correo: extractField(req.body, KEYS.EMAIL),
            password: extractField(req.body, KEYS.CONTRASENA)
        };

        const { data } = await instance.post(`${url}/user/login`, payload);

        if (data.status === false) {
            throw new Http400Error(data.message);
        }

        const user = data.result[0].result;

        const result = {
            status: 'success',
            data: {
                'id': user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.correo,
                contrasena: user.password,
                celular: user.telefono
            },
            message: 'Usuario autentificado de manera exitosa'
        };

        res.json(result);

    });

});

module.exports = router;
