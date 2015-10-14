
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente_tablita;
function cargar_info_cliente_html( id_cli ) {
    id_cliente_tablita=id_cli;



    // db.transaction(populateDB_art_cli_det, errorCB_tablita, queryDB_info_tablita);
    // db.transaction(insertDB_articulo, errorCB_tablita);
    // db.transaction(insertDB_cliente, errorCB_tablita);
    // db.transaction(insertDB_detalle, errorCB_tablita);

queryDB_info_tablita();
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
function queryDB_info_tablita() {
db.transaction(queryDB_tablita, errorCB_tablita2);

}
function queryDB_tablita(tx) {
    alert("preparando query");
    // tx.executeSql('SELECT * FROM CLIENTE', [], querySuccess_tablita, errorCB_tablita);

    // tx.transaction('SELECT a.codcliente codcliente,Nombre, sum(debe-haber) SaldoBs, 0 CajaPac,0 CajaHuari, 0 CajaLitro'+
    //     'from detalle a inner join cliente b on a.codcliente=b.codcliente'+
    //     'where codconcepto=1400 and a.codcliente=?'+
    //     'group by a.codcliente,nombre',
    //     [id_cliente_tablita], querySuccess_tablita, errorCB_tablita);

 // tx.transaction('SELECT a.codcliente codcliente,Nombre, sum(debe-haber) SaldoBs, 0 CajaPac,0 CajaHuari, 0 CajaLitro from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=? group by a.codcliente,nombre', [id_cliente_tablita], querySuccess_tablita, errorCB_tablita);

    
// tx.transaction('select a.codcliente,Nombre, sum(debe-haber) SaldoBs from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=? group by a.codcliente,nombre',[id_cliente_tablita], querySuccess_tablita, errorCB_tablita);
tx.executeSql('select a.codcliente,Nombre, debe, haber from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=100',[], querySuccess_tablita, errorCB_tablita);

// tx.executeSql('select * from DETALLE',[], querySuccess_tablita, errorCB_tablita);

}



function querySuccess_tablita(tx, results) {
    // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
    alert("query ejeutada");
    var len = results.rows.length;
    var SaldoBs     =0;
    var CajaPac     =0;
    var CajaHuari   =0;
    var CajaLitro   =0;
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
    alert("Error #"+err.code+" mensaje: "+err.message);
}
function errorCB_tablita2(err) {
    alert("2Error #"+err.code+" mensaje: "+err.message);
}
// function errorCB_tablita(xhr, ajaxOptions, thrownError) {
//     alert("1: "+xhr.status);
//     alert("2: "+thrownError);
// }

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


function populateDB_art_cli_det(tx) {
    //----- alert("19");
    tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DETALLE (TipoDcto,NroDcto,Apu,Fecha,FechaVto,TipoDctoM,NroDctoM,Precio,Tc,CodConcepto,CodCliente,Debe,Haber,CodArt,Dcajas,Hcajas,Dunidades,Hunidades)');

}



// function populateDB_articulo(tx) {
//     //----- alert("19");
//     tx.executeSql('DROP TABLE IF EXISTS ARTICULO');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado)');
// }
// function populateDB_cliente(tx) {
//     //----- alert("13");
//     tx.executeSql('DROP TABLE IF EXISTS CLIENTE');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTE (CodCliente,Nombre,RazonSocial,Direccion,Nit,NroTelefono1,NroTelefono2,CodZona,DesZona,CodPersonal,DesPersonal,CodRuta,DesRuta)');
// }
// function populateDB_detalle(tx) {
//     //----- alert("18");
//     tx.executeSql('DROP TABLE IF EXISTS DETALLE');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS DETALLE (TipoDcto,NroDcto,Apu,Fecha,FechaVto,TipoDctoM,NroDctoM,Precio,Tc,CodConcepto,CodCliente,Debe,Haber,CodArt,Dcajas,Hcajas,Dunidades,Hunidades)');
// }


// function llenar_solo_para_browser(tx) {
//     //----- alert("18");
//     tx.executeSql('DROP TABLE IF EXISTS DETALLE');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS DETALLE (TipoDcto,NroDcto,Apu,Fecha,FechaVto,TipoDctoM,NroDctoM,Precio,Tc,CodConcepto,CodCliente,Debe,Haber,CodArt,Dcajas,Hcajas,Dunidades,Hunidades)');
//     db.transaction(populateDB_articulo, errorCB_cargar,successCB_info_articulo);
//     db.transaction(populateDB_cliente, errorCB_cargar,successCB_info_cliente);
//     db.transaction(populateDB_detalle, errorCB_cargar,successCB_info_detalle);
//     call_insert_db_detalle(resp);
// }

function insertDB_articulo(tx) {
    var d1=1;
    for (var i = 0; i < d1.length; i++) {
        tx.executeSql('INSERT INTO ARTICULO (CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado) VALUES ("15","IMPERIAL","170","IMPERIAL 620CC.","IMPERIAL 620CC.","0.62","P","12","82.29","88.5","88.5","3020","BOTELLA 620 CC.","24","4020","CAJA PLAST.TAQ.12 BOT.","30","33","A")');
    };
};                               


function insertDB_cliente(tx) {
    var d1=1;
    for (var i = 0; i < d1.length; i++) {
        tx.executeSql('INSERT INTO CLIENTE (CodCliente","Nombre,RazonSocial,Direccion,Nit,NroTelefono1,NroTelefono2,CodZona,DesZona,CodPersonal,DesPersonal,CodRuta,DesRuta) VALUES ("100","EVELIN  MARIA CARDENAS TROCHE","Restaurant Rincon Chume±o","Av. Jaime Zuda±es # 1310 Zona alto sopoc","2234836017","73007643","201","SOPOCACHI","1","CENTRAL","1","SOPOCACHI")');
    };
};
function insertDB_detalle(tx) {
    var d1=1;
    for (var i = 0; i < d1.length; i++) {
        tx.executeSql('INSERT INTO DETALLE (TipoDcto,NroDcto,Apu,Fecha,FechaVto,TipoDctoM,NroDctoM,Precio,Tc,CodConcepto,CodCliente,Debe,Haber,CodArt,Dcajas,Hcajas,Dunidades,Hunidades) VALUES ("0","0","0","04/08/2010 00:00","04/08/2010 00:00","2","1086","0","0","1400","214","165","0","0","0.0000","0","0","0")');
    };
};




