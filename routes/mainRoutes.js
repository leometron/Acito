// Home Route
var themeName;
Router.route('/', {
  layoutTemplate: 'basicLayout',	
  // name: 'postList',
  data: function() {          
       // var themeObj =  theme.findOne({userId: Meteor.userId()});
       // if (themeObj) {
       //  themeName = themeObj.themeName;
       // console.log('themeObj..............'+themeObj.themeName);
       //         this.render(themeObj.themeName);        
       // } else {
        // this.render('postList');        
       // }
    },
  action: function () {
        // this.render('home');        
    
    // var themeObj = theme.findOne({userId: Meteor.userId()});
    //   console.log('themeobject............'+Meteor.userId());
          // console.log('themename............'+data);
        // this.render('home');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
    console.log(Meteor.App.NAME);
  }
});

// Router.route('/post/:_id', function () {
    // this.render('home');
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

Router.route('/question', {
  layoutTemplate: 'basicLayout',  
  name: 'questionAnswer',  
  data: function() {
        return {
          answer: answer.findOne({ questionId: this.params.query.id }),
          question: questionDetail.findOne({ _id:this.params.query.id })
        }

    } 
});


Router.route('/pages', {
  layoutTemplate: 'basicLayout',  
  name: 'postList'  
});

Router.route('/allquestions', {
  layoutTemplate: 'basicLayout',  
  name: 'allQuestions'  
});

Router.route('/login', {
  layoutTemplate: 'basicLayout',
  name: 'userLogin'
});