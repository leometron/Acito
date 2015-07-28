Meteor.publish('Category', function () {
    return Category.find();
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'addNewCategory': function (title, content) {
        Category.insert({name: title,description: content});
        console.log('category '+ title + ' added successfully');
    }
});
