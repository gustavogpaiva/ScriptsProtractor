var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var mesa = require('../../../../page-objects/Parametrizacao/Vendas/Mesa_Comanda/ambienteMesa.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Ambiente/Mesa', function () {
    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Ambiente/Mesa');
    });

    beforeEach(function () {
        mesa.selecionarUnidade(j.getValor('filial'));
    });

    afterEach(function () {
        h.fechaTela();
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Cadastrar novo Ambiente', async function () {
        expect(await mesa.ambiente(j.getValor('loja'), j.getValor('sigla'), j.getValor('ambiente'), j.getValor('numeroMesas'), j.getValor('mesaInicial'), j.getValor('mesaFinal'))).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar nova Mesa', async function () {
        expect(await mesa.mesa(j.getValor('loja'), j.getValor('sigla'), j.getValor('mesaInicial'), j.getValor('nomeMesa'), j.getValor('pessoas'), j.getValor('posicaoMesa'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Cadastro automático de mesas', async function () {
         expect(await mesa.cadastroAutomatico(j.getValor('loja'), j.getValor('sigla'), j.getValor('mesaInicial'), j.getValor('mesaFinal'), j.getValor('pessoas'))).toContain('Operação realizada com sucesso.');
    });

    it('Editar Ambiente/Mesa', async function () {
        expect(await mesa.editar(j.getValor('filial'), j.getValor('loja'), j.getValor('sigla'), j.getValor('numeroMesas'), j.getValor('mesaFinal'))).toContain('Operação realizada com sucesso.');
    });

    it('Excluir Ambiente/Mesa', function () {
        expect(mesa.excluir(j.getValor('filial'), j.getValor('loja'))).toBe('Excluído com sucesso.');
    });
});