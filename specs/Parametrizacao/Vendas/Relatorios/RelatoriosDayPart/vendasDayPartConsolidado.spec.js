const dayPart = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartConsolidado.po.js');
const loginPage = require('../../../../../page-objects/login.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da tela Vendas Day Part (Consolidado)', () => {
	//executa o login do sistema
	beforeAll(() => {
		loginPage.login();
		h.tela('Day Part (Consolidado)');
	});

	afterAll(() => h.sairDoSistema());

	//emite o relatório de daypart consolidado
    it('Emite DayPart (Consolidado)', () => {
    	//limpa a informações do filtro
		dayPart.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
		dayPart.selecionarUnidade(j.getValor('filial'));
		dayPart.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
		browser.executeScript("$('div.zh-validation').remove();");
		dayPart.selecionarPeríodo(j.getValor('periodoComVenda'));
		dayPart.selecionarHoraIni('000000');//08:00:00
		dayPart.selecionarHoraFin('923595');//23:59:00
		//emite o relatório com as informações inseridas no filtro
		dayPart.emitirRelatorio();
		//verifica se após emitir o relatório o grid possui registros
        expect(dayPart.gridPossuiRegistros()).toBe(true);
	});
	
	it('Gerar relatório em PDF', () => expect(dayPart.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(dayPart.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(dayPart.gerarRelatorioCSV()).toBe(true));
});