var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var cupom = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/fechamentoCupomPendente.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Fechamento de Cumpom Pendente', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Fechamento de Cupom Pendente');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Fechamento de Cumpom Pendente', function () {
        cupom.fechamento();
    });
});