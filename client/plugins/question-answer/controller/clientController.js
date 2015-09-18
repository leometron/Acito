Template.questionDetail.events({
	'click #postQuestion' : function () {
		console.log('s click');
		$.ajax({
			url : "http://localhost:3000/admin/get",
			dataType : "json",
			success : function (data) {
				console.log("............data.............."+JSON.stringify(data));
			},
			error : function () {
				console.log('error');
			}
		});
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
		}
		Meteor.setTimeout(function () {
			$('#emptyQuestionInfo').hide(),
			$('#emptyDetailInfo').hide();		
		},5000);
	},
	'click #closeAskQuestion': function () {
        $('#questionDetail').hide();
       	Session.set('question','');
		clearQuestionContent();
	}
});

Template.questionDetail.rendered = function() {
	$('#emptyQuestionInfo').hide();
	$('#emptyDetailInfo').hide();
	clearQuestionContent();
}

function clearQuestionContent() {
	$('#questionDetails').val("");
	$('#majorComplaint').val("");
	$('#detailExplanation').val("");
	$('#complaintPeriod').val("");
	$('#symptoms').val("");
	$('#secondaryComplaint').val("");
	$('#medicineTaking').val("");
}