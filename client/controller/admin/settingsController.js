Meteor.subscribe("settings");

Template.settings.rendered = function () {
    Session.set('errorMessage', '');
}

Template.settings.events({
    'click #savesetting': function () {
        if (!$('#sitetitle').val()) {
            Session.set('errorMessage', 'site title is required');
        } else if (!$('#tagline').val()) {
            Session.set('errorMessage', 'tag line is required');
        } else if (!$('#wpaddress').val()) {
            Session.set('errorMessage', 'word press address is required');
        } else if (!$('#siteaddress').val()) {
            Session.set('errorMessage', 'site address is required');
        } else if (!$('#email').val()) {
            Session.set('errorMessage', 'email is required');
        } else {
            Session.set('errorMessage', '');
            Session.set('sucessMessage', 'Settings saved');
            Meteor.setTimeout(function () {
                Session.set('sucessMessage', '')
            }, 1500);
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
    'errormsg': function () {
        return Session.get('errorMessage');
    },
    'successmsg': function () {
        return Session.get('sucessMessage');
    },
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
        Session.set('errorMessage', '');
        Session.set('languageName', '');
    }
});
