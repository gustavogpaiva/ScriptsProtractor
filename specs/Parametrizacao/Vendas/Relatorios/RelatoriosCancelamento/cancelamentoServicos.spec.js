const loginPage = require('../../../../../page-objects/login.po.js');
const cancelServicos = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoServicos.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Cancelamento de Serviços', ()  => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Cancelamento de Serviço');
    });

    afterAll(() => h.sairDoSistema());

    it('Cancelamento de Serviços', () => {

        cancelServicos.limparFiltro();
        
        cancelServicos.selecionarUnidade(j.getValor('filial'));
        cancelServicos.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        cancelServicos.selecionarPeríodo(j.getValor('periodoComVenda'));
        cancelServicos.selecionarVendedor(j.getValor('nomeGarcom'));

        cancelServicos.emitirRelatorio();

        expect(cancelServicos.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(cancelServicos.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(cancelServicos.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(cancelServicos.gerarRelatorioCSV()).toBe(true));
});