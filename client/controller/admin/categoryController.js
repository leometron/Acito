/*

 Created by LingaRaja.

 Has the functionalities related to category.

 */
Template.categories.events({
    'click #addCategory': function () {
        if (!$('#categoryName').val()) {
            Session.set('errorMessage','Category name is required');
        } else {
        Session.set('errorMessage','');
        var parent = ($('#parentCategory').text() == "None") ? "None" : $('#parentCategory').text();
        var description = (!$('#categoryDescription').val()) ? "-" : $('#categoryDescription').val();
        Meteor.call('addNewCategory',$('#categoryName').val(),description,$('#parentCategory').text()); 
        Meteor._reload.reload();              
        }
             
    },
    'click .menuitem2' : function (event) {
        $('#parentCategory').text( $(event.target).text());                	
    },
    'click .category.row': function() {
        Session.set('selectedCategoryId',this._id);
        Router.go("/admin/posts/categories/edit");
    },
    'click #searchCategory' : function (event) {
        event.preventDefault();                
        Meteor.call('searchCategory',$('#searchString').val());
        Meteor._reload.reload();        
    }     
});

Template.editCategory.events({
    'click #updateCategory': function() {
        if (!$('#categoryName').val()) {
            Session.set('errorMessage','Category name is required');
        } else {        
        var description = (!$('#categoryDescription').val()) ? "" : $('#categoryDescription').val();        
        Meteor.call('updateCategory',Session.get('selectedCategoryId'),$('#categoryName').val(),description,$('#parentCategory').text());
        Router.go("/admin/posts/categories");
        }    
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
    },
    'errormsg' : function() {
        return Session.get('errorMessage');
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