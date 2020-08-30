var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var conferencia = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/conferenciaCaixa.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Conferência de Caixa', function(){
	beforeAll(function(){
		loginPage.login();
		h.tela('Conferência de Caixa');
	});

	beforeEach(function(){
		conferencia.filtrarConferencia(j.getValor('dataConferencia'));
	});

	afterAll(function(){
		h.sairDoSistema();
	});

	it('Exibir a conferência do caixa', function(){
		expect(conferencia.exibirConferencia()).toBe(true);
	});

	it('Verificar as diferênças da sangria e do sistema e o valor da conferência', function(){
		expect(conferencia.verificarDiferencas()).toBe(true);
	});

	it('Confirmar a conferência do caixa', function(){
		expect(conferencia.confirmarConferencia()).toBe(true);
	});

	it('Gerar relatório em PDF', function(){
		expect(conferencia.gerarRelatorioPDF()).toBe(true);
	});

	it('Gerar relatório em XLS', function(){
		expect(conferencia.gerarRelatorioXLS()).toBe(true);
	});

	it('Gerar relatório em CSV', function(){
		expect(conferencia.gerarRelatorioCSV()).toBe(true);
	});
});