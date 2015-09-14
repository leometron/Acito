Meteor.publish('questionDetail', function () {
  return questionDetail.find();
});

Meteor.methods({
    'postQuestion': function (question, details, majorComplaint, detailExplanation, complaintPeriod, symptoms, secondaryComplaint, medicineTaking) {
        questionDetail.insert({question: question, detail: details,complaint: majorComplaint, complaintDetail: detailExplanation,complaintPeriod: complaintPeriod, symptoms: symptoms,secondaryComplaint: secondaryComplaint, medicine: medicineTaking});
        console.log('question posted successfully');     
    }
});