Meteor.subscribe("settings");

Template.settings.rendered = function () {
}

Template.settings.events({
    'click #savesetting': function () {
        if (!$('#sitetitle').val()) {
            Materialize.toast('site title is required', 3000, 'error-toast');
        } else if (!$('#tagline').val()) {
            Materialize.toast('tag line is required', 3000, 'error-toast');
        } else if (!$('#wpaddress').val()) {
            Materialize.toast('word press address is required', 3000, 'error-toast');
        } else if (!$('#siteaddress').val()) {
            Materialize.toast('site address is required', 3000, 'error-toast');
        } else if (!$('#email').val()) {
            Materialize.toast('email is required', 3000, 'error-toast');
        } else {
            Materialize.toast('Settings saved', 3000, 'successtoast');
            var language = (!Session.get('languageName')) ? "English" : Session.get('languageName');
            Meteor.call('saveSettingData', $('#sitetitle').val(), $('#tagline').val(), $('#wpaddress').val(), $('#siteaddress').val(), $('#email').val(), language);
        }
    },
    'click .languagemenu': function (event) {
        $('#addlanguage').text($(event.target).text());
        Session.set('languageName', $(event.target).text());
    }
});


Template.settings.helpers({
    'settingsList': function () {
        var userId = Meteor.userId();
        return settings.findOne({createdBy: userId});
    },
    'languageList': function () {
        return Session.get('languageName');
    }
});

Template.adminHeader.events({
    'click #navBarsettings': function () {
        Session.set('languageName', '');
    }
});
