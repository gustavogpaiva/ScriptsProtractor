const loginPage = require('../../../../../page-objects/login.po.js');
const vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/consolidacaoVendasPendente.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Consolidação de Vendas Pendente', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Consolidação de Vendas Pendente');
    });

    afterAll(() => h.sairDoSistema());

    it('Consolidação de Vendas Pendente', () => {
        //limpa a informações do filtro
        vendas.limparFiltro();

        vendas.selecionarUnidade(j.getValor('filial'));
        vendas.selecionarCaixa(j.getValor('nmcaixa'));
        vendas.selecionarPeríodo(j.getValor('periodoComVenda'));
        //emite o relatório com as informações inseridas no filtro
        vendas.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendas.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(vendas.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(vendas.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(vendas.gerarRelatorioCSV()).toBe(true));

});