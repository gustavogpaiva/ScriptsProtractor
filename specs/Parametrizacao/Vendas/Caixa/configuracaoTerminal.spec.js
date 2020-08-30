var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var configuracaoTerminal = require('../../../../page-objects/Parametrizacao/Vendas/Caixa/configuracaoTerminal.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Configuração Terminal de Caixa', function () {
    beforeAll(function () {
        loginPage.login();
        h.tela('Configuração de Terminal de Caixa');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Configurar Terminal de Caixa', function () {
        expect(configuracaoTerminal.cadastrarConfiguracao(j.getValor('nomeAlteracaoCadLoja'))).toBe(true);
    });

    it('Realizar edição com campos obrigatórios em branco', function () {
        expect(configuracaoTerminal.edicaoSemNome()).toBe(true);
    });
    
    it('Editar Configuração de Terminal de Caixa', function () {
        expect(configuracaoTerminal.editarConfTerminal('RESTAURANTE', 'CAIXA PDV LOJA 5')).toBe(true);
    });

    it('Excluir Configuração de Terminal de Caixa', function () {
        expect(configuracaoTerminal.excluirConfTerminal()).toBe(true);
    });

    it('Tentar realizar cadastro sem nome', function () {
        expect(configuracaoTerminal.cadastroSemNome()).toBe(true);
    });
});