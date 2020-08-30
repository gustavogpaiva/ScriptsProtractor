var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var dayPart = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartProdutoModalidade.po.js');
var loginPage = require('../../../../../page-objects/login.po.js');
var funcoes = require('../../../../../page-objects/helper.po.js');

describe('Testes da tela Vendas Day Part (Produto por Modalidade)', function(){
	//executa o login do sistema
	beforeAll(function(){
		loginPage.login();
        funcoes.tela('Day Part (Produto por Modalidade)');
		//browser.get(browser.params.applicationUrl+'/man/#/man#reports%2Fvnd03102_relDaypartProdutoModalidade');
	});
	afterAll(function(){
		funcoes.fechaTela();
		funcoes.sairDoSistema();
	});
    //emite o relatório de daypart por produto das modalidades
    it('Emite DayPart (Produto por Modalidade)', function(){
        expect(dayPart.modalidade('0001','01/01/2018', '30/06/2018', 'todos')).toBe(true);
    });

});