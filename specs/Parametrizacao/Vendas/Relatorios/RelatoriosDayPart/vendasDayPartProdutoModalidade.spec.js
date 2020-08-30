const dayPart = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartProdutoModalidade.po.js');
const loginPage = require('../../../../../page-objects/login.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da tela Vendas Day Part (Produto por Modalidade)', () => {
	//executa o login do sistema
	beforeAll(() => {
		loginPage.login();
        h.tela('Day Part (Produto por Modalidade)');
	});

	afterAll(() => h.sairDoSistema());

    //emite o relatório de daypart por produto das modalidades
	it('Emite DayPart (Produto por Modalidade)', () => {
		//limpa a informações do filtro
		dayPart.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, modalidade e o período
        dayPart.selecionarUnidade(j.getValor('filial'));
		dayPart.selecionarModalidade('Balcão', 'Comanda', 'Delivery', 'Mesa', 'Terminal de Auto-Atendimento');
		browser.executeScript("$('div.zh-validation').remove();");
		dayPart.selecionarPeríodo(j.getValor('periodoComVenda'));
		dayPart.selecionarProdInicial(j.getValor('produtoInicialcadLoja'));
		dayPart.selecionarProdFinal(j.getValor('produtoFinalcadLoja'));
		//emite o relatório com as informações inseridas no filtro
		dayPart.emitirRelatorio();
		//verifica se após emitir o relatório o grid possui registros
        expect(dayPart.gridPossuiRegistros()).toBe(true);
	});

	it('Gerar relatório em PDF', () => expect(dayPart.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS', () => expect(dayPart.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV', () => expect(dayPart.gerarRelatorioCSV()).toBe(true));
});