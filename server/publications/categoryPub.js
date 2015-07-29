Meteor.publish('Category', function () {
    return Category.find();
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'addNewCategory': function (title, content, slug, parentCategory) {
        Category.insert({name: title,description: content,slug: slug,parent: parentCategory});
        console.log('category '+ title + ' added successfully');
    },
    'removeCategory' : function(id) {
        Category.remove({_id: id});
        console.log('Category removed successfully');      	
    },
    'updateCategory' : function(id, title, content, slug, parentCategory) {
        Category.update(id, {$set: {name: title,description: content,slug: slug,parent: parentCategory}});
        console.log('category '+ title + ' updated successfully');    	
    }
});
