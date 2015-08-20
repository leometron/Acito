featuredimage = new Mongo.Collection('featuredimage');

featuredimage.attachSchema(
    new SimpleSchema({
        url: {
            type: String
        },
        postId: {
            type: String
        },
        userId: {
            type: String
        }
        // createdAt: {
        //   type: Date,
        //   denyUpdate: true
        // }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    featuredimage.allow({
        insert: function () {
            return true;
        },
        update: function () {
            return true;
        },
        remove: function () {
            return true;
        }
    });
}
