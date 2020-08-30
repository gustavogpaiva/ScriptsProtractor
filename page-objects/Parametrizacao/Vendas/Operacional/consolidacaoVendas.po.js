var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var consolidacaoVendas = function(){
    var self = this;
    
    //Abre o filtro da tela caso esteja fechado
    this.abrirFiltro = function(){
       z.component.floatingControl.open();
       z.component.floatingControl.selectAction('search');
       z.component.floatingControl.selectAction('filter'); 
    };
    //Apaga os dados nos campos do filtro.
    this.limparFiltro = function(){
        z.component.footer.clickCenterActionByIcon('close-x');
    }; 
    //Seleciona uma unidade no filtro.
    this.selecionarUnidade = function(unidade){
        h.filtroUnidade();
    };
    //Seleciona uma ou mais lojas no filtro.
    this.selecionarLoja = function(loja){
        h.filtroLoja();
    }
    //Seleciona um ou mais caixas no filtro.
    this.selecionarCaixa = function(caixa){
        z.field.selectMultiple.click('CDCAIXA', 'NMCAIXA', caixa);  
    };
    //Seleciona um tipo de retirada
    this.selecionarTipoRetirada = function(tipoRetirada){
        z.field.fieldFunctions.click('NMTIPORETI');
        h.getIdGrid().then(function(idGrid){
            h.gridSemRegistros().then(function(semRegistros){
                if(!semRegistros){
                    z.widget.grid.click('CDTIPORETI', tipoRetirada, idGrid);
                }
                else
                    z.component.footer.clickLeftActionByLabel('Cancelar');
            });
        });
    };
    //Seleciona um setor
    this.selecionarSetor = function(setor){
        z.field.fieldFunctions.click('NMSETOR');
        h.getIdGrid().then(function(idGrid){
            h.gridSemRegistros().then(function(semRegistros){
                if(!semRegistros){
                    z.widget.grid.click('CDSETOR', setor, idGrid);
                }
                else
                    z.component.footer.clickLeftActionByLabel('Cancelar');
            });
        });
    };
    //Seleciona o período de vendas 
    this.selecionarPeriodo = function(periodo){
        var arrayDatas = periodo.split(' - ');
        h.selectIntervalDate('DTVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };
    //Seleciona um ou mais clientes
    this.selecionarCliente = function(cliente){
        z.field.selectMultiple.click('CDCLIENTE', 'NMRAZSOCCLIE', cliente);
    };
    //Seleciona um ou mais tipos de consumidores 
    this.selecionarTipoConsumidor = function(tipoConsumidor){
        z.field.selectMultiple.click('CDTIPOCONS', 'NMTIPOCONS', tipoConsumidor);
    };
    //
    this.selecionarCentroCusto = function(centroCusto){
        z.field.selectMultiple.click('CDCCUSCLIE', 'NMCCUSCLIE', centroCusto);
    };
    //
    this.selecionarVenda = function(venda){
        z.field.selectMultiple.click('NRSEQVENDA', 'JNRSEQVENDA', venda);
    };
    //
    this.selecionarProduto = async function(produto){
        if(await h.campoClicavel('CDPRODUTO')){
            z.field.fieldFunctions.click('CDPRODUTO');
            browser.sleep(5000);
            //obtem o id do grid do filtro
            var idGrid = await h.getIdGrid();
            for (var i in produto) {
                //verifica se o widget de pesquisa está aberto
                if(await z.component.floatingControl.isOpened()){
                    //se foi feita uma pesquisa apaga o valor digitado no campo
                    if(await z.util.elementExists(by.css('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching'))){
                        $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
                    }
                    //clica novamente no campo de pesquisa para ser preenchido
                    $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').click();
                }
                else{
                    z.component.floatingControl.toggle();
                    z.component.floatingControl.selectAction('search');
                }
                browser.sleep(5000);
                //preenche o campo de pesquisa com os nomes dos produtos presentes no array de produto
                $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto[i]);    
                
                browser.sleep(5000);
                //verifica se o produto existe no grid e seleciona
                if(await z.widget.grid.rowExists('NMPRODUTO', produto[i], idGrid)){  
                    z.widget.grid.checkRowByValue('NMPRODUTO', produto[i], idGrid);
                }
            }
            z.component.footer.clickRightActionByLabel('Ok');                    
        }
    };
    //
    this.agruparItens = function(opcao){
        z.field.selectNative.click('TODASNF2', opcao);
    };
    //
    this.itensNaoConsolidado = function(opcao){
        h.selectNative('TODASNF', opcao);
    };
    //
    this.filtrarConsolidacao = function(){
        z.component.footer.clickRightActionByLabel('Filtrar');
    };
    //verifica se o grid possui registros para o período 
    this.gridPossuiRegistros = async function(){
        //verifica se o grid está sem registros ou se foi preenchido com informações
        browser.sleep(5000);
        return (!await h.gridSemRegistros(await h.getIdGrid()));
    };
};
module.exports = new consolidacaoVendas();