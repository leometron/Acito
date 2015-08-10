Meteor.subscribe('homeslider');

Template.addNewMedia.rendered = function(){
    $("#popupMediadetail").hide();
};

Template.addNewHomeSlider.events({
    'click #selectImage': function () {             
        // alert("success");
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
        $("#popupMediadetail").hide();
    },
    'click #uploadFile': function(){
        $('#media').hide();
        $('#mediaLibrary').removeClass('border');
        $('#uploadFile').addClass('border');
        $('#dropFile').show() ;
    },
    'click .selectedImg' : function(e){
        if(this._id){
            $('.selectedImg').removeClass('selected-border');
            $(e.currentTarget).addClass('selected-border');
            Session.set('selectedImageUrl',this.url);
            Session.set('selectimgName', this.name);
        }     
    },
    'change #selectMediaUrl': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
          var img = event.target.files[0]
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log('error')
                } else {                 
                  var url = "/cfs/files/images/" + fileObj._id;
                  Session.set('uploadMediaUrl',url);
                  Meteor.call('insertMediaData', url, img.name, "-" , img.type, img.size + " Bytes",  "-", "-" , "-" , "-" , "-");
                    $('#uploadFile').removeClass('border');
                    $('#dropFile').hide() ;
                    $('#mediaLibrary').addClass('border');
                    $('#media').show();
                    $("#popupMediadetail").hide();
                    Session.set('selectedImageUrl',url);
                    Session.set('selectimgName', img.name);
                }
            });
        });
    },
    'click #sliderpublish': function() {
        var selectimage = Session.get('selectedImageUrl');
        Session.set('selectImage', selectimage);
    },
    'click #saveSlider': function() {
        if(!$('#sliderTitle').val()) {
            Session.set('errorMessage','Home Slider title is required');
        }else {
            Session.set('errorMessage','');
            var sliderImage = $('#sliderImage').attr('src');
            Meteor.call('insertSliderData', $('#sliderTitle').val(), Session.get('selectimgName'), sliderImage, getCurrentDate());
            Router.go('/admin/homeSliders');
        } 
    },
    'click #publishSlider': function() {
        if(!$('#sliderTitle').val()) {
            Session.set('errorMessage','Home Slider title is required');
        } else {
            Session.set('errorMessage','');
            var sliderImage = $('#sliderImage').attr('src');
            Meteor.call('publishSliderData', $('#sliderTitle').val(), Session.get('selectimgName'), sliderImage, getCurrentDate());
            Router.go('/admin/homeSliders');
        } 
    },
    'click #republishSlider': function() {
        if(!$('#sliderTitle').val()) {
            Session.set('errorMessage','Home Slider title is required');
        } else {
            Session.set('errorMessage','');
            var sliderImage = $('#sliderImage').attr('src');
            var sliderId = Session.get('selectedSliderId');
            Meteor.call('republishSliderData', $('#sliderTitle').val(), $('#sliderName').val(), sliderImage, getCurrentDate(),sliderId);
            Router.go('/admin/homeSliders');
        } 
    },
    'click #updateSlider': function(){
        if(!$('#sliderTitle').val()) {
            Session.set('errorMessage','Home Slider title is required');
        } else {
            Session.set('errorMessage','');
            var sliderImage = $('#sliderImage').attr('src');
            var sliderId = Session.get('selectedSliderId');
            Meteor.call('updateSliderData', $('#sliderTitle').val(), $('#sliderName').val(), sliderImage, getCurrentDate(), sliderId);
            Router.go('/admin/homeSliders');
        } 
    },

    'click #moveBin': function() {
        Meteor.call('binSliderData', Session.get('selectedSliderId'));
        Router.go('/admin/homeSliders');
    },
    'click #removeSlider': function() {
         Meteor.call('removeSliderData', Session.get('selectedSliderId'));
         Router.go('/admin/homeSliders');
    },
    'click #restoreSlider': function(){
        Meteor.call('unbinSliderData', Session.get('selectedSliderId'));
        Router.go('/admin/homeSliders');
    }

});

Meteor.subscribe('Media');

Template.addNewHomeSlider.helpers({
   'mediaList': function() {
       return Media.find();
   },
   'errormsg' : function() {
        return Session.get('errorMessage');
    },
    'getUrlValue': function(){
        return Session.get('selectImage');
    },
    'imageName': function() {
        return Session.get('selectimgName');
    },
    'showSelectedSlider': function(){
        return homeslider.findOne(Session.get('selectedSliderId'));
    },
});

 Template.homeSlider.helpers({
     'sliderList': function(){
        return homeslider.find();
     }   
 });

 Template.homeSlider.events({
    'click #addNew': function() {
        $(location).attr('href','homeSliders/add');
    },
     'click #slider': function() {
        Session.set('selectedSliderId', this._id);
        Session.set('errorMessage', "");
        Session.set('selectImage', '');
        Session.set('selectimgName', '');
        Router.go("/admin/homeSliders/add");
    }
 });

 Template.adminHeader.events({
    'click #subNavBarHomeSlidersadd': function() {
        Session.set('selectedSliderId', '');
    },
    'click #navBarHomeSliders': function() {
        Session.set('errorMessage', "");
        Session.set('selectImage', '');
        Session.set('selectimgName', '');
    }
 });
