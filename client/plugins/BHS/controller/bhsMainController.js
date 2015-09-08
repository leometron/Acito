
if(Meteor.isCordova){
	document.addEventListener("backbutton", function(){
	  if (window.location.href == "http://meteor.local/") {
	    navigator.app.exitApp();
	  } else {
	    Router.go("/");
	  }
	});
}

Template.BHShome.rendered = function(){
	$('#home_logo').attr('src','images/logo.png');
   	$('body').addClass('bgImage');
}

Template.BHSlist.rendered = function(){
	$('.listContainer').scroll(function(){
        if($('.listContainer').scrollTop() + $('.listContainer').innerHeight()>=$('.listContainer')[0].scrollHeight) {
        	if($("input:hidden").length==1){
        		Router.go($('.showMore').val());
        	}
		}
    });
   	$('body').removeClass('bgImage');
   	$('body').addClass('bgColor');
   	setListHeight();
	$('#'+Session.get('firstAlphabetinList')).css('color','#0758C3');   	
}

function setListHeight(){
	$('.listContainer, .alphabetical').css('height', window.innerHeight-111);
   	$('.alphabetical').css('height', window.innerHeight-45);
}

Template.BHSlist.helpers({
	'title':function(){
		return Session.get('title');
	},
	'icdSectionAlphabet':function(){
		var alphabetArray = new Array();
		if(Session.get('title') == "Coding Rules") {
			var data = codingRules.find({},{sort: { guideline: 1 }}).fetch();
			if(data.length>0){
				$.each(data, function(i,row) {
	    			var x = row.guideline.charAt(0).toUpperCase();
				    if ($.inArray(x, alphabetArray) === -1) {
					    alphabetArray.push(x);					    		
				    }
				});
			}
		} else if(Session.get('title') == "ICD-10 codes"){
			var data = section.find({type:"ICD"},{sort: {sectionName: 1}}).fetch();
				if(data.length>0){
					$.each(data, function(i,row) {
		    			var x = row.sectionName.charAt(0).toUpperCase();
					    if ($.inArray(x, alphabetArray) === -1) {
					    	if(ICD.find({sectionName : new RegExp('^' + x,'i') }).count() > 0) {
					        	alphabetArray.push(x);					    		
					    	}
					    }
					});
				}
		 }else if(Session.get('title') == "DSM-5 codes"){
			var data = section.find({type:"DSM"},{sort: {sectionName: 1}}).fetch();
				if(data.length>0){
					$.each(data, function(i,row) {
		    			var x = row.sectionName.charAt(0).toUpperCase();
					    if ($.inArray(x, alphabetArray) === -1) {
					    	if(DSM.find({sectionName : new RegExp('^' + x,'i') }).count() > 0) {
					        	alphabetArray.push(x);					    		
					    	}					    
					    }
					});
				}
			}
			alphabetArray.sort();
        // Meteor.setTimeout(function () {
			Session.set('firstAlphabetinList',alphabetArray[0]);
        // }, 500);    
		return alphabetArray;
	},
	// 'networkConnection' : function() {
	// 	if(!Meteor.status().connected) {
	// 		return 1;
	// 	} else {

	// 	}
	// }
})

Template.BHShome.events({
	'click .button': function(event, fview) {
	// if(!Meteor.status().connected) {
	// 	alert('Please check your internet connection');
	// } else {
	// 	alert('success');		
		var title = event.currentTarget.id;
		Session.set('title',title);
		Session.set('searchString', '');
		Session.set('selectedAlphabet', '');
    	Router.go('list');
  	// }
  	}
});

Template.BHSlist.events({
	'click .backArrow': function(event) {
		Router.go("/");
  	},
  	'click .alphabet':function(event){
  		$('.listContainer').scrollTop(0);
		var id = event.currentTarget.id;
		if (id){
  			Session.set('searchString',"");
			$('.alphabet').css('color','black');
			$('#'+id).css('color','#0758C3');			
			Session.set('selectedAlphabet',id);
		}
  	},
  	'keyup #searchString' : function(e){
  		if (!$('#searchString').val()) {
  			Session.set('searchString',"");
  		}
  		if (e.which == 13) {
			Session.set('searchString',$('#searchString').val());
  		}
  	}  
});

Template.BHShome.helpers({
	'bhsButtons':function(){
		return Pages.find({status: "Published"});
	},
	// 'logo' : function() {
	// 	return Media.findOne({name:"BHSlogo"});
	// },
	'introText' : function() {
		return Posts.find({tags:"Introduction"});
	}	
})
$(window).resize(function(evt) {
   setListHeight();
});
