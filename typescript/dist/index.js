"use strict";
// 1.
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
console.log(getUserNamings({ name: 'ru', surname: 'lan' }));
