Category = new Mongo.Collection('category');

Category.attachSchema(
    new SimpleSchema({
    name: {
      type: String
    },
    description: {
      type: String
    },
    slug: {
      type: String
    },
    parent: {
      type: String
    }   
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Category.allow({
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
