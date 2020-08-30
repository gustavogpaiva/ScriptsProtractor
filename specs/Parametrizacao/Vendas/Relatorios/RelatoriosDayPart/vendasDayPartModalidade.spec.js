const dayPart = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartModalidade.po.js');
const loginPage = require('../../../../../page-objects/login.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da tela Vendas Day Part (Modalidade)', function(){
     //executa o login do sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Day Part (Modalidade)');
    });

    //sai do sistema após a execução dos it
    afterAll(() => h.sairDoSistema());

    //emite o relatório de daypart pelas modalidades
    it('Emite DayPart por Modalidade', () => {
        //limpa a informações do filtro
		dayPart.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, modalidade e o período
        dayPart.selecionarUnidade(j.getValor('filial'));
        dayPart.selecionarModalidade('Balcão', 'Comanda', 'Delivery', 'Mesa', 'Terminal de Auto-Atendimento');
        browser.executeScript("$('div.zh-validation').remove();");
		dayPart.selecionarPeríodo(j.getValor('periodoComVenda'));
        //emite o relatório com as informações inseridas no filtro
		dayPart.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(dayPart.gridPossuiRegistros()).toBe(true);
    });
    
    it('Gerar relatório em PDF', () => expect(dayPart.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(dayPart.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(dayPart.gerarRelatorioCSV()).toBe(true));

});