var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor)
var moment = require('moment');
var h = require('../../../../page-objects/helper.po.js');

//esta suite depende da configuração de parammentros da unidade, em gestão de vendas, datas e restrições, na data de processamento
//foi aberto um  caixa especifico para essa suite, caso dê erro checar se o caixa ainda está aberto (CAIXA SAT)
var manutencaoLancamentoCaixa = function(){
    var self = this;
    var today = moment().format('DD/MM/YYYY');
   
    this.filtrarLancamentos = async function(periodo, caixa, atualizaSaldo){
        var arrayDatas = periodo.split(' - ');
        if(await z.component.popup.isOpened()){
            //z.component.footer.clickCenterActionByIcon('close-x');
            //seleciona o filtro e verifica se o campo loja está preenchido automático
            await h.filtroUnidade();           
            
            browser.sleep(5000);
            //se o campo loja não foi preenchido abre o filtro e seleciona a loja
            //if(await element(by.css('#NMLOJA > span')).getText() === '')
                await h.filtroLoja();
            //remove o rótulo de campo obrigatorio sobre o campo permitindo abrir o filtro de caixa
            await browser.executeScript("$('div.zh-validation').remove();");
            browser.sleep(5000);
            //z.field.fieldFunctions.click('NMCAIXA');
            await browser.executeScript("arguments[0].click();", await element(by.css('#NMCAIXA')).getWebElement());
            
            browser.sleep(5000);
            var idGrid = await h.getIdGrid();
            if(!await h.gridSemRegistros(idGrid)){
                if(await z.widget.grid.rowExists('CDCAIXA', caixa, idGrid)){
                    z.widget.grid.click('CDCAIXA', caixa, idGrid);
                    //arrayDatas[0] = data inicial, arrayDatas[1] = data final
                    h.selectIntervalDate('DTMOVTURCAIX', arrayDatas[0], arrayDatas[1]);
                    z.component.footer.clickRightActionByLabel('OK');         
                    //seleciona todos os tipos de lançamentos dos caixas e clica em sim
                    z.field.fieldFunctions.click('LANCAMENTO');
                    z.widget.grid.checkAllRows('9999');
                    if(await z.component.alert.isVisible())
                        z.component.alert.clickButton('Sim');
                    z.component.footer.clickRightActionByLabel('Ok'); 
                    //#zh-checkbox-ATUALIZA_SALDO
                    z.component.footer.clickRightActionByLabel('Filtrar'); 
                }
                else{
                    z.component.footer.clickLeftActionByLabel('Cancelar');
                    z.component.footer.clickLeftActionByLabel('Fechar');    
                }                    
            }
            else{
                z.component.footer.clickLeftActionByLabel('Cancelar');
                z.component.footer.clickLeftActionByLabel('Fechar');
            }

            //verifica se existe alguma notificação de campo obrigatório e tenta fechar o popup
            if(await h.campoObrigatorio()){
                if(await z.component.footer.isLeftActionByLabelPresent('Fechar'))
                    z.component.footer.clickLeftActionByLabel('Fechar');   
            }
        }
    };

    this.exibeAberturas = async function(){
        //aguarda a tela exibir as aberturas de caixas da loja
        if(!await h.gridSemRegistros(await h.getIdGrid())){
            return true;
        }
        //caso não houver movimentos para periodo de vendas informado
        else{
            return 'Não foram encontradas abertura de caixas para o período.';
        } 
    };

    this.atualizaSaldo = async function(){
        var idGrid = await h.getIdGrid();
        z.widget.grid.clickColumn(idGrid, 0, 0);
        h.navegar('Caixa');
        z.component.footer.clickRightActionByLabel('Atualiza Saldo');
        //aguarda a mensagem confirmando a atualização do saldo do caixa
        if(await z.component.alert.isVisible()){
            var alerta = z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }
    };

    this.lancamentos = async function(){
        h.navegar('Lançamentos');
        //verifica se a abertura de caixa selecionada está sem lançamentos
        if(await h.gridSemRegistros('3947772562064948085892')){
            return 'Não foram encontrados lançamentos para abertura de caixa. ';
        }
        else{
            return true;
        }
    };

    this.saldoDoCaixa = async function(){
        h.navegar('Saldo do Caixa');
        //verifica se a tela não está exibindo o saldo atualizado
        if(await h.gridSemRegistros('394777256616419638949')){  
           return 'Saldo do caixa não foi atualizado. ';
        }
        else
            return true;
    };

    this.adicionaLancamento = async function(movimento, recebimento, valor){
        h.navegar('Lançamentos');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        //aguarda a mensagem alertando que o caixa está fechado
        if(await z.component.alert.isVisible()){
            var alerta = z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }
        //prossegue e faz o lançamento para abertura do caixa
        else{
            h.selectNative('IDTIPOMOVIVE', movimento);
            z.field.fieldFunctions.click('NMTIPORECE');
            var idGrid = await h.getIdGrid();
            if(await z.widget.grid.rowExists('NMTIPORECE', recebimento, idGrid))
                z.widget.grid.click('NMTIPORECE', recebimento, idGrid);
            else{
                z.component.footer.clickLeftActionByLabel('Cancelar');
                return 'Tipo de recebimento não foi encontrado. ';
            }
            z.field.fieldFunctions.fill('VRMOVIVEND', valor);
            z.component.footer.clickRightActionByLabel('Salvar');      

            if(await z.component.notification.isNotificationMessagePresent()){
                return await z.component.notification.getText();
            }
        }
        z.component.footer.clickLeftActionByLabel('Voltar');  
    };

    this.liberaAjuste = async function(){
        var existeAberturas = await self.exibeAberturas();
        var idGrid = await h.getIdGrid();
        if(existeAberturas === true){
            z.widget.grid.clickColumn(idGrid, 0, 0);
            h.navegar('Lançamentos');
            z.component.footer.clickRightActionByLabel('Ações');
            h.selectAction('Liberar Ajuste no Caixa');
            
            if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                //await z.component.alert.clickButton('OK');
                await $('button.zh-alert-button').click();
                browser.sleep(5000);
                if(alerta !== 'Operação realizada com sucesso!'){
                    //z.component.footer.clickLeftActionByLabel('Cancelar');
                    await $$('span.zh-footer-title-sprit.ng-binding').get(0).click();
                }
                return alerta;
            }
        }
        else
            return existeAberturas;
    };

    this.finalizaAjuste = async function(){
        //z.component.footer.clickRightActionByLabel('Finalizar Ajuste');
        if((await $$('span.zh-footer-title-sprit.ng-binding').get(0).getText()) === 'Finalizar Ajuste'){
            await $$('span.zh-footer-title-sprit.ng-binding').get(0).click();
            if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('OK');
                return alerta;
            }
        }
        else
            return 'Não foi liberado fazer ajuste na abertura de caixa.';
    };
};
module.exports = new manutencaoLancamentoCaixa();