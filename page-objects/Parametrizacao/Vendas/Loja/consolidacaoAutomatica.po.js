var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var moment = require('moment');

var consolidacaoAutomatica = function () {

    var self = this;

    var today = moment().format('DD/MM/YYYY');

    this.consolidacao = function () {
        //busca no json a filial e a loja
        z.field.fieldFunctions.click('NMFILIAL');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);        
        });
        z.field.fieldFunctions.click('NMLOJA');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDLOJA', j.getValor('cdloja'), idGrid);
        });
        z.component.footer.clickRightActionByLabel('Filtrar');
        return h.getIdGrid().then(function(idGrid){
            return z.widget.grid.rowExists('CDLOJA', j.getValor('cdloja'), idGrid).then(function(existeLoja){
                if(existeLoja){
                    console.log('existe loja');
                    z.widget.grid.click('CDLOJA', j.getValor('cdloja'), idGrid);
                    h.navegar('Consolidação Automática');
                    z.component.footer.clickCenterActionByLabel('Editar');
                    // Data Inicial Apuração
                    z.field.fieldFunctions.fill('DTINICONSVENAUT', today);
                    // Horário
                    z.field.fieldFunctions.fill('HRCONSVENAUT', '0200');
                    // Frequência
                    z.field.selectNative.click('IDFREQCONSVEN', 'Diário');
                    // Diretório Arquivos PHP
                    z.field.fieldFunctions.fill('DSDIRARQPHP', '"D:\Teknisa Web\NFCe\"');
                    // Diretório Instalação PHP.exe
                    z.field.fieldFunctions.fill('DSDIRINSTALAPHP', '"C:\Program Files (x86)\PHP\v5.6"');
                    // Status Conciliação 
                    z.field.fieldFunctions.fill('DSSTATUSULTCONS', 'Alguns dias não foram consolidados, pois existe Implantação ou Ajuste realizado como último lançamento do dia.');
                    z.component.footer.clickRightActionByLabel('Salvar');
                    return h.notificacao();
                }
                else
                    return 'A loja não foi localizada.';   
            });
        });
    };
};
module.exports = new consolidacaoAutomatica();