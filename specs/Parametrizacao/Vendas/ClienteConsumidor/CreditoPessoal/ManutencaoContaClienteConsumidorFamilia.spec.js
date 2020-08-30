var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var manutencao = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/CreditoPessoal/manutencaoContaClienteConsumidorFamilia.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Manutencao Conta Cliente Consumidor por Familia', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Manutenção Conta Cliente/Consumidor por Família');
        manutencao.aplicaFiltro();
    });
    afterAll(function () {
       h.sairDoSistema();
    });
    afterEach(function(){
        h.fechaTela();
    });
    it('Adicionar Família de Produto', function(){
        browser.sleep(2000);
        manutencao.aplicarFiltroCliente(j.getValor('nomeConsumidor2'));
        manutencao.adicionarFamilia(j.getValor('nomeConsumidor2'),'BEBIDAS','2');
        expect(h.aguardaMensagem()).toBe('Registros Salvos com Sucesso')
    });
    it('Adicionar Familia de Produto Repetido', function(){
        manutencao.aplicarFiltroCliente(j.getValor('nomeConsumidor'));
        manutencao.adicionarFamilia(j.getValor('nomeConsumidor'),'BEBIDAS','100');
        expect(h.aguardaMensagem()).toBe('Esse código já existe!');
        h.fechaTela();
    });
    it('Adicionar Família de Produto com Saldo Zero', function(){
        manutencao.adicionarFamilia(j.getValor('nomeConsumidor'),'DOCES','0');
        expect(h.aguardaMensagem()).toBe('O valor deve ser maior do que 0!');
        h.fechaTela();
    });
    it('Alterar valor de saldo de uma família de Produto', function () {
        manutencao.aplicarFiltroCliente(j.getValor('nomeConsumidor'));
        manutencao.alterarSaldo();
        expect(h.aguardaMensagem()).toBe('Registros Salvos com Sucesso');
    });
    it('Transferência entre contas', function(){
        manutencao.transferirCredito(j.getValor('nomeConsumidor'),j.getValor('nomeConsumidor2'),'BEBIDAS','BEBIDAS','10');
        expect(h.aguardaMensagem()).toBe('Transferência realizada com sucesso!\n\n'+'De '+j.getValor('nomeConsumidor') + ' - Família BEBIDAS' + '\nPara '+ j.getValor('nomeConsumidor2') + ' - Família BEBIDAS');
    });
    it('Transferência entre contas para uma família não existente', function(){
        manutencao.transferirCredito(j.getValor('nomeConsumidor'),j.getValor('nomeConsumidor2'),'BEBIDAS','SALGADOS','10');
        expect(h.aguardaMensagem()).toBe('Família não cadastrada no consumidor de destino!');
    });
});