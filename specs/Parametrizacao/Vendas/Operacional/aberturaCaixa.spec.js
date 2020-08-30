var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var abertura = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/aberturaCaixa.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
describe('Testes da tela Abertura de Caixa', function () {
    // esse teste executa a abertura e o fechamento de caixa. não separar essas duas suites
    beforeEach(function () {
        loginPage.login();
        
    });
    
    afterEach(function () {
        h.sairDoSistema();
    });
    
    fit('Abrir Caixa', function () {
        h.tela('Abertura de Caixa');
        expect(abertura.caixa()).toContain('Caixa '+ j.getValor('nmcaixa')+ ' aberto com sucesso!');
    });
    
    it('Fecha Caixa', function () {       
        h.tela('Fechamento de Caixa');
        expect(abertura.fechamentoCaixa()).toContain('Caixa fechado com sucesso!');
        
    });
    
    
});
