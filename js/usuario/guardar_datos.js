var codigo_usuario;
var password_usuario;
var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);

function guardar_datos(user,pass) {
    codigo_usuario=user;
    password_usuario=pass;

    var direccion   =$(".direccion").val();
    var codigo      =user;
    var password    =pass;
    var info='is_ok';
    // alert(' codigo:'+codigo+' password:'+password+' info:'+info);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "http://"+direccion+"/sitrans_server/online.php",
        data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
        success: function (resp) {
            if(resp=='ok'){
                // alert(resp);
                db.transaction(insertDB, errorCB1);
            }else{
             alert("Verifique que los datos ingresados sean correctos."); 
         }
     },
     error: function (e) {
      alert("Verifique el estado de la red.");
  }
});
};

function insertDB(tx) {
    tx.executeSql('DELETE FROM USUARIO WHERE id = 1');
    tx.executeSql('INSERT INTO USUARIO (id,codigo,pass) VALUES (1,"'+codigo_usuario+'","'+password_usuario+'")', [], insertSuccess_usuario, errorCB_insert_usuario);
    localStorage.g_username = codigo_usuario;
    localStorage.g_password = password_usuario;
    localStorage.g_existe = 1;
        // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    // tx.executeSql('INSERT INTO USUARIO (id,codigo,pass) VALUES (1,"11","22")');

};








function insertSuccess_usuario() {
    $('#login_popup').popup( "close" );
    alert("Datos verificados y almacenados.");
    location.reload();
};


function mostrar(user) {
    codigo_usuario=user;
    db.transaction(db_mostrar, errorCB2, successCB);
};
function db_mostrar(tx) {
    // alert("serarch");
    tx.executeSql("SELECT * FROM USUARIO where codigo = ?", [codigo_usuario], querySuccess);
    // alert("tx:"+tx);
}
function successCB(tx) {
    // alert("ejecutado exitosamente");
}

function querySuccess(tx, results) {
    // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
    var len = results.rows.length;

    var id = results.rows.item(0).id;
    var codigo = results.rows.item(0).codigo;
    var pass = results.rows.item(0).pass;
    // alert("len:"+len);
    // alert("id:"+id);
    // alert("codigo:"+codigo);
    // alert("pass:"+pass);



    // for (var i = 0; i < len; i++) {
    //     var tmpArgs=results.rows.item(i).id + ",'" + results.rows.item(i).name
    //     + "','" + results.rows.item(i).number+"'";
    //     tblText +='<tr onclick="goPopup('+ tmpArgs + ');"><td>' + results.rows.item(i).id +'</td><td>'
    //     + results.rows.item(i).name +'</td><td>' + results.rows.item(i).number +'</td></tr>';
    // }
    // tblText +="</table>";
    // document.getElementById("tblDiv").innerHTML =tblText;


    datos=[len, id,codigo,pass];
    $(".auxiliar").val(datos);
}









function errorCB(err) {
    // alert("Error processing SQL: "+err.message);
}
function errorCB1(err) {
    alert("1Error processing SQL: "+err.message);
}
function errorCB2(err) {
    // alert("2Error processing SQL: "+err.message);
}
function errorCB3(err) {
    // alert("3Error processing SQL: "+err.message);
}
function errorCB_insert_usuario(err) {
    alert("inError processing SQL: "+err.message);
}


