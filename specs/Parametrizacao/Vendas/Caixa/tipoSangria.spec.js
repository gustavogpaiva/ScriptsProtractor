var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var sangria = require('../../../../page-objects/Parametrizacao/Vendas/Caixa/tipoSangria.po.js');
var h = require('../../../../page-objects/helper.po.js');
const fs = require('fs');

describe('Testes da tela Tipo de Sangria', function () {

    beforeAll(function () {
        loginPage.login();
        h.tela('Tipo de Sangria');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    beforeEach(function(){
        sangria.selecionarUnidade();
    });

    afterEach(function(){
        h.fechaTela();
    });

    it('Cadastro de Tipo de Sangria', function () {
        sangria.cadastrarSangria('Movimento');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Tenta Realizar Cadastro com Mesmo Código', function () {
        sangria.cadastrarSangria('Movimento');
        expect(h.aguardaMensagem()).toBe('Já existe um registro com esse código!');
    });

    it('Edição de Tipo de Sangria', function () {
        sangria.editarSangria();
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Editar e Deixar Campo em Branco', function () {
        sangria.editarCampoBranco();
        expect(h.aguardaMensagem()).toBe('Todos os campos obrigatórios devem ser preenchidos!');
        
    });

    it('Exclusão de Tipo de Sangria', function () {
        sangria.excluirSangria();
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
    });

    it('Tentar Excluir tipo de Sangria Padrão', function () {
        sangria.tentarExcluir();
        expect(h.aguardaMensagem()).toBe('O tipo de sangria padrão não pode ser excluído!');
       
    });

});