Meteor.publish('section', function () {
  return section.find();
});

Meteor.methods({
    'insertSection': function (name) {
        section.insert({sectionName: name});
        console.log('Section ' + name + ' added successfully');
    }
});
