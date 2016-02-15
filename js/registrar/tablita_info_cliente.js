
db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var id_cliente_tablita;
function cargar_info_cliente_html( id_cli ) {
    id_cliente_tablita=id_cli;
    var SaldoBs     =0;
    var CajaPac     =0;
    var CajaHuari   =0;
    var CajaLitro   =0;
    // db.transaction(populateDB_art_cli_det, errorCB_tablita, queryDB_info_tablita);
    // db.transaction(insertDB_articulo, errorCB_tablita);
    queryDB_info_tablita();

}
function queryDB_info_tablita() {
    // alert("queryDB_info_tablita");
    db.transaction(queryDB_tablita);

}
function queryDB_tablita(tx) {
    // alert("queryDB_tablita");
    var query;
    // var query=$("#query").val();
    // query='select a.codcliente,b.Nombre, a.debe, a.haber from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=?';
    query='select codcliente,nombre, sum(SaldoBs) SaldoBs,sum(CajaPac) CajaPac,sum(CajaHuari) CajaHuari,sum(cajaLitro) CajaLitro from (select a.codcliente codcliente,Nombre, sum(debe-haber) SaldoBs, 0 CajaPac,0 CajaHuari, 0 CajaLitro from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1400 and a.codcliente=? group by a.codcliente,nombre UNION select a.codcliente codcliente,Nombre, 0 SaldoBs, sum(dcajas-hcajas) CajaPac,0 CajaHuari, 0 CajaLitro from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1600 and codart in (4020,4029) and a.codcliente=? group by a.codcliente,nombre UNION select a.codcliente codcliente,Nombre, 0 SaldoBs, 0 CajaPac,sum(dcajas-hcajas) CajaHuari, 0 CajaLitro from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1600 and codart in (4079) and a.codcliente=? group by a.codcliente,nombre UNION select a.codcliente codcliente,Nombre, 0 SaldoBs, 0 CajaPac,0 CajaHuari, sum(dcajas-hcajas) CajaLitro from detalle a inner join cliente b on a.codcliente=b.codcliente where codconcepto=1600 and codart in (4010,4011) and a.codcliente=? group by a.codcliente,nombre ) group by codcliente,nombre';
    tx.executeSql(query,[id_cliente_tablita,id_cliente_tablita,id_cliente_tablita,id_cliente_tablita], querySuccess_tablita, errorCB_tablita2);
    // tx.executeSql('select * from DETALLE',[], querySuccess_tablita, errorCB_tablita);

}



function querySuccess_tablita(tx, results) {

    var len = results.rows.length;

    var var_SaldoBs;
    var var_CajaPac;
    var var_CajaHuari;
    var var_CajaLitro;
    for (var i = 0; i < len; i++) {
        var_SaldoBs=results.rows.item(i).SaldoBs.toFixed(2)+' Bs.';
        var_CajaPac=results.rows.item(i).CajaPac.toFixed(2);
        var_CajaHuari=results.rows.item(i).CajaHuari.toFixed(2);
        var_CajaLitro=results.rows.item(i).CajaLitro.toFixed(2);

        // alert("SaldoBs"+var_SaldoBs);
        // alert("CajaPac"+var_CajaPac);
        // alert("CajaHuari"+var_CajaHuari);
        // alert("CajaLitro"+var_CajaLitro);
    }

    // alert("llenando a div los valores SaldoBs:"+ var_SaldoBs+" CajaPac:"+var_CajaPac+" CajaHuari:"+var_CajaHuari+" CajaLitro:"+var_CajaLitro); 
    var mydata = [
    {"Saldo":var_SaldoBs, "Pac":var_CajaPac, "Huari":var_CajaHuari, "Litro":var_CajaLitro}
    ];

    $( '.tablita_info_cliente' ).html( '<table class="tablesaw" data-tablesaw-mode="swipe" id="tablita_registrar"><thead><tr><th colspan="4" style="text-align:center;">DEUDA</th></tr><tr><th scope="col">Saldo</th><th scope="col">Paceña</th><th scope="col">Huari</th><th scope="col">Litro</th></tr></thead><tbody></tbody></table>' );

    var tbody = $( '#tablita_registrar tbody' ), props = ["Saldo","Pac","Huari","Litro"];

    $.each( mydata, function(i, value){
        var tr = $('<tr>');

        $.each(props, function(i, prop){
            $('<td>').html(value[prop]).appendTo(tr); 
        });

        tbody.append(tr);
    });

    // $('#tablita_registrar').table().data( "table" ).refresh();

    // alert("trigger tablita_registrar");
    $('#tablita_registrar').trigger('create');
    // alert("trigger tablita_info_cliente");
    $('.tablita_info_cliente').trigger('create');
    $.mobile.loading("hide");
}


function errorCB_tablita(err) {
    alert("Error #"+err.code+" mensaje: "+err.message);
}
function errorCB_tablita2(err) {
    alert("2Error #"+err.code+" mensaje: "+err.message);
}
