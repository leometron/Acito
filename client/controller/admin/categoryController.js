/*

 Created by LingaRaja.

 Has the events to redirect a new post page.

 */
Template.categories.events({
    'click #addCategory': function () {
        Meteor.call('addNewCategory',$('#categoryName').val(),$('#categoryDescription').val()); 
        Meteor._reload.reload();               
    }
});

Template.categories.helpers({
    'categoryList' : function() { 
        console.log('category list... in category page,.............'+Category.find());
        return Category.find();
    }
});