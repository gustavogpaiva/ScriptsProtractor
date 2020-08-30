const loginPage = require('../../../../../page-objects/login.po.js');
const composicaoPNivel = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoNivelUnico.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Composição Produto Nível Unico', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Composição de Produto (Nível Único)');
    });

    afterAll(() => h.sairDoSistema());

    it('Composição Produto Por Nível Unico - Nível', () => {
        composicaoPNivel.limparFiltro();
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoComposicao('Padrão');
        composicaoPNivel.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoCusto('Custo Médio Líquido Atual');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoSelecao('Nível');
        composicaoPNivel.definirNivel(j.getValor('nivelProdutos'));
        composicaoPNivel.emitirRelatorio();
        expect(composicaoPNivel.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Nível', () => expect(composicaoPNivel.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Nível', () => expect(composicaoPNivel.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Nível', () => expect(composicaoPNivel.gerarRelatorioCSV()).toBe(true));

    it('Composição Produto Por Nível Unico - Lista', () => {
        //abre o filtro novamente
        composicaoPNivel.abrirFiltro();
        composicaoPNivel.limparFiltro();
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoComposicao('Padrão');
        composicaoPNivel.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoCusto('Custo Médio Líquido Atual');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoSelecao('Lista');
        composicaoPSintetico.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        composicaoPNivel.emitirRelatorio();
        expect(composicaoPNivel.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Lista', () => expect(composicaoPNivel.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Lista', () => expect(composicaoPNivel.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Lista', () => expect(composicaoPNivel.gerarRelatorioCSV()).toBe(true));    

    it('Composição Produto Por Nível Unico - Intervalo', () => {
        //abre o filtro novamente
        composicaoPNivel.abrirFiltro();
        composicaoPNivel.limparFiltro();
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoComposicao('Padrão');
        composicaoPNivel.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoCusto('Custo Médio Líquido Atual');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoSelecao('Intervalo');
        composicaoPNivel.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        composicaoPNivel.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        composicaoPNivel.emitirRelatorio();
        expect(composicaoPNivel.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Intervalo', () => expect(composicaoPNivel.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Intervalo', () => expect(composicaoPNivel.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Intervalo', () => expect(composicaoPNivel.gerarRelatorioCSV()).toBe(true));        
});