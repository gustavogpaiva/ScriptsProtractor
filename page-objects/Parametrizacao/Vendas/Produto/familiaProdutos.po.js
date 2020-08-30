var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var familiaProd = function () {
    
    var self = this;
    
    this.adicionar = function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('CDFAMILISALD', j.getValor('cdfamiliaDeProduto'));
        z.field.fieldFunctions.fill('NMFAMILISALD', j.getValor('familiaDeProduto'));
        z.component.footer.clickRightActionByLabel('Salvar');
        
        h.navegar('Família de Produtos Por Unidade');
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('LABELFAMILIA');
        // z.widget.grid.click('LABELFAMILIA', j.getValor('familiaDeProduto'), '0'); esperar a tela ser consertada
        z.externalComponent.selectAutocomplete.waitDropdown('LABELFAMILIA');
        z.externalComponent.selectAutocomplete.selectOption('LABELFAMILIA', '007 | TESTE Odhen');
        z.field.fieldFunctions.fill('NRORDAPRSALD', '10');
        z.field.selectNative.click('IDSALDNEGFAM', 'Não');
        z.field.selectNative.click('IDPERMCARGACRED', 'Não');
        z.field.fieldFunctions.fill('VRCONSDIAFAM', '100');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        z.widget.grid.click('LABELFAMILIA', '007 - TESTE Odhen', '1611848571856341908628');
        browser.sleep('5000');
        element.all(by.css('a.ng-binding')).get(3).click();//uso especifico que o navegar não funciona
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMPRODUTO');
        //  z.util.pressKey(j.getValor('produto2'));
        z.widget.grid.click('NMPRODUTO', j.getValor('produto2'), '0');
        z.field.selectNative.click('IDPERMREFEXTRA', 'Não');
        z.field.fieldFunctions.fill('QTCONSDIAFAM', '1');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.cadastroAutomatico = function () {
        h.navegar('Família de Produtos Por Unidade');
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.widget.grid.click('LABELFAMILIA', '007 - TESTE Odhen', '1611848571856341908628');
        element.all(by.css('a.ng-binding')).get(3).click();
        z.component.footer.clickRightActionByLabel('Cad. Automático');
        //primeira tabela de preço
        z.field.fieldFunctions.click('LABELTABPRE');
        z.widget.grid.click('NMTABEPREC', j.getValor('tabelaDePreco'), '0');
        // segunda tabela de preço
        z.field.fieldFunctions.click('LABELTABPREFIN');
        z.widget.grid.click('NMTABEPREC', j.getValor('tabelaDePreco2'), '0');
        //produto inicial
        z.field.fieldFunctions.click('NMPRODUTOINI');
        z.util.pressKey(j.getValor('produto2'));
        z.widget.grid.click('NMPRODUTO', j.getValor('produto2'), '0');
        // produto final
        z.field.fieldFunctions.click('NMPRODUTOFINAL');
        z.util.pressKey(j.getValor('produto3'));
        z.widget.grid.click('NMPRODUTO', j.getValor('produto3'), '0');
        z.component.footer.clickRightActionByLabel('Salvar');
    }
    
    this.editar = function () {
        h.navegar('Família de Produtos Por Unidade');
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.widget.grid.click('LABELFAMILIA', '007 - TESTE Odhen', '1611848571856341908628');
        z.component.footer.clickCenterActionByLabel('Editar');
        // z.field.fieldFunctions.fill('NRORDAPRSALD', '001');
        z.field.selectNative.click('IDSALDNEGFAM', 'Não');
        z.field.selectNative.click('IDPERMCARGACRED', 'Não');
        z.field.fieldFunctions.fill('VRCONSDIAFAM', '111');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        h.navegar('Família de Produtos');
    };
    
    this.excluir = function () {
        h.navegar('Família de Produtos Por Unidade');
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.widget.grid.click('LABELFAMILIA', '007 - TESTE Odhen', '1611848571856341908628');
        element.all(by.css('a.ng-binding')).get(3).click();
        z.widget.grid.checkAllRows('1611848572353961220629');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        element.all(by.css('a.ng-binding')).get(2).click();//uso específico porque o navegar não funciona
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        h.navegar('Família de Produtos');
        z.widget.grid.click('NMFAMILISALD', 'TESTE Odhen', '16118485792175389613');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
};
module.exports = new familiaProd();
