var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var caixa = require('../../../../page-objects/Parametrizacao/Vendas/Caixa/cadastroDeCaixa.po.js');
var loginPage = require('../../../../page-objects/login.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela cadastro de caixa', function () {
	//realiza o login
	beforeEach(function () {
		loginPage.login();
		caixa.tela('Cadastro de Caixa');
	});
	//sai do sistema
	afterEach(function () {
	h.sairDoSistema();
	});

	//cadastra um novo caixa para uma loja da filial
	it('Cadastrar Caixa', function () {
		expect(caixa.cadastrarCaixa('0001', '001', '1', 'CAIXA RÁPIDO', 'Venda', 'Consumidor/Cliente', 'Venda Balcão', 'Cupom Fiscal (ECF)')).toBe(true);
	});

	//edita as informações de um caixa existente
	it('Editar Caixa', function () {
		expect(caixa.editarCaixa('0001', '001', '001', 'CAIXA RÁPIDO', 'Venda', 'Consumidor', 'Venda Balcão', 'NFC-e Consumidor (FNC)', '010')).toBe(true);
	});
	//inativa um caixa existente
	it('Inativar Caixa', function () {
		caixa.inativarCaixa('0001', '001', '032');
	});

	//parametriza um caixa existente
	it('Parametrizar Caixa', function () {
		caixa.parametrizarCaixa('0001', '001', '001');
		caixa.TEF('Utiliza TEF Dedicado', 'Não', 'Não', 'Não', 'Sitef', '', '', '00000000', 'CX000000', '127.0.0.1');
		browser.sleep('5000');
		caixa.frenteDeCaixa1('Não', 'Sim', 'Não', 'Sim', 'Sim', 'Sim', 'Volte Sempre', 'Sim', 'CODE39', 'Não', '1');
		browser.sleep('5000');
		caixa.frenteDeCaixa2('Utiliza Repique Automático', '10', '\"ICMS a ser recolhido conforme LC 123/2006 - Simples Nacional\"', 'Sim', 'Sim', 'Mensal', '140', 'Sim', '30', 'Não', 'Sim', 'Não');
		browser.sleep('5000');
		caixa.frenteDeCaixa3('Digitada', 'Sim', '1', 'Não', '192.168.120.62', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não');
		/*browser.sleep('5000');
		caixa.aberturaDeCaixa('Não', 'Não', 'Sim', 'Sim', '200', 'Recebedor/Coletor', 'Atualiza os dados sem emitir mensagem de confirmação');
		browser.sleep('3000');
		caixa.fechamentoDeCaixa('Sim', 'Sim', 'Sim', 'Não', 'Não', 'Sim', 'Não', 'Não', 'Não');
		browser.sleep('3000');
		caixa.exportacaoDeVendas('002');
		browser.sleep('3000');
		caixa.importacaoDeVendas('002');
		browser.sleep('3000');
		caixa.perifericos1('Não', '00001', '00001', '00001', '00001', '00001', '00001');
		browser.sleep('3000');
		caixa.perifericos2('Toledo Contínua', 'COM1', '9600', 'Radiant', 'COM2', 'Bematech', 'Leitor TRIX', 'COM5', '115200', 'Sim', '1', '7', '', '', '8', '13');
		browser.sleep('3000');
		caixa.vendedoresAssociados('0100');*/
	});
});