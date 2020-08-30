var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fechamento = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/monitoramentoFechamentoCupom.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Monitoramento Fechamento de Cupom', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Monitoramento - Fechamento de Cupom');
    });
 
    afterEach(function () {
        h.sairDoSistema();
    });

    it('MonitorFechamento de Cupom', function () {
        fechamento.monitoramento();
    });
//tela com defeito
});