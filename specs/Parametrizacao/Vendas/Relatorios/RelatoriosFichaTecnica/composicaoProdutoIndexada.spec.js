var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var composicaoIndexada = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoIndexada.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Composição Produto Indexada', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Composição de Produto (Indexada)');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Composição Produto Indexada', function () {
        composicaoIndexada.composicaoNivel();
    });
});