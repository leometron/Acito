Template.questionDetail.events({
	'click .hide-on-large-only #postQuestion' : function() {
		questiondetails('hide-on-large-only');
	},

	'click .hide-on-med-and-down #postQuestion' : function() {
		questiondetails('hide-on-med-and-down');
	},

	'click #closeAskQuestion': function () {
        // $('#questionDetail').hide();
       	Session.set('question','');
		clearQuestionContent();
		Router.go('/');
		Meteor._reload.reload();
	}
});

function questiondetails(windowclass) {
	var question = $('#question').val();
	var details = $('.' + windowclass + ' #questionDetails').val();

		if (!question) {
			Materialize.toast('Enter a Question', 3000, 'error-toast');
		} else if (!details) {
			Materialize.toast('Enter a question details', 3000, 'error-toast');
		} else {
			var majorComplaint = (!$('#majorComplaint').val() ) ? "-" : $('#majorComplaint').val();		
			var detailExplanation = (!$('#detailExplanation').val() ) ? "-" : $('#detailExplanation').val();			
			var complaintPeriod = (!$('#complaintPeriod').val() ) ? "-" : $('#complaintPeriod').val();			
			var symptoms = (!$('#symptoms').val() ) ? "-" : $('#symptoms').val();			
			var secondaryComplaint = (!$('#secondaryComplaint').val() ) ? "-" : $('#secondaryComplaint').val();			
			var medicineTaking = (!$('#medicineTaking').val() ) ? "-" : $('#medicineTaking').val();
			Meteor.call('postQuestion',question,details,majorComplaint,detailExplanation,complaintPeriod,symptoms,secondaryComplaint,medicineTaking);
			$('#questionDetail').hide();
			Session.set('question','');
			clearQuestionContent();
			$('#questionArea').val("");
			// history.back();
			Router.go('/');
		}
}



Template.questionDetail.rendered = function() {
	// $('#emptyQuestionInfo').hide();
	// $('#emptyDetailInfo').hide();
	$("#questioncol label").addClass("active");
    // $('#question').val(Session.get('question'));           	
	clearQuestionContent();
}

Template.questionDetail.helpers({
	'question' : function () {
		return Session.get('question');
	}
});

function clearQuestionContent() {
	$('#questionDetails').val("");
	$('#majorComplaint').val("");
	$('#detailExplanation').val("");
	$('#complaintPeriod').val("");
	$('#symptoms').val("");
	$('#secondaryComplaint').val("");
	$('#medicineTaking').val("");
}

Template.questionAnswer.events({
	'click #client-post-answer' : function () {
		var answer = $('#answer').val();
		if(!answer) {
			// $('#emptyAnswerInfo').show();
			Materialize.toast('Enter a answer', 3000, 'error-toast');
		} else if(!Meteor.userId()) {
			Router.go('/login');
		} else {
			Meteor.call('postAnswer',answer,$('#quetionId').val(), Meteor.userId());
			$('#answer').val("");
			history.back();
		}
		// Meteor.setTimeout(function () {
		// 	$('#emptyAnswerInfo').hide()
		// },5000);			
	},
});

// Template.questionAnswer.rendered = function() {
// 	$('#emptyAnswerInfo').hide()
// }