const loginPage = require('../../../../../page-objects/login.po.js');
const vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasProdutoPeriodo.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas de Produtos no Período (Analítico/Sintético por Unidade)', () => {

    //executa o login o sistema
    beforeAll(() =>  {
        loginPage.login();
        h.tela('Vendas de Produtos no Período (Analítico/Sintético por Unidade)');
    });

    afterAll(() => h.sairDoSistema());

    it('Vendas de Produtos no Período(Analítico/Sintético por Unidade) - Analítico por Nivel', () => {
        //limpa a informações do filtro
        vendas.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, caixa e o período
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarTipoRelatorio('Analítico');
        vendas.selecionarTipoSelecao('Nivel');
        vendas.definirNivel(j.getValor('nivelProdutos'));
        //emite o relatório com as informações inseridas no filtro
        vendas.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico por Nivel', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico por Nivel', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico por Nivel', () => expect(vendas.gerarRelatorioCSV()).toBe(true));

    it('Vendas de Produtos no Período(Analítico/Sintético por Unidade) - Sintético por Nivel', () => {
        //abre o filtro novamente
        vendas.abrirFiltro();
        //limpa a informações do filtro
        vendas.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, caixa e o período
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarTipoRelatorio('Sintético');
        vendas.selecionarTipoSelecao('Nivel');
        vendas.definirNivel(j.getValor('nivelProdutos'));
        //emite o relatório com as informações inseridas no filtro
        vendas.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético por Nivel', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético por Nivel', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético por Nivel', () => expect(vendas.gerarRelatorioCSV()).toBe(true));    

    it('Vendas de Produtos no Período(Analítico/Sintético por Unidade) - Analítico por Lista', () => {
        //abre o filtro novamente
        vendas.abrirFiltro();
        //limpa a informações do filtro
        vendas.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, caixa e o período
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarTipoRelatorio('Analítico');
        vendas.selecionarTipoSelecao('Lista');
        vendas.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        vendas.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico por Lista', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico por Lista', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico por Lista', () => expect(vendas.gerarRelatorioCSV()).toBe(true));
    
    it('Vendas de Produtos no Período(Analítico/Sintético por Unidade) - Sintético por Lista', () => {
        //abre o filtro novamente
        vendas.abrirFiltro();
        //limpa a informações do filtro
        vendas.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, caixa e o período
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarTipoRelatorio('Sintético');
        vendas.selecionarTipoSelecao('Lista');
        vendas.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        vendas.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético por Lista', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético por Lista', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético por Lista', () => expect(vendas.gerarRelatorioCSV()).toBe(true));  
    
    it('Vendas de Produtos no Período(Analítico/Sintético por Unidade) - Analítico por Intervalo', () => {
        //abre o filtro novamente
        vendas.abrirFiltro();
        //limpa a informações do filtro
        vendas.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, caixa e o período
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarTipoRelatorio('Analítico');
        vendas.selecionarTipoSelecao('Intervalo');
        vendas.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        vendas.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        vendas.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico por Intervalo', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico por Intervalo', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico por Intervalo', () => expect(vendas.gerarRelatorioCSV()).toBe(true));          

    it('Vendas de Produtos no Período(Analítico/Sintético por Unidade) - Sintético por Intervalo', () => {
        //abre o filtro novamente
        vendas.abrirFiltro();
        //limpa a informações do filtro
        vendas.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, caixa e o período
        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendas.selecionarTipoRelatorio('Sintético');
        vendas.selecionarTipoSelecao('Intervalo');
        vendas.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        vendas.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        vendas.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético por Intervalo', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético por Intervalo', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético por Intervalo', () => expect(vendas.gerarRelatorioCSV()).toBe(true));       
});