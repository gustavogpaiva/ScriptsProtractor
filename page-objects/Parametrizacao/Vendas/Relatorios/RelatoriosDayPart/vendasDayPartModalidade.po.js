var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var funcoes = require('../../../../../page-objects/helper.po.js');
var teclas = require('protractor-hotkeys');

var vendasDayPart = function(){
	var self = this;
	//emite o relatório do daypart por modalidade
    this.modalidade = async function(unidade, dataInicial, dataFinal, modalidade){
        await element(by.css('#footer > div.zh-footer-center > ul > li > a > div')).click();
        browser.sleep(3000);
        await element(by.css('#CDFILIAL')).click();
        browser.sleep(5000);
        await element.all(by.css('#grid-9999>.body>.body-content>.tr>div[data-zh-field-name=CDFILIAL]>span')).each(async function(item){
            item.getText().then(async function (valor){
                if(valor == unidade){
                    await item.click();
                }
            });
        });
        await element(by.css('#footer > div.zh-footer-right > ul > li > a > span')).click();
        browser.sleep(5000);
        await element(by.css('#CDMODALIDADE')).click();
        browser.sleep(5000);
        if(modalidade == 'todos'){
            await element(by.css('#grid-9999 > div.header > div > div > div.th.grid-checkbox-column.fixed > div')).click();
            await element(by.css('body > span > section > section > div.default-window > aside:nth-child(5) > aside > section > footer > button:nth-child(1)')).click();
            await element(by.css('#footer > div.zh-footer-right > ul > li > a > span')).click();
        }
        else{
            await element.all(by.css('#grid-9999>.body>.body-content>.tr>div[data-zh-field-name=NMMODALIDADE]>span')).each(async function(item){
                item.getText().then(async function (valor){
                    if(valor == modalidade){
                        await item.click();
                    }
                });
            });    
        }
        //abre o calendário do campo Período
        browser.sleep(3000);
        await element(by.css('#DTPERIODO > span > span:nth-child(1)')).click();
        //seleciona a data inicial
        browser.sleep(5000);
        await self.setData(dataInicial);
        //confirma clicando no botão 'Ok'
        //await element(by.css('#footer > div.zh-footer-right > ul > li > a > span')).click();
        //abre o calendário do campo Período
        //browser.sleep(3000);
        //await element(by.css('#DTPERIODO > span > span:nth-child(1)')).click();
        //seleciona a data final        
        browser.sleep(5000);
        await self.setData(dataFinal);
        //confirma clicando no botão 'Ok'
        await element(by.css('#footer > div.zh-footer-right > ul > li > a > span')).click();
        //confirma o filtro clicando no botão 'Filtrar'
        await element(by.css('#footer > div.zh-footer-right > ul > li > a > span')).click();
        return await funcoes.gridSemRegistros(await funcoes.getIdGrid());
    };
    //define a modalidade de vendas que o daypart vai exibir no relatório
    this.setModalidade = async function(modalidade){
        //aguarda o popup abrir para selecionar a modalidades a serem exibidas no relatório
        await z.component.popup.isOpened().then(function(opened){
            if(!opened)
                z.util.clickElement(by.css('div.searching-control-info.ng-scope > span > svg'));
            z.util.clickElement(by.css('#CDMODALIDADE'));
            //verifica se o todas linhas do grid estão marcadas, e desmarca todas.
            browser.sleep(5000);
            z.util.elementExists(by.css('#grid-9999 > div.header > div > div > div.th.grid-checkbox-column.fixed.ng-scope > div > svg > path')).then(async function(checked){
                if(checked)
                    await z.widget.grid.checkAllRows(await funcoes.getIdGrid());
            });
            //marca somente a modalidade do parâmetro
            browser.sleep(5000);
            funcoes.getIdGrid().then(async function(id){
                if(modalidade == 'todos'){
                    await z.widget.grid.checkAllRows(id);
                    await z.component.alert.clickButton('Sim');
                }
                else                    
                    await z.widget.grid.click('NMMODALIDADE', modalidade, id);
            });
            z.component.footer.clickRightActionByLabel('Ok');
        });
    };
    //define a data a ser escolhida
    this.setData = async function(data){
        var dataArray = data.split('/');
        var ano = dataArray[2];
        var mes = parseInt(dataArray[1]);
        var dia = parseInt(dataArray[0]);
        var meses = {
                1: 'Jan',
                2: 'Fev',
                3: 'Mar',
                4: 'Abr',
                5: 'Mai',
                6: 'Jun',
                7: 'Jul',
                8: 'Ago',
                9: 'Set',
                10: 'Out',
                11: 'Nov',
                12: 'Dez'
        };
        await element(by.css('#zh-calendar-Calendar > section > nav > header > h3')).click();
        await element(by.css('#zh-calendar-Calendar > section > nav > header > h3')).click();
        //seleciona o ano
        browser.sleep(5000);
        await element.all(by.css('div.content')).each(function(anoSelecionado){
            anoSelecionado.getText().then(function(valor){
                if(valor == ano){
                    console.log('ano = '+ano);
                    anoSelecionado.click();
                }
            });
        });
        //seleciona o mes
        browser.sleep(5000);
        await element.all(by.css('div.content')).each(function(mesSelecionado){
            mesSelecionado.getText().then(function(valor){
                if(valor == meses[mes]){
                    console.log('mes = '+meses[mes]);
                    mesSelecionado.click();
                }
            });
        });
        //seleciona o dia
        browser.sleep(5000);
        await element.all(by.css('div.content')).each(function(diaSelecionado){
            diaSelecionado.getText().then(function(valor){
                if(valor == dia){
                    console.log('dia = '+dia);
                    diaSelecionado.click();
                }
            });
        });
    };
};
module.exports = new vendasDayPart();