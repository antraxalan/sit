function carga_exit() {
    alert("load exit");
    document.addEventListener("deviceready", start_exit, false);
}
function start_exit(){
    alert("Device Ready is called by exit");

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
    alert("back");
    if ( $('.paginaprincipal').attr('id') == 'mainpage') {
        alert("pag princ");
            //window.location = "#exitDialog";
            exitAppPopup();
        }else{
            alert("history back");
            history.back();
        };
    });
};

function exitAppPopup() {
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

function ConfirmExit(stat){
    // alert("Inside ConfirmExit");
    if(stat == "1"){
        alert("exit app fn");
        navigator.app.exitApp();
    }else{
        return;
    };
};


