var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var parametrosAppConsumidor = function () {
    
    var self = this;

    
    this.cielo = function () {
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.selectNative.click('IDPLATAFORMAPAG', 'Cielo');
        z.field.checkbox.click('IDPERMITEPAGRETLOJA');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Unidade');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '14657336392017897467350');
        h.navegar('Parâmetros');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.selectNative.click('IDPLATAFORMAPAG', 'Cielo');
        z.field.checkbox.click('IDPERMITEPAGRETLOJA');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.mundiPag = function () {
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.selectNative.click('IDPLATAFORMAPAG', 'MundiPagg');
        z.field.checkbox.click('IDPERMITEPAGRETLOJA');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Unidade');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '14657336392017897467350');
        h.navegar('Parâmetros');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.selectNative.click('IDPLATAFORMAPAG', 'MundiPagg');
        z.field.checkbox.click('IDPERMITEPAGRETLOJA');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.softwateExpress = function () {
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.selectNative.click('IDPLATAFORMAPAG', 'Software Express');
        z.field.checkbox.click('IDPERMITEPAGRETLOJA');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Unidade');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '14657336392017897467350');
        h.navegar('Parâmetros');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.selectNative.click('IDPLATAFORMAPAG', 'Software Express');
        z.field.checkbox.click('IDPERMITEPAGRETLOJA');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    //esperar a adição de popup para validação
};
module.exports = new parametrosAppConsumidor();
