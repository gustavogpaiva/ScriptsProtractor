var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor)
var moment = require('moment');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');


//esta suite depende da configuração de parammentros da unidade, em gestão de vendas, datas e restrições, na data de processamento
//foi aberto um  caixa especifico para essa suite, caso dê erro checar se o caixa ainda está aberto (CAIXA SAT)
var manutencaoLancamentoCaixa = function () {

    var self = this;

    var today = moment().format('DD/MM/YYYY');
   
    this.lancamento = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);        
        });
        z.field.fieldFunctions.click('NMLOJA');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDLOJA', j.getValor('cdloja'), idGrid);
        });
        z.field.fieldFunctions.click('NMCAIXA');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMCAIXA', j.getValor('nmcaixa'), idGrid);
        });
        z.field.calendar.selectIntervalDate('DTMOVTURCAIX', '31/10/2017', today, 'pt_br');
        z.field.fieldFunctions.click('LANCAMENTO');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.checkAllRows(idGrid);
        });
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Filtrar');

        z.widget.grid.click('DTABERCAIX', '03/09/2018 09:35:00', '394777256766784403891');
        h.navegar('Saldo do Caixa');
        browser.sleep('5000');
        h.navegar('Lançamentos');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.selectNative.click('IDTIPOMOVIVE', 'Entrada');
        z.field.fieldFunctions.click('NMTIPORECE');
        z.widget.grid.click('NMTIPORECE', j.getValor('tipoRecebimento'), '0');
        z.field.fieldFunctions.fill('VRMOVIVEND', '10');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
};
module.exports = new manutencaoLancamentoCaixa();