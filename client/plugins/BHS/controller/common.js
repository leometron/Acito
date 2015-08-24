Template.BHShome.rendered = function(){
   $('body').addClass('splash_bg');
}

Template.list.helpers({
	'title':function(){
		return Session.get('title');
	}
})


Template.BHShome.events({
	'click .button': function(event, fview) {
		var title = event.currentTarget.id;
		Session.set('title',title);
    	Router.go('list');
  }
});

Template.list.events({
	'click #backArrow': function(event, fview) {
		history.back();
  }
});