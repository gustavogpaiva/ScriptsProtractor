var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var cadBloqProduto = function () {
    
    var self = this;
    
    this.bloqProduto = function () {
        z.component.footer.clickCenterActionByLabel('Bloquear Produto');
        z.field.fieldFunctions.click('CDPRODUTO');
        z.util.pressKey( j.getValor('produto'));
        z.widget.grid.click('NMPRODUTO',j.getValor('produto') , '9999',true);
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('NRDIASEMANABLOQ');
        z.util.pressKey(' Domingo');
        z.widget.grid.click('__CHECKBOX', '', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Bloquear');
    };
    
    this.desbloqProduto = function () {
        z.widget.grid.click('__CHECKBOX', '', '4405009021133150161239');
        z.component.footer.clickCenterActionByLabel('Desbloquear Produto');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
};
module.exports = new cadBloqProduto();