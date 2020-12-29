const express = require('express');
const {instance, url, extractField, Http400Error, handleResponse} = require("./sa-utils");
const router = express.Router();

const KEYS = {
    ID_CLIENTE: 'id_cliente',
    NOMBRE: 'nombre',
    DESCRIPCION: 'descripcion',
    STOCK: 'stock',
    PRECIO_VENTA: 'precio_venta',
    FOTO: 'foto'
}

router.post('/', async (req, res) => {
    await handleResponse(res, async () => {

        const payload = {
            "id": "",
            "nombre": extractField(req.body, KEYS.NOMBRE),
            "descripcion": extractField(req.body, KEYS.DESCRIPCION, false),
            "precio_proveedor": extractField(req.body, KEYS.PRECIO_VENTA, false, 0)
                || extractField(req.body, 'precio', false, 0),
            "stock": extractField(req.body, KEYS.STOCK),
            "imagen": extractField(req.body, KEYS.FOTO),
            "tipo_venta": "VENTA",
            "active": "",
            "id_usuario": extractField(req.body, KEYS.ID_CLIENTE),
            "id_categoria": "2"
        };

        const {data} = await instance.post(`${url}/product`, payload);

        if (data.status === false) {
            throw new Http400Error(`razon: ${data.message}`);
        }

        const product = data.result[0];

        const result = {
            status: 'success',
            data: {
                'id_producto': product.id,
                [KEYS.NOMBRE]: product.nombre,
                [KEYS.DESCRIPCION]: product.descripcion,
                [KEYS.STOCK]: product.stock,
                precio: product.precio_proveedor,
                [KEYS.FOTO]: product.imagen,
            },
            message: 'Producto creado de manera exitosa'
        };

        res.json(result);

    });
});

module.exports = router;
