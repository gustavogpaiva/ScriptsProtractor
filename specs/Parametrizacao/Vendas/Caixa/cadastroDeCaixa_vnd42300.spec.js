var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var manage = require('../../../../page-objects/Parametrizacao/Vendas/Caixa/cadastroDeCaixa.po.js');
var loginPage = require('../../../../page-objects/login.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela cadastro de caixa', function(){

	//realiza o login
    beforeAll(function(){
    	loginPage.login();
    	h.tela('Cadastro de Caixa');
    });

    //sai do sistema após execução dos it's
    afterAll(function(){
    	h.sairDoSistema();
    });

	//cadastra um novo caixa para uma loja da filial
	it('Cadastrar Caixa', function(){
		expect(manage.cadastrarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'), j.getValor('nmcaixa'), 'Venda', 'Consumidor/Cliente', 'Venda Balcão', 'Cupom Fiscal (ECF)')).toBe(true);
	});
	
	//edita as informações de um caixa existente
	it('Editar Caixa',function(){
		expect(manage.editarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'), j.getValor('nmcaixa'), 'Venda', 'Consumidor', 'Venda Balcão', 'NFC-e Consumidor (FNC)')).toBe(true);
	});

	//inativa um caixa existente
	xit('Inativar Caixa',function(){
		expect(manage.inativarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), '032')).toBe('Caixa inativado com sucesso.');
	});

	//parametriza um caixa existente
	it('Parametrizar TEF', function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.TEF('Utiliza TEF Dedicado', 'Não', 'Não', 'Não', 'Sitef', '', '', '00000000', 'CX000000', '127.0.0.1');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Frente de caixa 1',function(){
		manage.parametrizarCaixa('0001','001','001');
		manage.frenteDeCaixa1('Não', 'Sim', 'Não', 'Sim', 'Sim', 'Sim', 'Volte Sempre', 'Sim', 'CODE39','Não', '1');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Frente de caixa 2',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.frenteDeCaixa2('Utiliza Repique Automático','10','\"ICMS a ser recolhido conforme LC 123/2006 - Simples Nacional\"','Sim','Sim','Mensal','140','Sim','30','Não','Sim','Não');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');		
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Frente de caixa 3',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.frenteDeCaixa3('Digitada', 'Sim', '1', 'Não', '192.168.120.62', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não', 'Não');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Abertura de caixa',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.aberturaDeCaixa('Não', 'Não', 'Sim', 'Sim', '200', 'Recebedor/Coletor', 'Atualiza os dados sem emitir mensagem de confirmação');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Fechamento de caixa',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.fechamentoDeCaixa('Sim', 'Sim', 'Sim', 'Não', 'Não', 'Sim', 'Não', 'Não', 'Não');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Exportacao de vendas',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.exportacaoDeVendas('002');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Exportação realizada com sucesso!');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Importacao de vendas',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.importacaoDeVendas('002');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Importar');
		expect(h.notificacao()).toBe('Importação realizada com sucesso!');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Periféricos 1',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.perifericos1('Não', '00001', '00001', '00001', '00001', '00001', '00001');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Periféricos 2', function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.perifericos2('Toledo Contínua', 'COM1', '9600', 'Radiant', 'COM2', 'Bematech', 'Leitor TRIX', 'COM5', '9600', 'Sim', '1', '7', '', '', '8', '13');
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		expect(h.notificacao()).toBe('Operação realizada com sucesso.');
		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');
	});

	it('Parametrizar Vendedores Associados',function(){
		manage.parametrizarCaixa(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('cdcaixa'));
		manage.vendedoresAssociados('0100');
		expect(h.notificacao()).toBe('Vendedores relacionados com sucesso!');
	});
});