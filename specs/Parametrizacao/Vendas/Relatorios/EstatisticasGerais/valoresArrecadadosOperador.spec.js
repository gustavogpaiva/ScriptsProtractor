const loginPage = require('../../../../../page-objects/login.po.js');
const operadorArrec = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/valoresArrecadadosOperador.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Valores Arrecadados Por Operador', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Valores Arrecadados por Operador');
    });

    afterAll(() => h.sairDoSistema());

    it('Valores Arrecadados por Operador', () => {
        //limpa a informações do filtro
        operadorArrec.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, operador e o período
        browser.executeScript("$('div.zh-validation').remove();");
        operadorArrec.selecionarUnidade(j.getValor('filial'));
        operadorArrec.selecionarOperador(j.getValor('operador'));
        browser.executeScript("$('div.zh-validation').remove();");
        operadorArrec.selecionarPeríodo(j.getValor('periodoComVenda'));
        //emite o relatório com as informações inseridas no filtro
        operadorArrec.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(operadorArrec.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF', () => expect(operadorArrec.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(operadorArrec.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(operadorArrec.gerarRelatorioCSV()).toBe(true));

});