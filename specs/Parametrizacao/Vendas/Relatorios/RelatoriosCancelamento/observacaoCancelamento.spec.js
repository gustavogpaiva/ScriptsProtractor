const observacaoCancelamento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/observacaoCancelamento.po.js');
const loginPage = require('../../../../../page-objects/login.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Observação de Cancelamento', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Observação de Cancelamento');
    });

    afterAll(() => h.sairDoSistema());
    //Só possui dados na base do giraffas
    it('Observação de Cancelamento', () => {
        //limpa a informações do filtro
        observacaoCancelamento.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        browser.executeScript("$('div.zh-validation').remove();");
        observacaoCancelamento.selecionarUnidade(j.getValor('filial'));
        observacaoCancelamento.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        observacaoCancelamento.selecionarPeríodo(j.getValor('periodoComVenda'));
        //emite o relatório com as informações inseridas no filtro
        observacaoCancelamento.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(observacaoCancelamento.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(observacaoCancelamento.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(observacaoCancelamento.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(observacaoCancelamento.gerarRelatorioCSV()).toBe(true));

});