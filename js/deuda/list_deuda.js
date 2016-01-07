  
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;

var art_codart        = [];
var art_cantxempaque  = [];
var art_codbotella    = []; 
var art_codcaja       = []; 

function queryDB_todos_articulos(tx) {         
  tx.executeSql('select CodArt,TipoArticulo,CantxEmpaque,CodBotella,CodCaja from ARTICULO', [], querySuccess_deuda_articulos, errorCB_todos_articulos);
}
function queryDB_deuda(tx) {         
  tx.executeSql('select CodConcepto,CodCliente,nombre,CodArt,desart,TipoArticulo,sum(saldocajas) SaldoCajas,sum(saldounidades) SaldoUnidades, sum(prestcajas) PrestCajas,sum(prestunidades) PrestUnidades from( select CodConcepto,a.CodCliente CodCliente,nombre, a.codart CodArt,desart,tipoarticulo,Sum(DUnidades-HUnidades)/CantxEmpaque saldocajas,Sum(DUnidades-HUnidades) saldounidades, 0 PrestCajas, 0 PrestUnidades, CodBotella,CodCaja, CantxEmpaque from Detalle a inner join Articulo b on a.CodArt=b.CodArt inner join cliente c on a.codcliente=c.codcliente where CodConcepto=1600 and a.codcliente=? group by CodConcepto,a.CodCliente,nombre,a.CodArt,desart,tipoarticulo,CantxEmpaque, CodBotella,CodCaja,CantxEmpaque having Sum(Debe-Haber)<>0 or Sum(DUnidades-HUnidades)/CantxEmpaque<>0 or Sum(DUnidades-HUnidades)<>0 UNION select 1600 CodConcepto,a.CodCliente CodCliente,nombre, a.codCaja CodArt,b.desart,tipoarticulo,0 saldocajas,0 saldounidades,Sum(Caja) Prestcajas,Sum(Caja) PrestUnidades,  a.CodBotella,a.CodCaja,cantxempaque from TempVenta a inner join Articulo b on a.Codcaja=b.codart inner join cliente c on a.codcliente=c.codcliente where a.CodCaja>0 group by a.CodCliente,nombre,a.CodCaja,b.desart,tipoarticulo,CantxEmpaque, a.CodBotella,a.CodCaja UNION select 1600 CodConcepto,a.CodCliente CodCliente,nombre, a.codBotella CodArt,b.desart,tipoarticulo,0 saldocajas,0 saldounidades,Sum(Caja) Prestcajas,Sum(Unidad+caja*cantxempaque) PrestUnidades,  a.CodBotella,a.CodCaja,cantxempaque from TempVenta a inner join Articulo b on a.Codbotella=b.codart inner join cliente c on a.codcliente=c.codcliente where a.CodBotella>0 group by a.CodCliente,nombre,a.CodBotella,b.desart,tipoarticulo,CantxEmpaque, a.CodBotella,a.CodCaja) group by codconcepto,codcliente,nombre,codart,desart,tipoarticulo order by tipoarticulo desc,codart', [id_cliente], querySuccess_deuda, errorCB_list_deuda2);
}




function querySuccess_deuda_articulos(tx, results_art) {
  var len = results_art.rows.length;

  var tipo;
  var count=0;

  for (var i = 0; i < len; i++) {
    tipo=results_art.rows.item(i).TipoArticulo;

    if(tipo=='C' || tipo=='B'){
      art_codart[count]        = parseInt(results_art.rows.item(i).CodArt);
      art_cantxempaque[count]  = parseInt(results_art.rows.item(i).CantxEmpaque);
      art_codbotella[count]    = parseInt(results_art.rows.item(i).CodBotella); 
      art_codcaja[count]       = parseInt(results_art.rows.item(i).CodCaja);
      count=count+1;
    }
  }
  alert(art_codart.length);
}

function querySuccess_deuda(tx, results) {
  alert("success");
  var len = results.rows.length;
  var lista_contenido='';

  // var aux;
  // var disabled;
  // var precio_total=0;
  // var color;
  // var fch;
  // var fch_vto;

  var codconcepto;
  var codcliente;
  var nombre;
  var codart;
  var desart;
  var tipoarticulo;
  var saldocajas;
  var saldounidades;
  var prestcajas;
  var prestunidades;

  var empaq;
  var codbot;
  var cobcaj;

  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var fecha_actual =((''+day).length<2 ? '0' : '') + day + '/' +((''+month).length<2 ? '0' : '') + month + '/' +    d.getFullYear() ;

  lista_contenido+='<button type="button" class="class_confirmaciones btn_confirmar_deuda" data-theme="b">CONFIRMAR COBRO</button>';
  lista_contenido+='<ul data-role="listview" data-split-icon="tag" data-inset="true" data-filter="true" data-filter-placeholder="Filtrar Cobro de Envases...">';

  for (var i = 0; i < len; i++) {

    codconcepto     =results.rows.item(i).CodConcepto;
    codcliente      =results.rows.item(i).CodCliente;
    nombre          =results.rows.item(i).nombre;
    codart          =results.rows.item(i).CodArt;
    desart          =$.trim(results.rows.item(i).desart);
    tipoarticulo    =results.rows.item(i).tipoarticulo;
    saldocajas      =results.rows.item(i).SaldoCajas;
    saldounidades   =results.rows.item(i).SaldoUnidades;
    prestcajas      =results.rows.item(i).PrestCajas;
    prestunidades   =results.rows.item(i).PrestUnidades;
 
    var index=$.inArray(codart,art_codart);

    empaq  =art_cantxempaque[index];
    codbot =art_codbotella[index]; 
    cobcaj =art_codcaja[index]; 

    var img='';
    var titulo='';
    var titulo2='';

    var deuda_t=0;
    var saldo_c_t=0;
    var saldo_u_t=0;

    if(tipoarticulo=='C'){
      img='caja.png';
      titulo='Caja(s) Prestada(s):';
      titulo2='Caja(s) Devuelta(s):';
      saldocajas=parseInt(saldocajas);
      prestcajas=parseInt(prestcajas);
      deuda_t=saldocajas+prestcajas;
      saldo_c_t=deuda_t;
      saldo_u_t=deuda_t;
    }
    if(tipoarticulo=='B'){
      img='botellita.png';
      titulo='Botella(s) Prestada(s):';
      titulo2='Botella(s) Devuelta(s):';
      saldounidades=parseInt(saldounidades);
      prestunidades=parseInt(prestunidades);
      deuda_t=saldounidades+prestunidades;
      saldo_c_t=0;
      saldo_u_t=deuda_t;
    }


    lista_contenido+= '<li>';
    lista_contenido+= '<a href="#">';
    lista_contenido+= '<img src="img/'+img+'" >';
    lista_contenido+= '<h2>codart='+codart+'- desart='+desart+' </h2>';
    // lista_contenido+= '<h2>codart='+codart+' <br>- desart='+desart+' <br>- codconcepto='+codconcepto+' <br>- codcliente='+codcliente+' <br>- nombre='+nombre+' <br>- codart='+codart+' <br>- desart='+desart+' <br>- tipoarticulo='+tipoarticulo+' <br>- saldocajas='+saldocajas+' <br>- saldounidades='+saldounidades+' prestcajas='+prestcajas+'<br>- prestunidades='+prestunidades+' <br>- empaq='+empaq+' <br>- codbot='+codbot+' <br>- cobcaj='+cobcaj+' <br> - deuda_t='+deuda_t+' <br> - saldo_c_t='+saldo_c_t+' <br> - saldo_u_t='+saldo_u_t+'</h2>';
    lista_contenido+= '<div class="ui-grid-c">';
    lista_contenido+= '<div class="ui-block-c" align="right"><p>'+titulo+'&nbsp</p></div>';
    lista_contenido+= '<div class="ui-block-b red" align="left"><p><strong>'+deuda_t+'</strong></p></div>';
    lista_contenido+= '<div class="ui-block-c" align="right"><p>'+titulo2+'&nbsp</p></div>';
    lista_contenido+= '<div class="ui-block-d " align="left" ><p class="html_cobrado_deuda"><strong>0</strong></p></div>';
    lista_contenido+= '</div>';
    lista_contenido+= '</a>';
    lista_contenido+= '<a href="#" class="editar_deuda_class" cod-art="'+codart+'" des-art="'+desart+'" tipo="'+tipoarticulo+'" saldo-cajas="'+saldo_c_t+'" saldo-unidades="'+saldo_u_t+'" cod-botella="'+codbot+'" cod-caja="'+cobcaj+'" cant-empaque="'+empaq+'" deuda-cob="0">SITRANS</a>';
    lista_contenido+= '</li>';



  }


  lista_contenido+='<button type="button" class="class_confirmaciones btn_confirmar_deuda" data-theme="b">CONFIRMAR COBRO</button>';
  lista_contenido +='</ul>';
  // lista_contenido +='<button type="button" data-theme="b">CONFIRMAR ORDEN<span class="ui-li-count total_carrito">0.00 Bs.</span></button>';
  $('.list_deuda').html(lista_contenido);
  $(".list_deuda").trigger("create");
  // precio_total=precio_total.toFixed(2)+' Bs';
  // $('.total_carrito').html(precio_total);
}

function errorCB_list_deuda(err) {
  alert("Error processing deuda SQL: "+err.code+" Mensaje: "+err.message);
}
function errorCB_list_deuda2(err) {
  alert("Error processing deuda2 SQL: "+err.code+" Mensaje: "+err.message);
}
function errorCB_todos_articulos(err) {
  alert("Error processing deuda last SQL: "+err.code+" Mensaje: "+err.message);
}

function cargar_deuda_list(cli) {
  id_cliente=cli;
  db.transaction(queryDB_todos_articulos, errorCB_todos_articulos);
  db.transaction(queryDB_deuda, errorCB_list_deuda);
}



