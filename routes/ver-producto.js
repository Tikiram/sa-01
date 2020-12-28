const express = require('express');
const {instance, url, extractField, Http400Error, handleResponse} = require("./sa-utils");
const router = express.Router();


router.get('/', async (req, res) => {
    await handleResponse(res, async () => {

        const { id_producto } = req.query;

        const { data } = await instance.get(`${url}/product/${id_producto}`);

        if (data.status === false) {
            throw new Http400Error(`razon: ${data.message}`);
        }

        const product = data.result[0];

        const result = {
            status: 'success',
            data: {
                "id_producto": product.id,
                "nombre": product.nombre,
                "descripcion": product.descripcion,
                "stock": product.stock,
                "precio_venta": product.precio_cliente,
                "foto": product.imagen
            },
        };

        res.json(result);

    });
});

module.exports = router;
