var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var moment = require('moment');


var calSaldos = function () {
    
    var self = this;
    var today = moment().format('DD/MM/YYYY');
    
    this.calcularSaldos = function (filial, cliente, data, hora, infConsumidor, tipoConsumidor,consumidor) {
        //Informa Unidade
        z.field.fieldFunctions.click('NMFILIAL');
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));
        inputPesquisa.sendKeys(filial);
        z.widget.grid.rowExists('NMFILIAL', filial , '9009').then(function(existeCliente){
            if (existeCliente) {
                z.widget.grid.click('NMFILIAL', filial , '9009');
                console.log('Filial Encontrado');
            }
            else {
               console.log('Filial não encontrado');
            }
        });
        // Informa Cliente
        browser.sleep(2000);
        z.field.fieldFunctions.click('NMFANTCLIE');
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));
        inputPesquisa.sendKeys(cliente);
        z.widget.grid.rowExists('NMFANTCLIE', cliente , '9999').then(function(existeCliente){
            if (existeCliente) {
                z.widget.grid.click('NMFANTCLIE', cliente , '9999');
                z.component.footer.clickRightActionByLabel('Ok');
                console.log('Cliente Encontrado');
            }
            else {
               z.component.footer.clickRightActionByLabel('Ok');
               console.log('Cliente não encontrado');
            }
        });
        // Informar data
        browser.sleep(2000);
        var limpaCampo = element(by.css('div.zh-select-date.zh-field-DTRECALCULO > div.close-button > span > svg'));
        limpaCampo.click();
        var clicaCalendario = element(by.css('div.zh-select-date.zh-field-DTRECALCULO > div.calendar-button > span'));
        clicaCalendario.click();
        z.field.calendar.selectDate(data,'pt_br');
        // Informar hora
        z.field.fieldFunctions.fill('HORAFIELD', hora);
        //Só entrará nesta condicional caso o teste passe valor true na variável infConsumidor 
        if (infConsumidor){
            z.field.checkbox.click('INFORMACONS');            
            //Informa Tipo de Consumidor/Cliente
            z.field.fieldFunctions.click('NMTIPOCONS');
            var inputPesquisa = element(by.css('div.floating-card-input > input'));
            inputPesquisa.sendKeys(tipoConsumidor);
            z.widget.grid.rowExists('NMTIPOCONS', tipoConsumidor , '9999').then(function(existeCliente){
                if (existeCliente) {
                    z.widget.grid.click('NMTIPOCONS', tipoConsumidor , '9999');
                    z.component.footer.clickRightActionByLabel('Ok');
                    console.log('Tipo consumidor Encontrado');
                }
                else {
                   z.component.footer.clickRightActionByLabel('Ok');
                   console.log('Tipo consumidor não encontrado');
                }
            }); 
            // Consumidor
            browser.sleep(2000); 
            z.field.fieldFunctions.click('NMCONSUMIDOR');         
            var inputPesquisa = element(by.css('div.floating-card-input > input'));
            inputPesquisa.sendKeys(consumidor);
            z.widget.grid.rowExists('NMTIPOCONS', consumidor , '9999').then(function(existeCliente){
                if (existeCliente) {
                    z.widget.grid.click('NMTIPOCONS', consumidor , '9999');
                    z.component.footer.clickRightActionByLabel('Ok');
                    console.log('Consumidor Encontrado');
                }
                else {
                   z.component.footer.clickRightActionByLabel('Ok');
                   console.log('Consumidor não encontrado');
                }
            });
        }

    };
    this.calcularSaldosSemData = function (filial, cliente, hora, infConsumidor, tipoConsumidor,consumidor) {
         //Informa Unidade
        z.field.fieldFunctions.click('NMFILIAL');
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));
        inputPesquisa.sendKeys(filial);
        z.widget.grid.rowExists('NMFILIAL', filial , '9009').then(function(existeCliente){
            if (existeCliente) {
                z.widget.grid.click('NMFILIAL', filial , '9009');
                console.log('Filial Encontrado');
            }
            else {
               console.log('Filial não encontrado');
            }
        });
        // Informa Cliente
        browser.sleep(2000);
        z.field.fieldFunctions.click('NMFANTCLIE');
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        var inputPesquisa = element(by.css('div.floating-card-input > input'));
        inputPesquisa.sendKeys(cliente);
        z.widget.grid.rowExists('NMFANTCLIE', cliente , '9999').then(function(existeCliente){
            if (existeCliente) {
                z.widget.grid.click('NMFANTCLIE', cliente , '9999');
                z.component.footer.clickRightActionByLabel('Ok');
                console.log('Cliente Encontrado');
            }
            else {
               z.component.footer.clickRightActionByLabel('Ok');
               console.log('Cliente não encontrado');
            }
        });
        //Apaga data
        browser.sleep(2000);
        let close = element(by.css('body > span > section > section > div.default-window > section.everything > div > section > section > div > form > section > div > div:nth-child(2) > div:nth-child(1) > div > div.zh-select-date.zh-field-DTRECALCULO > div.close-button > span > svg')).click();
        // Informar hora
        z.field.fieldFunctions.fill('HORAFIELD', hora);
        //Só entrará nesta condicional caso o teste passe valor true na variável infConsumidor 
        if (infConsumidor){
            z.field.checkbox.click('INFORMACONS');            
            //Informa Tipo de Consumidor/Cliente
            z.field.fieldFunctions.click('NMTIPOCONS');
            var inputPesquisa = element(by.css('div.floating-card-input > input'));
            inputPesquisa.sendKeys(tipoConsumidor);
            z.widget.grid.rowExists('NMTIPOCONS', tipoConsumidor , '9999').then(function(existeCliente){
                if (existeCliente) {
                    z.widget.grid.click('NMTIPOCONS', tipoConsumidor , '9999');
                    z.component.footer.clickRightActionByLabel('Ok');
                    console.log('Tipo consumidor Encontrado');
                }
                else {
                   z.component.footer.clickRightActionByLabel('Ok');
                   console.log('Tipo consumidor não encontrado');
                }
            }); 
            // Consumidor
            browser.sleep(2000); 
            z.field.fieldFunctions.click('NMCONSUMIDOR');         
            var inputPesquisa = element(by.css('div.floating-card-input > input'));
            inputPesquisa.sendKeys(consumidor);
            z.widget.grid.rowExists('NMTIPOCONS', consumidor , '9999').then(function(existeCliente){
                if (existeCliente) {
                    z.widget.grid.click('NMTIPOCONS', consumidor , '9999');
                    z.component.footer.clickRightActionByLabel('Ok');
                    console.log('Consumidor Encontrado');
                }
                else {
                   z.component.footer.clickRightActionByLabel('Ok');
                   console.log('Consumidor não encontrado');
                }
            });
        }
    };
};
module.exports = new calSaldos();