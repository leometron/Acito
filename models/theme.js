theme = new Mongo.Collection('theme');

theme.attachSchema(
    new SimpleSchema({
        userId: {
            type: String
        },
        themeName: {
            type: String
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    theme.allow({
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
