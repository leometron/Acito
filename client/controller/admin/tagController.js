/*

 Created by LingaRaja.

 Has the functionalities related to tags.

 */
Meteor.subscribe('tags');
Template.tags.events({
    'click #addTag': function () {
        if (!$('#tagName').val()) {
            Materialize.toast('Tag name is required', 3000, 'error-toast');
        } else {
            var description = (!$('#tagDescription').val()) ? "-" : $('#tagDescription').val();
            Meteor.call('addNewTag', $('#tagName').val(), description);
            Meteor._reload.reload();
        }
    },
    'click #editTag': function () {
        Session.set('selectedTagId', this._id);
        Router.go("/admin/posts/tags/edit");
    },
    'click #searchTags': function (event) {
        event.preventDefault();
        Meteor.call('searchTags', $('#searchString').val());
        Meteor._reload.reload();
    },
    'click #allTags': function (event) {
        event.preventDefault();
        Meteor.call('showAllTags');
        Meteor._reload.reload();
    },
    'click #deleteTag': function () {
        Meteor.call('removeTag', this._id);
        Router.go("/admin/posts/tags");        
    }
});

Template.editTags.events({
    'click #updateTag': function () {
        if (!$('#tagName').val()) {
            Materialize.toast('Tag name is required', 3000, 'error-toast');
        } else {
            var description = (!$('#tagDescription').val()) ? "" : $('#tagDescription').val();
            Meteor.call('updateTag', Session.get('selectedTagId'), $('#tagName').val(), description);
            Router.go("/admin/posts/tags");
        }
    },
    'click #deleteTag': function () {
        Meteor.call('removeTag', Session.get('selectedTagId'));
        Router.go("/admin/posts/tags");
    }
});

Template.tags.helpers({
    'tagList': function () {
        return tags.find();
    }
});

Template.editTags.helpers({
    'showSelectedTag': function () {
        return tags.findOne(Session.get('selectedTagId'));
    }
});