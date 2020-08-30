var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var vendasTipoRecebimento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasTipoRecebimentoUnidade.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas por Tipo de Recebimento (por Unidade)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Vendas por Tipo de Recebimento (por Unidade)');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Vendas por Tipo de Recebimento (por Unidade)', function () {
        vendasTipoRecebimento.relatorio();
    });


});