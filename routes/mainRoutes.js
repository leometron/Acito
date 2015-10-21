// Home Route
var themeName;
Router.route('/', {
    layoutTemplate: 'basicLayout',	
    data: function() {
        return {
            postsList: Posts.find({pageId:"none",status:"Published"}),
        };          
    },
    action: function () {
        this.render('postList');        
        SEO.set({ title: 'Home - ' + Meteor.App.NAME });
        console.log(Meteor.App.NAME);
    }
});

Router.route('/tam/post/:title/:_postId', {    
  layoutTemplate: 'basicLayout',	
  name: 'postDetail',
   data: function() {
    console.log('posts count...........'+Posts.find({}).count());
      var postDoc = Posts.findOne({ _id: this.params._postId });
      
      Meteor.setTimeout(function() {
          $('#list'+postDoc._id).html(postDoc.description);
          $('#detail'+postDoc._id).html(postDoc.description);
      }, 200);

      Session.set('routePostId', this.params._postId);
    //   // console.log('meteor user.......'+Meteor.users.find().count());
    //   if (typeof Meteor.users.findOne({_id: postDoc.createdBy}) === "object") {
    //     var userDoc = Meteor.users.findOne({_id: postDoc.createdBy});
    //     postDoc.publisherName = userDoc.username;        
    //   }
    //   console.log(postDoc);
      return {
        images: featuredimage.find({postId:this.params._postId}, { limit:3 }),    
        // post: postDoc
        post: Posts.findOne({ _id: this.params._postId })
      };
    }       
});

Router.route('/ask', {
  layoutTemplate: 'basicLayout',  
  name: 'questionDetail'  
});

Router.route('/readmore', {
  layoutTemplate: 'basicLayout',  
  name: 'readMore', 
  data: function() {
     return homeslider.findOne({ _id:this.params.query.id });
  } 
});

Router.route('/tam/category/:mainCategory/:subCategory?', {
  layoutTemplate: 'basicLayout',  
  name: 'postList',
  data: function() {
    if (this.params.query.pageId) {
        var postCount = parseInt(this.params.query.count);
        return {
            postsList: Posts.find({pageId:this.params.query.pageId,status:"Published"}, { limit: postCount })
        };      
    } else if (this.params.query.queryString) {
        return {
            postsList : Posts.find({title:new RegExp(this.params.query.queryString,'i'),status:"Published"}),
            searchResultCount : Posts.find({title:new RegExp(this.params.query.queryString,'i'),status:"Published"}).count()
        }        
    }
   }
});   

Router.route('/question', {
  layoutTemplate: 'basicLayout',  
  name: 'questionAnswer',  
  data: function() {
        return {
          answer: answer.find({ questionId: this.params.query.id,status:"active"}),
          question: questionDetail.findOne({ _id:this.params.query.id })
        }
    } 
});

Router.route('/allquestions', {
  layoutTemplate: 'basicLayout',  
  name: 'allQuestions'  
});

Router.route('/login', {
  layoutTemplate: 'basicLayout',
  name: 'userLogin'
});