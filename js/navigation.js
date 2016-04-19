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
        exitCobranza();
        // window.location.href = "index.html#venta";
        break; 
        case 'deuda':
        exitDeuda();
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
};
function exitCobranza() {
    window.location.href = "index.html#venta";
}
// function exitCobranza() {
//     navigator.notification.vibrate(200);
//     navigator.notification.confirm(
//         "Podria perder todos los cambios realizados, desea volver a Venta?", 
//         function(buttonIndex){
//             ConfirmExitCobranza(buttonIndex);
//         }, 
//         "Ir a Venta", 
//         "Si,No"
//         ); 
// };
function exitDeuda() {
    navigator.notification.vibrate(200);
    navigator.notification.confirm(
        "Esta seguro que desea volver a Cobros?", 
        function(buttonIndex){
            ConfirmExitDeuda(buttonIndex);
        }, 
        "Ir a Cobros", 
        "Si,No"
        ); 
};
function venta_to_cobranza() {
    navigator.notification.vibrate(200);
    navigator.notification.confirm(
        "Desea continuar sin adquirir productos?", 
        function(buttonIndex){
            Confirm_venta_to_cobranza(buttonIndex);
        }, 
        "Ir a Cobros", 
        "Si,No"
        ); 
};
function Cobranza_to_Deuda() {
    navigator.notification.vibrate(200);
    navigator.notification.confirm(
        "Ya realizo todos los cambios necesarios en Cobros?", 
        function(buttonIndex){
            ConfirmCobranza_to_Deuda(buttonIndex);
        }, 
        "Ir a Envases", 
        "Si,No"
        ); 
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

// function ConfirmExitCobranza(stat){
//     // alert("Inside ConfirmExit");
//     if(stat == "1"){
//         // alert("exit app fn");
//         window.location.href = "index.html#venta";
//     }else{
//         return;
//     };
// };

function ConfirmExitDeuda(stat){
    // alert("Inside ConfirmExit");
    if(stat == "1"){
        // alert("exit app fn");
        window.location.href = "index.html#cobranza";
    }else{
        return;
    };
};

function Confirm_venta_to_cobranza(stat){
    // alert("Inside ConfirmExit");
    if(stat == "1"){
        var cli_id=$(".cliente_id").val();
        limpiar_temp_v_table();
        cargar_listas(cli_id);
        cargar_cobranza_list(cli_id);
        cargar_deuda_list(cli_id);
        cargar_info_cliente_html(cli_id);
        window.location.href = "index.html#cobranza";
    }else{
        return;
    };
};
function ConfirmCobranza_to_Deuda(stat){
    // alert("Inside ConfirmExit");
    if(stat == "1"){
        // alert("exit app fn");
        // $('.next_deuda').hide();
        window.location.href = "index.html#deuda";
    }else{
        return;
    };
};
function start_process(){

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    // var fecha_actual =((''+day).length<2 ? '0' : '') + day + '/' +((''+month).length<2 ? '0' : '') + month + '/' +    d.getFullYear() ;
    var fecha_actual =   d.getFullYear() + '-' +((''+month).length<2 ? '0' : '') + month + '-' +  ((''+day).length<2 ? '0' : '') + day;
    // var fecha_actual = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $("#fchvto_total_popup").val(fecha_actual);
    window.location.href = "index.html#venta";
};
function go_to_otro_usuario(){
    $('#cliente').selectmenu();
    $("#cliente option:eq(0)").prop("selected",true);
    $('#cliente') .selectmenu("refresh");
    $('#obs_final').val('');
    $('.tablita_info_cliente').hide();
    $('.menu_v_c_d').hide();
    localStorage.total_cobro=0;
    window.location.href = "index.html#registrar";
    limpiar_temp_v_table();
    $('#venta_tabs').removeClass("ui-disabled blured_alan");
    // $('.list_old_venta').find('.temp_disabled').removeClass("ui-disabled temp_disabled");
};

function limpiar_temp_v_table(){
    $('#venta_tabs').removeClass("ui-disabled blured_alan");
    localStorage.fecha_venta=0;
    db.transaction(populateDB_TEMPVENTA, errorCB_cargar);
}

function populateDB_TEMPVENTA(tx) {
    localStorage.art='[]';
    tx.executeSql('DROP TABLE IF EXISTS TEMPVENTA');
    tx.executeSql('CREATE TABLE IF NOT EXISTS TEMPVENTA (IdArt INTEGER,IdCli INTEGER,Calibre DECIMAL(18,4),Empaque INTEGER,Precio DECIMAL(18,2),Caja INTEGER,Unidad INTEGER,CajasCamion INTEGER, CodMarca INTEGER, DesArt VARCHAR(255), CodCaja INTEGER, CodBotella INTEGER, CodCliente)');
}

function errorCB_cargar(err) {
   alert("errorCB_temp: "+err.message);
}