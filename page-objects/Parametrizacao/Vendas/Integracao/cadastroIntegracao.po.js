var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var cadIntegracao = function () {
    var self = this;
    
    this.cadIntegracao = function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('IDINTEGRACAO', 'TST');
        z.field.fieldFunctions.fill('NMINTEGRACAO', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
        //obtem o id do grid
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('IDINTEGRACAO', 'TST', idGrid);        
        });
        
        h.navegar('Tipo de Recebimento');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMTIPORECE');
        z.widget.grid.click('NMTIPORECE',j.getValor('tipoRecebimento'), '0');
        z.field.fieldFunctions.fill('CDTPRECEINTE', '100');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.editarIntegracao = function () {
        z.widget.grid.clickColumn('190983411515925229671648', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('IDINTEGRACAO', 'COD');
        z.field.fieldFunctions.fill('NMINTEGRACAO', j.getValor('nomeAlteracaoCadLoja'));
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Tipo de Recebimento');
        z.widget.grid.clickColumn('190983411542035943731657', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.click('NMTIPORECE');
        z.widget.grid.click('NMTIPORECE', j.getValor('tipoRecebimento2'), '0');
        z.field.fieldFunctions.fill('CDTPRECEINTE', '200');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.excluirIntegracao = function () {
        z.widget.grid.clickColumn('190983411515925229671648', 0, 0, false);
        h.navegar('Tipo de Recebimento');
        z.widget.grid.clickColumn('190983411542035943731657', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        h.navegar('Integrações');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        return h.retornaMensagem();
    };
};
module.exports = new cadIntegracao();