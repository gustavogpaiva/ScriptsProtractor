var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../json/leitorJson.po.js');
var h = require('../../../../page-objects/helper.po.js');
var moment = require('moment');

var fecharDia = function () {

    var self = this;
    
    //função para sempre pegar o dia atual da execução do teste e um dia após
    var today = moment().format('DD/MM/YYYY');
    var tomorrow = moment(today, 'DD/MM/YYYY').add(1, "days").format('DD/MM/YYYY');

    this.fechaDia = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);    
        });
        tomorrow = tomorrow.replace('/', '');
        browser.sleep(3000);
        z.field.fieldFunctions.fill('PROXDTPROCVND', tomorrow);
        browser.sleep(3000);
        console.log(tomorrow);
        z.component.footer.clickRightActionByLabel('Fechar Dia');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };

    this.tentaFecharDiaSemUnidade = function () {
        // clica no x para deixar o campo em branco e tentar realizar o fechamento
        $$('#NMFILIAL > span.zh-icon.zh-icon-close-x.zh-icon-no-border > svg').click();
        z.component.footer.clickRightActionByLabel('Fechar Dia');
        var returnParam = z.util.elementExists(by.css('div.zh-validation.ng-scope')).then(function (valida) {
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
    };
};
module.exports = new fecharDia();