var prevId = "";
Template.BHShome.rendered = function(){
   $('body').addClass('bgImage');
}

Template.BHSlist.rendered = function(){
   $('body').removeClass('bgImage');
   $('body').addClass('bgColor');
   setListHeight();
}

function setListHeight(){
	$('.listContainer, .alphabetical').css('height', window.innerHeight-111);
   $('.alphabetical').css('height', window.innerHeight-45);
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
		if (Session.get('searchString')) {
			return codingRules.find({ guideline : new RegExp(Session.get('searchString'),'i')});
			// return section.find({ sectionName : new RegExp(Session.get('searchString')), type:"ICD"});        
		} else {
			return codingRules.find();
		}			
		}
	},
	'sectionListICD' : function() {
		if (Session.get('searchString')) {
			return section.find({ $or: [ { sectionName : new RegExp(Session.get('searchString'),'i'), type:"ICD"}, { sectionCode : new RegExp(Session.get('searchString'),'i'), type:"ICD"} ] },{sort: {sectionName: 1}})
		} else {
			return section.find({type:"ICD"},{sort: {sectionName: 1}});
		}
	},
	'sectionListDSM' : function() {
		if (Session.get('searchString')) {
			return section.find({ $or: [ { sectionName : new RegExp(Session.get('searchString'),'i'), type:"DSM"}, { sectionCode : new RegExp(Session.get('searchString'),'i'), type:"DSM"} ] },{sort: {sectionName: 1}})			
		} else {
			return section.find({type:"DSM"},{sort: {sectionName: 1}});
		}		
	},
	'subSectionList' : function() {
		return subSection.find();
	},
	'BHSLogo' : function() {
		return Media.findOne({name:"BHSlogo"});
	},
	'searchDataEmpty' : function() {
		return section.find({ $or: [ { sectionName : new RegExp(Session.get('searchString')), type:"ICD"}, { sectionCode : new RegExp(Session.get('searchString')), type:"ICD"} ,{ sectionName : new RegExp(Session.get('searchString')), type:"DSM"} , { sectionCode : new RegExp(Session.get('searchString')), type:"DSM"} ]  }).count();
		// console.log('count.....'+count);
	}
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
		Session.set('searchString', '');
    	Router.go('list');
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
				$(".listItem").each(function() {
					var text = $(this).text().charAt(0);
		 			if(id==text && !isAvailable){
		 				prevId = id;
		 				isAvailable = true;
		 				$('.listContainer').animate({scrollTop:$(this).offset().top - 111}, 'slow');	
		 			}
		 		});
			}
		},100);
  	},
  	'keyup #searchString' : function(e){
  		// var searchString = $('#searchString').val();
  		// Meteor.setTimeout(function(){
  			// alert('searchString...'+searchString)
  		// }
  		// 	,1000);
  		
  		// if (e.which == 13) {
			// if(Session.get('title') == "ICD-10 CM Coding and Documentation Rules") {
			// 	Meteor.call('searchCodingRules',$('#searchString').val());
			// } else {
  	// 			Meteor.call('showSearchSection',$('#searchString').val());			
			// }  			
			// Meteor._reload.reload();   
			Session.set('searchString',$('#searchString').val());
  		// }
  	}  
});

$(window).resize(function(evt) {
   setListHeight();
});