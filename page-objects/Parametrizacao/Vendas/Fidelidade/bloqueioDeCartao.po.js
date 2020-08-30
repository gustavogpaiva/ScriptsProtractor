var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var bloqueioDeCartao = function (){
        
    this.bloqueioCartao = function(){
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('__CHECKBOX','','11855205933641054972385'); //generico p pegar sempre o primeiro cartão
        z.component.footer.clickCenterActionByLabel('Bloquear Cartão');
        z.component.alert.clickButton('Sim');
    };
    
    this.desbloqueiaCartao = function(){
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('__CHECKBOX','','11855205933641054972385'); //generico p pegar sempre o primeiro cartão
        z.component.footer.clickCenterActionByLabel('Desbloquear Cartão');
        z.component.alert.clickButton('Sim');
    };   
};
module.exports = new bloqueioDeCartao();