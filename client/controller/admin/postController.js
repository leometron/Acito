/*

 Created by LingaRaja.

 Has the events to redirect a new post page.

 */

Meteor.subscribe("Posts");
Meteor.subscribe("Pages");

var selectedIds = [];

Template.posts.rendered = function(){
    var status = Session.get('checkStatus');
    if( status == "all" ){
        $('#showAll').css('color','red');
    }else if( status == "published" ){
        $('#publishFilter').css('color','red');
    }else if( status == "draft" ){
        $('#draftFilter').css('color','red');
    }else if( status == "bin" ){
        $('#binFilter').css('color','red');
    }else{
        $('#showAll').css('color','red');
    }
};


Template.posts.events({
    'click #addNewPost': function () {
        Session.set('selectedPostId', "");
        $(location).attr('href','posts/add');
    },
    'click .post': function () {
        Session.set('selectedPostId', this._id);
        Router.go("/admin/posts/edit");
    }, 
    'click #searchPost' : function (event) {
        event.preventDefault();                
        Meteor.call('searchPost',$('#queryString').val());
        Meteor._reload.reload();        
    },  
    'click .menuitem': function (event) {            
        $('#dropdown').text( $(event.target).text());            
    },
    'click .menuitem1': function (event) {                            
        $('#datedropdown').text( $(event.target).text());    
    },
    'click .menuitem2': function (event) {                
        $('#categoriesdropdown').text( $(event.target).text());    
    },
    'click .menuitem3': function (event) {    
        $('#dropdownmenu').text( $(event.target).text());        
    },
    'click #showAll' : function(event) {
        
        event.preventDefault();                
        Meteor.call('statusFilter',"All");
        Meteor._reload.reload(); 
        Session.set('checkStatus','all');
    },
    'click #publishFilter' : function(event) {
        event.preventDefault();                
        Meteor.call('statusFilter',"Published");
        Meteor._reload.reload(); 
        Session.set('checkStatus','published');
    },
    'click #draftFilter' : function(event) {
        event.preventDefault();                
        Meteor.call('statusFilter',"Draft");
        Meteor._reload.reload();
        Session.set('checkStatus','draft'); 
    },
    'click #binFilter' : function(event) {
        event.preventDefault();                
        Meteor.call('statusFilter',"Bin");
        Meteor._reload.reload();
        Session.set('checkStatus','bin'); 
    },
    'click #filterByCategory' : function(event)  {
        event.preventDefault();                
        Meteor.call('categoryFilter',$('#categoriesdropdown').text());
        Meteor._reload.reload(); 
    },
   'click .checkbox': function(event) {
        if(event.target.checked==true){
            selectedIds.push( this._id);
        }else{
          var index = selectedIds.indexOf(this._id);
            selectedIds.splice(index, 1);
        }
    },
   'click #bulkApplyBtn': function() {
        Meteor.call('bulkActions', selectedIds, $('#dropdown').text());
        Meteor._reload.reload(); 
   },
    'click #filter': function(event) {
        Meteor.call('showDateFilterPost', $('#dateFilter').val());
        Meteor._reload.reload();
   },
});

/*

 Has the functionality to add a new post and publish the post.

 */
Template.addNewPost.events({
    'click #savePost' : function () {
        console.log($('#pageName').val()+'....'+$('#pageName :selected').text());
        if (!$('#postName').val()) {
            Session.set('errorMessage','Post title is required');
        } else {
        Session.set('errorMessage','');  
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        var pageId = ($('#pageName').val() == "Category") ? "Uncategorized" : $('#pageName').val();
        var pageName = ($('#pageName :selected').text() == "none") ? "-" : $('#pageName :selected').text();        
        var postContent = (!$('#postContent').val()) ? "-" : $('#postContent').val();
        var featuredIamge = (!Session.get('selectedImageUrl')) ? "-" : Session.get('selectedImageUrl');        
        Meteor.call('insertPostData',$('#postName').val(),postContent,tag,getCurrentDate(),pageId,pageName,featuredIamge);
        Router.go("/admin/posts");
        Session.set('selectedImageUrl','');  
        }
    },
    'click #publishPost' : function () {
        if (!$('#postName').val()) {
            Session.set('errorMessage','Post title is required');
        } else {      
        Session.set('errorMessage','');              
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        var pageId = ($('#pageName').val() == "Category") ? "Uncategorized" : $('#pageName').val();
        var pageName = ($('#pageName :selected').text() == "none") ? "-" : $('#pageName :selected').text();
        var postContent = (!$('#postContent').val()) ? "-" : $('#postContent').val();
        var featuredIamge = (!Session.get('selectedImageUrl')) ? "-" : Session.get('selectedImageUrl');                
        Meteor.call('publishPostData',Session.get('selectedPostId'),$('#postName').val(),postContent,tag,getCurrentDate(),pageId,pageName,featuredIamge);
        Router.go("/admin/posts");
        Session.set('selectedImageUrl','');
        }       
    },
    'click #updatePost' : function() {
        if (!$('#postName').val()) {
            Session.set('errorMessage','Post title is required');
        } else {
        Session.set('errorMessage','');              
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        var pageId = ($('#pageName').val() == "Category") ? "Uncategorized" : $('#pageName').val();
        var pageName = ($('#pageName :selected').text() == "none") ? "-" : $('#pageName :selected').text();        
        var postContent = (!$('#postContent').val()) ? "-" : $('#postContent').val();
        var featuredIamge = (!Session.get('selectedImageUrl')) ? "-" : Session.get('selectedImageUrl');                
        Meteor.call('updatePostData',Session.get('selectedPostId'),$('#postName').val(),postContent,tag,pageId,pageName,featuredIamge);
        Router.go("/admin/posts");
        Session.set('selectedImageUrl','');
        }        
    },
    'click #moveBin' : function() {
        Meteor.call('binPostData',Session.get('selectedPostId')); 
        Router.go("/admin/posts");               
    },
    'click #restorePost' : function() {
        Meteor.call('unbinPostData',Session.get('selectedPostId'));
        Router.go("/admin/posts");
    },
    'click #removePost' : function() {
        Meteor.call('removePostData',Session.get('selectedPostId')); 
        Router.go("/admin/posts");               
    },
     'click #deletePost': function() {
       Meteor.call('removePostData',Session.get('selectedPostId'));
       Router.go("/admin/posts"); 
    },
    'click #addNewTag' : function() {
        Router.go("/admin/posts/tags");                       
    },
    'click #selectImage': function () {             
         $('#uploadFile').addClass('border');
         $('#media').hide();
         $('#mediaLibrary').removeClass('border');
         $('#dropFile').show();             
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
        $('#dropFile').show();
    },
    'click .selectedImg': function(e) {
        if(this._id){
             $('.selectedImg').removeClass('selected-border');
            $(e.currentTarget).addClass('selected-border');             
            Session.set('selectedImageUrl',this.url);
        }
    },
    'click #removeImage' : function() {
        Meteor.call('removeFeaturedImage',Session.get('selectedPostId'));
    }
});

/*

 Has the heplper to find all the post published by the server.

 */

Template.posts.helpers({
    'postList': function() {
        return Posts.find();
    },
    // 'queryString': function() {
    //     return $('#queryString').val();
    // },
    'pageList' : function() { 
        return Pages.find();
    }  
});

Template.addNewPost.helpers({
    'showSelectedPost': function(){
        return Posts.findOne(Session.get('selectedPostId'));
    },
    'errormsg' : function() {
        return Session.get('errorMessage');
    },
    'pageList' : function() { 
        return Pages.find();
    },
    'mediaList' : function() {
        return Media.find();  
    },
    'getUrlValue' : function() {
        return Session.get('selectedImageUrl');
    }      
});

Template.adminHeader.events({
    'click #subNavBarpostsadd': function () {    
        Session.set('selectedPostId', "");
    },
    'click #navBarposts' : function() {
        console.log('inside');
        Session.set('errorMessage','');
    }    
});
