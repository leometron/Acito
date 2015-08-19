plugin = new Mongo.Collection('plugin');

plugin.attachSchema(
    new SimpleSchema({
        title: {
            type: String
        },
        subtitle: {
            type: [Object]
        },
        'subtitle.$.sTitle': {
            type: String
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    plugin.allow({
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
