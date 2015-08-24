section = new Mongo.Collection('section');

section.attachSchema(
    new SimpleSchema({
    sectionName: {
      type: String
    },
    type: {
      type: String
    }
  })
);

if (Meteor.isServer) {
  section.allow({
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
