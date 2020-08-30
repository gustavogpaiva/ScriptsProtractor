var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var consumidor = require('../../../../page-objects/Parametrizacao/Vendas/Consumidor/cadastroConsumidor.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro Consumidor', function () {
    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Cadastro de Consumidor');
    });

    /*afterAll(function () {
        h.sairDoSistema();
    });*/

    it('Cadastra um novo consumidor', function() {
        expect(consumidor.cadastroConsumidor()).toBe(true);
    });

    it('Edita dados do responsavel', function() {
        expect(consumidor.dadosResponsavel()).toBe(true);
    });    

    it('Edita endereços do consumidor', function() {
        expect(consumidor.enderecos()).toBe(true);
    });

    it('Edita parâmetros do consumidor', function() {
        expect(consumidor.parametros()).toBe(true);
    });

    it('Parametrização de saldos do consumidor', function() {
        expect(consumidor.saldo()).toBe(true);
    });

    it('Adiciona unidades para consumidor', function() {
        expect(consumidor.unidadesAssociadas()).toBe(true);
    });

    it('Tentar Realizar Cadastro com mesmo código', function() {
        expect(consumidor.tentaCodigoIgual()).toContain('Já existe um consumidor com esse Código!');
    });

    it('Alteração Automática', function() {
        expect(consumidor.alteracaoAutomatica()).toContain('Operação realizada com sucesso');
    });

    it('Tentar Realizar Exclusão de Consumidor com Registro Filho', function() {
        expect(consumidor.excluirComRegistroFilho()).toContain('Exclusão não permitida! O registro possui registros filhos.');
    });

    it('Exclusão de Consumidor', function() {
        expect(consumidor.excluir()).toContain('Registros Deletados');
    });
});