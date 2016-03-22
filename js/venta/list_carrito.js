
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;


function queryDB_carrito(tx) {         
  tx.executeSql('select IdArt ,IdCli ,Calibre ,Empaque ,Precio ,Caja ,Unidad, CajasCamion, CodMarca, DesArt, CodCaja, CodBotella, CodCliente from TEMPVENTA WHERE IdCli=?', [id_cliente], querySuccess_carrito, errorCB_list_carrito);
}

function querySuccess_carrito(tx, results) { 
  var len = results.rows.length;
  var lista_contenido='';
  var aux;
  var disabled;
  var precio_total=0;
  lista_contenido='<div style="display:none;"><button type="button" class="class_confirmaciones btn_confirmar_ventas_global" data-theme="b">CONFIRMAR PEDIDO<span style="box-shadow:-1px -1px 4px 1px gray inset;" class="ui-li-count total_carrito_val ui-page-theme-a">0.00 Bs.</span></button></div>';
  lista_contenido+='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Cobros...">';
  for (var i = 0; i < len; i++) {

    var co_ma= results.rows.item(i).CodMarca;
    if(!(co_ma=="18" || co_ma=="25" || co_ma=="35" || co_ma=="50" || co_ma=="70" || co_ma=="94")){ 
      co_ma="999";
    }

    if(results.rows.item(i).CajasCamion===null){
      disabled='class="ui-disabled"';
    }else{
      disabled='';
    }
    lista_contenido +='<li><a href="#" '+disabled+'>';
    lista_contenido +='<img src="img/marcas/'+co_ma+'.png">';
    lista_contenido +='<h2>'+results.rows.item(i).IdArt+' - '+results.rows.item(i).DesArt+'</h2>';
    if(results.rows.item(i).Cajas!='0'){
      aux=parseFloat(results.rows.item(i).Importe)/parseFloat(results.rows.item(i).Cajas);
    }else{
      aux=0;
    }
    var e = results.rows.item(i).Empaque;
    var c = results.rows.item(i).Caja;
    var p = results.rows.item(i).Precio;
    var u = results.rows.item(i).Unidad;
    var sub_caj=parseFloat(c*p);
    var sub_uni=parseFloat(u*(p/e)).toFixed(2);
    var sub = parseFloat(sub_caj)+parseFloat(sub_uni);

    precio_total=precio_total+sub;

    lista_contenido += '<div class="ui-grid-c">';
    lista_contenido += '<div class="ui-block-a"><p>'+results.rows.item(i).Caja+' caja(s)</p></div>';
    lista_contenido += '<div class="ui-block-b"><p>'+results.rows.item(i).Unidad+' unidad(es)</p></div>';
    lista_contenido += '<div class="ui-block-c"><p>Precio/Caja <strong>'+results.rows.item(i).Precio.toFixed(2)+' Bs.</strong></p></div>';
    lista_contenido += '<div class="ui-block-d price"><strong>'+sub.toFixed(2)+' Bs.</strong></div>';
    lista_contenido += '</div></a>';

    lista_contenido +='<a href="#add_venta_popup" '+disabled+' class="add_venta_popup_class_old" data-rel="popup" codigo-venta="'+results.rows.item(i).IdArt+'" last-price="'+results.rows.item(i).Precio+'" cajas-camion="'+results.rows.item(i).CajasCamion+'" calibre="'+results.rows.item(i).Calibre+'" cant-empaque="'+results.rows.item(i).Empaque+'"  caj-adq="'+results.rows.item(i).Caja+'" uni-adq="'+results.rows.item(i).Unidad+'">Historial</a></li>';
  }
  
  lista_contenido +='<li data-icon="false"><a href="#" class="total_li">';
  lista_contenido +='<div class="ui-grid-c">';
  lista_contenido +='<div class="ui-block-a" align="center" ></div>';
  lista_contenido +='<div class="ui-block-b" align="center" style="margin-top: 4px; font-size: 16px;"><strong >COMPRA TOTAL</strong></div>';
  lista_contenido +='<div class="ui-block-c" align="center" ></div>';
  lista_contenido +='<div class="ui-block-d" align="center" style="margin-top: 4px; font-size: 16px;"><strong class="total_carrito_val">0.00 Bs.</strong></div>';
  lista_contenido +='</div>';
  lista_contenido +='</a></li>';

  lista_contenido +='</ul>';
  lista_contenido +='<div style="display:none;"><button type="button" class="class_confirmaciones btn_confirmar_ventas_global" data-theme="b">CONFIRMAR PEDIDO<span style="box-shadow:-1px -1px 4px 1px gray inset;" class="ui-li-count total_carrito_val ui-page-theme-a">0.00 Bs.</span></button></div>';


  if(len<=0){
    lista_contenido= '<h3 align="center">Sin Compra. <br>Por favor vuelva a la pestaña "Productos" y agregue algun item o proceda con el siguiente paso.</h3>';
  }
  $('.list_carrito_venta').html(lista_contenido);
  $(".list_carrito_venta").trigger("create");
  $('.total_carrito_input').val(precio_total.toFixed(2));
  precio_total=precio_total.toFixed(2)+' Bs.';

  $('.total_carrito_val').html(precio_total);
  
  var aux_tot_carr_in = $('.total_carrito_input').val();
  aux_tot_carr_in=parseFloat(aux_tot_carr_in).toFixed(2);
  if(aux_tot_carr_in>0){
    $('.btn_confirmar_ventas_vacia_next').hide();
    $('.btn_confirmar_ventas_cobrar_next').show();
  }else{
    $('.btn_confirmar_ventas_vacia_next').show();
    $('.btn_confirmar_ventas_cobrar_next').hide();
  }

}

function errorCB_list_carrito(err) {
  alert("Error processing carrito SQL: "+err.code);
}

function cargar_carrito_venta_list(cli) {
  id_cliente=cli;
  db.transaction(queryDB_carrito, errorCB_list_carrito);
}

function cargar_listas (id_c){
  cargar_art_list(id_c);
  cargar_carrito_venta_list(id_c)
}


