var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var cadBeneficio = function () {

    var self = this;

    this.aplicaFilto = function (situacao){
        z.component.popup.isOpened().then(function(existePopup){
            if(existePopup){
                browser.sleep(2000);
                z.field.selectNative.click('IDTPBENEFICIO', situacao);
                console.log('Filtro localizado');
            }else{
                console.log('Filtro já aplicado');
            }
        });
    };

    this.cadBeneficio = function (nomeBeneficio, tipo, ativacao, qtdeDia, qtdeDiaCompra, valor) {
        z.field.fieldFunctions.fill('DSBENEFICIO', nomeBeneficio);
        z.field.selectNative.click('IDTPBENEFICIO', tipo);
        z.field.selectNative.click('IDTPATIVABENEFICIO', ativacao);
        z.field.fieldFunctions.fill('QTDMAXDIASUBSEQ', qtdeDia);
        z.field.fieldFunctions.fill('QTDMAXDIACOMPRA', qtdeDiaCompra);
        z.field.fieldFunctions.fill('VRBENEFICIO', valor);
    };

    this.editaBeneficio = function(nomeEditado, qtdeDia, qtdeDiaCompra, valorBeneficio){
        z.field.fieldFunctions.fill('DSBENEFICIO', nomeEditado);
        z.field.fieldFunctions.fill('QTDMAXDIASUBSEQ', qtdeDia);
        browser.sleep(2000);
        z.field.fieldFunctions.fill('QTDMAXDIACOMPRA', qtdeDiaCompra);
        browser.sleep(2000);
        var valor = element(by.id('VRBENEFICIO'));
        valor.clear()
        z.component.alert.clickButton('OK');
        browser.sleep(2000);
        browser.executeScript("$('div.zh-validation').remove();");
        z.field.fieldFunctions.click('VRBENEFICIO');
        z.field.fieldFunctions.fill('VRBENEFICIO', valorBeneficio);
    };

    this.selecionaBeneficio = function (nomeBeneficio) {
        z.widget.grid.rowExists('DSBENEFICIO', nomeBeneficio, '11911190533080875283384').then(function(existeBeneficio){
            if (existeBeneficio){
                z.widget.grid.click('DSBENEFICIO', nomeBeneficio, '11911190533080875283384');
                console.log('Beneficio encontrado');
            } else{
                console.log('Beneficio não encontrado');
            }
        });
    };


};

module.exports = new cadBeneficio();