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
			// alert(symptoms);
			Meteor.call('postQuestion',question,details,majorComplaint,detailExplanation,complaintPeriod,symptoms,secondaryComplaint,medicineTaking);
			$('#questionDetail').hide();
			Session.set('question','');
		}
		Meteor.setTimeout(function () {
			$('#emptyQuestionInfo').hide(),
			$('#emptyDetailInfo').hide();		
		},5000);
	},
	'click #closeAskQuestion': function () {
        $('#questionDetail').hide();
       	Session.set('question','');
	}
});

Template.questionDetail.rendered = function() {
	$('#emptyQuestionInfo').hide();
	$('#emptyDetailInfo').hide();
}