Meteor.subscribe("questionDetail");

Template.questions.events({
	'click #editQuestion' : function () {
		var questionId = this._id;
		Session.set('currentQuestionId',questionId);
        Router.go("/admin/question/edit?id=" + questionId);		
	},
	'click #deleteQuestion' : function () {
		var del = confirm("Do you really want to Delete this question?");
		if (del == true) {
			Meteor.call('removeQuestion',this._id);
		}
	},
	'click #replyQuestion' : function () {
		var questionId = this._id;
		Session.set('currentQuestionId',questionId);		
		Router.go('/admin/question/reply?id='+questionId);
	}
})

Template.questions.helpers({
    'questionList': function () {
        return questionDetail.find();
    },
    'questionListCount': function() {
    	return questionDetail.find().count();
    }
});

Template.editQuestion.events({
	'click #updateQuestion' : function () {
		var question = $('#question').val();
		var details = $('#questionDetails').val();
		if (!question) {
			$('#emptyQuestionInfo').show();
		} else if (!details) {
			$('#emptyDetailInfo').show();
		} else {
			// var status = (!$('#status').val() ) ? "-" : $('#status').val();
			var status = $('#status :selected').text();			
			var majorComplaint = (!$('#majorComplaint').val() ) ? "-" : $('#majorComplaint').val();		
			var detailExplanation = (!$('#detailExplanation').val() ) ? "-" : $('#detailExplanation').val();			
			var complaintPeriod = (!$('#complaintPeriod').val() ) ? "-" : $('#complaintPeriod').val();			
			var symptoms = (!$('#symptoms').val() ) ? "-" : $('#symptoms').val();			
			var secondaryComplaint = (!$('#secondaryComplaint').val() ) ? "-" : $('#secondaryComplaint').val();			
			var medicineTaking = (!$('#medicineTaking').val() ) ? "-" : $('#medicineTaking').val();
			Meteor.call('updateQuestion',Session.get('currentQuestionId'),status,question,details,majorComplaint,detailExplanation,complaintPeriod,symptoms,secondaryComplaint,medicineTaking)
			Session.set('currentQuestionId','');		
			Router.go('/admin/questions');
		}
		Meteor.setTimeout(function () {
			$('#emptyQuestionInfo').hide(),
			$('#emptyDetailInfo').hide()
		},5000);		
	},
	'click #cancelEditQuestion' : function () {
		Session.set('currentQuestionId','');		
		Router.go('/admin/questions');		
	}
});

Template.editQuestion.rendered = function() {
	$('#emptyQuestionInfo').hide();
	$('#emptyDetailInfo').hide();
};

Template.replyQuestion.events({
	'click #postReply' : function () {
		var answer = $('#answer').val();
		if(!answer) {
			$('#emptyAnswerInfo').show();
		} else {
			Meteor.call('postAnswer',answer,Session.get('currentQuestionId'),'-');
			Session.set('currentQuestionId','');		
			Router.go('/admin/questions');			
		}
		Meteor.setTimeout(function () {
			$('#emptyAnswerInfo').hide()
		},5000);			
	}
});

Template.replyQuestion.rendered = function() {
	$('#emptyAnswerInfo').hide();
};