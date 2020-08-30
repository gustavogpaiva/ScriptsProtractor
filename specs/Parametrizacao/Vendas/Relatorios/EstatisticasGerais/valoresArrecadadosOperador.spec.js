var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var operadorArrecar = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/valoresArrecadadosOperador.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Valores Arrecadados Por Operador', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Valores Arrecadados por Operador');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Valores Arrecadados por Operador', function () {
        operadorArrecar.operArrecadar();
    });


});