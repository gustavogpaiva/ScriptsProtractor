var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var dayPart = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPart.po.js');
var paramUnidade = require('../../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/parametrosUnidade_vnd08600.po.js');
var loginPage = require('../../../../../page-objects/login.po.js');
var funcoes = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

fdescribe('Testes da tela Vendas Day Part', function(){
	//executa o login o sistema
	beforeAll(function(){
		loginPage.login();
        funcoes.tela('Day Part');
	});
    
    /*sai do sistema após a execução dos it
    afterAll(function(){
    	funcoes.fechaTela();
    	funcoes.sairDoSistema();
    });*/

    //emite o relatorio daypart exibindo os registros no grid
    fit('Emite DayPart', function(){
        expect(dayPart.vendasDayPart(j.getValor('cdfilial'), j.getValor('periodoComVenda'))).toBe(true);
    });

});