const loginPage = require('../../../../../page-objects/login.po.js');
const vendasTipoRecebimento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/vendasTipoRecebimento.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas por Tipo de Recebimento', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Vendas por Tipo de Recebimento');
    });

    afterAll(() => h.sairDoSistema());

    it('Vendas por Tipo de Recebimento - Analítico', () => {
        
        vendasTipoRecebimento.limparFiltro();

        vendasTipoRecebimento.selecionarUnidade(j.getValor('filial'));
        vendasTipoRecebimento.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        vendasTipoRecebimento.selecionarPeriodo(j.getValor('periodoComVenda'));
        vendasTipoRecebimento.selecionarTipoRelatorio('Analítico');

        vendasTipoRecebimento.emitirRelatorio();

        expect(vendasTipoRecebimento.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(vendasTipoRecebimento.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(vendasTipoRecebimento.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(vendasTipoRecebimento.gerarRelatorioCSV()).toBe(true));

    it('Vendas por Tipo de Recebimento - Sintetico', () => {
        
        vendasTipoRecebimento.abrirFiltro();
        vendasTipoRecebimento.limparFiltro();

        vendasTipoRecebimento.selecionarUnidade(j.getValor('filial'));
        vendasTipoRecebimento.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        vendasTipoRecebimento.selecionarPeriodo(j.getValor('periodoComVenda'));
        vendasTipoRecebimento.selecionarTipoRelatorio('Sintético');

        vendasTipoRecebimento.emitirRelatorio();

        expect(vendasTipoRecebimento.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintetico', () => expect(vendasTipoRecebimento.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintetico', () => expect(vendasTipoRecebimento.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintetico', () => expect(vendasTipoRecebimento.gerarRelatorioCSV()).toBe(true));    
});