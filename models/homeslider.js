homeslider = new Mongo.Collection('homeslider');

homeslider.attachSchema(
    new SimpleSchema({
        title: {
            type: String
        },
        sliderName: {
            type: String
        },
        sliderImage: {
            type: String
        },
        createdAt: {
            type: String
        },
        published: {
            type: Boolean
        },
        deleted: {
            type: Boolean
        },
        createdBy: {
            type: String
        },
        status: {
            type: String
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    homeslider.allow({
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
