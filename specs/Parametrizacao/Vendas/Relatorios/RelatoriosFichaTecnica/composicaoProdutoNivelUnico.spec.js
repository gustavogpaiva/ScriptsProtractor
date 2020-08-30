var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var composicaoPNivel = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoNivelUnico.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Composição Produto Nível Unico', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Composição de Produto (Nível Único)');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Composição Produto Por Nível Unico', function () {
        composicaoPNivel.composicaoNivel();
    });
});