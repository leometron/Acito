Meteor.subscribe('featuredimage');

Template.basicLayout.events({
    'click .page-scroll': function (event) {
      var page = event.currentTarget.textContent;
      var pageId = "";
      if(page=="CONTACT"){
        pageId = "contact";
      }else if(page=="ABOUT US"){
        pageId="about";
      }else if(page=="TECHNOLOGY"){
        pageId="technology";
      }
     // event.preventDefault();
      $('html, body').stop().animate({
          'scrollTop': $('#'+pageId).offset().top
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

