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
		if(Session.get('title') == "ICD-10 CM Coding and Documentation Rules") {

			var find = "";
			if (Session.get('searchString')) {
				find = { guideline : new RegExp(Session.get('searchString'),'i')},{ sort: { guideline: 1 } };
			}else{
				find = { sort: { guideline: 1 } };
			}

			var data = codingRules.find(find).fetch();
			if(data.length>0){
				$.each(data, function(i,row) {
	    			var x = row.guideline.charAt(0).toUpperCase();
				    if ($.inArray(x, alphabetArray) === -1) {
				        alphabetArray.push(x);
				    }
				});
			}
		} else if(Session.get('title') == "ICD-10 codes"){
			var find = "";
			if (Session.get('searchString')) {
				find = { $or: [ { sectionName : new RegExp(Session.get('searchString'),'i'), type:"ICD"}, { sectionCode : new RegExp(Session.get('searchString'),'i'), type:"ICD"} ] },{sort: {sectionName: 1}};
			}else{
				find = {type:"ICD"},{sort: {sectionName: 1}};
			}

			var data = section.find(find).fetch();
				if(data.length>0){
					$.each(data, function(i,row) {
		    			var x = row.sectionName.charAt(0).toUpperCase();
					    if ($.inArray(x, alphabetArray) === -1) {
					        alphabetArray.push(x);
					    }
					});
				}
		 }else if(Session.get('title') == "DSM-5 codes"){
			var find = "";
			if (Session.get('searchString')) {
				find = { $or: [ { sectionName : new RegExp(Session.get('searchString'),'i'), type:"DSM"}, { sectionCode : new RegExp(Session.get('searchString'),'i'), type:"DSM"} ] },{sort: {sectionName: 1}};
			}else{
				find = {type:"DSM"},{sort: {sectionName: 1}};
			}

			var data = section.find(find).fetch();
				if(data.length>0){
					$.each(data, function(i,row) {
		    			var x = row.sectionName.charAt(0).toUpperCase();
					    if ($.inArray(x, alphabetArray) === -1) {
					        alphabetArray.push(x);
					    }
					});
				}
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
				return codingRules.find({ guideline : new RegExp(Session.get('searchString'),'i')},{ sort: { guideline: 1 } });     
			} else {
				return codingRules.find({},{ sort: { guideline: 1 } });
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
		return section.find({ $or: [ { sectionName : new RegExp(Session.get('searchString'),'i'), type:"ICD"}, { sectionCode : new RegExp(Session.get('searchString'), 'i'), type:"ICD"} ,{ sectionName : new RegExp(Session.get('searchString')), type:"DSM"} , { sectionCode : new RegExp(Session.get('searchString')), type:"DSM"} ]  }).count();
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
		if(id!=prevId){
			$(".listItem").each(function() {
				var text = $(this).text().charAt(0);
	 			if(id==text && !isAvailable){
	 				$(this).attr('id',"list_"+text);
	 				var currentId = $(this).attr('id');
	 				prevId = id;
	 				isAvailable = true;
	 				$parentDiv = $('.listContainer');
	 				$parentDiv.animate({
    					scrollTop: $parentDiv.scrollTop() + $('#'+currentId).position().top - 111
					}, 'slow');
	 			}
	 		});
		}
  	},
  	'keyup #searchString' : function(e){   
		Session.set('searchString',$('#searchString').val());
  	}  
});

$(window).resize(function(evt) {
   setListHeight();
});