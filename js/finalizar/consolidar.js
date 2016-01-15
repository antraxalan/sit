  
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;
var max1;
var max6;

// var art_codart        = [];
// var art_cantxempaque  = [];
// var art_codbotella    = []; 
// var art_codcaja       = []; 

function queryDB_todos_maximo(tx) {         
  tx.executeSql('select max(NroDctoM) as max_doc1, (select max(NroDctoM) as max_doc from detalle where TipoDctoM=6) as max_doc6 from detalle where TipoDctoM=1', [], querySuccess_deuda_maximos, errorCB_todos_maximos2);
}

function queryDB_consolidar(tx) {         
  tx.executeSql('select IdArt, TipoDctoM, CodConcepto,CodCliente,Nombre,CodArt,DesArt,TipoArticulo,Precio, sum(Prestcajas) Cajas,sum(Prestunidades) Unidades,CantxEmpaque from (select IdArt,1 TipoDctoM, 1400 CodConcepto,a.CodCliente,Nombre, IdArt CodArt,b.DesArt,"V" TipoArticulo,Precio Precio,Caja Prestcajas,Unidad PrestUnidades, 0 CodBotella,0 CodCaja,Empaque CantxEmpaque from TempVenta a inner join Articulo b on a.IdArt=b.CodArt inner join cliente c on a.CodCliente=c.CodCliente group by IdArt,Nombre,Precio,b.DesArt,Caja,Unidad,Empaque,a.CodCliente UNION select IdArt,1 TipoDctoM, 1600 CodConcepto,a.CodCliente CodCliente,Nombre, a.codCaja CodArt,b.DesArt,TipoArticulo,0 Precio,Sum(Caja) Prestcajas,Sum(Caja) PrestUnidades, a.CodBotella,a.CodCaja,CantxEmpaque from TempVenta a inner join Articulo b on a.Codcaja=b.CodArt inner join cliente c on a.CodCliente=c.CodCliente where a.CodCaja>0 group by a.CodCliente,Nombre,a.CodCaja,b.DesArt,TipoArticulo,CantxEmpaque, a.CodBotella,a.CodCaja,IdArt UNION select IdArt,1 TipoDctoM, 1600 CodConcepto,a.CodCliente CodCliente,Nombre, a.codBotella CodArt,b.DesArt,TipoArticulo,0 Precio,Sum(Caja) Prestcajas,Sum(Unidad+caja*CantxEmpaque) PrestUnidades, a.CodBotella,a.CodCaja,CantxEmpaque from TempVenta a inner join Articulo b on a.Codbotella=b.CodArt inner join cliente c on a.CodCliente=c.CodCliente where a.CodBotella>0 group by a.CodCliente,Nombre,a.CodBotella,b.DesArt,TipoArticulo,CantxEmpaque, a.CodBotella,a.CodCaja,IdArt ) group by CodConcepto,CodCliente,Nombre,CodArt,DesArt,TipoArticulo,IdArt,CantxEmpaque,Precio,TipoDctoM order by IdArt,TipoArticulo desc,CodArt', [], querySuccess_consolidar, errorCB_consolidar2);
}


function querySuccess_deuda_maximos(tx, results_max) {
  var len = results_max.rows.length;
  alert('querySuccess_deuda_maximos len:'+len);
  max1=0;
  max6=0;
  for (var i = 0; i < len; i++) {
    max1=results_max.rows.item(i).max_doc1;
    max6=results_max.rows.item(i).max_doc6;
    // alert('max_doc1:'+max1);
    // alert('max_doc6:'+max6);

    if(max1===null || max1=='0'){
      max1=0;
    }

    if(max6===null || max6=='0'){
      max6=0;
    }
  }
}

function querySuccess_consolidar(tx, results) {

  var len = results.rows.length;
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var fecha_actual =((''+day).length<2 ? '0' : '') + day + '/' +((''+month).length<2 ? '0' : '') + month + '/' +    d.getFullYear() ;

  alert('max_doc1:'+max1);
  alert('max_doc6:'+max6);

  var c_IdArt;
  var c_TipoDctoM;
  var c_CodConcepto;
  var c_CodCliente;
  var c_Nombre;
  var c_CodArt;
  var c_DesArt;
  var c_TipoArticulo;
  var c_Precio;
  var c_Cajas;
  var c_Unidades;
  var c_CantxEmpaque;

  for (var i = 0; i < len; i++) {
    c_IdArt         =results.rows.item(i).IdArt;
    c_TipoDctoM     =results.rows.item(i).TipoDctoM;
    c_CodConcepto   =results.rows.item(i).CodConcepto;
    c_CodCliente    =results.rows.item(i).CodCliente;
    c_Nombre        =results.rows.item(i).Nombre;
    c_CodArt        =results.rows.item(i).CodArt;
    c_DesArt        =results.rows.item(i).DesArt;
    c_TipoArticulo  =results.rows.item(i).TipoArticulo;
    c_Precio        =results.rows.item(i).Precio;
    c_Cajas         =results.rows.item(i).Cajas;
    c_Unidades      =results.rows.item(i).Unidades;
    c_CantxEmpaque  =results.rows.item(i).CantxEmpaque;
    alert(' c_IdArt='+c_IdArt+' c_TipoDctoM='+c_TipoDctoM+' c_CodConcepto='+c_CodConcepto+' c_CodCliente='+c_CodCliente+' c_Nombre='+c_Nombre+' c_CodArt='+c_CodArt+' c_DesArt='+c_DesArt+' c_TipoArticulo='+c_TipoArticulo+' c_Precio='+c_Precio+' c_Cajas='+c_Cajas+' c_Unidades='+c_Unidades+' c_CantxEmpaque='+c_CantxEmpaque);
    
  }
  alert('querySuccess_consolidar len:'+len);
}

function errorCB_consolidar(err) {
  alert("Error processing consolidar SQL: "+err.code+" Mensaje: "+err.message);
}
function errorCB_consolidar2(err) {
  alert("Error processing consolidar2 SQL: "+err.code+" Mensaje: "+err.message);
}
function errorCB_todos_maximos2(err) {
  alert("Error processing consolidar last SQL: "+err.code+" Mensaje: "+err.message);
}

function cargar_consolidar_script(cli) {
  id_cliente=cli;
  db.transaction(queryDB_todos_maximo, errorCB_todos_maximos2);
  db.transaction(queryDB_consolidar, errorCB_consolidar);
}



