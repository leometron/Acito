Template.posts.events({
    'click #addNewPost': function () {
        console.log("clicked add new post");
        $(location).attr('href','posts/add_new_post');
    }
});

/*

 Created by LingaRaja.

 Has the functionality to add a new post and publish the post.

 */
Template.add_new_post.events({
    'click #savePost' : function () {
        Meteor.call('insertPostData',$('#postName').val(),$('#postContent').val());
    },
    'click #publishPost' : function () {
        Meteor.call('publishPostData',$('#postName').val(),$('#postContent').val());
    }
});