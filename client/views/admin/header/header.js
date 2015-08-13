var mainTitle;
Template.adminHeader.helpers({
    'navBarList' : function(){
        return [
            {'title': 'dashboard','maintitle': 'Dashboard', 'icon': 'fa-tachometer'},
            {'title': 'posts','maintitle': 'Posts', 'icon': 'fa-thumb-tack', 'subtitle': [{'sTitle':'add','title': 'posts','name':'AddNew'},{'sTitle':'tags','title': 'posts','name':'Tags'},{'sTitle':'image','title': 'posts','name':'FeaturedImage'}]},           
            {'title': 'homeSliders','maintitle': 'HomeSliders','icon': 'fa-bars','subtitle': [{'sTitle':'add','title': 'HomeSliders','name':'AddNew'}]},
            {'title': 'media','maintitle': 'Media','icon': 'fa-picture-o' ,'subtitle': [{'sTitle':'add','title': 'media','name':'AddNew'}]},
            {'title': 'pages','maintitle': 'Pages','icon':'fa-file','subtitle': [{'sTitle':'add','title': 'pages','name':'AddNew'}]},
            {'title': 'settings','maintitle': 'Settings', 'icon':'fa-cog'},           
            {'title': 'themes','maintitle': 'Themes','icon': 'fa-paint-brush'},           
        ]
    }

});


Template.adminHeader.rendered = function () {
    $('#subNavBarpostsadd').hide();
    $('#subNavBarpostscategories').hide();
    $('#subNavBarpoststags').hide();
    $('#subNavBarmediaadd').hide();
    $('#subNavBarpagesadd').hide();
    $('#subNavBarHomeSlidersadd').hide();
    $('#subNavBarpostsimage').hide();;
    var pathname = $(location).attr('pathname').split('/')[1];
    var pathname1 = $(location).attr('pathname').split('/')[2];
    if(pathname == 'admin' && pathname1 != undefined){
        $('#header').show();
        $('#navBardashboard').addClass('selected');
        $('#main_view').removeClass('full-width');
    }else{
        $('#header').hide();
        $('#main_view').addClass('full-width');       
    }
        
};

Template.adminHeader.events({
  'click .item': function(events) { 

     console.log($(events.currentTarget).attr("id"));
     
     var selectedId = $(events.currentTarget).attr("id");

     if(selectedId == 'navBardashboard'){
         $('#navBardashboard').addClass('selected');
     }else {
         $('#navBardashboard').removeClass('selected');
     }
    if(selectedId == 'navBarposts'){
         $('#navBarposts').addClass('selected');
     }else {
         $('#navBarposts').removeClass('selected');
     }
      if(selectedId == 'navBarmedia'){
         $('#navBarmedia').addClass('selected');
     }else {
         $('#navBarmedia').removeClass('selected');
     }
    if(selectedId == 'navBarpages'){
         $('#navBarpages').addClass('selected');
         }else {
         $('#navBarpages').removeClass('selected');
     }
     if(selectedId == 'navBarHomeSliders'){
         $('#navBarHomeSliders').addClass('selected');
         }else {
         $('#navBarHomeSliders').removeClass('selected');
     }
     if(selectedId == 'navBarSettings'){
         $('#navBarSettings').addClass('selected');
         }else {
         $('#navBarSettings').removeClass('selected');
     }
    if(this.title == 'posts'){
        $('#subNavBarpostsadd').show(800);       
        $('#subNavBarpoststags').show(800);
        $('#subNavBarpostsimage').show(800);
    }else{
        $('#subNavBarpostsadd').hide(800);       
        $('#subNavBarpoststags').hide(800);
        $('#subNavBarpostsimage').hide(800);
    }
    if(this.title == 'media'){
        $('#subNavBarmediaadd').show(800);    
    }else{
         $('#subNavBarmediaadd').hide(800);
    }

    if(this.title == 'pages'){
        $('#subNavBarpagesadd').show(800);
    }else{
        $('#subNavBarpagesadd').hide(800);
    }   
    if(this.title == 'HomeSliders'){
        $('#subNavBarHomeSlidersadd').show(800);
    }else{
        $('#subNavBarHomeSlidersadd').hide(800);
    }   
  }
});
