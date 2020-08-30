const loginPage = require('../../../../../page-objects/login.po.js');
const faturamento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoDeliveryDia.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Faturamento Delivery (Por Dia)', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Faturamento Delivery (Por Dia)');
    });

    afterAll(() => h.sairDoSistema());

    it('Faturamento Delivery (Por Dia) - Analítico', () => {
        //limpa a informações do filtro
        faturamento.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, operador e o período
        faturamento.selecionarUnidade(j.getValor('filial'));
        faturamento.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        faturamento.selecionarPeríodo(j.getValor('periodoComVenda'));
        faturamento.selecionarTipoRelatorio('Analítico');
        faturamento.selecionarModalidade();
        //emite o relatório com as informações inseridas no filtro
        faturamento.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(faturamento.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(faturamento.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(faturamento.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(faturamento.gerarRelatorioCSV()).toBe(true));

    it('Faturamento Delivery (Por Dia) - Sintético', () => {
        //abre o filtro novamente
        faturamento.abrirFiltro();
        //limpa a informações do filtro
        faturamento.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, operador e o período
        faturamento.selecionarUnidade(j.getValor('filial'));
        faturamento.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        faturamento.selecionarPeríodo(j.getValor('periodoComVenda'));
        faturamento.selecionarTipoRelatorio('Sintético');
        faturamento.selecionarModalidade();
        //emite o relatório com as informações inseridas no filtro
        faturamento.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(faturamento.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético', () => expect(faturamento.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(faturamento.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(faturamento.gerarRelatorioCSV()).toBe(true));    
});