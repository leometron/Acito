Meteor.subscribe('allCodingRules');
var select_data = [];

Template.BHSCodingRules.events({
	'click #saveCurrentCodingRules' : function() {
		var code = $('#codingRulesCode').val();
		var guideline = $('#codingRulesGuideline').val();
        var capitalizedGuideline = guideline.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
		var definition = $('#codingRulesDefinition').val();
        var capitalizedDefinition = definition.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
			if(!code) {
				Session.set('errorMessage','Code Reference is required');
			} else if(!guideline) {
				Session.set('errorMessage','Coding and Documentation Guideline is required');
			} else if (!definition) {
				Session.set('errorMessage','Coding and Guideline Definition is required');
			} else {
				Meteor.call('insertCodingRules', code, capitalizedGuideline, capitalizedDefinition, Session.get('currentCodingRulesid'));
                if (Session.get('currentCodingRulesid')) {
                    Session.set('BHSSuccessMessage', 'Coding Rules successfully updated');               
                } else {
                    Session.set('BHSSuccessMessage', 'Coding Rules successfully saved');
                }                 
				Meteor.setTimeout(function () {
	                Session.set('BHSSuccessMessage', ''),$('#codingRulesCode').val(""),$('#codingRulesGuideline').val(""),
	                $('#codingRulesDefinition').val(""), Session.set('currentCodingRulesid','');
            	}, 2000);  
			}
			Meteor.setTimeout(function () {
            	Session.set('errorMessage','')
        	}, 2000);
	},
	'click .CodingRules-data-row' : function() {
		Session.set('currentCodingRulesid',this._id);
        $(window).scrollTop(0);
	},
	'click .cancelCurrentId' : function () {
    	Session.set('currentCodingRulesid','');
    },
    'click .menuitem2': function (event) {
        $('#actiondropdown').text($(event.target).text());
    },
    'click .checkboxCodingRules': function (event) {
        var selectcheck = event.target.checked;
        if (selectcheck == true) {
            select_data.push(this._id);
        } else {
            var index = select_data.indexOf(this._id);
            select_data.splice(index, 1);
        }
    },
    'click #checkboxCodingRulesAll' : function(event){
        var selectcheck = event.target.checked;
        if(selectcheck == true){
            $('.checkboxCodingRules:checkbox').prop('checked',true);
        }else{
            $('.checkboxCodingRules:checkbox').prop('checked',false);
        }
        $(".checkboxCodingRules:checkbox").each(function() {
           if(this.checked){
                select_data.push(this.id);
           }else{
                var index = select_data.indexOf(this.id);
                select_data.splice(index, 1);
           }
       });
    },
    'click #apply': function () {
        if (select_data.length == 0 ) {
            Session.set('errorMessage','Choose atleast any one Rule to delete');
        } else {        
            Meteor.call('removeSelectCodingRules', select_data, $('#actiondropdown').text());
            $('#checkboxCodingRulesAll:checkbox').prop('checked',false);
            select_data = [];
        }
        Meteor.setTimeout(function () {
            $('#actiondropdown').text("Bulk Actions"), Session.set('currentCodingRulesid', ''),$('#apply').hide()
        }, 250);
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);         
    },
    'click #deleteall' : function () {
        $('#apply').fadeIn(500);
    },    
});

Template.BHSCodingRules.helpers({
	'codingRulesList': function () {
        return codingRules.find({},{limit: Session.get('CodinRuleCount')});
    },
    'selectedCodingRules' : function () {
    	return codingRules.findOne(Session.get('currentCodingRulesid'));        
    },
    'codingListCount': function() {
        return codingRules.find().count();
    }
});

Template.BHSCodingRules.rendered = function () {
    Session.set('CodinRuleCount',10);
    $(window).scroll(function(){
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            Meteor.setTimeout(function(){
                Session.set('CodinRuleCount', Session.get('CodinRuleCount') +10);    
            },1000);            
        }
    });
    $('#apply').hide();        
}

Template.adminTop.helpers({
	'BHSErrorMsg' : function() {
		return Session.get('errorMessage');
	},
	'BHSSuccessMessage' : function() {
		return Session.get('BHSSuccessMessage');		
	}
});