var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var cadObservacao = function () {
    var self = this;

    this.selecionarGrupoObservacao = function (grupoObservacao) {
        z.widget.grid.rowExists('DSGRPOCOR', grupoObservacao, '154704262121757450531021').then(function(existeGrupo){
            if(existeGrupo)
                z.widget.grid.click('DSGRPOCOR', grupoObservacao, '154704262121757450531021');
        });
    };

    this.cadastrarGrupoObservacao = function (grupoObservacao) {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('DSGRPOCOR', grupoObservacao);
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editarGrupoObservacao = function (grupoObservacao) {
        h.navegar('Grupo Observação');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSGRPOCOR', grupoObservacao);
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluirGrupoObservacao = function () {
        h.navegar('Grupo Observação');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.isVisible().then(function(alertaVisivel){
            if(alertaVisivel)
                z.component.alert.clickButton('Sim');
        });
    };    

    this.cadastrarObservacao = function (observacao, tipoObs, apelido, exibeObs, obsIngles, obsEspanhol, produto, destacaKDS) {
        h.navegar('Observações');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('DSOCORR', observacao);
        z.field.fieldFunctions.fill('CDEXTOBSPROD', element(by.css('#CDOCORR')).getText());
        h.selectNative('IDCONTROLAOBS', tipoObs);
        z.field.fieldFunctions.fill('DSAPELIDOOBS', apelido);
        h.selectNative('IDEXIOBSAPPCONS', exibeObs);
        z.field.fieldFunctions.fill('DSOCORRINGLES', obsIngles);
        z.field.fieldFunctions.fill('DSOCORRESPANH', obsEspanhol);
        h.autoComplete('CDARVPROD', produto);
        h.selectNative('IDSINAL', destacaKDS);
        if(destacaKDS === 'Sim'){
            z.field.fieldFunctions.click('NRCORSINAL');
            z.component.footer.clickRightActionByLabel('Ok');
        }
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editarObservacao = function (observacao, tipoObs, apelido, exibeObs, obsIngles, obsEspanhol, produto, destacaKDS) {
        h.navegar('Observações');
        z.widget.grid.rowExists('DSOCORR', observacao, '15470426216060477751022').then(function(existeObs){
            if(existeObs){
                z.widget.grid.click('DSOCORR', observacao, '15470426216060477751022');
                z.component.footer.clickCenterActionByLabel('Editar');
                //edita as informações das observações
                z.field.fieldFunctions.fill('CDEXTOBSPROD', element(by.css('#CDOCORR')).getText());
                h.selectNative('IDCONTROLAOBS', tipoObs);
                z.field.fieldFunctions.fill('DSAPELIDOOBS', apelido);
                h.selectNative('IDEXIOBSAPPCONS', exibeObs);
                z.field.fieldFunctions.fill('DSOCORRINGLES', obsIngles);
                z.field.fieldFunctions.fill('DSOCORRESPANH', obsEspanhol);
                h.autoComplete('CDARVPROD', produto);
                h.selectNative('IDSINAL', destacaKDS);
                if(destacaKDS === 'Sim'){
                    z.field.fieldFunctions.click('NRCORSINAL');
                    z.component.footer.clickRightActionByLabel('Ok');
                }
                z.component.footer.clickRightActionByLabel('Salvar');
            }
        });
    };

    this.excluirObservacao = function (observacao) {
        h.navegar('Observações');
        z.widget.grid.rowExists('DSOCORR', observacao, '15470426216060477751022').then(function(existeObs){
            if(existeObs){
                z.widget.grid.checkRowByValue('DSOCORR', observacao, '15470426216060477751022');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel)
                        z.component.alert.clickButton('Sim');
                });
            }
        });
    };

    this.cadastrarProduto = function (observacao, produto) {
        h.navegar('Observações');
        z.widget.grid.rowExists('DSOCORR', observacao, '15470426216060477751022').then(function(existeObs){
            if(existeObs){
                z.widget.grid.click('DSOCORR', observacao, '15470426216060477751022');
                h.navegar('Produtos');
                z.component.footer.clickCenterActionByLabel('Adicionar');
                z.field.fieldFunctions.click('PRODUTOS');
                browser.sleep(3000);
                var inputPesquisa = element.all(by.css('div.floating-card-input > input'));
                inputPesquisa.get(3).sendKeys(produto);
                //z.util.pressKey(produto);
                browser.sleep(3000);
                z.widget.grid.rowExists('NMPRODUTO', produto, '9999').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.checkRowByValue('NMPRODUTO', produto, '9999');  
                        z.component.footer.clickRightActionByLabel('Ok');
                        z.component.footer.clickRightActionByLabel('Salvar');
                    }
                    else{
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                        z.component.footer.clickLeftActionByLabel('Cancelar');
                    }
                });
            }
        });        
    };

    this.excluirProduto = function (observacao, produto) {
        h.navegar('Observações');
        z.widget.grid.rowExists('DSOCORR', observacao, '15470426216060477751022').then(function(existeObs){
            if(existeObs){
                z.widget.grid.click('DSOCORR', observacao, '15470426216060477751022');
                h.navegar('Produtos');
                z.widget.grid.rowExists('NMPRODUTO', produto, '154704262141655898431023').then(function(existeProduto){
                    if(existeProduto){
                        z.widget.grid.checkRowByValue('NMPRODUTO', produto, '154704262141655898431023');
                        z.component.footer.clickCenterActionByLabel('Excluir');
                        z.component.alert.isVisible().then(function(alertaVisivel){
                            if(alertaVisivel)
                                z.component.alert.clickButton('Sim');
                        });
                    }
                });
            }
        });
    };
    
    this.observacaoProdutos = function () {
        h.navegar('Observação por produto');
        return h.gridSemRegistros('154704262114850716261087').then(function(semRegistro){
            if(!semRegistro)
                return true;
            else
                return false;                        
        });
    };

    this.quantidadeMinima = function (qtdeMinima) {
        //parametriza a quantidade mínima de observações
        browser.executeScript("$('#grid-154704262114850716261087 > div.body > div > div > div.td.zh-standard-column.grid-align-right.inline-editable > div > input').click();");
        //informa uma quantidade mínima
        $('#grid-154704262114850716261087 > div.body > div > div > div.td.zh-standard-column.grid-align-right.inline-editable > div > input').sendKeys(qtdeMinima);
        //clica fora do campo, no rodapé da tela para exibir a opção de salvar
        $('#footer > div.zh-footer-center > ul').click();

        //aguarda exibir o rodapé para salvar a parametrização do produto
        z.util.elementExists(by.css('#footer > div.zh-footer-right > ul > li > a > span')).then(function(presente){
            if(presente){
                browser.sleep(3000);
                z.component.footer.clickRightActionByLabel('Salvar alterações');
            }
        });
    };

    this.cadastrarObsProduto = function (produto, observacao) {
        z.widget.grid.rowExists('NMPRODUTO', produto, '154704262114850716261087').then(function(existeProduto){
            if(existeProduto){
                z.widget.grid.click('NMPRODUTO', produto, '154704262114850716261087');
                //clica na aba observações
                element.all(by.css('a.ng-binding')).get(5).click();
                z.widget.grid.rowExists('DSOCORR', observacao, '154704262111135444031089').then(function(existeObs){
                    if(!existeObs){
                        z.component.footer.clickCenterActionByLabel('Adicionar');
                        z.field.fieldFunctions.click('CDOCORR');
                        z.widget.grid.rowExists('DSOCORR', observacao, '9999').then(function(existeObs){
                            if(existeObs){
                                z.widget.grid.checkRowByValue('DSOCORR', observacao, '9999');
                                z.component.footer.clickRightActionByLabel('Ok');
                                z.component.footer.clickRightActionByLabel('Salvar');
                            }
                        });
                    }
                });
            }
        });
    };

    this.excluirObsProduto = function (produto, observacao) {
        z.widget.grid.rowExists('NMPRODUTO', produto, '154704262114850716261087').then(function(existeProduto){
            if(existeProduto){
                z.widget.grid.click('NMPRODUTO', produto, '154704262114850716261087');
                //clica na aba observações
                element.all(by.css('a.ng-binding')).get(5).click();
                z.widget.grid.rowExists('DSOCORR', observacao, '154704262111135444031089').then(function(existeObs){
                    if(existeObs){
                        z.widget.grid.checkRowByValue('DSOCORR', observacao, '154704262111135444031089');
                        z.component.footer.clickCenterActionByLabel('Excluir');
                        z.component.alert.isVisible().then(function(alertaVisivel){
                            if(alertaVisivel)
                                z.component.alert.clickButton('Sim');
                        });
                    }
                });
            }
        });
    };

    this.cadastrarObsObrigatoria = function (obsObrigatoria) {
        h.navegar('Grupo de Observações Obrigatórias');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NMGRUPOBRIG', obsObrigatoria);
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editarObsObrigatoria = function (obsObrigatoria) {
        h.navegar('Grupo de Observações Obrigatórias');
        z.widget.grid.rowExists('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761').then(function(existeObs){
            if(existeObs){
                z.widget.grid.click('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761');
                z.component.footer.clickCenterActionByLabel('Editar');
                z.field.fieldFunctions.fill('NMGRUPOBRIG', obsObrigatoria);
                z.component.footer.clickRightActionByLabel('Salvar');
            }
        });
    };

    this.excluirObsObrigatoria = function (obsObrigatoria) {
        h.navegar('Grupo de Observações Obrigatórias');
        z.widget.grid.rowExists('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761').then(function(existeObs){
            if(existeObs){
                z.widget.grid.checkRowByValue('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.isVisible().then(function(alertaVisivel){
                    if(alertaVisivel)
                        z.component.alert.clickButton('Sim');
                });
            }
        });
    };

    this.cadastrarOcorrencia = function (obsObrigatoria) {
        z.widget.grid.rowExists('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761').then(function(existeObs){
            if(existeObs){
                z.widget.grid.click('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761');
                h.navegar('Ocorrências Obrigatórias do Grupo');
                h.gridSemRegistros('15470426211496686762925').then(function(semRegistro){
                    if(semRegistro){
                        z.component.footer.clickCenterActionByLabel('Adicionar');
                        h.gridSemRegistros('15470426213614166707926').then(function(semRegistro){
                            if(!semRegistro){
                                z.widget.grid.checkAllRows('15470426213614166707926');
                                z.component.footer.clickRightActionByLabel('Salvar');
                            }
                        });
                    }
                });
            }
        }); 
    };

    this.excluirOcorrencia = function (obsObrigatoria) {
        h.navegar('Grupo de Observações Obrigatórias');
        z.widget.grid.rowExists('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761').then(function(existeObs){
            if(existeObs){
                z.widget.grid.click('NMGRUPOBRIG', obsObrigatoria, '1547042621854967306761');
                h.navegar('Ocorrências Obrigatórias do Grupo');
                h.gridSemRegistros('15470426211496686762925').then(function(semRegistro){
                    if(!semRegistro){
                        z.widget.grid.checkAllRows('15470426211496686762925');
                        z.component.footer.clickCenterActionByLabel('Excluir');
                        z.component.alert.isVisible().then(function(alertaVisivel){
                            if(alertaVisivel)
                                z.component.alert.clickButton('Sim');
                        });
                    }
                });
            }
        });
    };

};
module.exports = new cadObservacao();
