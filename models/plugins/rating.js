rating = new Mongo.Collection('rating');

rating.attachSchema(
    new SimpleSchema({
    userId: {
      type: String
    },
    postId: {
      type: String
    },
    points: {
      type: Number,
      decimal:true
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  rating.allow({
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
