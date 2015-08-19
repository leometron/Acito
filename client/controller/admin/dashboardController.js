/*

 Created by LingaRaja.

 Has the functionalities related to dashboard.

 */
Template.dashBoard.rendered = function () {
    // Meteor.call('statusFilter',"All");
    // Meteor.call('loadPage',"All");
};

Template.dashBoard.helpers({
    'postCount': function () {
        return Posts.find().count();
    },
    'pagesCount': function () {
        return Pages.find().count();
    },
});