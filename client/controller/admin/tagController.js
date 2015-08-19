/*

 Created by LingaRaja.

 Has the functionalities related to tags.

 */
Meteor.subscribe('tags');
Template.tags.events({
    'click #addTag': function () {
        if (!$('#tagName').val()) {
            Session.set('errorMessage', 'Tag name is required');
        } else {
            console.log('s crct');
            Session.set('errorMessage', '');
            var description = (!$('#tagDescription').val()) ? "-" : $('#tagDescription').val();
            Meteor.call('addNewTag', $('#tagName').val(), description);
            Meteor._reload.reload();
        }
    },
    'click .tag.row': function () {
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
    }
});

Template.editTags.events({
    'click #updateTag': function () {
        if (!$('#tagName').val()) {
            Session.set('errorMessage', 'Tag name is required');
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
    },
    'errormsg': function () {
        return Session.get('errorMessage');
    }
});

Template.editTags.helpers({
    'showSelectedTag': function () {
        return tags.findOne(Session.get('selectedTagId'));
    }
});