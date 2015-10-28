function carga_exit() {
    // alert("load exit");
    document.addEventListener("deviceready", start_exit, false);
}
function start_exit(){
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
    // alert("back");
    // if ( $('.paginaprincipal').attr('id') == 'home') {
        var curr=$.mobile.activePage.attr('id'); 
        // if ( curr == 'home') {
        // // alert("pag princ");
        //     //window.location = "#exitDialog";
        //     exitAppPopup();
        // }else{
            // alert("history back");
            // history.back();
            switch (curr) {
                case 'home':
                exitAppPopup();
                break; 
                case 'registrar':
                window.location.href = "index.html#home";
                break; 
                case 'venta':
                otroCliente();
                // window.location.href = "index.html#registrar";
                break; 
                case 'cobranza':
                window.location.href = "index.html#venta";
                break; 
                case 'deuda':
                window.location.href = "index.html#cobranza";
                break; 

                default: 
                history.back();
            }

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
    navigator.notification.vibrate(200);
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
        window.location.href = "index.html#registrar";
    }else{
        return;
    };
};


