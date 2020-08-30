var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var moment = require('moment');
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');

var transfereSaldo = function () {

    var self = this;
    var today = moment().format('DD/MM/YYYY');

    this.saldo = function () {
        //$$-> element(by.css)
        //Origem
        $$('#NMRAZSOCCLIE > span > svg').click();
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '9000');
        $$('#NMCONSUMIDOR > span > svg').click();
        z.widget.grid.click('NMCONSUMIDOR', j.getValor('nomeConsumidor'), '9000');
        z.field.calendar.selectIntervalDate('PERIODO', '11/06/2018', today, 'pt_br');
        z.field.fieldFunctions.click('NRSEQVENDA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        //destino
        $$('#NMRAZSOCCLIE_DESTINO > span > svg').click();
        z.widget.grid.click('NMRAZSOCCLIE_DESTINO', j.getValor('cliente'), '9000');
        $$('#NMCONSUMIDOR > span > svg').click();
        z.widget.grid.click('NMCONSUMIDOR', j.getValor('nomeConsumidor2'), '9000');
        z.component.footer.clickRightActionByLabel('Transferir Movimentação');
    };
};
module.exports = new transfereSaldo();