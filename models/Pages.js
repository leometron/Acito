// Commented by Leo Matthew.S
// 20-Jul-2015
// Use "orion generate model" to create new models
// ...
// Also creates files in server/publications

Pages = new Mongo.Collection('Pages');

Pages.attachSchema(
    new SimpleSchema({
        title: {
            type: String
        },
        content: {
            type: String
        },
        deleted: {
            type: Boolean
        },
        published: {
            type: Boolean
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: String
        },
        status: {
            type: String
        },
        parentId: {
            type: String
        }


        /*    categoryId: {
         type: Number,
         min: 1
         },

         createdAt: {
         type: Date,
         denyUpdate: true
         }*/

    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Pages.allow({
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
