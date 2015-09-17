Meteor.publish('answer', function () {
  return answer.find();
});

Meteor.methods({
    'postAnswer': function (answerTXT, questionId, ansBy) {
        answer.insert({status: "deactive", answerDetail: answerTXT, questionId: questionId,answeredBy: ansBy});
        console.log('answer posted successfully');     
    },
    'updateAnswer': function (id, status, answerTXT) {
    	answer.update(id, {$set: {status: status, answerDetail: answerTXT}});
        console.log('answer updated successfully');         	
    },
    'removeAnswer': function (id) {
        answer.remove({_id: id});
        console.log('answer removed successfully');
    }    
});