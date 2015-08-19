// function _getAllFilesFromFolder(dir){
//     var filesystem = Npm.require('fs');
// var pluginObj = {};

//     var results = [];

//     filesystem.readdirSync(dir).forEach(function(file) {

//         file = dir+'/'+file;
//         var stat = filesystem.statSync(file);

//         if (stat && stat.isDirectory()) {
//             console.log('directory');
//             results = results.concat(_getAllFilesFromFolder(file))
//         } else{
//             var myRe = /settings.yml/ig;
//             if (myRe.exec(file)) {
//                 // var obj = JSON.parse(filesystem.readFileSync(file, 'utf8'));                   
// // var myjson = {};
// // myjson = JSON.parse(Assets.getText('settings.json'));
// // myjson = filesystem.readFileSync(file, 'utf8');
// // var myobject;
// // myobject = HTTP.get(Meteor.absoluteUrl(file)).data;
// // console.log('file content is.......'+myobject);

//                 // var jsonObj = JSON.stringify(obj);
//                 // obj = JSON.parse(jsonObj);
//                 // console.log('object is.....'+obj);
//   var users = YAML.eval(filesystem.readFileSync(file, 'utf8'));

//   for (key in users) if (users.hasOwnProperty(key)) {
//     console.log('key is.....'+users[key].title);
//     // pluginObj[count] = users[key].title;
//     // Meteor.call('savePlugin',users[key].title);
// plugin.insert({title: users[key].title});    
//   }           
//     console.log('pluginObj....is.........'+JSON.stringify(pluginObj));       
//             }
//             // results.push(file);            
//         } 
//     });
// }

// _getAllFilesFromFolder('../../../../../client/plugins');