var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var vendedor = require('../../../../page-objects/Parametrizacao/Vendas/Mesa_Comanda/cadastroVendedor.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Cadastro de Vendedor', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Cadastro de Vendedor (Garçom)');
    });

    beforeEach(function () {
        vendedor.selecionarVendedor(j.getValor('cdNovoVendedor'));
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Cadastro de Vendedor', async function(){
        expect(await vendedor.cadastrar(j.getValor('filial'), j.getValor('cdcaixa'), j.getValor('operador'), j.getValor('cdNovoVendedor'), j.getValor('novoVendedor'), j.getValor('inscricao'), j.getValor('dataNascimento'))).toBe(true);
        expect(await vendedor.enderecos(j.getValor('cep'), j.getValor('area'), j.getValor('pais'), j.getValor('estado'), j.getValor('cidadeFilial'), j.getValor('bairro'), j.getValor('email'), j.getValor('cdNovoVendedor'))).toBe(true);
        expect(await vendedor.telefones(j.getValor('telefone'), j.getValor('celular'))).toBe(true);
        expect(await vendedor.taxa(j.getValor('taxaEntrega'), j.getValor('incideConta'))).toBe(true);
        expect(await vendedor.entregador(j.getValor('taxaEntrega'), j.getValor('placaVeiculo'))).toBe(true);
    });

    it('Edição do Cadastro de Vendedor', function () {
        expect(vendedor.editarVendedor(j.getValor('filial'), j.getValor('cdcaixa'), j.getValor('cdNovoVendedor'), j.getValor('novoVendedor'), j.getValor('dataNascimento'), j.getValor('taxaEntrega'), j.getValor('placaVeiculo'), j.getValor('taxaEntrega'), j.getValor('operador'))).toBe(true);
    });

    it('Exclusão do Cadastro de Vendedor', function () {
        expect(vendedor.excluirVendedor(j.getValor('cdNovoVendedor'))).toContain('Excluído com sucesso!');
    });
});