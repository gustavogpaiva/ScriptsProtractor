const loginPage = require('../../../../../page-objects/login.po.js');
const vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasNivelProduto.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas por Nível de Produto', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Vendas por Nível de Produto');
    });

    afterAll(() => h.sairDoSistema());

    it('Vendas por Nível de Produto - Analítico por Intervalo', () => {
        
        vendas.limparFiltro();

        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarCliente(j.getValor('cliente'));
        vendas.selecionarConsumidor(j.getValor('nomeConsumidor'));
        vendas.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        vendas.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        vendas.selecionarNivelProduto(j.getValor('nivelProdutos'));
        vendas.selecionarTipoRelatorio('Analítico');

        vendas.emitirRelatorio();
        
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico por Intervalo', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico por Intervalo', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico por Intervalo', () => expect(vendas.gerarRelatorioCSV()).toBe(true));

    it('Vendas por Nível de Produto - Sintético por Intervalo', () => {
        
        vendas.abrirFiltro();
        vendas.limparFiltro();

        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarCliente(j.getValor('cliente'));
        vendas.selecionarConsumidor(j.getValor('nomeConsumidor'));
        vendas.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        vendas.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        vendas.selecionarNivelProduto(j.getValor('nivelProdutos'));
        vendas.selecionarTipoRelatorio('Sintético');

        vendas.emitirRelatorio();
        
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético por Intervalo', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético por Intervalo', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético por Intervalo', () => expect(vendas.gerarRelatorioCSV()).toBe(true)); 
    
    it('Vendas por Nível de Produto - Analítico por Lista', () => {
        
        vendas.abrirFiltro();
        vendas.limparFiltro();

        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarCliente(j.getValor('cliente'));
        vendas.selecionarConsumidor(j.getValor('nomeConsumidor'));
        vendas.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        vendas.selecionarNivelProduto(j.getValor('nivelProdutos'));
        vendas.selecionarTipoRelatorio('Analítico');

        vendas.emitirRelatorio();
        
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });     
    
    it('Gerar relatório em PDF - Analítico por Lista', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico por Lista', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico por Lista', () => expect(vendas.gerarRelatorioCSV()).toBe(true));    

    it('Vendas por Nível de Produto - Sintético por Lista', () => {
        
        vendas.abrirFiltro();
        vendas.limparFiltro();

        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarCliente(j.getValor('cliente'));
        vendas.selecionarConsumidor(j.getValor('nomeConsumidor'));
        vendas.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        vendas.selecionarNivelProduto(j.getValor('nivelProdutos'));
        vendas.selecionarTipoRelatorio('Sintético');

        vendas.emitirRelatorio();
        
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });     
    
    it('Gerar relatório em PDF - Sintético por Lista', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético por Lista', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético por Lista', () => expect(vendas.gerarRelatorioCSV()).toBe(true));      
});