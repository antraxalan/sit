
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente_tablita;
function cargar_info_cliente_html( id_cli ) {
    id_cliente_tablita=id_cli;
    db.transaction(queryDB_info_tablita, errorCB_tablita);
    alert("id cliente: "+id_cli);

    // var num=16;
    // var mydata = [
    // {"Saldo":num, "Pac":"2", "Huari":"3", "Huari":"1"}
    // ];

    // $( '.tablita_info_cliente' ).html( "<table class='tablesaw' data-tablesaw-mode='swipe' id='tablita_registrar'><thead><tr><th scope='col'>Saldo</th><th scope='col'>Pac</th><th scope='col'>Huari</th><th scope='col'>Litro</th></tr></thead><tbody></tbody></table>" );

    // var tbody = $( '#tablita_registrar tbody' ), props = ["Saldo","Pac","Huari","Huari"];

    // $.each( mydata, function(i, value){
    //     var tr = $('<tr>');

    //     $.each(props, function(i, prop){
    //         $('<td>').html(value[prop]).appendTo(tr); 
    //     });

    //     tbody.append(tr);
    // });

    // // $('#tablita_registrar').table().data( "table" ).refresh();
    // $('#tablita_registrar').trigger('create');
}
function queryDB_info_tablita(tx) {
    alert("preparando query");
    // tx.executeSql('SELECT * FROM CLIENTE', [], querySuccess_tablita, errorCB_tablita);
    tx.executeSql(
        "select codcliente,nombre, sum(SaldoBs) SaldoBs,sum(CajaPac) CajaPac,sum(CajaHuari) CajaHuari,sum(cajaLitro) CajaLitro"+
        "from"+
        "(select a.codcliente codcliente,Nombre, sum(debe-haber) SaldoBs, 0 CajaPac,0 CajaHuari, 0 CajaLitro"+
            "from detalle a inner join cliente b on a.codcliente=b.codcliente"+
            "where codconcepto=1400 and a.codcliente=?"+
            "group by a.codcliente,nombre"+
            "UNION"+
            "select a.codcliente codcliente,Nombre, 0 SaldoBs, sum(dcajas-hcajas) CajaPac,0 CajaHuari, 0 CajaLitro"+
            "from detalle a inner join cliente b on a.codcliente=b.codcliente"+
            "where codconcepto=1600 and codart in (4020,4029)"+
            "and a.codcliente=?"+
            "group by a.codcliente,nombre"+
            "UNION"+
            "select a.codcliente codcliente,Nombre, 0 SaldoBs, 0 CajaPac,sum(dcajas-hcajas) CajaHuari, 0 CajaLitro"+
            "from detalle a inner join cliente b on a.codcliente=b.codcliente"+
            "where codconcepto=1600 and codart in (4079)"+
            "and a.codcliente=?"+
            "group by a.codcliente,nombre"+
            "UNION"+
            "select a.codcliente codcliente,Nombre, 0 SaldoBs, 0 CajaPac,0 CajaHuari, sum(dcajas-hcajas) CajaLitro"+
            "from detalle a inner join cliente b on a.codcliente=b.codcliente"+
            "where codconcepto=1600 and codart in (4010,4011)"+
            "and a.codcliente=?"+
            "group by a.codcliente,nombre"+
            ") Temp"+
"group by codcliente,nombre",
[id_cliente_tablita, id_cliente_tablita,id_cliente_tablita,id_cliente_tablita], querySuccess_tablita, errorCB_tablita);
}



function querySuccess_tablita(tx, results) {
    // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
    alert("query ejeutada");
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        SaldoBs     =results.rows.item(i).SaldoBs;
        CajaPac     =results.rows.item(i).CajaPac;
        CajaHuari   =results.rows.item(i).CajaHuari;
        CajaLitro   =results.rows.item(i).CajaLitro;
    }
alert(SaldoBs);
alert(CajaPac);
alert(CajaHuari);
alert(CajaLitro);


    // var tblContent='<form>';
    // tblContent+='<input id="filterTable-input" data-type="search">';
    // tblContent+='</form>';
    // tblContent+='<table data-role="table"  data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive selector_tabla">';
    // tblContent+='<thead>';
    // tblContent+='<tr>';

    // tblContent+='<th data-priority="persist">CodCliente</th>';
    // tblContent+='<th data-priority="2">Nombre</th>';
    // tblContent+='<th data-priority="1">RazonSocial</th>';
    // tblContent+='<th data-priority="3">Direccion</th>';
    // tblContent+='</tr>';
    // tblContent+='</thead>';
    // tblContent+='<tbody>';


    // var len = results.rows.length;
    // for (var i = 0; i < len; i++) {

    //     tblContent +='<tr><td>'; 

    //     tblContent+=results.rows.item(i).CodCliente     +'</td><td>'
    //     tblContent+=results.rows.item(i).Nombre         +'</td><td>'
    //     tblContent+=results.rows.item(i).RazonSocial    +'</td><td>'
    //     tblContent+=results.rows.item(i).Direccion      +'</td></tr>';
    // }
    // tblContent+="</tbody></table>";
    // // document.getElementById("tabla_info").innerHTML =tblContent;
    // $('#tabla_info').html(tblContent);
    // // $('#tabla_info').append(tblContent);
    // $("#tabla_info").trigger("create");
}


function errorCB_tablita(err) {
    alert("Error tabla: "+err.message);
}

// for (var i = 0; i < testResults.length; i++){
//     (function(i){
//         db.transaction(function(tx){
//             tx.executeSql(
//                 "SELECT * FROM ( " +
//                     "SELECT 'lab' AS table_name, id FROM lab_test_names " +
//                     "WHERE organizerClassId = ? " +
//                     "LIMIT 1 " +
//                     " ) " +
// "UNION " +
// "SELECT * FROM ( " + 
//     "SELECT 'rad' AS table_name, id FROM radiology_test_names " +
//     "WHERE organizerClassId = ? " +
//     "LIMIT 1 " +
//     " ) ",
//             [testClassId[i], testClassId[i]],
//             function(tx, results){
//                     //console.log("JSON.stringify(results.rows.item(0)) ==> " + JSON.stringify(results.rows.item(0)) );
//                     var tableName = results.rows.item(0).table_name;
//                     if (tableName == "lab"){
//                         console.log("this is a lab result entry");
//                         // rest of my arithmetic below if this is a lab result...
//                     } else { // else this is a radiology result entry
//                         console.log("this is a radiology result entry");
//                         // rest of my arithmetic below if this is a radiology result...
//                     }
//                 },
//                 function(tx, err){
//                     console.log("SQL Error");
//                     if (err) {
//                         console.log("ERROR " + err.code + ": " + err.message);
//                     }
//                 }
//             ); // end of tx.executeSql
//         }); // end of db.transaction
//     })(i) // closure
// }