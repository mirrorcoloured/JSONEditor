const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
export const year = 365.25 * day;

/**
    Creates a new cookie for this page
    @param {string} name Name of the cookie
    @param {string} value Value of the cookie
    @param {int} milliseconds Lifespan of cookie in ms
*/
export function setCookie(name, value, milliseconds) {
    var d = new Date();
    d.setTime(d.getTime() + milliseconds);
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
    Retrieves a cookie for this page
    @param {string} name Name of the cookie
*/
export function getCookie(name) {
    var name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

/**
    Returns all cookies for this page
*/
export function listCookies() {
    const decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    // let co = {};
    // for (let i = 0; i < ca.length; i++) {
    //     const [key, val] = ca.split("=");
    //     co[key] = val;
    // }
    return ca;
}

/**
    Creates a new cookie for this page
    @param {string} name Name of the cookie
*/
export function clearCookie(name) {
    var d = new Date();
    d.setTime(d.getTime() - 1);
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + ";" + expires + ";path=/";
}

/**
    Example export function for creating/checking a cookie
*/
export function exampleCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 5*1000);
       }
    }
}
