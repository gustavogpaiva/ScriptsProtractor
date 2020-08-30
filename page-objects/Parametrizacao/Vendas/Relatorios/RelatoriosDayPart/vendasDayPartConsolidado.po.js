var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var funcoes = require('../../../../../page-objects/helper.po.js');

var vendasDayPart = function(){
	self = this;
    //emite o relatório consolidado, caso o relatório exibir dados retornará 'true' senão retornará 'false'
    this.consolidado = function(unidade, loja, dataInicial, dataFinal, horaInicial, horaFinal){
        //verifica se uma filial foi selecionada, remove do campo e seleciona a filial no filtro
        z.util.elementExists(by.css('#NMFILIAL > div > span')).then(function(selecao){
            if(selecao){
                z.util.clickElement(by.css('#NMFILIAL > div > span > span'));
            }
        });//promise
        //informa a unidade que utiliza o daypart
        z.field.fieldFunctions.click('NMFILIAL');
        //recebe id do grid presente dentro do popup e seleciona a linha do grid que contem a unidade
        var idGrid = funcoes.getIdGrid().then(function(id){
            z.widget.grid.click('CDFILIAL', unidade, id);
            z.component.footer.clickRightActionByLabel('Ok');
        });//promise
        //informa a loja que utiliza daypart
        z.field.fieldFunctions.click('CDLOJA');
        //recebe id do grid presente dentro do popup e seleciona a linha do grid que contem a loja
        var idGrid = funcoes.getIdGrid().then(function(id){
            z.widget.grid.click('CDLOJA', loja, id);
            z.component.footer.clickRightActionByLabel('Ok');
        });//promise
        //informa a data inicial e data final para filtrar a exibição do daypart
        z.field.fieldFunctions.click('DTPERIODO');
        z.field.calendar.clickDate(dataInicial, 'pt_br');
        z.field.calendar.clickDate(dataFinal, 'pt_br');
        z.component.footer.clickRightActionByLabel('OK');
        //
        z.field.fieldFunctions.fill('HRINI', horaInicial);
        //
        z.field.fieldFunctions.fill('HRFIN', horaFinal);
        //confirma a opção de filtrar relatório
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep(5000);
        //verifica se o grid está sem registros ou se foi preenchido com as informações do daypart
        return funcoes.gridSemRegistros(funcoes.getIdGrid()).then(function(semRegistro){
            if(semRegistro)
                //caso os dados do relatório não seja exibidos
                return false;
            else
                //caso os dados do relatório seja exibidos
                return true;
        });
    };
};
module.exports = new vendasDayPart();