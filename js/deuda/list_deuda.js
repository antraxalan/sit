  
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
  tx.executeSql('select codconcepto,codcliente,nombre,codart,desart,tipoarticulo,sum(saldocajas) saldocajas,sum(saldounidades) saldounidades, sum(prestcajas) prestcajas,sum(prestunidades) prestunidades from( select CodConcepto,a.CodCliente CodCliente,nombre, a.codart CodArt,desart,tipoarticulo,Sum(DUnidades-HUnidades)/CantxEmpaque saldocajas,Sum(DUnidades-HUnidades) saldounidades, 0 PrestCajas, 0 PrestUnidades, CodBotella,CodCaja, CantxEmpaque from Detalle a inner join Articulo b on a.CodArt=b.CodArt inner join cliente c on a.codcliente=c.codcliente where CodConcepto=1600 and a.codcliente=? group by CodConcepto,a.CodCliente,nombre,a.CodArt,desart,tipoarticulo,CantxEmpaque, CodBotella,CodCaja,CantxEmpaque having Sum(Debe-Haber)<>0 or Sum(DUnidades-HUnidades)/CantxEmpaque<>0 or Sum(DUnidades-HUnidades)<>0 UNION select 1600 CodConcepto,a.CodCliente CodCliente,nombre, a.codCaja CodArt,b.desart,tipoarticulo,0 saldocajas,0 saldounidades,Sum(Caja) Prestcajas,Sum(Caja) PrestUnidades,  a.CodBotella,a.CodCaja,cantxempaque from TempVenta a inner join Articulo b on a.Codcaja=b.codart inner join cliente c on a.codcliente=c.codcliente where a.CodCaja>0 group by a.CodCliente,nombre,a.CodCaja,b.desart,tipoarticulo,CantxEmpaque, a.CodBotella,a.CodCaja UNION select 1600 CodConcepto,a.CodCliente CodCliente,nombre, a.codBotella CodArt,b.desart,tipoarticulo,0 saldocajas,0 saldounidades,Sum(Caja) Prestcajas,Sum(Unidad+caja*cantxempaque) PrestUnidades,  a.CodBotella,a.CodCaja,cantxempaque from TempVenta a inner join Articulo b on a.Codbotella=b.codart inner join cliente c on a.codcliente=c.codcliente where a.CodBotella>0 group by a.CodCliente,nombre,a.CodBotella,b.desart,tipoarticulo,CantxEmpaque, a.CodBotella,a.CodCaja) group by codconcepto,codcliente,nombre,codart,desart,tipoarticulo order by tipoarticulo desc,codart', [id_cliente], querySuccess_deuda, errorCB_list_deuda2);
}




function querySuccess_deuda_articulos(tx, results_art) {
  var len = results_art.rows.length;

  var tipo;
  var count=0;

  total_venta=0;
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



