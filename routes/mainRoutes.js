// Home Route
var themeName;
Router.route('/', {
  layoutTemplate: 'basicLayout',	
  name: 'home',
  data: function() {          
       // var themeObj =  theme.findOne({userId: Meteor.userId()});
       // if (themeObj) {
       //  themeName = themeObj.themeName;
       // console.log('themeObj..............'+themeObj.themeName);
       //         this.render(themeObj.themeName);        
       // } else {
        this.render('home');        
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
  // action: function () {
  //   // this.render('home');
  //   console.log('user id............'+Meteor.userId());    
  //   this.render('postDetail');    
  //   SEO.set({ title: 'postdetails - ' + Meteor.App.NAME });
  //   console.log(Meteor.App.NAME);
  // }

  data: function() {
    return Posts.findOne({ _id: this.params._id });

  }    
});