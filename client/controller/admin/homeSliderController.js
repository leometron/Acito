
Template.addNewHomeSlider.events({
    'click #selectImage': function () {             
         $('#uploadFile').addClass('border');
         $('#media').hide();
         $('#mediaLibrary').removeClass('border');
         $('#dropFile').show() ;             
    },
    'click #mediaLibrary': function(){
        console.log("media");
        $('#uploadFile').removeClass('border');
        $('#dropFile').hide() ;
        $('#mediaLibrary').addClass('border');
        $('#media').show();
    },
    'click #uploadFile': function(){
        $('#media').hide();
        $('#mediaLibrary').removeClass('border');
        $('#uploadFile').addClass('border');
        $('#dropFile').show() ;
    }    
});
