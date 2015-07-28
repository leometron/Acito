/*

 Created by LingaRaja.

 Has the events to redirect a new post page.

 */

Meteor.subscribe("Posts");
Meteor.subscribe("Category");

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
    },
    'click #publishFilter' : function(event) {
        event.preventDefault();                
        Meteor.call('statusFilter',"Published");
        Meteor._reload.reload(); 
    },
    'click #draftFilter' : function(event) {
        event.preventDefault();                
        Meteor.call('statusFilter',"Draft");
        Meteor._reload.reload(); 
    },
    'click #binFilter' : function(event) {
        event.preventDefault();                
        Meteor.call('statusFilter',"Bin");
        Meteor._reload.reload(); 
    },
    'click #filterByCategory' : function(event)  {
        event.preventDefault();                
        Meteor.call('categoryFilter',$('#categoriesdropdown').text());
        Meteor._reload.reload(); 
    }
});

/*

 Has the functionality to add a new post and publish the post.

 */
Template.addNewPost.events({
    'click #savePost' : function () {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        var categoryname = ($('#categoryName').val() == "Category") ? "Uncategorized" : $('#categoryName').val();
        Meteor.call('insertPostData',$('#postName').val(),$('#postContent').val(),tag,getUserName(),getCurrentDate(),categoryname);
        Router.go("/admin/posts");
    },
    'click #publishPost' : function () {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        var categoryname = ($('#categoryName').val() == "Category") ? "Uncategorized" : $('#categoryName').val();
        Meteor.call('publishPostData',Session.get('selectedPostId'),$('#postName').val(),$('#postContent').val(),tag,getUserName(),getCurrentDate(),categoryname);
        Router.go("/admin/posts");        
    },
    'click #updatePost' : function() {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        var categoryname = ($('#categoryName').val() == "Category") ? "Uncategorized" : $('#categoryName').val();                
        Meteor.call('updatePostData',Session.get('selectedPostId'),$('#postName').val(),$('#postContent').val(),tag,categoryname);
        Router.go("/admin/posts");        
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
    }
});

/*

 Has the heplper to find all the post published by the server.

 */

Template.posts.helpers({
    'postList': function() {
        return Posts.find();
    },
    'queryString': function() {
        return $('#queryString').val();
    },
    'categoryList' : function() { 
        return Category.find();
    }    
});

Template.addNewPost.helpers({
    'showSelectedPost': function(){
        return Posts.findOne(Session.get('selectedPostId'));
    },
    'categoryList' : function() { 
        return Category.find();
    }
});

/*

 Has return the current username

 */
Template.adminHeader.events({
    'click #subNavBarpostsadd': function () {    
        Session.set('selectedPostId', "");
    }
});
