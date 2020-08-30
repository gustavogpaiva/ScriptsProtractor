var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fechamento = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/fechamentoCupom.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js')

describe('Testes da tela Fechamento de Cupom', function () {

    //executa o login o sistema
    beforeAll(function(){
        loginPage.login();
        h.tela('Fechamento de Cupom');
    });
    
    beforeEach(function(){
        fechamento.filtrarCupons(j.getValor('periodoComVenda'));
    });

    afterAll(function(){
        h.sairDoSistema();
    });

    it('Exibe os cupons fechados para o período de venda', async function(){
        expect(await fechamento.cupom()).toBe(true);
        expect(await fechamento.fechamentoCupom(j.getValor('periodoComVenda'))).toBe(true);
        expect(await fechamento.imposto()).toBe(true);
        expect(await fechamento.venda()).toBe(true);
        expect(await fechamento.recebimento(j.getValor('outrasMoedas'))).toBe(true);
    });

    it('Executa a Conferência fiscal', async function(){
        expect(await fechamento.conferenciaFiscal()).toBe(true);
    });

    it('Executa a Conferência financeiro', async function(){
        expect(await fechamento.conferenciaFinanceiro(j.getValor('outrasMoedas'))).toBe(true);
    });

    it('Executa a Conferência contabilidade', async function(){
        expect(await fechamento.conferenciaContabilidade(j.getValor('outrasMoedas'))).toBe(true);
    });

    it('Executa o Cancelamento nos cupons exibidos', async function(){
        expect(await fechamento.cancelar()).toBe(true);
    });
});