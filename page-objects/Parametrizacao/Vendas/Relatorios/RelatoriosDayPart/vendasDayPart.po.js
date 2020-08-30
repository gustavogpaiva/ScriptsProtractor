var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var funcoes = require('../../../../../page-objects/helper.po.js');

var vendasDayPart = function(){
	var self = this;
    //emite o relatorio do DayPart, informando a unidade, data inicial e data final.
    this.vendasDayPart = async function(unidade, periodo){ 
        //array com as datas inicial e final
        var arrayDatas = periodo.split(' - ');    
        //apagar os dados nos campos do formulário
        browser.sleep(5000);
        z.component.footer.clickCenterActionByIcon('close-x');
        
        //informa a unidade que utiliza o daypart
        funcoes.unidade(unidade);
        z.component.footer.clickRightActionByLabel('Ok');
        
        //informa a data inicial e data final para filtrar a exibição do daypart
        browser.sleep(5000);
        z.externalComponent.intervalComponent.selectIntervalDate('DTPERIODO',arrayDatas[0], arrayDatas[1], 'pt_br');
        //z.field.calendar.selectIntervalDate('DTPERIODO', dataInicial, dataFinal, 'pt_br');
        //arrayDatas[0] = data inicial, arrayDatas[1] = data final
        //funcoes.selectIntervalDate('DTPERIODO', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
        z.component.footer.clickRightActionByLabel('Filtrar');
        
        //verifica se o grid está sem registros ou se foi preenchido com as informações do daypart
        browser.sleep(5000);
        if(!(await funcoes.gridSemRegistros(await funcoes.getIdGrid())) )
            return true;
        //se o grid estiver vazio devolve para o spec a mensagem exibida no grid
        else{
            return await z.widget.grid.getText(await funcoes.getIdGrid(), 0, 0); 
        }
    };
};
module.exports = new vendasDayPart();