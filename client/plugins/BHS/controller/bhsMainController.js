var prevId = "";
Template.BHShome.rendered = function(){
   $('body').addClass('bgImage');
}

Template.BHSlist.rendered = function(){
	$('#'+Session.get('firstAlphabetinList')).css('color','#0758C3');
	$('.listContainer').scroll(function(){
        if($('.listContainer').scrollTop() + $('.listContainer').innerHeight()>=$('.listContainer')[0].scrollHeight) {
        	if($('.showMore').is(':visible')){
        		Router.go($('.showMore').val());
        	}
		}
    });
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
					        alphabetArray.push(x);
					    }
					});
				}
		 }else if(Session.get('title') == "DSM-5 codes"){
			var data = section.find({type:"DSM"},{sort: {sectionName: 1}}).fetch();
				if(data.length>0){
					$.each(data, function(i,row) {
		    			var x = row.sectionName.charAt(0).toUpperCase();
					    if ($.inArray(x, alphabetArray) === -1) {
					        alphabetArray.push(x);
					    }
					});
				}
			}
			alphabetArray.sort()
			Session.set('firstAlphabetinList',alphabetArray[0])
		return alphabetArray;
	},
})

/*Template.BHShome.helpers({
	'bhsCode':function(){
		return Pages.find({status: "Published"});
	},
	'logo' : function() {
		return Media.findOne({name:"BHSlogo"});
	},
	'introText' : function() {
		return Posts.find({tags:"Introduction"});
	}	
})*/

Template.BHShome.events({
	'click .button': function(event, fview) {
		var title = event.currentTarget.id;
		Session.set('title',title);
		Session.set('searchString', '');
		Session.set('selectedAlphabet', '');
    	Router.go('list');
  	}
});

Template.BHSlist.events({
	'click .backArrow': function(event) {
		Router.go("/");
  	},
  	'click .alphabet':function(event){
  		$('.listContainer').scrollTop(0);
  		var isAvailable = false;
		var id = event.currentTarget.id;
		$('.alphabet').css('color','black');
		$('#'+id).css('color','#0758C3');
  		Session.set('selectedAlphabet',id);
		Session.set('searchString','');
		// if(id!=prevId){
		// 	$(".listItem").each(function() {
		// 		var text = $(this).text().charAt(0);
	 // 			if(id==text && !isAvailable){
	 // 				$(this).attr('id',"list_"+text);
	 // 				var currentId = $(this).attr('id');
	 // 				prevId = id;
	 // 				isAvailable = true;
	 // 				$parentDiv = $('.listContainer');
	 // 				$parentDiv.animate({
  //   					scrollTop: $parentDiv.scrollTop() + $('#'+currentId).position().top - 111
		// 			}, 'slow');
	 // 			}
	 // 		});
		// }

  	},
  	'keyup #searchString' : function(e){   
  		Session.set('selectedAlphabet','');
		Session.set('searchString',$('#searchString').val());
  	}  
});

$(window).resize(function(evt) {
   setListHeight();
});