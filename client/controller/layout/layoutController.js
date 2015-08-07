/*

 Created by LingaRaja.

 Has the events and helpers related to home page.

 */

 Meteor.subscribe('featuredimage');

Template.header.events({
    'click #pageName': function() {
        Session.set('selectedPostId',"");        
        Session.set("pageId",this._id);
    },
    'click #backToPage' : function()  {
        Session.set('selectedPostId',"");
        Session.set("pageId",Session.get("selectedPageId"));        
        history.back();
    }
});

Template.header.helpers({
    'pagesList' : function() {
        return Pages.find();
    },
    'showSelectedPost' : function() {
        if(Session.get('selectedPostId')){
            return Posts.findOne({_id: Session.get('selectedPostId')});            
        }
    },    
});

Template.home.events({
    'click #postTitle': function() {
        Session.set('selectedPageId',Session.get("pageId"));
        // Session.set("pageId","");        
        Session.set('selectedPostId',this._id);
        Router.go("/post/"+this._id);
    },
});
Template.home.helpers({
    'postsList' : function() {
        return Posts.find({pageId:Session.get("pageId")});
    },  
	'mediaList' : function() {
    	return Media.find();
    },

    // 'showSelectedPost' : function() {
    //     if(Session.get('selectedPostId')){
    //         // var temp = Session.get('selectedPostId');
    //         // Session.set('selectedPostId',"");
    //         // console.log('temp.........'+temp);
    //         return Posts.findOne({_id: Session.get('selectedPostId')});            
    //     }
    // },
    // 'imageList' : function() {
    //     return featuredimage.find();
    // }
});

Template.postDetail.helpers({
    'showSelectedPost' : function() {
        if(Session.get('selectedPostId')){
            // var temp = Session.get('selectedPostId');
            // Session.set('selectedPostId',"");
            // console.log('temp.........'+temp);
            return Posts.findOne({_id: Session.get('selectedPostId')});            
        }
        $('#postDetail').fadeIn(10000);          
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

//myItem
// Template.home.rendered = function(){
//   var instance = this;
//   if(Session.get("selected_item") === this.data._id){
//     Meteor.defer(function() {  
//       $(instance.firstNode).addClass("selected"); //use "instance" instead of "this"
//     });
//   }
// };

// Template.home.events({
//   "click .myItem": function(evt, template){
//     Session.set("selected_item", this._id);
//   }
// });


// //myItemList
// Template.home.helpers({
//   items: function(){
//     return Items.find();
//   }
// });