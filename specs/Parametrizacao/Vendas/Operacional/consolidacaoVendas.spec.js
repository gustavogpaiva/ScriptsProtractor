var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var consolidar = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/consolidacaoVendas.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Consolidação de Vendas', function(){
//existe um erro na tela no momento de consolidar
    //executa o login o sistema
    beforeAll(function(){
        loginPage.login();
        h.tela('Consolidação de Vendas');
    });

    afterAll(function(){
        h.sairDoSistema();
    });

    fit('Exibir a Consolidação de Vendas', function(){
        consolidar.limparFiltro();
        browser.executeScript("$('div.zh-validation').remove();");
        consolidar.selecionarUnidade(j.getValor('filial'));
        consolidar.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        consolidar.selecionarCaixa();
        browser.executeScript("$('div.zh-validation').remove();");
        consolidar.selecionarTipoRetirada(j.getValor('cdtipoRetirada'));
        browser.executeScript("$('div.zh-validation').remove();");
        consolidar.selecionarSetor(j.getValor('cdsetor'));
        browser.executeScript("$('div.zh-validation').remove();");
        consolidar.selecionarPeriodo(j.getValor('periodoSemConsolidar'));
        consolidar.selecionarCliente([j.getValor('cliente')]);
        consolidar.selecionarTipoConsumidor(/*[j.getValor('tipoConsumidor')]*/);
        consolidar.selecionarCentroCusto([j.getValor('centroCusto')]);
        consolidar.selecionarVenda();
        consolidar.selecionarProduto([j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja')]);
        consolidar.agruparItens('Sim');
        consolidar.itensNaoConsolidado('Sim');
        consolidar.filtrarConsolidacao();
        expect(consolidar.gridPossuiRegistros()).toBe(true);
    });
});