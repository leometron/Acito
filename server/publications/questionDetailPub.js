Meteor.publish('questionDetail', function () {
  return questionDetail.find();
});

Meteor.methods({
    'postQuestion': function (question, details, majorComplaint, detailExplanation, complaintPeriod, symptoms, secondaryComplaint, medicineTaking) {
    	var createdTime = new Date();
        questionDetail.insert({status: "deactive", question: question, detail: details,complaint: majorComplaint, complaintDetail: detailExplanation,complaintPeriod: complaintPeriod, symptoms: symptoms,secondaryComplaint: secondaryComplaint, medicine: medicineTaking, createdBy: "-", createdAt: createdTime});
        console.log('question posted successfully');     
    },
    'updateQuestion': function (id, status, question, details, majorComplaint, detailExplanation, complaintPeriod, symptoms, secondaryComplaint, medicineTaking) {
        questionDetail.update(id, {$set: {status: status, question: question, detail: details,complaint: majorComplaint, complaintDetail: detailExplanation,complaintPeriod: complaintPeriod, symptoms: symptoms,secondaryComplaint: secondaryComplaint, medicine: medicineTaking}});
        console.log('question updated successfully');     	
    },
    'removeQuestion': function (id) {
        questionDetail.remove({_id: id});
        console.log('question removed successfully');
    }
});