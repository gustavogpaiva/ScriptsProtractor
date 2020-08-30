const loginPage = require('../../../../../page-objects/login.po.js');
const cancelCupom = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoCupom.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Cancelamento de Cupom', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Cancelamento de Cupom');
    });

    afterAll(() => h.sairDoSistema());

    it('Cancelamento de Cupom', () => {
        //limpa a informações do filtro
        cancelCupom.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, caixa e o período
        cancelCupom.selecionarUnidade(j.getValor('filial'));
        cancelCupom.selecionarCaixa();
        browser.executeScript("$('div.zh-validation').remove();");
        cancelCupom.selecionarPeríodo(j.getValor('periodoComVenda'));
        //emite o relatório com as informações inseridas no filtro
        cancelCupom.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(cancelCupom.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(cancelCupom.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(cancelCupom.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(cancelCupom.gerarRelatorioCSV()).toBe(true));

});