var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var cadVendedor = function () {
    var self = this;

    this.selecionarVendedor = async function(vendedor){
        if(await z.component.popup.isOpened())
            z.component.footer.clickRightActionByLabel('Filtrar');
    };

    this.cadastrar = async function(filial, caixa, operador, cdNovoVendedor, nomeVendedor, inscricao, dataNascimento){
        console.log('cadastrar vendedor');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('CDVENDEDOR', cdNovoVendedor);
        z.field.fieldFunctions.fill('NMRAZSOCVEN', nomeVendedor);
        z.field.fieldFunctions.fill('NRINSJURVEN', inscricao);
        browser.sleep(3000);
        z.util.clickElement(by.css('#DTNASCVEN'));
        $('#DTNASCVEN').sendKeys(dataNascimento);
        h.autoComplete('NMOPERADOR', operador);
        h.autoComplete('NMFILIAL', filial);
        h.autoComplete('NMCAIXA', caixa);

        z.component.footer.clickRightActionByLabel('Salvar'); 

        //verifica se algum campo obrigatório não foi preenchido 
        if(await h.campoObrigatorio())
            return 'Campos obrigatórios não foram preenchidos.';
        //se exibe algum alerta após salvar confirma no botão do alerta e fecha o swipe de cadastro de vendedor
        else if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            $$('button.zh-alert-button').get(0).click();
            //se o swipe ficar aberto após o alert, clique em cancelar para fechá-lo
            if(await z.swipe.isPresent())
                z.component.footer.clickLeftActionByLabel('Cancelar');
            return alerta;
        }
        
        //se todos os campos foram preenchidos abre a tela de vendedor novamente e verifica se as informações foram salvas.
        else{
            if(await z.widget.grid.rowExists('CDVENDEDOR', cdNovoVendedor, '17635103652036237344680')){
                z.widget.grid.click('CDVENDEDOR', cdNovoVendedor, '17635103652036237344680');
                var erros = '';
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-CDVENDEDOR > p')).getText() != cdNovoVendedor)
                    erros = erros.concat('Código do vendedor não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMRAZSOCVEN > p')).getText() != nomeVendedor)
                    erros = erros.concat('Nome do vendedor não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMTIPOINSCRICAO > p')).getText() == '')
                    erros = erros.concat('Tipo de inscrição não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NRINSJURVEN > p')).getText() != inscricao)
                    erros = erros.concat('Tipo de inscrição não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMFANVEN > p')).getText() != nomeVendedor)
                    erros = erros.concat('Nome fantasia não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-DTNASCVEN > p')).getText() != dataNascimento)
                    erros = erros.concat('Data de nascimento não foi salva. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMOPERADOR > p')).getText() != operador)
                    erros = erros.concat('Operador não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMFILIAL > p')).getText() != filial)
                    erros = erros.concat('Unidade não foi salva. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if((await element(by.css('#span-field-NMCAIXA > p')).getText()).indexOf(caixa) == -1)
                    erros = erros.concat('Caixa não foi salvo.');

                if(erros != '')
                    return erros;
                else
                    return true; 
            }
            else{
                return 'Vendedor não foi encontrado.';
            }
        }
    };

    this.enderecos = async function(cep, endereco, pais, estado, municipio, bairro, email, vendedor){
        console.log('cadastrar endereços');
        if(await z.widget.grid.rowExists('CDVENDEDOR', vendedor, '17635103652036237344680'))
            z.widget.grid.click('CDVENDEDOR', vendedor, '17635103652036237344680');
        z.component.footer.clickCenterActionByLabel('Editar');

        //h.grupoCampos('Endereços');
        z.field.fieldFunctions.fill('NRCEPVEN', cep);
        z.field.fieldFunctions.fill('DSENDEVEN', endereco);
        
        h.autoComplete('NMPAIS', pais);
        //se o campo do país foi selecionado com o valor prossegue com a edição dos proximos campos que depende dele
        if(await z.util.elementExists(by.css('#NMPAIS > span.value')))
            h.autoComplete('NMESTADO', estado);
            //se o campo do estado foi selecionado com o valor prossegue com a edição dos proximos campos que depende dele
            if(await z.util.elementExists(by.css('#NMESTADO > span.value')))
                h.autoComplete('NMMUNICIPIO', municipio);   
                //se o campo do municipio foi selecionado com o valor prossegue com a edição dos proximos campos que depende dele
                if(await z.util.elementExists(by.css('#NMMUNICIPIO > span.value')))
                    h.autoComplete('NMBAIRRO', bairro);

        z.field.fieldFunctions.fill('DSEMAILVEN', email);
        //caso o email digitado esteja em um formato inválido
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            return alerta;
        }

        z.component.footer.clickRightActionByLabel('Salvar');
        
        //verifica se algum campo obrigatório não foi preenchido 
        if(await h.campoObrigatorio())
            return 'Campos obrigatórios não foram preenchidos.';
        
        //confirma outros alertas exibidos na tela
        else if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('Sim');
            return alerta;
        }

        else{
            var erros = '';
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NRCEPVEN > p')).getText() != cep)
                erros = erros.concat('CEP não foi salvo. ');   
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-DSENDEVEN > p')).getText() != endereco)
                erros = erros.concat('Endereço não foi salvo. ');  
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NMPAIS > p')).getText() != pais)
                erros = erros.concat('País não foi salvo. ');   
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NMESTADO > p')).getText() != estado)
                erros = erros.concat('Estado não foi salvo. ');   
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NMMUNICIPIO > p')).getText() != municipio)
                erros = erros.concat('Municipio não foi salvo. ');   
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NMBAIRRO > p')).getText() != bairro)
                erros = erros.concat('Bairro não foi salvo. ');
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-DSEMAILVEN > p')).getText() != email)
                erros = erros.concat('Email não foi salvo.');
            
            if(erros != '')
                return erros;
            else
                return true;         
        }
    };

    this.telefones = async function(telefone, celular){
        console.log('cadastrar telefones');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NRTELRESIVEN', telefone);
        z.field.fieldFunctions.fill('NRCELULARVEN', celular);
        
        z.component.footer.clickRightActionByLabel('Salvar');

        //verifica se algum campo obrigatório não foi preenchido 
        if(await h.campoObrigatorio())
            return 'Campos obrigatórios não foram preenchidos.';
        
        //confirma outros alertas exibidos na tela
        else if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('Sim');
            return alerta;
        }

        else{
            var erros = '';
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NRTELRESIVEN > p')).getText() != telefone)
                erros = erros.concat('Residencial não foi salvo. '); 
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NRCELULARVEN > p')).getText() != celular)
                erros = erros.concat('Celular não foi salvo.'); 
            
            if(erros != '')
                return erros;
            else
                return true;            
        }
    };

    this.taxa = async function(taxa, incideConta) {
        console.log('cadastrar taxa');
        z.component.footer.clickCenterActionByLabel('Editar');
        //verifica se o parametro incide na conta não estiver marcado
        if(await element(by.css('span.zh-icon.zh-icon-checked.zh-icon-no-border')).getAttribute('class') == 'zh-icon zh-icon-checked zh-icon-no-border ng-hide'){
            if(incideConta == 'Sim')
                z.field.checkbox.click('IDVRINCIDECONTA');
        }
        //se o campo percentual estiver habilitado informa a taxa
        if(!await element(by.css('#VRPERCCOMISVEND')).getAttribute('readonly'))
            z.field.fieldFunctions.fill('VRPERCCOMISVEND', taxa);
        else
            return 'Campo Percentual(%) está desabilitado.';

        z.component.footer.clickRightActionByLabel('Salvar');

        //verifica se algum campo obrigatório não foi preenchido 
        if(await h.campoObrigatorio())
            return 'Campos obrigatórios não foram preenchidos.';
        
        //confirma outros alertas exibidos na tela
        else if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('Sim');
            return alerta;
        }

        else{
            var erros = '';
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-VRPERCCOMISVEND > p')).getText() != taxa && incideConta == "Sim")
                erros = erros.concat('Valor percentual não foi salvo.'); 
        }
        if(erros != '')
            return erros;
        else
            return true; 
    };

    this.entregador = async function(taxa, placaVeiculo) {
        console.log('cadastrar entregador');
        z.component.footer.clickCenterActionByLabel('Editar');
        //z.field.fieldFunctions.fill('DSPLACAVEICULO', placaVeiculo);
        browser.sleep(3000);
        z.util.clickElement(by.css('#DSPLACAVEICULO'));
        //z.util.pressKey(placaVeiculo);
        $('#DSPLACAVEICULO').sendKeys(placaVeiculo);
        z.field.fieldFunctions.fill('VRDIARIAVENDOR', taxa);
        z.component.footer.clickRightActionByLabel('Salvar');

        if(await h.campoObrigatorio())
            return 'Campos obrigatórios não foram preenchidos.';

        else if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('Sim');
            return alerta;
        }

        else{
            var erros = '';
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-DSPLACAVEICULO > p')).getText() != placaVeiculo)
                erros = erros.concat('Placa do veiculo não foi salva. '); 
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-VRDIARIAVENDOR > p')).getText() != taxa)
                erros = erros.concat('Taxa diária não foi salva. '); 

            if(erros != '')
                return erros;
            else
                return true;   
        }
    };

    this.editarVendedor = async function(filial, caixa, vendedor, nomeVendedor, dataNascimento, comissao, placaVeiculo, diariaVendedor, operador){
        console.log('editar vendedor');
        if(await z.widget.grid.rowExists('CDVENDEDOR', vendedor, '17635103652036237344680')){
            z.widget.grid.click('CDVENDEDOR', vendedor, '17635103652036237344680');
            z.component.footer.clickCenterActionByLabel('Editar');
            z.field.fieldFunctions.fill('NMFANVEN', nomeVendedor);
            browser.sleep(3000);
            z.util.clickElement(by.css('#DTNASCVEN'));
            //z.util.pressKey(dataNascimento);        
            $('#DTNASCVEN').sendKeys(dataNascimento);
            
            h.autoComplete('NMOPERADOR', operador); 
            if(await z.util.elementExists(by.css('#NMOPERADOR > span.value'))){
                if(await $('#NMOPERADOR > span.value').getText() !== '')
                    operador = await $('#NMOPERADOR > span.value').getText();                
            }
            
            h.autoComplete('NMFILIAL', filial); 
            if(await z.util.elementExists(by.css('#NMFILIAL > span.value'))){
                if(await $('#NMFILIAL > span.value').getText() !== '')
                    filial = await $('#NMFILIAL > span.value').getText();
            }
            h.autoComplete('NMCAIXA', caixa);
            if(await z.util.elementExists(by.css('#NMCAIXA > span.value'))){
                if(await $('#NMCAIXA > span.value').getText() !== '')
                    caixa = await $('#NMCAIXA > span.value').getText();
            }

            z.field.fieldFunctions.fill('VRPERCCOMISVEND', comissao);
            //z.field.fieldFunctions.fill('DSPLACAVEICULO', placaVeiculo);
            browser.sleep(3000);
            z.util.clickElement(by.css('#DSPLACAVEICULO'));
            //z.util.pressKey(placaVeiculo);
            $('#DSPLACAVEICULO').sendKeys(placaVeiculo);
            z.field.fieldFunctions.fill('VRDIARIAVENDOR', diariaVendedor);
            z.component.footer.clickRightActionByLabel('Salvar');    

            if(await h.campoObrigatorio())
                return 'Campos obrigatórios não foram preenchidos.';

            else if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('Sim');
                return alerta;
            }

            else{
                var erros = '';
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMFANVEN > p')).getText() != nomeVendedor)
                    erros = erros.concat('Nome fantasia não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-DTNASCVEN > p')).getText() != dataNascimento)
                    erros = erros.concat('Data de nascimento não foi salva. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMOPERADOR > p')).getText() != operador)
                    erros = erros.concat('Operador não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-NMFILIAL > p')).getText() != filial)
                    erros = erros.concat('Unidade não foi salva. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if((await element(by.css('#span-field-NMCAIXA > p')).getText()).indexOf(caixa) == -1)
                    erros = erros.concat('Caixa não foi salvo. ');
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-VRPERCCOMISVEND > p')).getText() != comissao)
                    erros = erros.concat('Valor percentual não foi salvo. '); 
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-DSPLACAVEICULO > p')).getText() != placaVeiculo)
                    erros = erros.concat('Placa do veiculo não foi salva. '); 
                //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
                if(await element(by.css('#span-field-VRDIARIAVENDOR > p')).getText() != diariaVendedor)
                    erros = erros.concat('Taxa diária não foi salva.'); 
                }

                if(erros != '')
                    return erros;
                else
                    return true;
        }
        else
            return 'Vendedor não foi encontrado.';
    };

    this.excluirVendedor = async function(vendedor) {
        console.log('excluir vendedor');
        if(await z.widget.grid.rowExists('CDVENDEDOR', vendedor, '17635103652036237344680')){
            z.widget.grid.click('CDVENDEDOR', vendedor, '17635103652036237344680');
            z.component.footer.clickCenterActionByLabel('Excluir');
            z.component.alert.clickButton('Sim');

            if(!await z.widget.grid.rowExists('CDVENDEDOR', vendedor, '17635103652036237344680'))
                return 'Excluído com sucesso!';
            else
                return 'Vendedor não foi excluído.';

            if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                $$('button.zh-alert-button').get(0).click();
                return alerta;
            }
        }
        else
            return 'Vendedor não foi encontrado.';
    };
};
module.exports = new cadVendedor();