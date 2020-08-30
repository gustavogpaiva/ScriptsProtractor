var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var manutencao = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/manutencaoLancamentoCaixa.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da Tela Manutenção dos Lançamentos de Caixa', function () {

    //executa o login o sistema
    beforeAll(function(){
        loginPage.login();
        h.tela('Manutenção dos Lançamentos do Caixa');
    });

    beforeEach(function(){
        manutencao.filtrarLancamentos(j.getValor('periodoComVenda'), j.getValor('cdcaixa'), j.getValor('atualizaSaldo'));
    });

    afterAll(function(){
        h.sairDoSistema();
    });

    it('Filtra os lançamentos do caixa', async function(){
        expect(await manutencao.exibeAberturas()).toBe(true);
    });

    it('Atualiza saldo do caixa', async function(){
        expect(await manutencao.atualizaSaldo()).toBe('Saldo do caixa atualizado com sucesso!');
    });

    it('Verifica os lançamentos do caixa', async function(){
        expect(await manutencao.lancamentos()).toBe(true);
    });

    it('Verifica o saldo do caixa', async function(){
        expect(await manutencao.saldoDoCaixa()).toBe(true);
    });

    it('Tenta realizar um lançamento com o caixa fechado', async function(){
        expect(await manutencao.adicionaLancamento(j.getValor('tipoMovimento'), j.getValor('tipoRecebimento'), j.getValor('preco'))).toBe('Operação bloqueada. Caixa fechado.'); 
    });

    it('Libera ajuste no caixa, realiza um lançamento no caixa e finaliza o ajuste', async function(){
        expect(await manutencao.liberaAjuste()).toBe('Operação realizada com sucesso!');
        expect(await manutencao.adicionaLancamento(j.getValor('tipoMovimento'), j.getValor('tipoRecebimento'), j.getValor('preco'))).toBe('Lançamento adicionado com sucesso!');
        expect(await manutencao.finalizaAjuste()).toBe('Caixa fechado para Ajustes/Manutenção de Lançamentos.');
    });
});