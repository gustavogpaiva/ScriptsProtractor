const loginPage = require('../../../../../page-objects/login.po.js');
const produtividadeVendedor = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/produtividadeVendedor.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Produtividade por Vendedor', () => {

    beforeAll(() => { 
        loginPage.login();
        h.tela('Produtividade por Vendedor');
    });

    afterAll(() => h.sairDoSistema());

    it('Produtividade por Vendedor - Analítico', () => {
        produtividadeVendedor.limparFiltro();
        expect(produtividadeVendedor.selecionarUnidade(j.getValor('filial'))).toBe(true);
        expect(produtividadeVendedor.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'))).toBe(true);
        expect(produtividadeVendedor.selecionarPeríodo(j.getValor('periodoComVenda'))).toBe(true);
        expect(produtividadeVendedor.selecionarTipoRelatorio('Analítico')).toBe(true);
        expect(produtividadeVendedor.selecionarAberturaCaixa(j.getValor('aberturaCaixa'))).toBe(true);
        expect(produtividadeVendedor.selecionarVendedor(j.getValor('nomeGarcom'))).toBe(true);
        expect(produtividadeVendedor.selecionarNivProdSuperior(j.getValor('nivelProdutoSuperior'))).toBe(true);
        expect(produtividadeVendedor.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'))).toBe(true);
        produtividadeVendedor.emitirRelatorio();
        expect(produtividadeVendedor.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(produtividadeVendedor.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(produtividadeVendedor.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(produtividadeVendedor.gerarRelatorioCSV()).toBe(true));

    it('Produtividade por Vendedor - Sintético', () => {
        produtividadeVendedor.abrirFiltro();
        produtividadeVendedor.limparFiltro();
        expect(produtividadeVendedor.selecionarUnidade(j.getValor('filial'))).toBe(true);
        expect(produtividadeVendedor.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'))).toBe(true);
        expect(produtividadeVendedor.selecionarPeríodo(j.getValor('periodoComVenda'))).toBe(true);
        expect(produtividadeVendedor.selecionarTipoRelatorio('Sintético')).toBe(true);
        expect(produtividadeVendedor.selecionarAberturaCaixa(j.getValor('aberturaCaixa'))).toBe(true);
        expect(produtividadeVendedor.selecionarVendedor(j.getValor('nomeGarcom'))).toBe(true);
        expect(produtividadeVendedor.selecionarNivProdSuperior(j.getValor('nivelProdutoSuperior'))).toBe(true);
        expect(produtividadeVendedor.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'))).toBe(true);
        produtividadeVendedor.emitirRelatorio();
        expect(produtividadeVendedor.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético', () => expect(produtividadeVendedor.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(produtividadeVendedor.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(produtividadeVendedor.gerarRelatorioCSV()).toBe(true));    
});