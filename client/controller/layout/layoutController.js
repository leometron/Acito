/*

 Created by LingaRaja.

 Has the events and helpers related to home page.

 */
Meteor.subscribe("featuredimage");

Template.header.events({
    'click #pageName': function() {
        Session.set("pageId",this._id);
    } 
});

Template.header.helpers({
    'pagesList' : function() {
        return Pages.find();
    },
});

Template.home.helpers({
    'postsList' : function() {
        console.log(Session.get("pageId"));
        return Posts.find({pageId:Session.get("pageId")});
    },  
	'mediaList' : function() {
    	return Media.find();
    },

    'imagelist': function() {
        return featuredimage.find();
    }
});