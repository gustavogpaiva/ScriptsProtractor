var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var cancelCupom = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoCupom.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Cancelamento de Cupom', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cancelamento de Cupom');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Cancelamento de Cupom', async function () {
        expect(await cancelCupom.cancelaCupom()).toBe('796,00');
    });

});