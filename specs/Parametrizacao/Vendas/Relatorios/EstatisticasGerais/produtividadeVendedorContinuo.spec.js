const loginPage = require('../../../../../page-objects/login.po.js');
const produtividadeVendCont = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/produtividadeVendedorContinuo.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Produtividade por Vendedor(Continuo)', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Produtividade por Vendedor (Contínuo)');
    });

    afterAll(() => h.sairDoSistema());

    it('Produtividade por Vendedor(Continuo)', () => {
        produtividadeVendCont.limparFiltro();
        produtividadeVendCont.selecionarUnidade(j.getValor('filial'));
        produtividadeVendCont.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        produtividadeVendCont.selecionarPeríodo(j.getValor('periodoComVenda'));
        produtividadeVendCont.selecionarAberturaCaixa(j.getValor('aberturaCaixa'));
        produtividadeVendCont.selecionarVendedor(j.getValor('nomeGarcom'));
        produtividadeVendCont.emitirRelatorio();
        expect(produtividadeVendCont.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(produtividadeVendCont.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(produtividadeVendCont.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(produtividadeVendCont.gerarRelatorioCSV()).toBe(true));
});