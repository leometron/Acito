Meteor.subscribe("allDSM");
Meteor.subscribe("subSection");

var select_data = [];

Template.BHSDSM.events({    
	    'click #addNewDSMSection' : function () {
	    	$('#addNewDSMSection').hide();
	    	$('#minimizeDSMSection').show();
	        $('#chooseDSMSectionName').fadeIn(500);
	    },
	    'click #minimizeDSMSection' : function () {
	        $('#minimizeDSMSection').hide();
	        $('#addNewDSMSection').show();
	        $('#chooseDSMSectionName').fadeOut(500);
            $('#DSMSectionName').val("");
            $('#DSMSectionName').attr('placeholder','Section');
            $('#sectionCode').val("");
            $('#sectionCode').attr('placeholder','Code');                          
	    },
        'click #editDSMSection' : function() {
            $('#editDSMSectionList').show();
        },
        'click #editDSMSubSection' : function() {
            $('#editDSMSubSectionList').show();
        },
	    'click #addNewDSMSubSection' : function () {
	     	$('#addNewDSMSubSection').hide();
	     	$('#minimizeDSMSubSection').show();
	        $('#chooseDSMSubSectionName').fadeIn(500);
	    },
	    'click #minimizeDSMSubSection' : function () {
	        $('#minimizeDSMSubSection').hide();
	        $('#addNewDSMSubSection').show();
	        $('#chooseDSMSubSectionName').fadeOut(500);
            $('#DSMSubSectionName').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section');
            $('#subSectionCode').val("");
            $('#subSectionCode').attr('placeholder','Code');                           
	    },
	    'click #cancelDSMSection' : function () {
	        $('#minimizeDSMSection').hide();
	        $('#addNewDSMSection').show();
	        $('#chooseDSMSectionName').fadeOut(500);
            $('#DSMSectionName').val("");
            $('#DSMSectionName').attr('placeholder','Section');
            $('#sectionCode').val("");
            $('#sectionCode').attr('placeholder','Code');                         
	    },
	    'click #cancelDSMSubSection' : function () {
	        $('#minimizeDSMSubSection').hide();
	        $('#addNewDSMSubSection').show();
	        $('#chooseDSMSubSectionName').fadeOut(500);
            $('#DSMSubSectionName').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section');
            $('#subSectionCode').val("");
            $('#subSectionCode').attr('placeholder','Code');                            
	    },

	'click #saveDSMSection': function () {
        if (!$('#DSMSectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            $('#minimizeDSMSection').hide();
            $('#addNewDSMSection').show();
            $('#chooseDSMSectionName').fadeOut(500);
            Session.set('errorMessage', '');
            var sectionCode = (!$('#sectionCode').val() ) ? "-" : $('#sectionCode').val();
            var capitalizedSectionCode = sectionCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            var secName = $('#DSMSectionName').val();
            var capitalizedSection = secName.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            Meteor.call('insertSection', capitalizedSection, capitalizedSectionCode, "DSM");
            $('#DSMSectionName').val("");
            $('#sectionCode').val("");
            $('#DSMSectionName').attr('placeholder','Section');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);	        
    },

    'click #updateDSMSection': function() {
        if(!$('#updateSection').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            Session.set('errorMessage', '');
            var sectionCode = (!$('#updateCode').val() ) ? "-" : $('#updateCode').val();
            var capitalizedSectionCode = sectionCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            var secName = $('#updateSection').val();
            var capitalizedSection = secName.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            Meteor.call('updateDSMSection', capitalizedSection, capitalizedSectionCode, "DSM", Session.get('currentDSMSectionid'));
            Meteor.setTimeout(function () {
                $('#updateDSMSectionName').hide()
            }, 1500);
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);
    },

    'click #updateDSMSubSection': function() {
        if(!$('#updateSubSection').val()) {
            Session.set('errorMessage', 'Sub Section name is required');
        } else {
            Session.set('errorMessage', '');
            var subsectionCode = (!$('#updateSubCode').val() ) ? "-" : $('#updateSubCode').val();
            var capitalSubSectionCode = subsectionCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            var subsecName = $('#updateSubSection').val();
            var capitalSubSection = subsecName.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            Meteor.call('updateDSMSubSection', capitalSubSection, capitalSubSectionCode, Session.get('currentDSMSubSectionid'));
            Meteor.setTimeout(function () {
               $('#updateSubSectionName').hide()
            }, 1500);
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);
    },

    'click #saveDSMSubSection': function () {
        var sectionName = $('#sectionList :selected').text();
        var sectionId = $('#sectionList').val();
        if (sectionName == "Select") {
            Session.set('errorMessage', 'Please select section');
        } else if (!$('#DSMSubSectionName').val()) {
            Session.set('errorMessage', 'Sub Section name is required');
        } else {
            $('#minimizeDSMSubSection').hide();
            $('#addNewDSMSubSection').show();
            $('#chooseDSMSubSectionName').fadeOut(500);            
            Session.set('errorMessage', '');
            var subSectionCode = (!$('#subSectionCode').val() ) ? "-" : $('#subSectionCode').val();
            var capitalizedSectionCode = subSectionCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            var subSecName = $('#DSMSubSectionName').val();
            var capitalizedSection = subSecName.replace(/^[a-z]/, function(m){ return m.toUpperCase() });            
            Meteor.call('insertSubSection', sectionId, sectionName, capitalizedSection, capitalizedSectionCode);
            $('#DSMSubSectionName').val("");
            $('#subSectionCode').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);           
    },
    'click #saveCurrentDSMPost': function () {
        var sectionName = $('#sectionList :selected').text();
        var sectionId = $('#sectionList').val();
        var subSectionName = $('#subSectionList :selected').text();
        var subSectionId = $('#subSectionList').val();        
        var dsmCode = $('#DSMCode').val();
        var capitalizedDsmCode = dsmCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        var dsmDetail = $('#DSMDetail').val();
        var capitalizedDsmDetail = dsmDetail.replace(/^[a-z]/, function(m){ return m.toUpperCase() });

        if (sectionName == "Select") {
            Session.set('errorMessage','Please select section');
        } else if(!dsmCode) {
            Session.set('errorMessage','DSM Code is required');
        } else if(!dsmDetail) {
            Session.set('errorMessage','DSM Description is required');
        } else {
            $('#cancelCurrentDSMPost').hide();      
            Meteor.call('insertDSM',sectionId,sectionName,subSectionId,subSectionName,capitalizedDsmCode,capitalizedDsmDetail,Session.get('currentDSMid'));
            if (Session.get('currentDSMid')) {
                Session.set('BHSSuccessMessage', 'DSM '+ dsmCode + ' successfully updated');               
            } else {
                Session.set('BHSSuccessMessage', 'DSM '+ dsmCode + ' successfully saved');            
            }
            Meteor.setTimeout(function () {
                Session.set('BHSSuccessMessage', ''),Session.set('currentDSMid',''),$('#sectionList').val("Select"),
                $('#subSectionList').val("Select"),$('#DSMCode').val(""),$('#DSMDetail').val(""),
                $('#DSMCode').attr("placeholder","DSMCode"),$('#DSMDetail').attr("placeholder","Description")
            }, 2600);            
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);    
    },
    'click .DSM-data-row' : function () {
        Session.set('currentDSMid',this._id);
        $(window).scrollTop(0);
    },
    'click .section-data-row' : function() {
        Session.set('currentDSMSectionid', this._id);
        $('#updateDSMSectionName').show();
    },
    'click .subsection-row' : function() {
        Session.set('currentDSMSubSectionid', this._id);
         $('#updateSubSectionName').show();
    },
    'click #cancelCurrentDSMPost': function () {
        Session.set('currentDSMid','');
        $('#sectionList').val("Select");
        $('#subSectionList').val("Select");        
    },
    'click #cancelSection' : function() {
        Session.set('currentDSMSectionid', '');
        $('#updateDSMSectionName').hide();
    },
    'click #cancelSubSection' : function() {
         Session.set('currentDSMSubSectionid', '');
         $('#updateSubSectionName').hide();
    },
    'click .menuitem2': function (event) {
        $('#actiondropdown').text($(event.target).text());
    },
    'click .menuitem3': function (event) {
        $('#actiondropdown1').text($(event.target).text());
    },
    'click .menuitem4': function (event) {
        $('#actiondropdown2').text($(event.target).text());
    },
    'click .checkbox': function (event) {
        var selectcheck = event.target.checked;
        if (selectcheck == true) {
            select_data.push(this._id);
        } else {
            var index = select_data.indexOf(this._id);
            select_data.splice(index, 1);
        }
    },
    'click #checkboxAll' : function(event){
        var selectcheck = event.target.checked;
        if(selectcheck == true){
            $('input:checkbox').prop('checked',true);
        }else{
            $('input:checkbox').prop('checked',false);
        }
        $(":checkbox").each(function() {
           if(this.checked){
                select_data.push(this.id);
           }
       });
    },
    'click #apply': function () {
        Meteor.call('removeSelectDsm', select_data, $('#actiondropdown').text());
         Meteor.setTimeout(function () {
            $('#actiondropdown').text("Bulk Actions"), Session.set('currentDSMid',''),
            $('input:checkbox').prop('checked',false);
        }, 250);
    },
    'click #sectionapply': function(){
        Meteor.call('removeDSMSelectSection', select_data, $('#actiondropdown1').text());
        Meteor.setTimeout(function () {
            $('#actiondropdown1').text("Bulk Actions");
            if(Session.get('sectionTotalCountDSM')==0){
                $('#editDSMSectionList').fadeOut(500);
            }
        }, 100);
    },
    'click #subsectionapply': function(){
        Meteor.call('removeSelectSubSection', select_data, $('#actiondropdown2').text());
        Meteor.setTimeout(function () {
            $('#actiondropdown2').text("Bulk Actions");
            if(Session.get('subSectionTotalCount')==0){
                $('#editDSMSubSectionList').fadeOut(500);
            }
        }, 100);
    },
    'click #closesection': function() {
       Session.set('currentDSMSectionid', '');
       $('#editDSMSectionList').hide();
       $('#updateDSMSectionName').hide(); 
    },
    'click #closesubsection': function() {
        Session.set('currentDSMSubSectionid', '');
        $('#editDSMSubSectionList').hide();
        $('#updateSubSectionName').hide();
    },
    'change #sectionList': function() {
        if($('#sectionList :selected').val() != "Select"){
             Session.set("selectsectionId", $('#sectionList :selected').val());
        } else {
            Session.set("selectsectionId", "");
        }
    }
});


Template.BHSDSM.helpers({
    'sectionList': function () {
        return section.find({type:"DSM"});
    },
    'selectedSection': function(){
        return section.findOne(Session.get('currentDSMSectionid'));
    },
    'sectionListCountDSM' : function () {
        Session.set('sectionTotalCountDSM',section.find({type:"DSM"}).count());
        return section.find({type:"DSM"}).count();  
    },
    'selectSubSection': function(){
        return subSection.findOne(Session.get('currentDSMSubSectionid'));
    },
    'subSectionList': function () {
        if(Session.get('selectsectionId')) {
            return subSection.find({sectionId:Session.get('selectsectionId')});
        } else {
            return subSection.find();
        }
    },
    'subSectionListCount' : function () {
        Session.set('subSectionTotalCount',subSection.find().count());
        return subSection.find().count();  
    },
    'DSMList': function () { 
        if(Session.get('selectsectionId')){
            return DSM.find({sectionId:Session.get('selectsectionId')},{limit: Session.get('DsmCodeCount')});
        } else {
            return DSM.find({},{limit: Session.get('DsmCodeCount')});
        }
    },
    'selectedDSM' : function () {
        return DSM.findOne(Session.get('currentDSMid'));        
    },
    'DSMListCount': function() {
        return DSM.find().count();
    }
});


Template.BHSDSM.rendered = function () {
    Session.set('DsmCodeCount',10);
    Session.set('selectsectionId', '');
	$('#chooseDSMSectionName').hide();
    $('#chooseDSMSubSectionName').hide();
    $('#minimizeDSMSection').hide();
    $('#minimizeDSMSubSection').hide();
    $('#editDSMSectionList').hide();
    $('#editDSMSubSectionList').hide();
    $('#updateDSMSectionName').hide();
    $('#updateSubSectionName').hide();
    $(window).scroll(function(){
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            Meteor.setTimeout(function(){
                Session.set('DsmCodeCount', Session.get('DsmCodeCount') +10);    
            },1000);
            
        }
    });
};
