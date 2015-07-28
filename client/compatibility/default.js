/*
// Libraries which need a global variable, such as jQuery etc
globalVariable = function () {
}
*/

/*

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
    return dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear();

}
