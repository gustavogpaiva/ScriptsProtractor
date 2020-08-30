var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var cadastroGrupoPromocional = function () {
    var self = this;

    this.cadastrarGrupo = function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NMGRUPROMOC', j.getValor('grupoPromocional'));
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editarGrupo = function () {
        z.widget.grid.click('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMGRUPROMOC', j.getValor('grupoPromocional'));
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluirGrupo = function (grupoPromocional) {
        z.widget.grid.rowExists('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944').then(function(existeGrupo){
            if(existeGrupo){
                z.widget.grid.click('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel){
                        z.component.alert.clickButton('Sim');
                    }
                });
            }
        });
    };

    this.cadastrarProduto = function () {
        self.pesquisarGrupoPromocional();
        z.widget.grid.rowExists('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944').then(function(existeGrupo){
            if(existeGrupo){
                z.widget.grid.click('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944');
                h.navegar('Produtos');
                z.component.footer.clickCenterActionByLabel('Adicionar');
                z.field.fieldFunctions.click('CDARVPROD');
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(2).sendKeys(j.getValor('produto'));
                browser.sleep(2000);
                z.widget.grid.rowExists('NMPRODUTO', j.getValor('produto'), '9009').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '9009');
                        z.component.footer.clickRightActionByLabel('Salvar');
                    }
                    else{
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                        z.component.footer.clickLeftActionByLabel('Voltar');
                    }
                });
            }
        });
    };


    this.cadastroAutomatico = function (produtoFinal) {
        z.widget.grid.rowExists('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944').then(function(existeGrupo){
            if(existeGrupo){
                z.widget.grid.click('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944');
                h.navegar('Produtos');
                z.component.footer.clickRightActionByLabel('Cad.Automático');
                z.field.fieldFunctions.click('NMPRODUTOI');
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(2).sendKeys(j.getValor('produtoInicialcadLoja'));
                //browser.sleep(5000);
                //z.util.pressKey();
                browser.sleep(5000);
                z.widget.grid.rowExists('NMPRODUTO',  j.getValor('produtoInicialcadLoja'), '9009').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.click('NMPRODUTO',  j.getValor('produtoInicialcadLoja'), '9009');
                    }
                    else{
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                    }
                });
                h.campoClicavel('NMPRODUTOF').then(function(campoClicavel){
                    if(campoClicavel){
                        z.field.fieldFunctions.click('NMPRODUTOF');
                        var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                        inputPesquisa.get(2).sendKeys(j.getValor('produtoFinalcadLoja'));
                        //browser.sleep(5000);
                        //z.util.pressKey();
                        browser.sleep(5000);
                        z.widget.grid.rowExists('NMPRODUTO', j.getValor('produtoFinalcadLoja'), '9009').then(function(existeProduto){
                            if(existeProduto){
                                z.widget.grid.click('NMPRODUTO', j.getValor('produtoFinalcadLoja'), '9009'); 
                                z.component.footer.clickRightActionByLabel('Salvar');
                                browser.sleep(2000);
                            }
                            else{
                                z.component.footer.clickLeftActionByLabel('Cancelar');
                            }
                        });
                    }
                    else
                        z.component.footer.clickLeftActionByLabel('Voltar');
                });
            }
        });
    };

    this.excluirProduto = function (produto) {
        z.widget.grid.rowExists('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944').then(function(existeGrupo){
            if(existeGrupo){
                z.widget.grid.click('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944');
                h.navegar('Produtos');
                z.widget.grid.rowExists('NMPRODUTO', j.getValor('produto'), '15777596099124844661945').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '15777596099124844661945');
                        z.component.footer.clickCenterActionByLabel('Excluir');
                        z.component.alert.isVisible().then(function(alertaVisivel){
                            if(alertaVisivel){
                                z.component.alert.clickButton('Sim');
                            }
                        });
                    }
                });
            }
        });
    };

    this.excluirTodosProdutos = function () {
        z.widget.grid.rowExists('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944').then(function(existeGrupo){
            if(existeGrupo){
                z.widget.grid.click('NMGRUPROMOC', j.getValor('grupoPromocional'), '15777596099201517031944');
                h.navegar('Produtos');
                z.widget.grid.checkAllRows('15777596099124844661945');
                browser.sleep(3000);
                z.component.footer.clickCenterActionByLabel('Excluir');
                browser.sleep(3000);
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel){
                        z.component.alert.clickButton('Sim');
                    }
                });
            }
        }); 
    };
    this.fecharSpan = function(){
        var closeSpan = element(by.css('#msg-2 > span > span.notification-message-icon'));
        closeSpan.click();
        browser.sleep(5000);
        z.component.footer.clickLeftActionByLabel('Voltar');

    };
    this.pesquisarGrupoPromocional = function(){
                z.component.floatingControl.open();
                z.component.floatingControl.selectAction('search');
                var inputPesquisa = element(by.css('div.floating-card-input > input'));
                inputPesquisa.sendKeys(j.getValor('grupoPromocional'));
                browser.sleep(2000);
    };
};
module.exports = new cadastroGrupoPromocional();