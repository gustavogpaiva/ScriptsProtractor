const loginPage = require('../../../../../page-objects/login.po.js');
const maisVendidos = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/produtosMaisVendidos.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Produtos Mais Vendidos', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Produtos Mais Vendidos');
    });

    afterAll(() => h.sairDoSistema());

    it('Produtos Mais Vendidos Valor/Loja por Nível', ()  => {
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Valor/Loja');
        maisVendidos.selecionarTipoSelecao('Nivel');
        maisVendidos.definirNivel(j.getValor('nivelProdutos'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Valor/Loja por Nível', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Valor/Loja por Nível', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Valor/Loja por Nível', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));

    it('Produtos Mais Vendidos Valor/Loja por Lista', () => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Valor/Loja');
        maisVendidos.selecionarTipoSelecao('Lista');
        maisVendidos.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Valor/Loja por Lista', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Valor/Loja por Lista', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Valor/Loja por Lista', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));

    it('Produtos Mais Vendidos Valor/Loja por Intervalo', () => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Valor/Loja');
        maisVendidos.selecionarTipoSelecao('Intervalo');
        maisVendidos.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        maisVendidos.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Valor/Loja por Intervalo', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Valor/Loja por Intervalo', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Valor/Loja por Intervalo', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));   
    
    it('Produtos Mais Vendidos Qtde/Loja por Nível', ()  => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Qtde/Loja');
        maisVendidos.selecionarTipoSelecao('Nivel');
        maisVendidos.definirNivel(j.getValor('nivelProdutos'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Qtde/Loja por Nível', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Qtde/Loja por Nível', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Qtde/Loja por Nível', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));   

    it('Produtos Mais Vendidos Qtde/Loja por Lista', () => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Qtde/Loja');
        maisVendidos.selecionarTipoSelecao('Lista');
        maisVendidos.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Qtde/Loja por Lista', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Qtde/Loja por Lista', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Qtde/Loja por Lista', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));

    it('Produtos Mais Vendidos Qtde/Loja por Intervalo', () => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Qtde/Loja');
        maisVendidos.selecionarTipoSelecao('Intervalo');
        maisVendidos.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        maisVendidos.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Qtde/Loja por Intervalo', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Qtde/Loja por Intervalo', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Qtde/Loja por Intervalo', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));

    it('Produtos Mais Vendidos Consolidado por Nível', ()  => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Consolidado');
        maisVendidos.selecionarTipoSelecao('Nivel');
        maisVendidos.definirNivel(j.getValor('nivelProdutos'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Consolidado por Nível', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Consolidado por Nível', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Consolidado por Nível', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));

    it('Produtos Mais Vendidos Consolidado por Lista', () => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Consolidado');
        maisVendidos.selecionarTipoSelecao('Lista');
        maisVendidos.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Consolidado por Lista', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Consolidado por Lista', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Consolidado por Lista', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));

    it('Produtos Mais Vendidos Consolidado por Intervalo', () => {
        //abre o filtro novamente
        maisVendidos.abrirFiltro();
        //limpa a informações do filtro
        maisVendidos.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, caixa e o período
        maisVendidos.selecionarUnidade(j.getValor('filial'));
        maisVendidos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        maisVendidos.selecionarCaixa(j.getValor('nmcaixa'));
        browser.executeScript("$('div.zh-validation').remove();");
        maisVendidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        maisVendidos.selecionarTipoRelatorio('Consolidado');
        maisVendidos.selecionarTipoSelecao('Intervalo');
        maisVendidos.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        maisVendidos.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        maisVendidos.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(maisVendidos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Consolidado por Intervalo', () => expect(maisVendidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Consolidado por Intervalo', () => expect(maisVendidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Consolidado por Intervalo', () => expect(maisVendidos.gerarRelatorioCSV()).toBe(true));    
});