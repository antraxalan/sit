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