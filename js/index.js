  $.mobile.switchPopup = function switchPopup(sourceElement, destinationElement, onswitched) {
    var afterClose = function() {
        destinationElement.popup("open");
        sourceElement.off("popupafterclose", afterClose);

        if (onswitched && typeof onswitched === "function"){
            onswitched();
        }
    };

    sourceElement.on("popupafterclose", afterClose);
    sourceElement.popup("close");
};

function carga_varios_complementos(){
    ///////////////////////////////
    ///////////////SWIPE///////////
    ///////////////////////////////
    // Touchmove events are cancelled on Android KitKat when scrolling is possible on the touched element. 
    // Scrolling is always vertical in our app. Cancel the event when a touchmove is horizontal, 
    // so that all following touchmove events will be raised normally. 
    var startLoc = null; 
    $( "body" ).on( "touchstart", function( e ) { 
    if( e.originalEvent.touches.length == 1 ) { // one finger touch 
    // Remember start location. 
    var touch = e.originalEvent.touches[ 0 ]; 
    startLoc = { x : touch.pageX, y : touch.pageY }; 
    } 
    }); 

    $( "body" ).on( "touchmove", function( e ) { 
    // Only check first move after the touchstart. 
    if( startLoc ) { 
      var touch = e.originalEvent.touches[ 0 ]; 
    // Check if the horizontal movement is bigger than the vertical movement. 
    if( Math.abs( startLoc.x - touch.pageX ) > 
      Math.abs( startLoc.y - touch.pageY ) ) { 
    // Prevent default, like scrolling. 
    e.preventDefault(); 
    } 
    startLoc = null; 
    } 
    } ); 
    ///////////////////////////////
    ///////////////SWIPE///////////
    ///////////////////////////////
}