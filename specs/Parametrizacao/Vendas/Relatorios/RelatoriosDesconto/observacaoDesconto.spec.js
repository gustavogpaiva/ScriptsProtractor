const loginPage = require('../../../../../page-objects/login.po.js');
const obsDesconto = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDesconto/observacaoDesconto.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Observação de Desconto', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Observação de Desconto');
    });

    afterAll(() => h.sairDoSistema());
    //Só possui dados na base do giraffas
    it('Observação de Desconto', () => {
        obsDesconto.limparFiltro();
        obsDesconto.selecionarUnidade(j.getValor('filial'));
        obsDesconto.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        obsDesconto.selecionarPeríodo(j.getValor('periodoComVenda'));
        obsDesconto.emitirRelatorio();
        expect(obsDesconto.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(obsDesconto.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(obsDesconto.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(obsDesconto.gerarRelatorioCSV()).toBe(true));
});