var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var integracao = require('../../../../page-objects/Parametrizacao/Vendas/Integracao/cadastroIntegracao.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Cadastro de Integração', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Cadastro de Integração');
    });

    afterEach(function () {
        h.fechaTela();
    });

    //após a execução dos testes sai do sistema
    afterAll(function () {
        h.sairDoSistema();
    });

    it('Cadastro de Integração', function(){
        expect(integracao.cadastrarIntegracao(j.getValor('idIntegracao'), j.getValor('nomeIntegracao'), j.getValor('tipoRecebimento3'), j.getValor('codigoExterno'))).toContain('Operação realizada com sucesso');
    });

    it('Cadastro de Tipo de recebimento', function(){
        expect(integracao.cadastrarTipoRecebimento(j.getValor('idIntegracao'), j.getValor('tipoRecebimento3'), j.getValor('codigoExterno'))).toContain('Operação realizada com sucesso');
    });

    it('Edição do Cadastro de Integração', function(){
        expect(integracao.editarIntegracao(j.getValor('idIntegracao'), j.getValor('nomeAlteracaoCadLoja'), j.getValor('tipoRecebimento2'), j.getValor('codigoExterno'))).toContain('Operação realizada com sucesso');
    });

    it('Edição dos Tipos de recebimento', function(){
        expect(integracao.editarTipoRecebimento(j.getValor('idIntegracao'), j.getValor('tipoRecebimento2'), j.getValor('codigoExterno'),j.getValor('codigoExternoAlterado'))).toContain('Operação realizada com sucesso');
    });

    it('Exclusão de Cadastro de Integração', function () {
        expect(integracao.excluirIntegracao(j.getValor('idIntegracao'))).toContain('Excluído com sucesso!');
    });
});