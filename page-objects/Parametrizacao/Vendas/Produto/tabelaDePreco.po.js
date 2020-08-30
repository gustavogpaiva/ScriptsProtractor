var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var moment = require('moment');

var tabelaDePreco = function() {
    var self = this;
    var nextYear = moment(today, 'DD/MM/YYYY').add(3, "years").format('DD/MM/YYYY');
    var today = moment().format('DD/MM/YYYY');

    this.addTabela = function(){
        // filtro com json
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.component.footer.clickRightActionByLabel('Filtrar');
        // adiciona a nova vigência
        z.component.footer.clickCenterActionByLabel('Adicionar Vigência');
        z.field.fieldFunctions.click('CDTABEPREC');
        z.widget.grid.click('CDTABEPREC', j.getValor('codigoProduto'), '0');
        z.field.calendar.clickDate('DTFINVGPREC', nextYear, 'pt_br');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    this.adicionaProdutos = function() {
        // adiciona produtos a nova vigência
        h.navegar('Produtos');
        z.component.footer.clickCenterActionByLabel('Adicionar preço');
        // produto incial, quando selecionado o produto final já é setado automaticamente
        z.field.fieldFunctions.click('NMPRODUTOINI');
        z.widget.grid.click('NMPRODUTOINI', j.getValor('produto'), '0');
        // preço
        z.field.fieldFunctions.fill('VRPRECITEM', j.getValor('preco'));
        // preço sugerido
        z.field.fieldFunctions.fill('VRPRESUGITEM', '60');
        // preço subsidiado
        z.field.fieldFunctions.fill('VRPRECITEMCL', '60');              
        z.component.footer.clickRightActionByLabel('Salvar');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
    
    this.precoDiferenciado = function() {
        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '19711712372099819066861');
        h.navegar('Preço Diferenciado');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        // dia da semana
        z.field.fieldFunctions.click('NRDIASEMANPR');
        z.widget.grid.click('__CHECKBOX', '', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        // tipo de consumidor
        z.field.fieldFunctions.click('NMTIPOCONS');
        z.widget.grid.click('NMTIPOCONS', j.getValor('consumidor'), '9999');
        // valor
        z.field.fieldFunctions.fill('VRPRECODIA', j.getValor('preco'));
        // Desconto/Acréscimo
        z.field.selectNative.click('IDDESCACREPR', 'Desconto');
        // Percentual/Valor
        z.field.selectNative.click('IDPERVALORPR', 'Valor');
        // Visualiza
        z.field.selectNative.click('IDVISUACUPOM', 'Não');
        // Hora inicial 
        z.field.fieldFunctions.fill('HRINIPRECDIA', '0900');
        // Hora final
        z.field.fieldFunctions.fill('HRFINPRECDIA', '2200');
        // Início validade
        z.field.calendar.clickDate('DTINIVALPREC', today, 'pt_br');
        // Final da validade 
        z.field.calendar.clickDate('DTFINVALPREC', nextYear, 'pt_br');
        z.component.footer.clickRightActionByLabel('Salvar');
        // terminar essa tela quando for corrigida 
        
    };
};
module.exports = new tabelaDePreco();