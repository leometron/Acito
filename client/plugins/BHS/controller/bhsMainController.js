Template.BHShome.rendered = function(){
   $('body').addClass('splash_bg');
}

Template.BHSlist.helpers({
	'title':function(){
		return Session.get('title');
	},
	'icdList' : function(){
		return ICD.find();
	}
})

Template.BHShome.helpers({
	'bhsCode':function(){
		return Pages.find();
	}
})

Template.BHShome.events({
	'click .button': function(event, fview) {
		var title = event.currentTarget.id;
		Session.set('title',title);
    	Router.go('list');
  }
});

Template.BHSlist.events({
	'click #backArrow': function(event, fview) {
		history.back();
  }
});