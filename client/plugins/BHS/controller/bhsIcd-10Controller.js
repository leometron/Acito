Meteor.subscribe("section");
Meteor.subscribe("ICD");

Template.BHSICD.events({
	'click #saveSection': function () {
        if (!$('#sectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            Session.set('errorMessage', '');
            Meteor.call('insertSection', $('#sectionName').val());
        }
    },
});


Template.BHSICD.helpers({
    'sectionList': function () {
        return section.find();
    },
});
