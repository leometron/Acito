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

Router.route('/post/:_id', {    
  layoutTemplate: 'basicLayout',	
  name: 'postDetail',
   data: function() {
      return {
        images: featuredimage.find({postId:this.params._id}, { limit:3 }),    
        post: Posts.findOne(this.params._id)
      };
    }       
});

Router.route('/ask', {
  layoutTemplate: 'basicLayout',  
  name: 'questionDetail'  
});

Router.route('/posts', {
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


// Router.route('/pages', {
//   layoutTemplate: 'basicLayout',  
//   name: 'postList'  
// });

Router.route('/allquestions', {
  layoutTemplate: 'basicLayout',  
  name: 'allQuestions'  
});