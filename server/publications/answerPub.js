Meteor.publish('answer', function () {
  return answer.find();
});

Meteor.methods({
    'postAnswer': function (answerTXT, questionId, ansBy) {
        answer.insert({status: "deactive", answerDetail: answerTXT, questionId: questionId,answeredBy: ansBy});
        console.log('answer posted successfully');     
    }
});