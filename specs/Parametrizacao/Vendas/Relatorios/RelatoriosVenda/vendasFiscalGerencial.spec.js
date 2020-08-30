const loginPage = require('../../../../../page-objects/login.po.js');
const vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasFiscalGerencial.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas Fiscais X Gerenciais', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Vendas Fiscal X Gerencial');
    });

    afterAll(() => h.sairDoSistema());

    it('Vendas Fiscal X Gerencial', () => {
        
        vendas.limparFiltro();

        vendas.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));

        vendas.emitirRelatorio();

        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(vendas.gerarRelatorioCSV()).toBe(true));
});