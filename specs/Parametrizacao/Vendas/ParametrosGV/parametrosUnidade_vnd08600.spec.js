var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var unidade = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/parametrosUnidade_vnd08600.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Parâmetros da Unidade', function () {
    beforeEach(function () {
        loginPage.login();
        h.tela('Parâmetros da Unidade');
    });

    afterEach(function () {
        h.sairDoSistema();

    });
    //cadastra uma nova loja para unidade
    it('Parâmetros da Unidade', function () {
        unidade.parametros();
        unidade.definiçoesNFCE();
        unidade.controleCaixa();
        unidade.definicoesConsumidor();
        unidade.regrasPreco();
        unidade.consolidacaoVendas();
        unidade.integracao();
        unidade.gestaoVendas();
        unidade.datasRestricoes();
        expect(unidade.produtosUnidade()).toBe('Produtos Exportados Com Sucesso!');
    });
});