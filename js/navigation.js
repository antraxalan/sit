function carga_navigation() {
    // alert("load exit");
    document.addEventListener("deviceready", start_navigation, false);
}
function start_navigation(){
    // alert("Device Ready is called by exit");

        // console.log('Device Readyasdasd');
     //Se ejecuta al cargar cualquier pagina del directorio

    // LOADER
    //  $.mobile.loading( 'show', {
    //     text: 'foo',
    //     textVisible: true,
    //     theme: 'a',
    //     html: "sadasdasd"
    // });


document.addEventListener("backbutton", function(e){
    var href = document.location.href;
    var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
    var curr=$.mobile.activePage.attr('id'); 
    // alert(lastPathSegment);
    if(lastPathSegment=='info.html'){
        curr='info.html';
    }

    if ($(".ui-page-active .ui-popup-active").length > 0){
     history.back();
 }else{

     switch (curr) 
     {
        case 'home':
        exitAppPopup();
        break; 
        case 'registrar':
        window.location.href = "index.html#home";
        break; 
        case 'venta':
        otroCliente();
        break; 
        case 'cobranza':
        window.location.href = "index.html#venta";
        break; 
        case 'deuda':
        window.location.href = "index.html#cobranza";
        break; 

        default: 
        history.back();
    };
};

});
};

function exitAppPopup() {
    navigator.notification.vibrate(200);
    navigator.notification.confirm(
        "Desea cerrar la aplicación?", 
        function(buttonIndex){
            ConfirmExit(buttonIndex);
        }, 
        "Confirmación", 
        "Si,No"
        ); 
    // alert("Outside Notification"); 
    //return false;
};
function otroCliente() {
    navigator.notification.vibrate(50);
    navigator.notification.confirm(
        "Desea cambiar de cliente?", 
        function(buttonIndex){
            ConfirmCliente(buttonIndex);
        }, 
        "Confirmación", 
        "Si,No"
        ); 
    // alert("Outside Notification"); 
    //return false;
};

function ConfirmExit(stat){
    // alert("Inside ConfirmExit");
    if(stat == "1"){
        // alert("exit app fn");
        navigator.app.exitApp();
    }else{
        return;
    };
};

function ConfirmCliente(stat){
    // alert("Inside ConfirmExit");
    if(stat == "1"){
        // alert("exit app fn");
        go_to_otro_usuario();
    }else{
        return;
    };
};
function go_to_otro_usuario(){
    $('#cliente').selectmenu();
    $("#cliente option:eq(0)").prop("selected",true);
    $('#cliente') .selectmenu("refresh");
    $('.tablita_info_cliente').hide();
    $('.menu_v_c_d').hide();
    window.location.href = "index.html#registrar";
    limpiar_temp_v_table();
};

function limpiar_temp_v_table(){

    db.transaction(populateDB_TEMP_VENTA, errorCB_cargar);
} 

function populateDB_TEMP_VENTA(tx) {
    localStorage.art='[]';
    tx.executeSql('DROP TABLE IF EXISTS TEMP_VENTA');
    tx.executeSql('CREATE TABLE IF NOT EXISTS TEMP_VENTA (Id INTEGER PRIMARY KEY AUTOINCREMENT,IdArt INTEGER,IdCli INTEGER,Calibre DECIMAL(18,4),Empaque INTEGER,Precio DECIMAL(18,2),Caja INTEGER,Unidad INTEGER,CajasCamion INTEGER, CodMarca INTEGER, DesArt TEXT)');
}

 function errorCB_cargar(err) {
   alert("errorCB_temp: "+err.message);
 }