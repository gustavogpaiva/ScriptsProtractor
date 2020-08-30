var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var mtc = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/movimentacaoProdutoMTC.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

describe('Testes do relatório da tela Movimentação de Produtos MTC', function () {
	//executa o login o sistema
    beforeAll(function () { 
        loginPage.login();
        h.tela('Movimentação de Produtos MTC');
    });
	
	//sai do sistema
    afterAll(function(){
    	h.sairDoSistema();
    });
    
    it('Emitir um relatório da unidade para um período com produtos movimentados - Nivel', function(){
        mtc.limparFiltro();
        browser.executeScript("$('div.zh-validation').remove();");
        mtc.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        mtc.selecionarPeríodo(j.getValor('periodoComVenda'));
        mtc.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        mtc.selecionarTipoSelecao('Nível');
        mtc.selecionarNivelProduto(j.getValor('nivelProdutos'));
        mtc.emitirRelatorio();
        expect(mtc.gridPossuiRegistros()).toBe(true);
    });

    it('Verificar se os produtos estão sendo exibidos uma vez - Nivel', function(){
        expect(mtc.verificarProdutos()).toBe(true);
    });

    it('Verificar se o rank dos produtos estão classificados pelo valor total - Nivel', function(){
        expect(mtc.verificarRank()).toBe(true);
    });

    it('Verificar se o valor unitário médio dos produtos estão sendo exibidos - Nivel', function(){
        expect(mtc.verificarValorUnitMedio()).toBe(true);
    });

    it('Gerar relatório em PDF - Nivel', function(){
        expect(mtc.gerarRelatorioPDF()).toBe(true);
    });

    it('Gerar relatório em XLS - Nivel', function(){
        expect(mtc.gerarRelatorioXLS()).toBe(true);
    });

    it('Gerar relatório em CSV - Nivel', function(){
        expect(mtc.gerarRelatorioCSV()).toBe(true);
    });
    
    it('Emitir um relatório da unidade para um período com produtos movimentados - Lista', function(){
        mtc.abrirFiltro();
        mtc.limparFiltro();
        browser.executeScript("$('div.zh-validation').remove();");
        mtc.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        mtc.selecionarPeríodo(j.getValor('periodoComVenda'));
        mtc.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        mtc.selecionarTipoSelecao('Lista');
        mtc.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        mtc.emitirRelatorio();
        expect(mtc.gridPossuiRegistros()).toBe(true);
    });

    it('Verificar se os produtos estão sendo exibidos uma vez - Lista', function(){
        expect(mtc.verificarProdutos()).toBe(true);
    });

    it('Verificar se o rank dos produtos estão classificados pelo valor total - Lista', function(){
        expect(mtc.verificarRank()).toBe(true);
    });

    it('Verificar se o valor unitário médio dos produtos estão sendo exibidos - Lista', function(){
        expect(mtc.verificarValorUnitMedio()).toBe(true);
    });

    it('Gerar relatório em PDF - Lista', function(){
        expect(mtc.gerarRelatorioPDF()).toBe(true);
    });

    it('Gerar relatório em XLS - Lista', function(){
        expect(mtc.gerarRelatorioXLS()).toBe(true);
    });

    it('Gerar relatório em CSV - Lista', function(){
        expect(mtc.gerarRelatorioCSV()).toBe(true);
    });    

    it('Emitir um relatório da unidade para um período com produtos movimentados - Intervalo', function(){
        mtc.abrirFiltro();
        mtc.limparFiltro();
        browser.executeScript("$('div.zh-validation').remove();");
        mtc.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        mtc.selecionarPeríodo(j.getValor('periodoComVenda'));
        mtc.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        mtc.selecionarTipoSelecao('Intervalo');
        mtc.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        mtc.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));        
        mtc.emitirRelatorio();
        expect(mtc.gridPossuiRegistros()).toBe(true);
    });

    it('Verificar se os produtos estão sendo exibidos uma vez - Intervalo', function(){
        expect(mtc.verificarProdutos()).toBe(true);
    });

    it('Verificar se o rank dos produtos estão classificados pelo valor total - Intervalo', function(){
        expect(mtc.verificarRank()).toBe(true);
    });

    it('Verificar se o valor unitário médio dos produtos estão sendo exibidos - Intervalo', function(){
        expect(mtc.verificarValorUnitMedio()).toBe(true);
    });

    it('Gerar relatório em PDF - Intervalo', function(){
        expect(mtc.gerarRelatorioPDF()).toBe(true);
    });

    it('Gerar relatório em XLS - Intervalo', function(){
        expect(mtc.gerarRelatorioXLS()).toBe(true);
    });

    it('Gerar relatório em CSV - Intervalo', function(){
        expect(mtc.gerarRelatorioCSV()).toBe(true);
    });    
});