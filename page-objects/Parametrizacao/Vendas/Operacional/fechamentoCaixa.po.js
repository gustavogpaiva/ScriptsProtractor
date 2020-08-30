var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);

var fecharCaixa = function () {

    var self = this;

//validar a existencia dessa suite já que a mesma ja tem uma cópia em abertura de caixa
    this.caixa = function () {
        z.field.fieldFunctions.click('NMLOJA');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDLOJA', '001', idGrid);        
        });
        z.field.fieldFunctions.click('NMCAIXA');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDCAIXA', '001', idGrid);
        });
        z.field.calendar.selectIntervalDate('DTABERTURA', '12/07/2017', '13/07/2017', 'pt_br');
        z.field.selectNative.click('ABERTO', 'Sim');
        z.field.selectNative.click('FECHADO', 'Não');
        z.component.footer.clickRightActionByLabel('Filtrar');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('DTABERCAIX', '12/07/2017', idGrid);        
        });
        z.component.footer.clickRightActionByLabel('Fechar caixa');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
};
module.exports = new fecharCaixa();