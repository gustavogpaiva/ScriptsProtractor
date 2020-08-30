const loginPage = require('../../../../../page-objects/login.po.js');
const composicaoPSintetico = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoSintetico.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Composição Produto Por Loja (Sintético)', ()  => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Composição de Produto (Sintético)');
    });

    afterAll(() => h.sairDoSistema());

    it('Composição Produto Por Loja (Sintético) - Por Nível', () => {
        //limpa a informações do filtro
        composicaoPSintetico.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, e o tipo de custo
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoComposicao('Padrão');
        composicaoPSintetico.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoCusto('Custo Médio Líquido Atual');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoSelecao('Nível');
        composicaoPSintetico.definirNivel(j.getValor('nivelProdutos'));

        composicaoPSintetico.emitirRelatorio();

        expect(composicaoPSintetico.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Nível', () => expect(composicaoPSintetico.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Nível', () => expect(composicaoPSintetico.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Nível', () => expect(composicaoPSintetico.gerarRelatorioCSV()).toBe(true));

    it('Composição Produto Por Loja (Sintético) - Por Lista', () => {
        //abre o filtro novamente
        composicaoPSintetico.abrirFiltro();
        //limpa a informações do filtro
        composicaoPSintetico.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, e o tipo de custo
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoComposicao('Padrão');
        composicaoPSintetico.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoCusto('Custo Médio Líquido Atual');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoSelecao('Lista');
        composicaoPSintetico.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));

        composicaoPSintetico.emitirRelatorio();

        expect(composicaoPSintetico.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Lista', () => expect(composicaoPSintetico.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Lista', () => expect(composicaoPSintetico.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Lista', () => expect(composicaoPSintetico.gerarRelatorioCSV()).toBe(true));   
    
    it('Composição Produto Por Loja (Sintético) - Por Intervalo', () => {
        //abre o filtro novamente
        composicaoPSintetico.abrirFiltro();
        //limpa a informações do filtro
        composicaoPSintetico.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja, e o tipo de custo
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoComposicao('Padrão');
        composicaoPSintetico.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoCusto('Custo Médio Líquido Atual');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPSintetico.selecionarTipoSelecao('Intervalo');
        composicaoPSintetico.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        composicaoPSintetico.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));

        composicaoPSintetico.emitirRelatorio();

        expect(composicaoPSintetico.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Intervalo', () => expect(composicaoPSintetico.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Intervalo', () => expect(composicaoPSintetico.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Intervalo', () => expect(composicaoPSintetico.gerarRelatorioCSV()).toBe(true));      
});