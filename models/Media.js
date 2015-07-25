Media = new Mongo.Collection('Media');

Media.attachSchema(
    new SimpleSchema({
        url: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        }
        //createdAt: {
        //  type: Date,
        //  denyUpdate: true
        //}
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Media.allow({
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

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
    stores: [imageStore]
});

Images.deny({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
    download: function(){
        return false;
    }
});

Images.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});