questionDetail = new Mongo.Collection('questionDetail');

questionDetail.attachSchema(
    new SimpleSchema({
    status: {
      type: String
    },
    question: {
      type: String
    },
    detail: {
      type: String
    },
    complaint: {
      type: String
    },
    complaintDetail: {
      type: String
    },
    complaintPeriod: {
      type: String
    },
    symptoms: {
      type: String
    },
    secondaryComplaint: {
      type: String
    },
    medicine: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: String
    },
    views: {
      type: Number
    }        
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  questionDetail.allow({
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
