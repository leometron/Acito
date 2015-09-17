answer = new Mongo.Collection('answer');

answer.attachSchema(
    new SimpleSchema({
    status: {
      type: String
    },
    answerDetail: {
      type: String
    },
    questionId: {
      type: String
    },
    answeredBy: {
      type: String
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  answer.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
