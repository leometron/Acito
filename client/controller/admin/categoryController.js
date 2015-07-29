/*

 Created by LingaRaja.

 Has the functionalities related to category.

 */
Template.categories.events({
    'click #addCategory': function () {
        var parent = ($('#parentCategory').text() == "None") ? "None" : $('#parentCategory').text();
        console.log('parent category.....'+parent);
        Meteor.call('addNewCategory',$('#categoryName').val(),$('#categoryDescription').val(),$('#categorySlug').val(),$('#parentCategory').text()); 
        Meteor._reload.reload();               
    },
    'click .menuitem2' : function (event) {
        $('#parentCategory').text( $(event.target).text());                	
    },
    'click .category.row': function() {
        Session.set('selectedCategoryId',this._id);
        Router.go("/admin/posts/categories/edit");
    }
});

Template.editCategory.events({
    'click #updateCategory': function() {
        Meteor.call('updateCategory',Session.get('selectedCategoryId'),$('#categoryName').val(),$('#categoryDescription').val(),$('#categorySlug').val(),$('#parentCategory').text());
        Router.go("/admin/posts/categories");    
    },
    'click #deleteCategory': function() {
        Meteor.call('removeCategory',Session.get('selectedCategoryId'));
        Router.go("/admin/posts/categories");        
    },
    'click .menuitem2' : function (event) {
        $('#parentCategory').text( $(event.target).text());                 
    }    
});

Template.categories.helpers({
    'categoryList' : function() { 
        return Category.find();
    }
});

Template.editCategory.helpers({
    'showSelectedCategory' : function() {
        return Category.findOne(Session.get('selectedCategoryId'));
    },
    'categoryList' : function() { 
        return Category.find();
    }    
});