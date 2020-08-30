var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var kds = function () {  
    var self = this;

    this.filtrarUnidade = function(filial){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.autoComplete('NMFILIAL', filial);
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
    };

    this.selecionarUnidade = function(filial){
        h.navegar('Unidade');
        return h.getIdGrid().then(function(idGrid){
            return h.gridSemRegistros(idGrid).then(function(semRegistros){
                if(!semRegistros){
                    return z.widget.grid.rowExists('CDFILIAL', filial, idGrid).then(function(existeUnidade){
                        if(existeUnidade){
                            z.widget.grid.click('CDFILIAL', filial, idGrid);
                            return true;
                        }
                        else 
                            return 'Unidade não foi encontrada.';
                    });
                }
                else
                    return h.mensagemGrid();
            });
        });
    };

    this.selecionarLoja = function(loja){
        h.navegar('Lojas');
        return h.getIdGrid().then(function(idGrid){
            return h.gridSemRegistros(idGrid).then(function(semRegistros){
                if(!semRegistros){
                    return z.widget.grid.rowExists('CDLOJA', loja, idGrid).then(function(existeUnidade){
                        if(existeUnidade){
                            z.widget.grid.click('CDLOJA', loja, idGrid);
                            return true;
                        }
                        else 
                            return 'Loja não foi encontrada.';
                    });
                }
                else
                    return h.mensagemGrid();
            });
        });
    };

    this.selecionarSetor = function(setor){
        h.navegar('Setor');
        return h.getIdGrid().then(function(idGrid){
            return h.gridSemRegistros(idGrid).then(function(semRegistros){
                if(!semRegistros){
                    return z.widget.grid.rowExists('NMSETOR', setor, idGrid).then(function(existeSetor){
                        if(existeSetor){
                            z.widget.grid.click('NMSETOR', setor, idGrid);         
                            return true;
                        }
                        else
                            return 'Setor não foi encontrado.';
                    });    
                }
                else
                    return h.mensagemGrid();    
            });
        });
    };

    this.selecionarSetorUnidade = function(setor){
        h.navegar('Setores por Unidade');
        return h.getIdGrid().then(function(idGrid){
            return h.gridSemRegistros(idGrid).then(function(semRegistros){
                if(!semRegistros){
                    return z.widget.grid.rowExists('NMSETOR', setor, idGrid).then(function(existeSetor){
                        if(existeSetor){
                            z.widget.grid.click('NMSETOR', setor, idGrid);
                            return true;
                        }
                        else
                            return 'Setor da unidade não foi encontrado.';         
                    });
                }
                else
                   return h.mensagemGrid();
            });
        });
    };

    this.selecionarSetorLoja = function(setor){
        h.navegar('Setores por Loja');
        return h.getIdGrid().then(function(idGrid){
            return h.gridSemRegistros(idGrid).then(function(semRegistros){
                if(!semRegistros){
                    return z.widget.grid.rowExists('NMSETOR', setor, idGrid).then(function(existeSetor){
                        if(existeSetor){
                            z.widget.grid.click('NMSETOR', setor, idGrid);         
                            return true;
                        }
                        else
                            return 'Setor da loja não foi encontrado.';
                    }); 
                }
                else
                    return h.mensagemGrid();
            });
        });
    };

    this.selecionarProdutoSetor = function(produto){
        h.navegar('Produtos do setor');
        return h.getIdGrid().then(function(idGrid){
            return h.gridSemRegistros(idGrid).then(function(semRegistros){
                if(!semRegistros){
                    return z.widget.grid.rowExists('NMPRODUTO', produto, idGrid).then(function(existeProduto){
                        if(existeProduto){
                            z.widget.grid.click('NMPRODUTO', produto, idGrid);
                            return true;
                        }
                        else
                            return 'O produto não foi localizado no setor.';
                    });    
                }
                else
                    return h.mensagemGrid();
            });
        });
    };
    
    this.setor = function(setorkds, sigla, tipo){
        h.navegar('Setor');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('SGSETOR', sigla);
        z.field.fieldFunctions.fill('NMSETOR', setorkds);
        h.selectNative('IDTIPOSETOR', tipo);
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    
    this.produtosSetor = function(setor, produtos){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                //navega até a aba Produtos do setor
                h.navegar('Produtos do setor');
                z.component.footer.clickCenterActionByIcon('plus');
                //seleciona o produto inicial 
                h.autoComplete('NMPRODUTO', produtos[0]);
                //seleciona o produto final
                h.autoComplete('NMPRODUTOFINAL', produtos[1]);
                h.selectNative('IDRESUMOPRODKDS', 'Não aparece');
                h.selectNative('IDRESTRICAOORIGEM', 'Sem restrição');
                z.field.fieldFunctions.fill('DSAPELIDORESUMO', 'AB');
                //esse campo só aparece quando o tipo de setor for produção
                z.util.elementExists(by.css('span.zh-label.zh-field-group-label.ng-binding')).then(function(setorProducao){
                    if(setorProducao){
                        z.field.fieldFunctions.fill('NRTEMPOPROD', '1000');
                    }
                });
                z.component.footer.clickRightActionByLabel('Salvar');
                return h.aguardaMensagem();
            }
            else
                return existeSetor;
        });
    };
    
    this.observacoes = function(setor, produto, grupoPedido){ 
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                return self.selecionarProdutoSetor(produto).then(function(existeProduto){
                    if(existeProduto === true){
                        h.navegar('Observações');
                        z.component.footer.clickCenterActionByLabel('Adicionar');
                        //grupo
                        z.field.fieldFunctions.click('DSGRPOCOR');
                        return h.getIdGrid().then(function(idGrid){
                            return z.widget.grid.rowExists('DSGRPOCOR', grupoPedido, idGrid).then(function(existeGrupo){
                                if(existeGrupo){
                                    z.widget.grid.click('DSGRPOCOR', grupoPedido, idGrid);
                                    //Observação
                                    z.field.fieldFunctions.click('DSOCORR');
                                    z.widget.grid.checkAllRows('9999');
                                    z.component.alert.clickButton('Sim');
                                    z.component.footer.clickRightActionByLabel('Ok');
                                    //tempo de produção
                                    h.selectNative('IDSINALALTERATEMPO', 'Adição');
                                    z.field.fieldFunctions.fill('NRTEMPOPROD', '60');
                                    z.component.footer.clickRightActionByLabel('Salvar');
                                    return h.aguardaMensagem();
                                }
                                else
                                    return 'O grupo de observação não existe.';
                            });
                        });                        
                    }
                    else
                        return existeProduto;                    
                });  
            }
            else
                return existeSetor;
        });  
    };
    
    this.intervalos = function(setor, produto){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                return self.selecionarProdutoSetor(produto).then(function(existeProduto){
                    if(existeProduto === true){
                        h.navegar('Intervalos');
                        z.component.footer.clickCenterActionByLabel('Adicionar');
                        z.field.fieldFunctions.fill('NRSEQINTERVALO', '10');
                        z.field.fieldFunctions.fill('NRTEMPOINTER', '60');
                        z.component.footer.clickRightActionByLabel('Salvar');
                        return h.aguardaMensagem();
                    }
                    else
                        return existeProduto;
                });
            }
            else
                return existeSetor;
        });        
    };
    
    this.coresPedido = function(){        
        h.navegar('Cores do Pedido');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NRINICIOCOR', '251');
        z.field.fieldFunctions.fill('NRFINALCOR', '300');
        z.field.fieldFunctions.click('NRCORPEDIDO');
        z.component.footer.clickRightActionByLabel('Ok');        
        h.selectNative('IDPISCAPED', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
        return h.aguardaMensagem();
    };
    
    this.mapeamentoTeclas = function(funcao, tecla){
        h.navegar('Mapeamento de Teclas');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', funcao);
        z.field.fieldFunctions.fill('IDKEY', tecla);
        z.component.footer.clickRightActionByLabel('Salvar');
        return h.aguardaMensagem();
    };
    
    this.setorUnidadeKDS = function(filial, setor){
        return self.selecionarUnidade(filial).then(function(existeUnidade){
            if(existeUnidade){
                h.navegar('Setores por Unidade');
                z.component.footer.clickCenterActionByLabel('Adicionar');
                z.field.fieldFunctions.click('NMSETOR');
                h.autoComplete('NMSETOR', setor);
                h.selectNative('IDCONCDIRETO', 'Não');
                h.selectNative('IDCONTSOMKDS', 'Não');
                h.selectNative('IDHABPREENVIO', 'Não');
                h.selectNative('IDMOSTRAORIGEM', 'Sim');
                h.selectNative('IDUTLINTPAINEL', 'Não');
                //NRCORVGM
                h.selectNative('IDHABPEDLIB', 'Não');
                h.selectNative('IDHABBTNACTION', 'Sim');
                h.selectNative('IDHABROLLBKDS', 'Sim');
                h.campoClicavel('NRROLLBTIME').then(function(clicavel){
                    if(clicavel)
                        z.field.fieldFunctions.fill('NRROLLBTIME', '30');
                });
                h.selectNative('IDHABTIMERPROD', 'Sim');
                h.campoClicavel('IDHABCONTSOMPROD').then(function(clicavel){
                    if(clicavel)
                        h.selectNative('IDHABCONTSOMPROD', 'Sim');
                });
                h.campoClicavel('IDHABSOMPROD').then(function(clicavel){
                    if(clicavel)
                        h.selectNative('IDHABSOMPROD', 'Não');
                });
                h.campoClicavel('NRPRODATRAINISOM').then(function(clicavel){
                    if(clicavel)
                        z.field.fieldFunctions.fill('NRPRODATRAINISOM', '30');
                });
                h.campoClicavel('IDBLOQPRODKDS').then(function(clicavel){
                    if(clicavel)
                        h.selectNative('IDBLOQPRODKDS', 'Não');
                });
                h.selectNative('IDHABSOMKDS', 'Sim');
                h.campoClicavel('NRATRASOSOMPROD').then(function(clicavel){
                    if(clicavel)
                        z.field.fieldFunctions.fill('NRATRASOSOMPROD', '30');
                });
                z.component.footer.clickRightActionByLabel('Salvar');    
                return h.aguardaMensagem();            
            }
            else
                return existeUnidade;
        });
    };
    
    this.setorLojasKDS = function(filial, loja, setor){
        return self.selecionarUnidade(filial).then(function(existeUnidade){
            if(existeUnidade){
                return self.selecionarLoja(loja).then(function(existeLoja){
                    if(existeLoja){
                        h.navegar('Setores por Loja');
                        z.component.footer.clickCenterActionByLabel('Adicionar');
                        h.autoComplete('NMSETOR', setor);
                        z.component.footer.clickRightActionByLabel('Salvar');
                        return h.aguardaMensagem();
                    }
                    else
                        return existeLoja;
                });              
            }
            else
                return existeUnidade;
        });
    };
    
    this.edicaoSetorKDS = function(setor, sigla, tipo){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                z.component.footer.clickCenterActionByLabel('Editar');
                z.field.fieldFunctions.fill('SGSETOR', sigla);
                z.field.fieldFunctions.fill('NMSETOR', setor);
                h.selectNative('IDTIPOSETOR', tipo);
                z.component.footer.clickRightActionByLabel('Salvar');
                return h.aguardaMensagem();
            }
            else
                return existeSetor;
        });
    };

    this.edicaoProdutosKDS = function(setor, produto){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                return self.selecionarProdutoSetor(produto).then(function(existeProduto){
                    if(existeProduto === true){
                        z.component.footer.clickCenterActionByLabel('Editar');
                        h.selectNative('IDRESUMOPRODKDS', 'Aparece quando necessário');
                        h.selectNative('IDRESTRICAOORIGEM', 'Utilizar restriçoes da API');
                        z.field.fieldFunctions.fill('DSAPELIDORESUMO', 'TESTE DE NOME');
                        //se estiver editando produção do setor de produção parametriza os dois campos
                        z.util.elementExists(by.css('span.zh-label.zh-field-group-label.ng-binding')).then(function(setorProducao){
                            if(setorProducao){
                                z.field.fieldFunctions.fill('NRTEMPOPROD', '0230');
                                z.field.fieldFunctions.fill('NRTEMPOEXIB', '0100');            
                            }
                        });
                        z.component.footer.clickRightActionByLabel('Salvar');
                        //aguarda alerta confirmando se deseja alterar o produto em todos os setores
                        z.component.alert.isVisible().then(function(visivel){
                            if(visivel)
                                z.component.alert.clickButton('Não');
                        });
                        return h.aguardaMensagem();
                    }
                    else
                        return existeProduto;
                });
            }
            else
                return existeSetor;
        });
    };

    this.edicaoSetor = function () {
       
        h.navegar('Setor');
        z.widget.grid.click('CDSETOR', j.getValor('cdSetorKDS'), '1703783845705579958990');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('SGSETOR', 'EXPED');
        z.field.fieldFunctions.fill('NMSETOR', 'Expedição 2');
        h.selectNative('IDTIPOSETOR', 'Expedição');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        h.navegar('Produtos do setor');
        z.widget.grid.clickColumn('17037838451122297446991',0, 0, true);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDRESUMOPRODKDS', 'Aparece quando necessário');
        h.selectNative('IDRESTRICAOORIGEM', 'Utilizar restriçoes da API');
        z.field.fieldFunctions.fill('DSAPELIDORESUMO', 'TESTE DE NOME');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.edicaoTeclas = function () {
        h.navegar('Mapeamento de Teclas');
        //faz a primeira edição
        z.widget.grid.clickColumn('170378384516294726631093', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Cima');
        z.field.fieldFunctions.fill('IDKEY', 'T');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a segunda edição
        z.widget.grid.clickColumn('170378384516294726631093', 1, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Baixo');
        z.field.fieldFunctions.fill('IDKEY', 'G');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a terceira edição
        z.widget.grid.clickColumn('170378384516294726631093', 2, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Esquerda');
        z.field.fieldFunctions.fill('IDKEY', 'F');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a quarta edição
        z.widget.grid.clickColumn('170378384516294726631093', 3, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Direita');
        z.field.fieldFunctions.fill('IDKEY', 'H');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a quinta edição
        z.widget.grid.clickColumn('170378384516294726631093', 4, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Enter');
        z.field.fieldFunctions.fill('IDKEY', 'P');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a sexta edição
        z.widget.grid.clickColumn('170378384516294726631093', 5, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Rollback');
        z.field.fieldFunctions.fill('IDKEY', 'U');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a setíma edição
        z.widget.grid.clickColumn('170378384516294726631093', 6, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Zoom');
        z.field.fieldFunctions.fill('IDKEY', 'Ç');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.editarUnidade = function(filial){
        return self.selecionarUnidade(filial).then(function(existeUnidade){
            if(existeUnidade === true){
                z.component.footer.clickCenterActionByLabel('Editar');
                //envia o numero de atraso padrão da produção de itens no kds
                z.field.fieldFunctions.fill('NRATRAPADRAO', '60');   
                //verifica se o alerta será exibido informando que o valor deve ser maior que '0'
                z.component.alert.isVisible().then(function(visivel){
                    if(visivel)
                        z.component.alert.clickMessageOk();
                });
                z.component.footer.clickRightActionByLabel('Salvar');
                return h.aguardaMensagem();
            }
            else
                return existeUnidade;
        });
    };

    this.editarSetoreUnidade = function(){
        browser.sleep(2000);
        element(by.cssContainingText('a.ng-binding', 'Setores por Unidade')).click();
        z.widget.grid.clickColumn('1703783845842249706895', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDCONCDIRETO', 'Sim');
        h.selectNative('IDCONTSOMKDS', 'Sim');
        h.selectNative('IDHABPREENVIO', 'Sim');
        h.selectNative('IDMOSTRAORIGEM', 'Não');
        h.selectNative('IDUTLINTPAINEL', 'Sim');
        h.selectNative('IDHABROLLBKDS', 'Sim');
        h.selectNative('IDHABTIMERPROD', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.excluirTeclas = function(){               
        h.navegar('Mapeamento de Teclas');
        //obtem o número de linhas do grid da aba 'Mapeamento de Teclas'
        return z.widget.grid.getNrRowsFromGroupedGrid('170378384516294726631093').then(function(total){
            //se total linhas for maior que '0' percorre cada linha do grid e exclui todos os mapeamentos de teclas
            if(total > 0){
                //seleciona cada linha clica na opção excluir e confirma
                for(var i = 1; i <= total; i++){
                    z.widget.grid.clickColumn('170378384516294726631093', 0, 0);
                    z.component.footer.clickCenterActionByLabel('Exlcuir');
                    z.component.alert.clickButton('Sim');
                }    
                //retorna a mensagem para o spec que a exclusão foi realizada com sucesso
                return 'Excluído com sucesso.';
            }
            //se total de linhas for '0' retorna a mensagem para o spec que o mapeamento não está cadastrado
            else{
                return 'Mapeamento de teclas não foi cadastrado.';
            }
        });
    };
    
    this.excluirSetor = function(setor){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.clickButton('Sim');
                return h.aguardaMensagem();
            }
            else
                return existeSetor;
        });
    };

    this.excluirIntervalos = function(setor, produto){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                return self.selecionarProdutoSetor(produto).then(function(existeProduto){
                    if(existeProduto === true){
                        h.navegar('Intervalos');
                        return h.gridSemRegistros('17037838454030606082215').then(function(semIntervalos){
                            //se existir intervalo cadastrado, seleciona e exclui do grid
                            if(!semIntervalos){
                                z.widget.grid.clickColumn('17037838454030606082215', 0, 0, false);
                                z.component.footer.clickCenterActionByLabel('Excluir');
                                z.component.alert.clickButton('Sim');
                                return h.aguardaMensagem();                          
                            }
                            //senão retorna a mensagem para o spec que não há intervalo cadastrado
                            else
                                return h.mensagemGrid();
                        });
                    }
                    else
                        return existeProduto;
                });
            }
            else
                return existeSetor;
        });
    };

    this.excluirObservacoes = function(setor, produto){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                return self.selecionarProdutoSetor(produto).then(function(existeProduto){
                    if(existeProduto === true){
                        //navega até aba observações e seleciona a observação do produto a ser excluida
                        h.navegar('Observações');   
                        return h.gridSemRegistros('17037838451044048193992').then(function(semRegistros){
                            //se existe observação seleciona no grid e exclui
                            if(!semRegistros){
                                z.widget.grid.checkAllRows('17037838451044048193992');
                                z.component.alert.clickButton('Sim');
                                z.component.footer.clickCenterActionByLabel('Excluir');
                                z.component.alert.clickButton('Sim');
                                return h.aguardaMensagem();
                            }
                            else
                                return h.mensagemGrid();
                        });
                    }
                    else
                        return existeProduto;
                });
            }
            else
                return existeSetor;
        });
    };
    
    this.excluirProdutosKDS = function(setor, produto){
        return self.selecionarSetor(setor).then(function(existeSetor){
            if(existeSetor === true){
                return self.selecionarProdutoSetor(produto).then(function(existeProduto){
                    if(existeProduto === true){
                        h.fechaTela();
                        return h.gridSemRegistros('17037838451122297446991').then(function(semRegistros){
                            //se existir produtos cadastrados seleciona todos no grid e exclui
                            if(!semRegistros){
                                z.widget.grid.checkAllRows('17037838451122297446991');
                                z.component.alert.clickButton('Sim');
                                z.component.footer.clickCenterActionByLabel('Excluir');
                                z.component.alert.clickButton('Sim'); 
                                return h.aguardaMensagem();
                            }
                            else
                                return h.mensagemGrid();
                        });
                    }
                    else
                        return existeProduto;
                });
            }
            else
                return existeSetor;
        });
    };

    this.excluirSetorLoja = function(unidade, loja, setor){
        return self.selecionarUnidade(unidade).then(function(existeUnidade){
            if(existeUnidade === true){
                return self.selecionarLoja(loja).then(function(existeLoja){
                    if(existeLoja === true){
                        return self.selecionarSetorLoja(setor).then(function(existeSetor){
                            if(existeSetor === true){
                                z.component.footer.clickCenterActionByLabel('Excluir');
                                z.component.alert.clickButton('Sim'); 
                                return h.aguardaMensagem();                  
                            }
                            else
                                return existeSetor;
                        });
                    }
                    else
                        return existeLoja;
                });
            }
            else
                return existeUnidade;
        });
    };

    this.excluirSetorUnidade = function(unidade, setor){
        return self.selecionarUnidade(unidade).then(function(existeUnidade){
            if(existeUnidade === true){
                return self.selecionarSetorUnidade(setor).then(function(existeSetor){
                    if(existeSetor === true){
                        z.component.footer.clickCenterActionByLabel('Excluir');
                        z.component.alert.clickButton('Sim');
                        return h.aguardaMensagem();
                    }
                    else
                        return existeSetor;
                });
            }
            else
                return existeUnidade;
        });
    };
}
module.exports = new kds();