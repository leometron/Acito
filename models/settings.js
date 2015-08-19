settings = new Mongo.Collection('settings');

settings.attachSchema(
    new SimpleSchema({
        siteTitle: {
            type: String
        },
        tagline: {
            type: String
        },
        wordpressAddress: {
            type: String
        },
        siteAddress: {
            type: String
        },
        email: {
            type: String
        },
        // membership: {
        //   type: String
        // },
        // userDefaultRole: {
        //   type: String
        // },
        // timeZone: {
        //   type: String
        // },
        // dateFormat: {
        //   type: String
        // },
        // timeFormat: {
        //   type: String
        // },
        // weekStarts: {
        //   type: String
        // },
        language: {
            type: String
        },
        createdBy: {
            type: String
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    settings.allow({
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
