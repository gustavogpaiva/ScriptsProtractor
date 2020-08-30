var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var manage = require('../../../../page-objects/Parametrizacao/Vendas/Caixa/cadastroDeCaixa.po.js');
var loginPage = require('../../../../page-objects/login.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela cadastro de caixa', function(){

	//realiza o login
    beforeAll(function(){
    	loginPage.login('manage@teknisa.com','teknisa1');
    	h.tela('Cadastro de Caixa');
    });

	//cadastra um novo caixa para uma loja da filial
	it('Cadastrar Caixa', function(){
		expect(manage.cadastrarCaixa('0001', '001', '1', 'CAIXA RÁPIDO', 'Venda', 'Consumidor/Cliente', 'Venda Balcão', 'Cupom Fiscal (ECF)')).toBe(true);
	});
	
	//edita as informações de um caixa existente
	it('Editar Caixa',function(){
		expect(manage.editarCaixa('0001', '001', '001', 'CAIXA RÁPIDO', 'Venda', 'Consumidor', 'Venda Balcão', 'NFC-e Consumidor (FNC)', '010')).toBe(true);
	});

	//inativa um caixa existente
	it('Inativar Caixa',function(){
		expect(manage.inativarCaixa('0001', '001', '032')).toBe('Caixa inativado com sucesso.');
	});

	//parametriza um caixa existente
	fit('Parametrizar TEF', function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.TEF('Utiliza TEF Dedicado', 'Não', 'Não', 'Não', 'Sitef', '', '', '00000000', 'CX000000', '127.0.0.1')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Frente de caixa 1',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.frenteDeCaixa1('Não', 'Sim', 'Não', 'Sim', 'Sim', 'Sim', 'Volte Sempre', 'Sim', 'CODE39','Não', '1')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Frente de caixa 2',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.frenteDeCaixa2('Utiliza Repique Automático','10','\"ICMS a ser recolhido conforme LC 123/2006 - Simples Nacional\"','Sim','Sim','Mensal','140','Sim','30','Não','Sim','Não')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Frente de caixa 3',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.frenteDeCaixa3('Digitada', 'Sim', '1', 'Não', '192.168.120.62', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Abertura de caixa',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.aberturaDeCaixa('Não', 'Não', 'Sim', 'Sim', '200', 'Recebedor/Coletor', 'Atualiza os dados sem emitir mensagem de confirmação')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Fechamento de caixa',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.fechamentoDeCaixa('Sim', 'Sim', 'Sim', 'Não', 'Não', 'Sim', 'Não', 'Não', 'Não')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Exportacao de vendas',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.exportacaoDeVendas('002')).toBe('Exportação realizada com sucesso!');
	});

	it('Parametrizar Importacao de vendas',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.importacaoDeVendas('002')).toBe('Importação realizada com sucesso!');
	});

	it('Parametrizar Periféricos 1',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.perifericos1('Não', '00001', '00001', '00001', '00001', '00001', '00001')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Periféricos 2', function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.perifericos2('Toledo Contínua', 'COM1', '9600', 'Radiant', 'COM2', 'Bematech', 'Leitor TRIX', 'COM5', '9600', 'Sim', '1', '7', '', '', '8', '13')).toBe('Operação realizada com sucesso.');
	});

	it('Parametrizar Vendedores Associados',function(){
		manage.parametrizarCaixa('0001','001','001');
		expect(manage.vendedoresAssociados('0100')).toBe('Vendedores relacionados com sucesso!');
	});
});