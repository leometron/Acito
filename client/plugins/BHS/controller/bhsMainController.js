Template.BHShome.rendered = function(){
   $('body').addClass('splash_bg');
}

Template.BHSlist.helpers({
	'title':function(){
		return Session.get('title');
	},
	'list' : function(){
		if(Session.get('title') == "ICD-10-CM") {
			return ICD.find();
		} else if (Session.get('title') == "DSM-5-CM") {
			return DSM.find();			
		} else if (Session.get('title') == "Coding Rules") {
			return codingRules.find();			
		}
	},
	'BHSLogo' : function() {
		return Media.findOne({caption:"LOGO"});
	},
})

Template.BHShome.helpers({
	'bhsCode':function(){
		return Pages.find();
	},
	'logo' : function() {
		return Media.findOne({caption:"LOGO"});
	},
	'introText' : function() {
		return Posts.find({tags:"Introduction"});
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