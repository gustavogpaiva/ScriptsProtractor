var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var integracao = require('../../../../page-objects/Parametrizacao/Vendas/Integracao/cadastroIntegracao.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Integração', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cadastro de Integração');
    });

    afterEach(function () {
        h.sairDoSistema();

    });

    it('Cadastro de Cadastro de Integração', function () {
        integracao.cadIntegracao();
        expect(z.widget.grid.getText('190983411515925229671648', 0, 1)).toContain('TST');
    });

    it('Edição de Cadastro de Integração', function () {
        integracao.editarIntegracao();
        expect(z.widget.grid.getText('190983411515925229671648', 0, 1)).toContain('COD');
    });

    it('Exclusão de Cadastro de Integração', function () {
        expect(integracao.excluirIntegracao()).toContain('Excluído com sucesso!');
    });

    /* it('Tentar Realizar Exclusão com Registros filhos', function(){
         //esperar para que haja a interação na exclusao
     });*/
});