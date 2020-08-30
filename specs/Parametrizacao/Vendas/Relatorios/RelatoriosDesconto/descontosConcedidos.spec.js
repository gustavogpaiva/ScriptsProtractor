const loginPage = require('../../../../../page-objects/login.po.js');
const descConcedidos = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDesconto/descontosConcedidos.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Descontos Concedidos', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Descontos Concedidos');
    });

    afterAll(() => h.sairDoSistema());

    it('Descontos Concedidos - Analítico', () => {
        
        descConcedidos.limparFiltro();

        descConcedidos.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        descConcedidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        descConcedidos.selecionarTipoRelatorio('Analítico');

        descConcedidos.emitirRelatorio();

        expect(descConcedidos.gridPossuiRegistros()).toBe(true);

    });

    it('Gerar relatório em PDF - Analítico', () => expect(descConcedidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(descConcedidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(descConcedidos.gerarRelatorioCSV()).toBe(true));

    it('Descontos Concedidos - Sintético', () => {
        
        descConcedidos.abrirFiltro();
        descConcedidos.limparFiltro();

        descConcedidos.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        descConcedidos.selecionarPeríodo(j.getValor('periodoComVenda'));
        descConcedidos.selecionarTipoRelatorio('Sintético');

        descConcedidos.emitirRelatorio();

        expect(descConcedidos.gridPossuiRegistros()).toBe(true);

    });

    it('Gerar relatório em PDF - Sintético', () => expect(descConcedidos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(descConcedidos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(descConcedidos.gerarRelatorioCSV()).toBe(true));    
});