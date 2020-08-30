var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../json/leitorJson.po.js');

var login = function () {

    var self = this;
    
    this.login = function () {

        //se não tiver esse comando, os testes irão dar erro de data(white page)
        browser.get(browser.params.applicationUrl); 
        
        //maximiza a janela
        browser.driver.manage().window().maximize();

        //envia para o formulário de login o usuário e a senha
        z.field.fieldFunctions.fill('USER', j.getValor('login'));
        z.field.fieldFunctions.fill('PASSWORD', j.getValor('senha'));
        z.util.clickElement(by.id('SUBMIT'));
        
    };
};
module.exports = new login();