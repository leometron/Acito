// Home Route
Router.route('/', {
  layoutTemplate: 'basicLayout',	
  name: 'home',
  action: function () {
    this.render('home');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
    console.log(Meteor.App.NAME);
  }
});

// Router.route('/post/:_id', function () {
    // this.render('home');
Router.route('/post/:_id', {    
  layoutTemplate: 'basicLayout',	
  name: 'postDetail',
  action: function () {
    // this.render('home');
    this.render('postDetail');    
    SEO.set({ title: 'postdetails - ' + Meteor.App.NAME });
    console.log(Meteor.App.NAME);
  }    
});