const loginPage = require('../../../../../page-objects/login.po.js');
const vendaHora = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasHora.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas por Hora (Consolidado)', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Vendas por Hora (Consolidado)');
    });

    afterAll(() => h.sairDoSistema());

    it('Vendas por Hora (Consolidado)', () => {
        
        vendaHora.limparFiltro();

        browser.executeScript("$('div.zh-validation').remove();");
        vendaHora.selecionarUnidade(j.getValor('filial'));
        vendaHora.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        vendaHora.selecionarData(j.getValor('periodoComVenda'));
        vendaHora.selecionarHorarioIni('0000');
        vendaHora.selecionarHorarioFin('2359');
        vendaHora.emitirRelatorio();

        expect(vendaHora.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(vendaHora.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(vendaHora.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(vendaHora.gerarRelatorioCSV()).toBe(true));
});