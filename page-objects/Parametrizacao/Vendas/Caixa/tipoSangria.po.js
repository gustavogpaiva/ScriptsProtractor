var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../json/leitorJson.po.js');
var h = require('../../../../page-objects/helper.po.js');

var sangria = function () {
    var self = this;
    
    this.selecionarUnidade = function(){
        z.component.popup.isOpened().then(function(existePopup){
            if(existePopup){
                z.field.fieldFunctions.click('NMFILIAL');
                //obtem o id do grid pela função do helper
                h.getIdGrid().then(function(idGrid){
                    z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);    
                });
                z.component.footer.clickRightActionByLabel('Filtrar');     
            }
        })
    };
    this.cadastrarSangria = function (tipoSangria) {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('CDTPSANGRIA', '100');
        z.field.fieldFunctions.fill('NMTPSANGRIA', 'Sangria Caixa 100');
        z.field.selectNative.click ('IDSANGRIA', tipoSangria);
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    this.editarSangria = function () {
         
        //obtem o id do grid
        h.getIdGrid().then(function(idGrid){
            //seleciona o tipo de sangria no grid
            z.widget.grid.click('CDTPSANGRIA', '00100', idGrid);
        });
        
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMTPSANGRIA', 'Sangria teste de edição');
        z.component.footer.clickRightActionByLabel('Salvar');
  
    };
    
    this.editarCampoBranco = function () {
        z.widget.grid.clickColumn('90324313609071190480', 1, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMTPSANGRIA', '');
        z.component.footer.clickRightActionByLabel('Salvar');

    };
    
    this.excluirSangria = function () {

        //obtem o id do grid
        h.getIdGrid().then(function(idGrid){
            //seleciona o tipo de sangria no grid
            z.widget.grid.click('CDTPSANGRIA', '00100', idGrid);
        });
        
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
    };
    
    this.tentarExcluir = function () {
        z.widget.grid.clickColumn('90324313609071190480', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
    }
}
module.exports = new sangria();