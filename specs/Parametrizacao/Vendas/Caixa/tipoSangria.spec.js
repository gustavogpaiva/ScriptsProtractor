var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var sangria = require('../../../../page-objects/Parametrizacao/Vendas/Caixa/tipoSangria.po.js');
var h = require('../../../../page-objects/helper.po.js');
const fs = require('fs');

describe('Testes da tela Tipo de Sangria', function () {

    beforeEach(function () {
        loginPage.login();
        h.tela('Tipo de Sangria');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Cadastro de Tipo de Sangria', function () {
        expect(sangria.cadastrarSangria()).toBe(true);
    });

   /* it('Tenta Realizar Cadastro com Mesmo Código', function () {
        expect(sangria.cadastroCodigoIgual()).toBe('Essa combinação de códigos já existe no banco de dados');
    });*/

    it('Edição de Tipo de Sangria', function () {
        expect(sangria.editarSangria()).toBe(true);
    });

   /* it('Editar e Deixar Campo em Branco', function () {
        expect(sangria.editarCampoBranco()).toEqual('Todos os campos obrigatórios devem ser preenchidos!');
        
    });*/

    it('Exclusão de Tipo de Sangria', function () {
        expect(sangria.excluirSangria()).toBe(true);
        //sem expect pois nao existe mensagem de interação
    });

   /* it('Tentar Excluir tipo de Sangria Padrão', function () {
        expect(sangria.tentarExcluir()).toBe('O tipo de sangria padrão não pode ser excluido');
    });*/

});