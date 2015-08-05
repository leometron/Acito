/*

 Created by LingaRaja.

 Has the events and helpers related to home page.

 */

 Meteor.subscribe('featuredimage');

Template.header.events({
    'click #pageName': function() {
        Session.set('selectedPostId',"");        
        Session.set("pageId",this._id);
    } 
});

Template.header.helpers({
    'pagesList' : function() {
        return Pages.find();
    },
});

Template.home.events({
    'click #postTitle': function() {
        Session.set("pageId","");        
        Session.set('selectedPostId',this._id);
        Router.go("/post/"+this._id);               
    } 
});
Template.home.helpers({
    'postsList' : function() {
        return Posts.find({pageId:Session.get("pageId")});
    },  
	'mediaList' : function() {
    	return Media.find();
    },
    'showSelectedPost' : function() {
        if(Session.get('selectedPostId')){
            // var temp = Session.get('selectedPostId');
            // Session.set('selectedPostId',"");
            // console.log('temp.........'+temp);
            return Posts.findOne({_id: Session.get('selectedPostId')});            
        }
    },
    'imageList' : function() {
        return featuredimage.find();
    }
});

// Template.header.rendered = function(){
//     Session.set('selectedPostId',"");
//     Session.set("pageId","");            
// };