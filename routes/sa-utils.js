const axios = require('axios');

const instance = axios.create();

instance
    .interceptors
    .response
    .use((response) => {
            console.log('Respuesta de:');
            console.log(response.config.url);
            console.log(JSON.stringify(response.data, null, 4));
            return response;
        },
        (error) => {
            return Promise.reject(error);
        });

const url = 'http://35.232.118.191:3000';

class Http400Error extends Error {
    constructor(message) {
        super(message);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

const extractField = (body, fieldName, mandatory = true, defaultValue = '') => {

    if (body[fieldName] === undefined && mandatory === true)
        throw new Http400Error(`No se encontro el campo obligatorio '${fieldName}'`);

    if (body[fieldName] === undefined) return defaultValue;

    return body[fieldName];
};


const handleResponse = async (res, createResponse) => {
    try {
        await createResponse();
    }
    catch (error) {
        console.error('ocurrio un error');
        console.error(error);
        if (error instanceof Http400Error) {
            res.status(400).json({
                status: 'fail',
                message: error.message,
            });
        }
        else {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                res.status(error.response.status).send(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);
                res.status(400).json({
                    status: 'fail',
                    message: 'No se pudo conectar a la fuente',
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                res.status(500).send({
                    status: 'error',
                    message: 'ocurrio un error inesperado.',
                    details: error.message
                });
            }
        }
    }
};

module.exports = {
    instance,
    url,
    extractField,
    Http400Error,
    handleResponse
};