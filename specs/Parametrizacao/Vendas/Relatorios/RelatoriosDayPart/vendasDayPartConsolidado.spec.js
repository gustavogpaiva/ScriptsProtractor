var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var dayPart = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartConsolidado.po.js');
var loginPage = require('../../../../../page-objects/login.po.js');
var funcoes = require('../../../../../page-objects/helper.po.js');

describe('Testes da tela Vendas Day Part (Consolidado)',function(){
	//executa o login do sistema
	beforeAll(function(){
		loginPage.login();
		funcoes.tela('Day Part (Consolidado)');
		//browser.get(browser.params.applicationUrl+'/man/#/man#reports%2Fvnd03100_relDayPartConsolidado');
	});
	afterAll(function(){
		funcoes.fechaTela();
		funcoes.sairDoSistema();
	});
	//emite o relatório de daypart consolidado
    it('Emite DayPart (Consolidado)', function(){
        expect(dayPart.consolidado('0001', '001', '01/01/2018', '30/06/2018', '000000', '235900')).toBe(true);
    });
   
});