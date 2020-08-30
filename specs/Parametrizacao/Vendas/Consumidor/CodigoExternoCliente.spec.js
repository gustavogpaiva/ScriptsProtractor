var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var cliente = require('../../../../page-objects/Parametrizacao/Vendas/Consumidor/CodigoExternoCliente.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Código Externo Cliente', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();	
        h.tela('Código Externo Cliente');
        h.filtroCliente();
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Cadastro de Código Externo Cliente', function () {
        cliente.cadastroCodCliente();
    });

    it('Edição Código Externo Cliente', function () {
        cliente.editarCodCliente();
    });

    it('Exclusão Código Externo Cliente', function () {
        cliente.excluirCodCaixa();
    });
 //ja foi aberto issues para adição de validações ao cadastrar, editar e excluir
});