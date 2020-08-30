const loginPage = require('../../../../../page-objects/login.po.js');
const relaCuponsSatNfce = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/relacaoCuponsSatNfce.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Relação Cupons SAT/NFC-e', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Relação Cupons SAT/NFC-e');
    });

    afterAll(() => h.sairDoSistema());

    it('Relação Cupons SAT/NFC-e', () => {

        relaCuponsSatNfce.limparFiltro();

        relaCuponsSatNfce.selecionarUnidade(j.getValor('filial'));
        relaCuponsSatNfce.selecionarCaixa(/*j.getValor('nmcaixa')*/);
        browser.executeScript("$('div.zh-validation').remove();");
        relaCuponsSatNfce.selecionarDataMovimento(j.getValor('periodoComVenda'));
        relaCuponsSatNfce.selecionarSituacaoNota('Pendente', 'Rejeitada', 'Transmitida', 'Aceita', 'Uso Denegado', 'Cancelada');
        relaCuponsSatNfce.selecionarAmbiente('Homologação');
        relaCuponsSatNfce.selecionarModoOperacaoNota('Emissão Normal', 'Emissão Contigência Offline');
        relaCuponsSatNfce.selecionarSituacaoVenda('Venda Concluída', 'Venda Cancelada');

        relaCuponsSatNfce.emitirRelatorio();
        
        expect(relaCuponsSatNfce.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(relaCuponsSatNfce.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(relaCuponsSatNfce.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(relaCuponsSatNfce.gerarRelatorioCSV()).toBe(true));

});