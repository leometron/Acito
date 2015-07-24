/*

 Created by LingaRaja.

 Has the events to redirect a new post page.

 */
Template.posts.events({
    'click #addNewPost': function () {
        console.log("clicked add new post");
        $(location).attr('href','posts/add');
    }
});

/*

 Created by LingaRaja.

 Has the functionality to add a new post and publish the post.

 */
Template.addNewPost.events({
    'click #savePost' : function () {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        Meteor.call('insertPostData',$('#postName').val(),$('#postContent').val(),tag);
    },
    'click #publishPost' : function () {
        var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
        Meteor.call('publishPostData',$('#postName').val(),$('#postContent').val(),tag);
    }
});


/*

 Created by LingaRaja.

 Has the heplper to find all the post published by the server.

 */
Meteor.subscribe("Posts");

Template.posts.helpers({
    'postList': function() {
        return Posts.find();
    }
});