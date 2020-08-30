var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var cadastro = require('../../../../page-objects/Parametrizacao/Vendas/Loja/cadastroLoja2.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Loja', function () {
	beforeEach(function () {
		loginPage.login();
		h.tela('Cadastro de Loja');
	});
	
	afterEach(function () {
		h.sairDoSistema();
	});
	
	//cadastra uma nova loja para unidade
	it('Cadastrar Loja', function () {
		h.filtro();
		cadastro.cadastrarLoja();
		cadastro.cadastrarImpressora();
		expect(z.component.alert.isVisible()).toBe(false);
	});
	
	it('Editar Nome da Loja', function () {
		h.filtro();
		cadastro.alterar();
		cadastro.parametros();
		expect(z.component.alert.isVisible()).toBe(false);
	});
	
	it('Desativar Cadastro de Loja', function () {
		expect(cadastro.apagar()).toContain('Loja Desativada com Sucesso');
	});
	
	it('Tentar realizar o cadastro sem código', function () {
		h.filtro();
		expect(cadastro.cadastroSemCodigo()).toContain('Todos os campos obrigatórios devem ser preenchidos!');
	});
	
	it('Tentar realizar cadastro com código já existente', function () {
		h.filtro();
		expect(cadastro.cadastroExistente()).toContain('Esse código já existe!');
		
	});
	
});