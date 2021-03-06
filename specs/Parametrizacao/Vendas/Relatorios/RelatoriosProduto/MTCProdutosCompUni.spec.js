const loginPage = require('../../../../../page-objects/login.po.js');
const MTC = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/MTCProdutosCompUni.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela MTC de Produtos Comparativo por Unidade', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('MTC de Produtos Comparativo por Unidade');
    });

    afterAll(() => h.sairDoSistema());

    it('MTC de Produtos Comparativo por Unidade - Por Nível', () => {
        MTC.limparFiltro();
        MTC.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        MTC.selecionarPeríodo(j.getValor('periodoComVenda'));
        MTC.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        MTC.selecionarTipoSelecao('Nível');
        MTC.definirNivel(j.getValor('nivelProdutos'));
        MTC.emitirRelatorio();
        expect(MTC.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Nível', () => expect(MTC.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Nível', () => expect(MTC.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Nível', () => expect(MTC.gerarRelatorioCSV()).toBe(true));

    it('MTC de Produtos Comparativo por Unidade - Por Lista', () => {
        MTC.abrirFiltro();
        MTC.limparFiltro();
        MTC.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        MTC.selecionarPeríodo(j.getValor('periodoComVenda'));
        MTC.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        MTC.selecionarTipoSelecao('Lista');
        MTC.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        MTC.emitirRelatorio();
        expect(MTC.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Lista', () => expect(MTC.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Lista', () => expect(MTC.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Lista', () => expect(MTC.gerarRelatorioCSV()).toBe(true));

    it('MTC de Produtos Comparativo por Unidade - Por Intervalo', () => {
        MTC.abrirFiltro();
        MTC.limparFiltro();
        MTC.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        MTC.selecionarPeríodo(j.getValor('periodoComVenda'));
        MTC.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        MTC.selecionarTipoSelecao('Intervalo');
        MTC.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        MTC.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        MTC.emitirRelatorio();
        expect(MTC.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Intervalo', () => expect(MTC.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Intervalo', () => expect(MTC.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Intervalo', () => expect(MTC.gerarRelatorioCSV()).toBe(true));  
});