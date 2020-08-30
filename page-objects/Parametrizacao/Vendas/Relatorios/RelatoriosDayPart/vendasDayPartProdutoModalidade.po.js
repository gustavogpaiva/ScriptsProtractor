var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var funcoes = require('../../../../../page-objects/helper.po.js');

var vendasDayPart = function(){
	var self = this;
	//emite o relatório do daypart por modalidade
    this.modalidade = function(unidade, dataInicial, dataFinal, modalidade, produtos='todos', prodInicial='todos', prodFinal='todos'){
        //verifica se uma filial foi selecionada, remove do campo e seleciona a filial no filtro
        z.util.elementExists(by.css('#CDFILIAL > div > span')).then(function(selecao){
            if(selecao){
                z.util.clickElement(by.css('#CDFILIAL > div > span > span'));
            }
        });//promise
        //informa a unidade que utiliza o daypart
        z.field.fieldFunctions.click('CDFILIAL');
        //recebe id do grid presente dentro do popup e seleciona a linha do grid que contem a unidade
        var idGrid = funcoes.getIdGrid().then(function(id){
            z.widget.grid.click('CDFILIAL', unidade, id);
            z.component.footer.clickRightActionByLabel('Ok');
        });//promise
        //escolhe a modalidade de vendas a serem filtradas no relatório
        self.setModalidade(modalidade);
        //informa a data inicial e data final para filtrar a exibição do daypart
        z.field.fieldFunctions.click('DTPERIODO');
        z.field.calendar.clickDate(dataInicial, 'pt_br');
        z.field.calendar.clickDate(dataFinal, 'pt_br');
        z.component.footer.clickRightActionByLabel('OK');
        //se deve escolher algum produto do filtro
        if(produtos != 'todos'){
            //informa os produtos a serem exibidos no relatório
            z.field.fieldFunctions.click('CDARVPROD');    
            browser.sleep(5000);
            //pesquisa o produto a ser selecionado no filtro
            element.all(by.css('div.floating-card-input > input')).get(1).sendKeys(produtos);
            funcoes.getIdGrid().then(function(id){
                browser.sleep(5000);
                //se o produto final foi encontrado seleciona no grid do filtro
                if(!funcoes.gridSemRegistros(id)){
                    z.widget.grid.click('__CHECKBOX', '', id);
                    z.component.footer.clickRightActionByLabel('OK');
                }
                //se o produto final não for encontrado cancela a opção de selecionar o produto pesquisado no filtro
                else
                    z.component.footer.clickLeftActionByLabel('Cancelar');                
            });//promise
        }
        //se deve escolher o produto inicial e o produto final
        else if(prodInicial != 'todos' && prodFinal != 'todos'){
            //informa no filtro o produto inicial a ser exibido no grid
            z.field.fieldFunctions.click('NMPRODUTOI');
            element.all(by.css('div.floating-card-input > input')).get(1).sendKeys(prodInicial);
            funcoes.getIdGrid().then(function(id){
                //se o produto inicial foi encontrado seleciona no grid do filtro
                if(!funcoes.gridSemRegistros(id)){
                    z.widget.grid.click('NMPRODUTO', prodInicial, id);
                    z.field.fieldFunctions.click('NMPRODUTOF');
                    element.all(by.css('div.floating-card-input > input')).get(1).sendKeys(prodFinal);
                    funcoes.getIdGrid().then(function(id){
                        browser.sleep(5000);
                        //se o produto final foi encontrado seleciona no grid do filtro
                        if(!funcoes.gridSemRegistros(id))
                            z.widget.grid.click('NMPRODUTO', prodFinal, id);
                        //se o produto final não for encontrado cancela a opção de selecionar o produto pesquisado no filtro
                        else
                            z.component.footer.clickLeftActionByLabel('Cancelar'); 
                    });//promise
                }
                //se o produto não for encontrado cancela a opção de selecionar o produto pesquisado no filtro
                else
                    z.component.footer.clickLeftActionByLabel('Cancelar');       
            });//promise
        }
        //confirma a opção de filtrar relatório
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep(5000);
        //verifica se o grid está sem registros ou se foi preenchido com as informações do daypart
        return funcoes.gridSemRegistros(funcoes.getIdGrid()).then(function(semRegistro){
            if(semRegistro)
                //caso os dados do relatório não seja exibidos
                return false;
            else
                //caso os dados do relatório seja exibidos
                return true;
        });
    };
    //define a modalidade de vendas que o daypart vai exibir no relatório
    this.setModalidade = function(modalidade){
        //aguarda o popup abrir para selecionar a modalidades a serem exibidas no relatório
        z.component.popup.isOpened().then(function(opened){
            if(!opened)
                z.util.clickElement(by.css('div.searching-control-info.ng-scope > span > svg'));
            z.util.clickElement(by.css('#CDMODALIDADE > span > svg'));
            //verifica se o todas linhas do grid estão marcadas, e desmarca todas.
            browser.sleep(5000);
            z.util.elementExists(by.css('#grid-9999 > div.header > div > div > div.th.grid-checkbox-column.fixed.ng-scope > div > svg > path')).then(async function(checked){
                if(checked)
                    await z.widget.grid.checkAllRows(await funcoes.getIdGrid());
            });
            //marca somente a modalidade do parâmetro
            browser.sleep(5000);
            funcoes.getIdGrid().then(async function(id){
                if(modalidade == 'todos')
                    await z.widget.grid.checkAllRows(id);
                else                    
                    await z.widget.grid.click('NMMODALIDADE', modalidade, id);
            });
            z.component.footer.clickRightActionByLabel('Ok');
            if(!opened)
                z.component.footer.clickRightActionByLabel('Filtro');
        });
    };

};
module.exports = new vendasDayPart();