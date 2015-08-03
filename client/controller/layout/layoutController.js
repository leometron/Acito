/*

 Created by LingaRaja.

 Has the events and helpers related to home page.

 */
Template.header.events({
    'click #pageName': function() {
        Session.set("pageId",this._id);
    } 
});

Template.header.helpers({
    'pagesList' : function() {
        return Pages.find();
    }
});

Template.home.helpers({
    'postsList' : function() {
        return Posts.find({pageId:Session.get("pageId")});
    }  
});
