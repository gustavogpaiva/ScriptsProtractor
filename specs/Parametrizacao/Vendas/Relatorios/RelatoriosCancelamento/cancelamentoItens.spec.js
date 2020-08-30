const loginPage = require('../../../../../page-objects/login.po.js');
const cancelamentoItens = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoItens.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Cancelamento de Itens', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Cancelamento de Itens');
    });

    afterAll(() => h.sairDoSistema());

    it('Cancelamento de Itens - Analítico', () => {
        
        cancelamentoItens.limparFiltro();
        
        cancelamentoItens.selecionarUnidade(j.getValor('filial'));
        cancelamentoItens.selecionarLoja(j.getValor('loja'));
        browser.executeScript("$('div.zh-validation').remove();");
        cancelamentoItens.selecionarPeríodo(j.getValor('periodoComVenda'));
        cancelamentoItens.selecionarSituacao('Produzido','Não produzido');
        cancelamentoItens.selecionarTipoRelatorio('Analítico');

        cancelamentoItens.emitirRelatorio();

        expect(cancelamentoItens.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(cancelamentoItens.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(cancelamentoItens.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(cancelamentoItens.gerarRelatorioCSV()).toBe(true));

    it('Cancelamento de Itens - Sintético', () => {
        
        cancelamentoItens.abrirFiltro();
        cancelamentoItens.limparFiltro();
        
        cancelamentoItens.selecionarUnidade(j.getValor('filial'));
        cancelamentoItens.selecionarLoja(j.getValor('loja'));
        browser.executeScript("$('div.zh-validation').remove();");
        cancelamentoItens.selecionarPeríodo(j.getValor('periodoComVenda'));
        cancelamentoItens.selecionarSituacao('Produzido','Não produzido');
        cancelamentoItens.selecionarTipoRelatorio('Sintético');

        cancelamentoItens.emitirRelatorio();

        expect(cancelamentoItens.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético', () => expect(cancelamentoItens.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(cancelamentoItens.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(cancelamentoItens.gerarRelatorioCSV()).toBe(true));    
});