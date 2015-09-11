Meteor.startup(function () {

    Meteor.publish('plugin', function () {
        return plugin.find();
    });

    function getAllFilesFromFolder(dir) {
        var filesystem = Npm.require('fs');
        var results = [];
        var pluginSubtitle = [];

        filesystem.readdirSync(dir).forEach(function (file) {

            file = dir + '/' + file;
            var stat = filesystem.statSync(file);

            if (stat && stat.isDirectory()) {
                results = results.concat(getAllFilesFromFolder(file))
            } else {
                var myRe = /settings.yml/ig;
                if (myRe.exec(file)) {
                    var data = YAML.eval(filesystem.readFileSync(file, 'utf8'));
                    for (key in data) if (data.hasOwnProperty(key)) {
                        var titleData = data[key].title;
                        var subtitleData = data[key].subtitle;
                        for (key in subtitleData) if (subtitleData.hasOwnProperty(key)) {
                            var myObj = {};
                            myObj.sTitle = subtitleData[key];
                            pluginSubtitle.push(myObj);
                        }
                        if (typeof plugin.findOne({title: titleData}) === "object") {
                            plugin.update({title: titleData}, {$set: {title: titleData, subtitle: pluginSubtitle}});
                            console.log('plugin ' + titleData + ' already exists');
                        } else {
                            plugin.insert({title: titleData, subtitle: pluginSubtitle});
                            console.log('plugin ' + titleData + ' inserted into ACITO');
                        }
                    }
                }
            }
        });
    }
    getAllFilesFromFolder(process.cwd()+"/assets/app");    
});