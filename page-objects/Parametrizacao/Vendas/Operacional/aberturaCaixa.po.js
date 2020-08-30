var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor, moment);
var moment = require('moment');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var abrirCaixa = function () {
    
    var self = this;
    
    //função para sempre pegar o dia atual da execução do teste e um dia após
    var today = moment().format('DD/MM/YYYY');
    var tomorrow = moment(today, 'DD/MM/YYYY').add(1, "days").format('DD/MM/YYYY');
    
    this.caixa = async function () {
        z.field.fieldFunctions.click('NMFILIAL');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMFILIAL', j.getValor('filial') , idGrid);    
        });
        z.field.fieldFunctions.click('NMLOJA');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDLOJA', j.getValor('cdloja') , idGrid);
        });
        z.field.fieldFunctions.click('NMCAIXA');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa') , idGrid); 
        });
        console.log('hoje : '+today);
        console.log('amanha : '+tomorrow);
        z.field.calendar.selectIntervalDate('DTABERTURA', today, tomorrow, 'pt_br');
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.component.footer.clickCenterActionByLabel('Abrir caixa');
        // numero ecf
        z.field.fieldFunctions.fill('NRECFTURCAIX', '1234');
        // operador
        z.field.fieldFunctions.click('NMOPERADOR');
         h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMOPERADOR', j.getValor('operador'), idGrid);
        });
        // valor
        z.field.fieldFunctions.fill('VRMOVIVEND', '200');
        // recebimento
        z.field.fieldFunctions.click('NMTIPORECE');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMTIPORECE', j.getValor('tipoRecebimento'), idGrid);
        });
        z.component.footer.clickRightActionByLabel('Salvar');
        var msg = element(by.css('span.notification-message-text.ng-binding'));
        //função para pegar notificação
        var notifica;
        await msg.isDisplayed().then(function (visivel) {
            if (visivel) {
                msg.getText().then(function (texto) {
                    console.log('msg = ' + texto);
                    notifica = texto;
                });
            }
        });
        await console.log('notifica = ' + notifica);
        return await notifica;
    };
    
    this.fechamentoCaixa =  function () {
        z.field.fieldFunctions.click('NMLOJA');
        z.widget.grid.click('CDLOJA', j.getValor('cdloja'), '0');
        z.field.fieldFunctions.click('NMCAIXA');
        z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa'), '0');
        z.field.calendar.selectIntervalDate('DTABERTURA', today, tomorrow, 'pt_br');
        z.field.selectNative.click('FECHADO', 'Não');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa'), '6498295593790810265705');
        z.component.footer.clickRightActionByLabel('Fechar caixa');
        z.component.footer.clickRightActionByLabel('Salvar');
        return h.retornaMensagem();
        
    };
};
module.exports = new abrirCaixa();