  
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente;

// var art_codart        = [];
// var art_cantxempaque  = [];
// var art_codbotella    = []; 
// var art_codcaja       = []; 

function queryDB_todos_articulos2(tx) {         
  tx.executeSql('select CodArt,TipoArticulo,CantxEmpaque,CodBotella,CodCaja from ARTICULO', [], querySuccess_deuda_articulos, errorCB_todos_articulos2);
}

function queryDB_consolidar(tx) {         
  tx.executeSql('select IdArt, TipoDctoM, CodConcepto,CodCliente,Nombre,CodArt,DesArt,TipoArticulo,Precio, sum(Prestcajas) Cajas,sum(Prestunidades) Unidades,CantxEmpaque from (select IdArt,1 TipoDctoM, 1400 CodConcepto,a.CodCliente,Nombre, IdArt CodArt,b.DesArt,"V" TipoArticulo,Precio Precio,Caja Prestcajas,Unidad PrestUnidades, 0 CodBotella,0 CodCaja,Empaque CantxEmpaque from TempVenta a inner join Articulo b on a.IdArt=b.CodArt inner join cliente c on a.CodCliente=c.CodCliente group by IdArt,Nombre,Precio,b.DesArt,Caja,Unidad,Empaque,a.CodCliente UNION select IdArt,1 TipoDctoM, 1600 CodConcepto,a.CodCliente CodCliente,Nombre, a.codCaja CodArt,b.DesArt,TipoArticulo,0 Precio,Sum(Caja) Prestcajas,Sum(Caja) PrestUnidades, a.CodBotella,a.CodCaja,CantxEmpaque from TempVenta a inner join Articulo b on a.Codcaja=b.CodArt inner join cliente c on a.CodCliente=c.CodCliente where a.CodCaja>0 group by a.CodCliente,Nombre,a.CodCaja,b.DesArt,TipoArticulo,CantxEmpaque, a.CodBotella,a.CodCaja,IdArt UNION select IdArt,1 TipoDctoM, 1600 CodConcepto,a.CodCliente CodCliente,Nombre, a.codBotella CodArt,b.DesArt,TipoArticulo,0 Precio,Sum(Caja) Prestcajas,Sum(Unidad+caja*CantxEmpaque) PrestUnidades, a.CodBotella,a.CodCaja,CantxEmpaque from TempVenta a inner join Articulo b on a.Codbotella=b.CodArt inner join cliente c on a.CodCliente=c.CodCliente where a.CodBotella>0 group by a.CodCliente,Nombre,a.CodBotella,b.DesArt,TipoArticulo,CantxEmpaque, a.CodBotella,a.CodCaja,IdArt ) group by CodConcepto,CodCliente,Nombre,CodArt,DesArt,TipoArticulo,IdArt,CantxEmpaque,Precio,TipoDctoM order by IdArt,TipoArticulo desc,CodArt', [], querySuccess_consolidar, errorCB_consolidar2);
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
  // alert(art_codart.length);
}

function querySuccess_consolidar(tx, results) {
  alert("success");
  
}

function errorCB_consolidar(err) {
  alert("Error processing consolidar SQL: "+err.code+" Mensaje: "+err.message);
}
function errorCB_consolidar2(err) {
  alert("Error processing consolidar2 SQL: "+err.code+" Mensaje: "+err.message);
}
function errorCB_todos_articulos2(err) {
  alert("Error processing consolidar last SQL: "+err.code+" Mensaje: "+err.message);
}

function cargar_consolidar_script(cli) {
  id_cliente=cli;
  // db.transaction(queryDB_todos_articulos2, errorCB_todos_articulos2);
  db.transaction(queryDB_consolidar, errorCB_consolidar);
}



