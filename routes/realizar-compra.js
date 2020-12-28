const express = require('express');
const {instance, url, extractField, Http400Error, handleResponse} = require("./sa-utils");
const router = express.Router();

const KEYS = {
    ID_CLIENTE: 'id_cliente',
    PRODUCTOS: 'productos',
    ID_PRODUCTO: 'id_producto',
    CANTIDAD: 'cantidad',
}

router.post('/', async (req, res) => {
    await handleResponse(res, async () => {

        const payload = {
            "id_cliente": extractField(req.body, KEYS.ID_CLIENTE),
            "id_tarjeta": 14,
            "subtotal": 1000,
            "total": 1200,
            "nit": "C/F",
            "productos": extractField(req.body, KEYS.PRODUCTOS),
        };

        const { data } = await instance.post(`${url}/order`, payload);

        if (data.status === false) {
            throw new Http400Error(`razon: ${data.message}`);
        }

        const result = {
            "status": "success",
            "message": "Se ha relizado la compra de manera exitosa."
        };

        res.json(result);

    });
});

module.exports = router;
