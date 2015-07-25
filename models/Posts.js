Posts = new Mongo.Collection('posts');

Posts.attachSchema(
    new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    publish: {
      type: Boolean
    },
    createdBy: {
        type: String
    },
    // createdAt: {
    //   type: Date
    // },
    tags: {
      type: String
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Posts.allow({
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