var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var monitoramentoFechamentoCupom = function () {
    var self = this;

    this.filtrarPeriodo = async function(periodo){
        var arrayDatas = periodo.split(' - ');
        if(await z.component.popup.isOpened()){
            z.component.footer.clickCenterActionByIcon('close-x');
            await h.filtroUnidade();
            z.component.footer.clickRightActionByLabel('Ok');
            //arrayDatas[0] = data inicial, arrayDatas[1] = data final
            h.selectIntervalDate('DTREDUCAOZ', arrayDatas[0], arrayDatas[1]);
            z.component.footer.clickRightActionByLabel('OK');
            z.component.footer.clickRightActionByLabel('Filtrar');
        }
    };

    this.monitoramento = async function(){
        var idGrid = await h.getIdGrid();
        //se o grid não estiver vazio verifica a linha que contem o monitoramento dos cupons
    	if(!await h.gridSemRegistros(idGrid)){
            return true;
        }
        //caso não exiba a linha com informações do monitoramento retorna a mensagem para o spec
        else
            return await $('#grid-' + idGrid + ' > div.body > div > div > div > ng-include > p').getText();
    };
};
module.exports = new monitoramentoFechamentoCupom();