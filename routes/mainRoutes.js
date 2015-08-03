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
