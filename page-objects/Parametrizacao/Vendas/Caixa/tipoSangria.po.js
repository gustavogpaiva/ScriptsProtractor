var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../json/leitorJson.po.js');
var h = require('../../../../page-objects/helper.po.js');

var sangria = function () {
    var self = this;
    
    this.cadastrarSangria = function () {
        z.field.fieldFunctions.click('NMFILIAL');

        //obtem o id do grid
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);    
        });

        z.component.footer.clickRightActionByLabel('Filtrar');  
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('CDTPSANGRIA', '2');
        z.field.fieldFunctions.fill('NMTPSANGRIA', 'Sangria Caixa 1');
        z.component.footer.clickRightActionByLabel('Salvar');

        //obtem o id do grid e retorna true ou false caso exista o registro no grid
        return h.getIdGrid().then(function(idGrid){
            return z.widget.grid.rowExists('NMTPSANGRIA', 'Sangria Caixa 1', idGrid).then(function(existeSangria){
                if(existeSangria)
                    return true;
                else
                    return false;
            });
        });
    };
    
    this.cadastroCodigoIgual = function () {
        self.cadastrarSangria();
        var el2 = element(by.css('span.notification-message-text.ng-binding'));
        var notificacao = el2.isDisplayed().then(function (banana) {
            if (banana) {
                return el2.getText().then(function (txt) {
                    console.log('msg = ' + txt);
                    return txt;
                });
            };
            
        });
        z.component.footer.clickLeftActionByLabel('Cancelar');
        return notificacao;
    }
    
    this.editarSangria = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        //obtem o id do grid
        h.getIdGrid().then(function(idGrid){
            //seleciona a filial no grid
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);
        });
        z.component.footer.clickRightActionByLabel('Filtrar');
        
        //obtem o id do grid
        h.getIdGrid().then(function(idGrid){
            //seleciona o tipo de sangria no grid
            z.widget.grid.click('CDTPSANGRIA', '00002', idGrid);
        });
        
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMTPSANGRIA', 'Sangria teste de edição');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');

        //obtem o id do grid
        return h.getIdGrid().then(function(idGrid){
            //verificar se o campo que contém o nome do tipo da sangria foi alterado
            return z.widget.grid.rowExists('NMTPSANGRIA', 'Sangria teste de edição', idGrid).then(function(existeSangria){
                if(existeSangria)
                    return true;
                else
                    return false;
            });
        });
    };
    
    this.editarCampoBranco = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        //obtem o id do grid do filtro filial
        h.getIdGrid().then(function(idGrid){
            //seleciona a filial no grid
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);
        });
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.clickColumn('90324313609071190480', 1, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMTPSANGRIA', '');
        z.component.footer.clickRightActionByLabel('Salvar');
        var returnParam = z.util.elementExists(by.css('div.zh-validation.ng-scope')).then(function (valida) {
			var msg;
			if (valida) {
				msg = 'Campo obrigatório';
			}
			else {
				msg = 'Ok';
			}
			return msg;
		});//promise
		return returnParam;
        z.component.footer.clickLeftActionByLabel('Cancelar');
    };
    
    this.excluirSangria = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        //obtem o id do grid do filtro filial
        h.getIdGrid().then(function(idGrid){
            //seleciona a filial no grid
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);
        });
        z.component.footer.clickRightActionByLabel('Filtrar');
        
        //obtem o id do grid do filtro filial
        return h.getIdGrid().then(function(idGrid){
            //verifica se o tipo de sangria existe no grid
            return z.widget.grid.rowExists('CDTPSANGRIA', '00002', idGrid).then(function(existeSangria){
                if(existeSangria){
                    //clica no tipo de sangria a ser excluída
                    z.widget.grid.click('CDTPSANGRIA', '00002', idGrid);   
                    
                    //confirma a exclusão do tipo de sangria
                    z.component.footer.clickCenterActionByIcon('trash');
                    z.component.alert.clickButton('Sim');
                    
                    //volta ao grid da tela tipo de sangria
                    z.component.footer.clickLeftActionByLabel('Voltar');

                    //verificar se o campo que contém o nome do tipo da sangria foi excluída
                    return z.widget.grid.rowExists('CDTPSANGRIA', '00002', idGrid).then(function(existeSangria){
                        if(!existeSangria)
                            return true;
                        else
                            return false;                        
                    });
                }
            });
        });
    };
    
    this.tentarExcluir = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.clickColumn('90324313609071190480', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var el = element(by.css('span.notification-message-text.ng-binding'));
        var notificacao = el.isDisplayed().then(function (banana) {
            if (banana) {
                return el.getText().then(function (txt) {
                    console.log('msg = ' + txt);
                    return txt;
                });
            };
            
        });
        z.component.footer.clickLeftActionByLabel('Voltar');
        return notificacao;
    }
}
module.exports = new sangria();