/*

 Created by LingaRaja.

 Has the events and helpers related to home page.

 */
Template.home.events({
    'click #deleteTag': function() {
        Meteor.call('removeTag',Session.get('selectedTagId'));
        Router.go("/admin/posts/tags");        
    } 
});

Template.header.helpers({
    'pagesList' : function() {
        return Pages.find();
    }
});
