var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasImposto.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas por Imposto', function () {
    
    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Vendas Por Imposto');
    });
        
    afterEach(function () {
        h.sairDoSistema();       
    });
    
    it('Vendas por Imposto', function () {
        vendas.vendasFiscal();
    });   
});