var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var sintese = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/sinteseFaturamentoDia.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Sintese de Faturamento (Geral/Modalidade)', function () {

    //executa o login o sistema
    beforeEach(function () { 
        loginPage.login();
        h.tela('Síntese de Faturamento por Modalidade (Dia/Modalidade)');
    });

    afterEach(function () {
       h.sairDoSistema();
    });

    it('Sintese de Faturamento (Geral/Modalidade)', function () {
       sintese.sinteseFaturamentoDia();     
    });
});