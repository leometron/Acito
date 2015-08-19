var querystr = "";
Meteor.publish('tags', function () {
    if (querystr) {
        var temp = querystr;
        querystr = "";
        return tags.find({$text: {$search: temp}});
    } else {
        return tags.find();
    }
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'addNewTag': function (title, content) {
        tags.insert({name: title, description: content});
        console.log('tag ' + title + ' added successfully');
    },
    'removeTag': function (id) {
        tags.remove({_id: id});
        console.log('tag removed successfully');
    },
    'updateTag': function (id, title, content) {
        tags.update(id, {$set: {name: title, description: content}});
        console.log('tag ' + title + ' updated successfully');
    },
    'searchTags': function (queryString) {
        querystr = queryString;
    },
    'showAllTags': function (queryStringData) {
        querystr = "";
    }
});