/*

 Created by LingaRaja
 Has return the current username

 */
function getUserName() {
    return Meteor.users.findOne(Meteor.userId()).username;
}

/*

 Has return the current date with the format dd/mm/yyyy

*/

function getCurrentDate() {
    var dateObj = new Date();
    return dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();

}
