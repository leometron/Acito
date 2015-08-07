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
        Session.set('selectedPageId',Session.get("pageId"));
        Session.set("pageId","");        
        Session.set('selectedPostId',this._id);
        $('#postDetail').fadeIn(10000);                  
        Router.go("/post/"+this._id);
    },
    'click #backToPage' : function()  {
        console.log('pageId...'+Session.get("pageId"));
        console.log('postid....'+Session.get('selectedPostId'));
        Session.set('selectedPostId',"");
        Session.set("pageId",Session.get("selectedPageId"));        
        history.back();
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

// Template.home.rendered = function(){
//     console.log('rendered');
//       $('.animate').fadeIn(3000);
// };

// Tracker.afterFlush(function(){
//   $('.animate').delay(1000).fadeOut('slow');
// });
Template.home.animations({
  ".item": {
    container: ".container", // container of the ".item" elements
    in: "animated fast fadeInLeft", // class applied to inserted elements
    out: "animated fast fadeOutRight", // class applied to removed elements
    inCallback: function(element) {}, // callback after an element gets inserted
    outCallback: function(element) {}, // callback after an element gets removed
    delayIn: 500, // Delay before inserted items animate
    delayOut: 500, // Delay before removed items animate
    animateInitial: true, // animate the elements already rendered
    animateInitialStep: 200, // Step between animations for each initial item
    animateInitialDelay: 500 // Delay before the initial items animate
  }
});