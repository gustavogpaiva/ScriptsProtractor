var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var mensagensKDS = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/parametrizacaoMensagensKDS.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Parametrização de Mensagens KDS', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Parametrização de Mensagens KDS');
    });

    it('Parametrização de Mensagens KDS', function () {
        expect(mensagensKDS.parametrizaMensagemKDS()).toContain('Registros Salvos com Sucesso');
    });

    it('Parametrizar dias da semana', function () {
        expect(mensagensKDS.diasSemana()).toContain('Registros salvos com sucesso!');
    });

    it('Parametrizar setores', function () {
        expect(mensagensKDS.setores()).toContain('Registros salvos com sucesso!');
    });

    it('Editar mensagens do KDS', function () {
        expect(mensagensKDS.editar()).toContain('Registros Salvos com Sucesso');
    });

    it('Tentar realizar exclusão com registro filho', function () {
        expect(mensagensKDS.tentaExcluir()).toContain('Exclusão não permitida! O registro possui registros filhos.');
    });

    it('Excluir Parametrização de Mensagens KDS', function () {
        expect(mensagensKDS.excluirSetor()).toContain('Excluído com sucesso!');
        expect(mensagensKDS.excluiDiasSemana()).toContain('Excluído com sucesso!');
        expect(mensagensKDS.excluir()).toContain('Excluído com sucesso!');
    });
});