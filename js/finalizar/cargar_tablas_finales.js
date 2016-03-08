  
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;

function queryDB_datos_temp_venta(tx) {  
  tx.executeSql('select IdArt ,IdCli ,Calibre ,Empaque ,Precio ,Caja ,Unidad, CajasCamion, CodMarca, DesArt, CodCaja, CodBotella, CodCliente from TEMPVENTA WHERE IdCli=?', [id_cliente], querySuccess_datos_temp, errorCB_datos);
}


function querySuccess_datos_temp(tx, results) {
  // alert("querySuccess_consolidar");
  var len = results.rows.length;
  var c_IdArt;
  var c_DesArt;
  var c_Precio;
  var c_Cajas;
  var c_Unidades;
  var tabla_venta='';
  tabla_venta+='<table class="resumen_tabla_g">';
  tabla_venta+='<thead>';
  tabla_venta+='<tr><td colspan="4" style="text-align:center;">Venta</td></tr>';
  tabla_venta+='<tr>';
  tabla_venta+='<td>Producto</td>';
  tabla_venta+='<td>Cajas</td>';
  tabla_venta+='<td>Unidades</td>';
  tabla_venta+='<td>Precio/Caja</td>';
  tabla_venta+='</tr>';
  tabla_venta+='</thead>';
  tabla_venta+='<tbody>';
  for (var i = 0; i < len; i++) {
    c_IdArt         =results.rows.item(i).IdArt;
    c_DesArt        =results.rows.item(i).DesArt;
    c_Precio        =parseFloat(results.rows.item(i).Precio);
    c_Cajas         =parseInt(results.rows.item(i).Caja);
    c_Unidades      =parseInt(results.rows.item(i).Unidad);
    tabla_venta+='<tr><td>'+c_IdArt+' - '+c_DesArt+'</td><td>'+c_Cajas+'</td><td>'+c_Unidades+'</td><td>'+c_Precio+'</td></tr>';
  }
  tabla_venta+='</tbody>';
  tabla_venta+='</table>';


  //START COBRANZA
  var count=0;
  var total_cobros=0;
  var tabla_cobros='';
  tabla_cobros+='<table class="resumen_tabla_g">';
  tabla_cobros+='<thead>';
  tabla_cobros+='<tr><td colspan="4" style="text-align:center;">Cobros</td></tr>';
  tabla_cobros+='<tr>';
  tabla_cobros+='<td width="33%">Saldo Anterior</td>';
  tabla_cobros+='<td width="33%">Saldo Actual</td>';
  tabla_cobros+='<td width="33%">A Cobrar</td>';
  tabla_cobros+='</tr>';
  tabla_cobros+='</thead>';
  tabla_cobros+='<tbody>';
  $(".editar_cobranza_class").each(function(index, el) {
    var aux_saldo = $(this).attr("saldo");
    var aux_nro = $(this).attr("nrodctom");
    if(aux_nro!='19999999999'){
      total_cobros = parseFloat(total_cobros)+parseFloat(aux_saldo);
    }
  });
  var lcl_cobro=localStorage.total_cobro;
  lcl_cobro = parseFloat(lcl_cobro);
  var aux_actual=total_cobros-lcl_cobro;
  if(lcl_cobro!=0){
    count = count+1;
  }
  tabla_cobros+='<tr><td>'+total_cobros+'</td><td>'+aux_actual+'</td><td>'+lcl_cobro+'</td></tr>';
  tabla_cobros+='</tbody>';
  tabla_cobros+='</table>';
  //END COBRANZA

  ////////////////////////////////////////////////////////////////////
  //START ENVASES
  ////////////////////////////////////////////////////////////////////
  var count2=0;
  var tabla_envases='';
  tabla_envases+='<table class="resumen_tabla_g">';
  tabla_envases+='<thead>';
  tabla_envases+='<tr><td colspan="4" style="text-align:center;">Envases</td></tr>';
  tabla_envases+='<tr>';
  tabla_envases+='<td width="64%">Descripción</td>';
  tabla_envases+='<td width="12%">Saldo Anterior</td>';
  tabla_envases+='<td width="12%">Saldo Actual</td>';
  tabla_envases+='<td width="12%">A Cobrar</td>';
  tabla_envases+='</tr>';
  tabla_envases+='</thead>';
  tabla_envases+='<tbody>';
  $(".editar_deuda_class").each(function(index, el) {
    var cod_env = $(this).attr("cod-art");
    var des_env = $(this).attr("des-art");
    var cob_env = $(this).attr("deuda-cob");
    var sal_env = $(this).attr("saldo-t");
    var pre_env = $(this).attr("prestamo-t");
    if(cob_env!='0'){
      tabla_envases+='<tr><td>'+cod_env+' - '+des_env+'</td><td>'+cob_env+'</td><td>'+sal_env+'</td><td>'+pre_env+'</td></tr>';
      count2                 =count2+1;
    }
  });
  tabla_envases+='</tbody>';
  tabla_envases+='</table>';
  //END ENVASES
  var tablas='';
  if(len>0){
    tablas+=tabla_venta;
  }
  if(count>0){
    tablas+=tabla_cobros;
  }
  if(count2>0){
    tablas+=tabla_envases;
  }

  if((len+count+count2)>0){
    $("#fin_popup_2").popup("open");
    $('.tables_resumen').html(tablas);
    $('.tables_resumen').trigger('create');
  }else{
    alert("Usted no realizó ninguna transacción. Por favor ingrese alguna operación.");
    window.location.href = "index.html#venta";
  }
}


function errorCB_consolidar(err) {
  alert("Error processing consolidar SQL: "+err.code+" Mensaje: "+err.message);
}
function errorCB_datos(err) {
  alert("Error processing consolidar2 SQL: "+err.code+" Mensaje: "+err.message);
}


function cargar_tablas_finales(cli) {
  id_cliente=cli;
  db.transaction(queryDB_datos_temp_venta, errorCB_consolidar);
}



