var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fechamento = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/monitoramentoFechamentoCupom.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Monitoramento Fechamento de Cupom', function () {

    //executa o login o sistema
    beforeAll(function() {
        loginPage.login();
        h.tela('Monitoramento - Fechamento de Cupom');
    });

    beforeEach(function(){
        fechamento.filtrarPeriodo(j.getValor('periodoComVenda'));
    });
 
    afterAll(function() {
        h.sairDoSistema();
    });

    it('Monitoramento Fechamento de Cupom', function() {
        expect(fechamento.monitoramento()).toBe(true);
    });
    //tela com defeito
});