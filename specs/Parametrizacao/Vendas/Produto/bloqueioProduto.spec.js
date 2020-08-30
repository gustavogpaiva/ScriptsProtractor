var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var bloqueio = require('../../../../page-objects/Parametrizacao/Vendas/Produto/bloqueioProduto.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Bloqueio de Produto ', function () {
    
    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Bloqueio de Produto');
        h.filtro();
    });
    
    afterEach(function () {
        h.sairDoSistema();
    });
    
    it('Bloqueio de Produto', function () {
        bloqueio.bloqProduto();
    });
    
    it('Desbloqueio de Produto', function () {
        expect(bloqueio.desbloqProduto()).toContain('Desbloqueado com sucesso!');
    });
    // colocar validação ao bloquear produto
    //realizar it de tentar realizar cadastro com um produto já existente
});