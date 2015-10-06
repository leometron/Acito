Meteor.subscribe("answer");

Template.answers.events({
	'click #editAnswer' : function () {
		var answerId = this._id;
		Session.set('currentAnswerId',answerId);
		Session.set('currentAnswerQuestionId', this.questionId);
        Router.go("/admin/answer/edit?id=" + answerId);		
	},
	'click #deleteAnswer' : function () {
		var del = confirm("Do you really want to Delete this answer?");
		if (del == true) {
			Meteor.call('removeAnswer',this._id);
		}
	}
})

Template.answers.helpers({
    'answerList': function () {
        return answer.find();
    },
    'answerListCount': function() {
    	return answer.find().count();
    }
});

Template.editAnswer.events({
	'click #updateAnswer' : function () {
		var ansDetail = $('#answerDetail').val();
		if (!ansDetail) {
			$('#emptyAnswerInfo').show();
		} else {
			var status = $('#status :selected').text();			
			Meteor.call('updateAnswer',Session.get('currentAnswerId'),status,ansDetail)
			Session.set('currentAnswerId','');		
			Router.go('/admin/answers');
		}
		Meteor.setTimeout(function () {
			$('#emptyAnswerInfo').hide()
		},5000);		
	},
	'click #cancelEditAnswer' : function () {
		Session.set('currentAnswerId','');		
		Router.go('/admin/answers');		
	}
});

Template.editAnswer.helpers({
    'currentQuestion': function () {
        return questionDetail.findOne(Session.get('currentAnswerQuestionId'));
    },
    'answerListCount': function() {
    	return answer.find().count();
    }
});
Template.editAnswer.rendered = function() {
	$('#emptyAnswerInfo').hide();

	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );

};