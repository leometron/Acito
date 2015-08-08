Template.themes.events({
     'click .themeSelection' : function(e){     
        $('.themeSelection').removeClass('selected-border');
        selectedImage(e);  
    }
});