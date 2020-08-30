var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../../page-objects/helper.po.js');
var moment = require('moment');

var ajusteSaldoMen = function () {

    var self = this;
    var today = moment().format('DD/MM/YYYY');

    this.saldoMensal = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDFILIAL', '0001', idGrid);            
        });
        
        z.field.fieldFunctions.click('CDCLIENTE');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NRINSJURCLIE', '00001', idGrid);            
            z.component.footer.clickRightActionByLabel('Ok');
        });

        element.all(by.css('span.zh-icon.zh-icon-close-x.zh-icon-no-border')).get(1).click();
        browser.sleep(5000);
        z.field.fieldFunctions.fill('DATA', '01/03/2019');

        z.component.footer.clickRightActionByLabel('Ajustar');
        z.component.alert.clickButton('Sim');

        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };

    this.ajustaBranco = function () {
        //esvazia todos os campos da tela inclusive os obrigatórios clicando
        browser.sleep(5000);
        element.all(by.css('span.zh-icon.zh-icon-close-x.zh-icon-no-border')).get(0).click();
        browser.sleep(5000);
        element.all(by.css('span.zh-icon.zh-icon-close-x.zh-icon-no-border')).get(1).click();
        browser.sleep(5000);
        element(by.css('#CDCLIENTE')).clear();

        //clica na opção de ajustar saldo
        browser.sleep(5000);
        z.component.footer.clickRightActionByLabel('Ajustar');

        //verifica se a mensagem campo obrigatório está sendo exibida no relatório
        browser.sleep(5000);
        var returnParam = z.util.elementExists(by.css('span.zh-validation-error')).then(function (valida) {
            var msg;
            if (valida) {
                msg = 'Campo obrigatório';
            }
            else {
                msg = 'Ok';
            }
            return msg;
        });//promise
        return returnParam;
    }
};
module.exports = new ajusteSaldoMen();