/*

 Created by LingaRaja
 Has return the current username

 */
function getUserName() {
    return Meteor.users.findOne(Meteor.userId()).username;
}

function selectedImage(e) {
    return $(e.currentTarget).addClass('selected-border');
}

/*

 Has return the current date with the format dd/mm/yyyy

 */

function getCurrentDate() {
    var dateObj = new Date();
    return dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();

}

// function getAllFilesFromFolder() {
//     // var filesystem = require("fs");
//     var filesystem = Meteor.npmRequire('fs');
//     var results = [];

//     filesystem.readdirSync('public').forEach(function(file) {

//         file = dir+'/'+file;
//         var stat = filesystem.statSync(file);

//         if (stat && stat.isDirectory()) {
//             results = results.concat(_getAllFilesFromFolder(file))
//         } else results.push(file);

//     });
//     console.log('files list.....'+results);

//     return results;

// }