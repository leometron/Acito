Template.BHShome.rendered = function(){
   $('body').addClass('bgImage');
}

Template.BHSlist.rendered = function(){
	console.log('s inside');
   	$('body').removeClass('bgImage');
   	$('body').addClass('bgColor');
	// Meteor._reload.reload();        
}

Template.BHSlist.helpers({
	'title':function(){
		return Session.get('title');
	},
	'listIcd' : function(){
		if(Session.get('title') == "ICD-10-CM") {
			return ICD.find();
		}
	},
	'listDSM' : function(){
		if(Session.get('title') == "DSM-5-CM") {
			return DSM.find();
		}
	},
	'listCodingRule' : function(){
		if(Session.get('title') == "Coding Rules") {
			return codingRules.find();
		}
	},
	'sectionListICD' : function() {
		return section.find({type:"ICD"});
	},
	'sectionListDSM' : function() {
		return section.find({type:"DSM"});
	},
	'subSectionList' : function() {
		return subSection.find();
	},
	'BHSLogo' : function() {
		return Media.findOne({name:"BHSlogo"});
	},
})

Template.BHShome.helpers({
	'bhsCode':function(){
		return Pages.find({status: "Published"});
	},
	'logo' : function() {
		return Media.findOne({name:"BHSlogo"});
	},
	'introText' : function() {
		return Posts.find({tags:"Introduction"});
	}	
})

Template.BHShome.events({
	'click .button': function(event, fview) {
		var title = event.currentTarget.id;
		Session.set('title',title);
	   	Meteor.call('showSearchSection','');
    	Router.go('list');
		Meteor._reload.reload();        

  	}
});

Template.BHSlist.events({
	'click .backArrow': function(event) {
		history.back();
  	},
  	'click .alphabet':function(event){
  		var isAvailable = false;
		var id = event.currentTarget.id;
		$('.alphabet').css('color','black');
		$('#'+id).css('color','#0758C3');
		Meteor.setTimeout(function(){
			if(id!=prevId){
				$(".list_heading_right").each(function() {
					var text = $(this).text().charAt(0);
		 			if(id==text && !isAvailable){
		 				prevId = id;
		 				isAvailable = true;
		 				$('.listContainer').scrollTop($(this).offset().top - 112);	
		 			}
		 		});
			}
		},100)	;
  	}
});  	
  	'keydown #searchString' : function(e){
  		if (e.which == 13) {
			if(Session.get('title') == "Coding Rules") {
				Meteor.call('searchCodingRules',$('#searchString').val());
			} else {
  				Meteor.call('showSearchSection',$('#searchString').val());			
			}  			
			Meteor._reload.reload();        
  		}
  	}  
});