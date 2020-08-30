const loginPage = require('../../../../../page-objects/login.po.js');
const faturamentoGeral = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoDeliveryGeral.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Faturamento Delivery (Geral)', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Faturamento Delivery (Geral)');
    });

    afterAll(() => h.sairDoSistema());

    it('Faturamento Delivery (Geral) - Analítico', () => {
        //limpa a informações do filtro
        faturamentoGeral.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        faturamentoGeral.selecionarUnidade(j.getValor('filial'));
        faturamentoGeral.selecionarLoja(j.getValor('loja'));
        browser.executeScript("$('div.zh-validation').remove();");
        faturamentoGeral.selecionarPeríodo(j.getValor('periodoComVenda'));
        faturamentoGeral.selecionarModalidade();
        faturamentoGeral.selecionarTipoRelatorio('Analítico');
        //emite o relatório com as informações inseridas no filtro
        faturamentoGeral.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(faturamentoGeral.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(faturamentoGeral.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(faturamentoGeral.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(faturamentoGeral.gerarRelatorioCSV()).toBe(true));

    it('Faturamento Delivery (Geral) - Sintético', () => {
        //abre o filtro novamente
        faturamento.abrirFiltro();
        //limpa a informações do filtro
        faturamentoGeral.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        faturamentoGeral.selecionarUnidade(j.getValor('filial'));
        faturamentoGeral.selecionarLoja(j.getValor('loja'));
        browser.executeScript("$('div.zh-validation').remove();");
        faturamentoGeral.selecionarPeríodo(j.getValor('periodoComVenda'));
        faturamentoGeral.selecionarModalidade();
        faturamentoGeral.selecionarTipoRelatorio('Sintético');
        //emite o relatório com as informações inseridas no filtro
        faturamentoGeral.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(faturamentoGeral.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético', () => expect(faturamentoGeral.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(faturamentoGeral.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(faturamentoGeral.gerarRelatorioCSV()).toBe(true));    
});