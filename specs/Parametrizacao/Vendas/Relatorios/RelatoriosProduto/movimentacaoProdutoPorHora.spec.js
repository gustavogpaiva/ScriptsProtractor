const loginPage = require('../../../../../page-objects/login.po.js');
const movProduto = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/movimentacaoProdutoPorHora.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Movimentação de Venda de Produtos por Hora', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Movimentação de Venda de Produtos por Hora');
    });

    afterAll(() => h.sairDoSistema());

    it('Movimentação de Venda de Produtos por Hora - Nível por Valor', () => {
        
        movProduto.limparFiltro();

        movProduto.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        movProduto.selecionarPeríodo(j.getValor('periodoComVenda'));
        movProduto.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        movProduto.selecionarTipoSelecao('Nível');
        movProduto.selecionarTipoRelatorio('Valor');
        movProduto.definirNivel(j.getValor('nivelProdutos'));

        movProduto.emitirRelatorio();
        
        expect(movProduto.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Nível por Valor', () => expect(movProduto.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Nível por Valor', () => expect(movProduto.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Nível por Valor', () => expect(movProduto.gerarRelatorioCSV()).toBe(true));

    it('Movimentação de Venda de Produtos por Hora - Nível por Quantidade', () => {
        movProduto.abrirFiltro();
        movProduto.limparFiltro();

        movProduto.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        movProduto.selecionarPeríodo(j.getValor('periodoComVenda'));
        movProduto.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        movProduto.selecionarTipoSelecao('Nível');
        movProduto.selecionarTipoRelatorio('Quantidade');
        movProduto.definirNivel(j.getValor('nivelProdutos'));

        movProduto.emitirRelatorio();
        
        expect(movProduto.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Nível por Quantidade', () => expect(movProduto.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Nível por Quantidade', () => expect(movProduto.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Nível por Quantidade', () => expect(movProduto.gerarRelatorioCSV()).toBe(true));    

    it('Movimentação de Venda de Produtos por Hora - Lista por Valor', () => {
        movProduto.abrirFiltro();    
        movProduto.limparFiltro();
    
        movProduto.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        movProduto.selecionarPeríodo(j.getValor('periodoComVenda'));
        movProduto.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        movProduto.selecionarTipoSelecao('Lista');
        movProduto.selecionarTipoRelatorio('Valor');
        movProduto.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));

        movProduto.emitirRelatorio();
        
        expect(movProduto.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Lista por Valor', () => expect(movProduto.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Lista por Valor', () => expect(movProduto.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Lista por Valor', () => expect(movProduto.gerarRelatorioCSV()).toBe(true));

    it('Movimentação de Venda de Produtos por Hora - Lista por Quantidade', () => {
        movProduto.abrirFiltro();    
        movProduto.limparFiltro();
    
        movProduto.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        movProduto.selecionarPeríodo(j.getValor('periodoComVenda'));
        movProduto.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        movProduto.selecionarTipoSelecao('Lista');
        movProduto.selecionarTipoRelatorio('Quantidade');
        movProduto.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));

        movProduto.emitirRelatorio();
        
        expect(movProduto.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Lista por Quantidade', () => expect(movProduto.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Lista por Quantidade', () => expect(movProduto.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Lista por Quantidade', () => expect(movProduto.gerarRelatorioCSV()).toBe(true));   
    
    it('Movimentação de Venda de Produtos por Hora - Intervalo por Valor', () => {
        movProduto.abrirFiltro();    
        movProduto.limparFiltro();
    
        movProduto.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        movProduto.selecionarPeríodo(j.getValor('periodoComVenda'));
        movProduto.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        movProduto.selecionarTipoSelecao('Intervalo');
        movProduto.selecionarTipoRelatorio('Valor');
        movProduto.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        movProduto.selecionarProdutoIni(j.getValor('produtoFinalcadLoja'));

        movProduto.emitirRelatorio();
        
        expect(movProduto.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Intervalo por Quantidade', () => expect(movProduto.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Intervalo por Quantidade', () => expect(movProduto.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Intervalo por Quantidade', () => expect(movProduto.gerarRelatorioCSV()).toBe(true));

    it('Movimentação de Venda de Produtos por Hora - Intervalo por Quantidade', () => {
        movProduto.abrirFiltro();    
        movProduto.limparFiltro();
    
        movProduto.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        movProduto.selecionarPeríodo(j.getValor('periodoComVenda'));
        movProduto.selecionarNivelAgrupador(j.getValor('nivelAgrupador'));
        movProduto.selecionarTipoSelecao('Intervalo');
        movProduto.selecionarTipoRelatorio('Quantidade');
        movProduto.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        movProduto.selecionarProdutoIni(j.getValor('produtoFinalcadLoja'));

        movProduto.emitirRelatorio();
        
        expect(movProduto.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Intervalo por Quantidade', () => expect(movProduto.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Intervalo por Quantidade', () => expect(movProduto.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Intervalo por Quantidade', () => expect(movProduto.gerarRelatorioCSV()).toBe(true));  
});