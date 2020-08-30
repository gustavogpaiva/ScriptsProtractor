var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var bloquear = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/bloqueioDeCartao.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes na tela Bloquear Cartão Fidelidade', function(){
    
    beforeAll(function(){
        loginPage.login();
        h.tela('Bloquear Cartão Fidelidade');
    });
    beforeEach(function(){
        browser.sleep(2000);
        bloquear.aplicaFiltroTela('','','','');
    });
    afterAll(function(){
        h.sairDoSistema();
    });

    
    it('Bloqueio de cartão fidelidade pelo grid', function(){
        bloquear.bloqueioDesbloqueioCartaoGrid(j.getValor('nomeConsumidor'), 'Bloquear');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Desbloqueio de cartão fidelidade pelo grid', function(){
        bloquear.bloqueioDesbloqueioCartaoGrid(j.getValor('nomeConsumidor'), 'Desbloquear');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Bloqueio de cartão fidelidade pela tela', function(){
        bloquear.bloqueioDesbloqueioCartaoTela(j.getValor('nomeConsumidor'), 'Bloquear');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Desloqueio de cartão fidelidade pela tela', function(){
        bloquear.bloqueioDesbloqueioCartaoTela(j.getValor('nomeConsumidor'), 'Desbloquear');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Bloqueio de cartões fidelidade por intervalo', function(){
        bloquear.bloqueioDesbloqueioPorIntervalo(' ', 'Bloquear');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Desbloqueio de cartões fidelidade por intervalo', function(){
        bloquear.bloqueioDesbloqueioPorIntervalo(' ', 'Desbloquear');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
});
