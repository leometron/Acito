Meteor.subscribe('featuredimage');

Template.basicLayout.events({
    'click .page-scroll': function (event) {
      var id = event.currentTarget.textContent;
      var page = "";
      if(id=="CONTACT"){
        page = "contact";
      }else{
        page="about";
      }
      event.preventDefault();
      $('html, body').stop().animate({
          'scrollTop': $('#'+page).offset().top
      }, 500);
    }
});

Template.basicLayout.helpers({
    'homeSliderList' : function() {
        return homeslider.find({status:"Published"});
    },
    'singlehomeSlider' : function() {
        return homeslider.findOne({status:"Published"}, { limit:1 });
    },
    'isHomeSlider' : function() {
        return homeslider.findOne({status:"Published"});
    },  
    'pagesList' : function() {
       return Pages.find();
   }   
});

