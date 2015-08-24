DSM = new Mongo.Collection('DSM');

DSM.attachSchema(
    new SimpleSchema({
    sectionId: {
      type: String
    },
    sectionName: {
      type: String
    },    
    subSectionId: {
      type: String
    },
    subSectionName: {
      type: String
    },     
    DSMCode: {
      type: String
    },
    DSMDetail: {
      type: String
    }    
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  DSM.allow({
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
