var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);

var unidade = function () {

    var self = this;

    this.grupoCampos = function (nomeGrupo) {
        var grupos = element.all(by.css('span.zh-label.zh-field-group-label.ng-binding'))
        grupos.each(function (grupo) {
            grupo.getText().then(function (nome) {
                if (nomeGrupo == nome)
                    grupo.click();
            })
        });
    };
    
    this.cadUnidade = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.clickColumn('1284638634121221037668', 0, 0, false);
        self.grupoCampos('Dados Complementares');
        z.component.footer.clickCenterActionByLabel('Editar');
        //centro de custo
        z.field.fieldFunctions.click('NMCENTCUST');
        z.externalComponent.selectAutocomplete.waitDropdown('NMCENTCUST');
        z.externalComponent.selectAutocomplete.selectOption('NMCENTCUST', '0001 | TEKNISA');
        //serie padrão
        z.field.fieldFunctions.click('DSSERIE');
        z.externalComponent.selectAutocomplete.waitDropdown('DSSERIE');
        z.externalComponent.selectAutocomplete.selectOption('DSSERIE', '01 | SERIE 01');
        //numero de funcionarios
        z.field.fieldFunctions.fill('QTFUNCFILI', '500');
        //infrasuma
        z.field.fieldFunctions.fill('NRINSCSUFRAMAFI', '123456');
        //abre dados adicionais
        self.grupoCampos('Dados Adicionais');
        z.field.selectNative('IDFUNCAOFILI', 'Operador Logístico');
        //clica no fornecedor
        z.field.fieldFunctions.click('NMRAZSOCFORN');
        w.widget.grid.click('NMRAZSOCFORN', 'CHRISTIAN LTDA', '0');
        //segmento de mercado e regional não funcionam
        //Gerente regional
        z.field.fieldFunctions.click('NMGERENTE');
        z.externalComponent.selectAutocomplete.waitDropdown('NMGERENTE');
        z.externalComponent.selectAutocomplete.selectOption('NMGERENTE', '000000009981 | Operador Padrão');
        //supervisor
        z.field.fieldFunctions.click('NMSUPERVISOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMSUPERVISOR');
        z.externalComponent.selectAutocomplete.selectOption('NMSUPERVISOR', '000000009981 | Operador Padrão');

        self.grupoCampos('Dados do Contrato');
        z.field.fieldFunctions.click('DTINCONTRFIL');
        z.field.calendar.clickDate('02/08/2018', 'pt_br');

        z.field.fieldFunctions.click('DTFICONTRFIL');
        z.field.calendar.clickDate('15/08/2018', 'pt_br');

        z.field.fieldFunctions.click('DTINICIALBI');
        z.field.calendar.clickDate('16/08/2018', 'pt_br');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
};
module.exports = new unidade();