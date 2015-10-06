Template.questionDetail.events({
	'click #postQuestion' : function () {
		var question = $('#question').val();
		var details = $('#questionDetails').val();
		if (!question) {
			$('#emptyQuestionInfo').show();
		} else if (!details) {
			$('#emptyDetailInfo').show();
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
		Meteor.setTimeout(function () {
			$('#emptyQuestionInfo').hide(),
			$('#emptyDetailInfo').hide();
		},5000);
	},
	'click #closeAskQuestion': function () {
        // $('#questionDetail').hide();
       	Session.set('question','');
		clearQuestionContent();
		Router.go('/');
		Meteor._reload.reload();
	}
});

Template.questionDetail.rendered = function() {
	$('#emptyQuestionInfo').hide();
	$('#emptyDetailInfo').hide();
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
			$('#emptyAnswerInfo').show();
		} else if(!Meteor.userId()) {
			Router.go('/login');
		} else {
			Meteor.call('postAnswer',answer,$('#quetionId').val(), Meteor.userId());
			$('#answer').val("");
			history.back();
		}
		Meteor.setTimeout(function () {
			$('#emptyAnswerInfo').hide()
		},5000);			
	},
});

Template.questionAnswer.rendered = function() {
	$('#emptyAnswerInfo').hide()
}