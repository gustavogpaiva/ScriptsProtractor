var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var composicaoPSintetico = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoSintetico.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Composição Produto Por Loja (Sintético)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Composição Produto Por Loja (Sintético)');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Composição Produto Por Loja (Sintético)', function () {
        composicaoPSintetico.composicaoSintetica();
    });
});