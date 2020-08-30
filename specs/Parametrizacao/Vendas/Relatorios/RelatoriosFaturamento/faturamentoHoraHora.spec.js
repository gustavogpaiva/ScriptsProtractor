const loginPage = require('../../../../../page-objects/login.po.js');
const faturamento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoHoraHora.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Faturamento Hora Hora', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Faturamento Hora Hora');
    });

    afterAll(() => h.sairDoSistema());

    it('Faturamento Hora Hora - Analítico', () => {
        //limpa a informações do filtro
        faturamento.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, período e a hora inicial e hora final
        browser.executeScript("$('div.zh-validation').remove();");        
		faturamento.selecionarUnidade(j.getValor('filial'));
		faturamento.selecionarData(j.getValor('periodoComVenda'));
        browser.executeScript("$('div.zh-validation').remove();"); 
		faturamento.selecionarHoraIni('0000');//08:00
        faturamento.selecionarHoraFin('9235');//23:59
        faturamento.selecionarTipoRelatorio('Analítico');
        //emite o relatório com as informações inseridas no filtro
		faturamento.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(faturamento.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(faturamento.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(faturamento.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(faturamento.gerarRelatorioCSV()).toBe(true));

    it('Faturamento Hora Hora - Sintético', () => {
        //abre o filtro novamente
        faturamento.abrirFiltro();
        //limpa a informações do filtro
        faturamento.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, período e a hora inicial e hora final
        browser.executeScript("$('div.zh-validation').remove();");        
        faturamento.selecionarUnidade(j.getValor('filial'));
        faturamento.selecionarData(j.getValor('periodoComVenda'));
        browser.executeScript("$('div.zh-validation').remove();"); 
        faturamento.selecionarHoraIni('0000');//08:00
        faturamento.selecionarHoraFin('9235');//23:59
        faturamento.selecionarTipoRelatorio('Sintético');
        //emite o relatório com as informações inseridas no filtro
        faturamento.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(faturamento.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético', () => expect(faturamento.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(faturamento.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(faturamento.gerarRelatorioCSV()).toBe(true));    
});