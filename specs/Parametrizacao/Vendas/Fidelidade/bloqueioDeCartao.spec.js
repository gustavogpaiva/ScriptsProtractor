var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var bloquear = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/bloqueioDeCartao.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes na tela Bloquear Cartão Fidelidade', function(){
    
    beforeEach(function(){
        loginPage.login();
        h.tela('Bloquear Cartão Fidelidade');
    });
    
    afterEach(function(){
        h.sairDoSistema();
    });
    
    it('Bloqueio de cartão fidelidade', function(){
        bloquear.bloqueioCartao();
        expect(z.widget.grid.getText('11855205933641054972385', 0, 4)).toContain('Bloqueado');
    });
    
    it('Desbloqueio de cartão fidelidade', function(){
        bloquear.desbloqueiaCartao();
        expect(z.widget.grid.getText('11855205933641054972385', 0, 4)).toContain('Liberado');
    });
});
