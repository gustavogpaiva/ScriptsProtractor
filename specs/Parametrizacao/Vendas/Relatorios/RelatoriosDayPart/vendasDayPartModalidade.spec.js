var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var dayPart = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosDayPart/vendasDayPartModalidade.po.js');
var loginPage = require('../../../../../page-objects/login.po.js');
var funcoes = require('../../../../../page-objects/helper.po.js');

describe('Testes da tela Vendas Day Part (Modalidade)', function(){
     //executa o login do sistema
    beforeAll(function(){
        loginPage.login();
        funcoes.tela('Day Part (Modalidade)');
    });
    //sai do sistema após a execução dos it
    afterAll(function(){
    	funcoes.fechaTela();
    	funcoes.sairDoSistema();
    });
    //emite o relatório de daypart pelas modalidades
    it('Emite DayPart por Modalidade', async function(){
        expect(await dayPart.modalidade('0001','01/01/2018','30/06/2018','todos')).toBe(true);
    });

});