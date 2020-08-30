const loginPage = require('../../../../../page-objects/login.po.js');
const promocao = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/promocaoCombinadaAnalitico.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Promoção Combinada (Sintética)', () => {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Promoção Combinada (Analítico)');
    });

    afterAll(() => h.sairDoSistema());

    it('Promoção Combinada (Analítico) - Por Intervalo', () => {

        promocao.limparFiltro();

        promocao.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        promocao.selecionarPeríodo(j.getValor('periodoComVenda'));
        promocao.selecionarTipoSelecao('Intervalo');
        promocao.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        promocao.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));

        promocao.emitirRelatorio();

        expect(promocao.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Intervalo', () => expect(promocao.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Intervalo', () => expect(promocao.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Intervalo', () => expect(promocao.gerarRelatorioCSV()).toBe(true));

    it('Promoção Combinada (Analítico) - Por Lista', () => {

        promocao.abrirFiltro();
        promocao.limparFiltro();

        promocao.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        promocao.selecionarPeríodo(j.getValor('periodoComVenda'));
        promocao.selecionarTipoSelecao('Lista');
        promocao.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        promocao.emitirRelatorio();

        expect(promocao.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Lista', () => expect(promocao.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Lista', () => expect(promocao.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Lista', () => expect(promocao.gerarRelatorioCSV()).toBe(true));  
    
    it('Promoção Combinada (Analítico) - Por Nível', () => {

        promocao.abrirFiltro();
        promocao.limparFiltro();

        promocao.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        promocao.selecionarPeríodo(j.getValor('periodoComVenda'));
        promocao.selecionarTipoSelecao('Nível');
        promocao.definirNivel(j.getValor('nivelProdutos'));
        promocao.emitirRelatorio();

        expect(promocao.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Por Nível', () => expect(promocao.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Por Nível', () => expect(promocao.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Por Nível', () => expect(promocao.gerarRelatorioCSV()).toBe(true));        
});