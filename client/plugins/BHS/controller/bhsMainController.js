var prevId = "";
Template.BHShome.rendered = function(){
   $('body').addClass('bgImage');
}

Template.BHSlist.rendered = function(){
	var height = window.innerHeight-112;
   $('body').removeClass('bgImage');
   $('body').addClass('bgColor');
   $('.listContainer, .alphabetical').css('height', height);
   $('.alphabetical').css('height', height+65);
}

Template.BHSlist.helpers({
	'title':function(){
		return Session.get('title');
	},
	'icdList' : function(){
		return ICD.find();
	},
	'icdSectionList':function(){
		return section.find({'type':'ICD'});
	},
	'icdSectionAlphabet':function(){
		var alphabetArray = new Array();
		var type = (Session.get('title') == "ICD-10 codes") ? "ICD" : "DSM";
		var data = section.find({'type':type}).fetch();
		if(data.length>0){
			$.each(data, function(i,row) {
    			var x = row.sectionName.charAt(0).toUpperCase();
			    if ($.inArray(x, alphabetArray) === -1) {
			        alphabetArray.push(x);
			    }
			});
		}
		return alphabetArray.sort();
	},

	'listIcd' : function(){
		if(Session.get('title') == "ICD-10 codes") {
			return ICD.find();
		}
	},
	'listDSM' : function(){
		if(Session.get('title') == "DSM-5 codes") {
			return DSM.find();
		}
	},
	'listCodingRule' : function(){
		if(Session.get('title') == "ICD-10 CM Coding and Documentation Rules") {
			return codingRules.find({},{ sort: { guideline: 1 } });
		}
	},
	'sectionListICD' : function() {
		return section.find({type:"ICD"},{ sort: { sectionName: 1 } });
	},
	'sectionListDSM' : function() {
		return section.find({type:"DSM"},{ sort: { sectionName: 1 } });
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
		//Meteor._reload.reload();        

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
		 				$('.listContainer').scrollTop($(this).position().top - 112);	
		 			}
		 		});
			}
		},100)	;
  	},
  	'keydown #searchString' : function(e){
  		if (e.which == 13) {
			if(Session.get('title') == "ICD-10 CM Coding and Documentation Rules") {
				Meteor.call('searchCodingRules',$('#searchString').val());
			} else {
  				Meteor.call('showSearchSection',$('#searchString').val());			
			}  			
			Meteor._reload.reload();        
  		}
  	}  
});