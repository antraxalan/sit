var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var data_db_articulos;
var id_transp=localStorage.g_username;

function subir_db_articulos() {

  var direccion= $(".direccion").val();
  var var1= $(".var1").val();
  // alert("in subir_db_articulos."+direccion+"---"+var1);
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "var1=" + var1,
    success: function (resp) {
        alert("success:"+resp);
        db.transaction(populateDB_articulos, errorCB);
        call_insert_db_articulos(resp);
        $.mobile.loading("hide");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $.mobile.loading("hide");
      // alert("No se encuentra conectado a su red: "+e.message+" err code: "+e.code+ "e:"+e);
      alert("1: "+xhr.status);
      alert("2: "+thrownError);

  }
});
  // codigo_usuario=user;
  // password_usuario=pass;
  // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
  // db.transaction(insertDB, errorCB);
};

function populateDB_articulos(tx) {
    alert("popul");
    tx.executeSql('DROP TABLE IF EXISTS ARTICULO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (IdArticulo INTEGER PRIMARY KEY AUTOINCREMENT,CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado)');
}


function call_insert_db_articulos(data) {
    data_db_articulos=data;
    alert("call_insert_db_articulos");
    // codigo_usuario=user;
    // password_usuario=pass;
    // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
    db.transaction(insertDB_articulos, errorCB1);
};

function insertDB_articulos(tx) {
    var d1=data_db_articulos;
    alert("insertando: "+d1);

    alert("-longitud1: "+d1[0].length);
    alert("-longitud2: "+d1[1].length);
    alert("-longitud3: "+d1.length);
    alert("-longitud4: "+d1[0][0].length);
    alert("-longitud5: "+d1[0][1].length);

    for (var i = 0; i < d1[0].length; i++) {
        tx.executeSql('INSERT INTO ARTICULO (CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado) VALUES ("'+d1[i][0]+'","'+d1[i][1]+'","'+d1[i][2]+'","'+d1[i][3]+'","'+d1[i][4]+'","'+d1[i][5]+'","'+d1[i][6]+'","'+d1[i][7]+'","'+d1[i][8]+'","'+d1[i][9]+'","'+d1[i][10]+'","'+d1[i][11]+'","'+d1[i][12]+'","'+d1[i][13]+'","'+d1[i][14]+'","'+d1[i][15]+'","'+d1[i][16]+'","'+d1[i][16]+'")');
    };
    alert("realizado");
    // localStorage.g_username = codigo_usuario;
    // localStorage.g_password = password_usuario;
    // localStorage.g_existe = 1;
    // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    // tx.executeSql('INSERT INTO USUARIO (id,codigo,pass) VALUES (1,"11","22")');
};


function errorCB(err) {
    // alert("Error processing SQL: "+err.message);
}