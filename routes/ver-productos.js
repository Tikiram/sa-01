const express = require('express');
const {instance, url, extractField, Http400Error, handleResponse} = require("./sa-utils");
const router = express.Router();


router.get('/', async (req, res) => {
    await handleResponse(res, async () => {


        const { data } = await instance.post(`${url}/product/compralo-ahora`, {});

        if (data.status === false) {
            throw new Http400Error(`razon: ${data.message}`);
        }


        const nemSchema = data.result.map((product) => {
            return {
                "id_producto": product.id,
                "nombre": product.nombre,
                "descripcion": product.descripcion,
                "stock": product.stock,
                "precio": product.precio_proveedor,
                "foto": product.imagen,
            };
        });

        const result = {
            status: 'success',
            data: nemSchema,
        };

        res.json(result);

    });
});

module.exports = router;
