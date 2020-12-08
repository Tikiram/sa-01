const assert = require('assert');

const checkUser = require('./loginCheck');


describe('Practica #3 - Pruebas', function () {

    it('debe retonar verdadero si tiene credenciales validas', function () {

        const reqUser = { password: "asdfasdf", email: "asdfasdf@gmail.com" };
        const dbUser = { PASSWORD: "asdfasdf", email: "asdfasdf@gmail.com" };

        assert.strictEqual( checkUser(reqUser, dbUser), false)

    });


    it('debe retonar falso por que no son las mismas credenciales', function () {

        const reqUser = { password: "asdfasdf", email: "asdfasdf@gmail.com" };
        const dbUser = { PASSWORD: "asd33fasdf", email: "asdfasdf@gmail.com" };

        assert.strictEqual( checkUser(reqUser, dbUser), false)

    });

});