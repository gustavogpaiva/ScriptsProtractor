var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var configuraMenu = function () {
    
    var self = this;
    
    this.adicionar = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        h.autoComplete('NMFILIAL', j.getValor('filial'));
        //clica no botão Filtrar
        element(by.css('#footer > div.zh-footer-right > ul > li > a > span')).click();
        //obtem o id do grid
        h.getIdGrid().then(function(idGrid){
            //seleciona a configuração no grid
            z.widget.grid.click('NMCONFTELA', j.getValor('nomeConfMenuProdComb'), idGrid);    
        });
        h.navegar('Grupo de Produtos Combinados');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('NRBUTTON', '01');
        z.field.fieldFunctions.fill('DSBUTTON', 'Config. Teste');
        z.component.footer.clickRightActionByLabel('Salvar');

        //se exibir alerta com a mensagem código inválido é porque já foi cadastrado a configuração
        z.component.alert.isVisible().then(function(exibeAlerta){
            if(exibeAlerta){
                z.component.alert.clickMessageOk();
                z.component.footer.clickLeftActionByLabel('Cancelar');
            }
        });

        //obtem o id do grid, retorna true ou false para a nova configuração criada
        return h.getIdGrid().then(function(idGrid){
            //verifica se a linha existe no grid, da nova configuração de menu combinado
            return z.widget.grid.rowExists('NRBUTTON', '01', idGrid).then(function(existeConfig){
                console.log('Existe configuração = '+existeConfig);
                return existeConfig;   
            });
        });
    };
    
    this.editar = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMCONFTELA', j.getValor('nomeConfMenuProdComb'), '6213009343088276555116');
        h.navegar('Grupo de Produtos Combinados');
        z.widget.grid.click('DSBUTTON', 'teste', '6213009341621591302117');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSBUTTON', j.getValor('nomeAlteracaoCadLoja'));
        z.component.footer.clickRightActionByLabel('Salvar');
        
    };
    
    this.excluir = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMCONFTELA', j.getValor('nomeConfMenuProdComb'), '6213009343088276555116');
        h.navegar('Grupo de Produtos Combinados');
        z.widget.grid.click('DSBUTTON', j.getValor('nomeAlteracaoCadLoja'), '6213009341621591302117');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
    };
}; module.exports = new configuraMenu();