var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);

var v_save_art_id;
var v_cli_id;
var v_save_cal;
var v_save_emp;
var v_save_pre;
var v_save_caj;
var v_save_uni;
var v_save_caj_cam;
var v_save_cod_mar;
var v_save_des_art;

function insertDB_temp_db(tx) {
  alert("ingreso a la transaccion");
  tx.executeSql('INSERT INTO TEMP_VENTA (IdArt,IdCli,Calibre,Empaque,Precio,Caja,Unidad,CajasCamion,CodMarca,DesArt) VALUES ('+v_save_art_id+','+v_cli_id+','+v_save_cal+','+v_save_emp+','+v_save_pre+','+v_save_caj+','+v_save_uni+','+v_save_caj_cam+','+v_save_cod_mar+','+v_save_des_art+')');
  var arr_art = JSON.parse(localStorage.art);
  var lon=arr_art.length;
  arr_art[lon]=v_save_art_id;
  localStorage.art=JSON.stringify(arr_art);
  cargar_carrito_venta_list();
};

function errorCB1_carg_tmp(err) {
 alert("errorCB1_carg1--: "+err.message);
}

function db_temp_guardar_venta(save_art_id,cli_id,save_cal,save_emp,save_pre,save_caj,save_uni,save_caj_cam,save_cod_mar,save_des_art) {
   v_save_art_id   =save_art_id;
   v_cli_id        =cli_id;
   v_save_cal      =save_cal;
   v_save_emp      =save_emp;
   v_save_pre      =save_pre;
   v_save_caj      =save_caj;
   v_save_uni      =save_uni;
   v_save_caj_cam  =save_caj_cam;
   v_save_cod_mar  =save_cod_mar;
   v_save_des_art  =save_des_art;
   alert("ingreso funcion");

  db.transaction(insertDB_temp_db, errorCB1_carg_tmp);

};
