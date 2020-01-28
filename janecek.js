const fs = require("fs");

let loginZHtml = "a";
let passwordZHtml = "aaaaaa";
let resObj = {}; //odpověď do HTML stránky

let s = fs.readFileSync("test-users.json").toString();
console.log(s);
let users = JSON.parse(s); //antagonista k stringify - k obrácenému efektu se používá stringify
resObj.error = "Chybné přihlašovací jméno nebo heslo";
let loggedUser;
for (let user of users){
    //postupně projde všechny položky z users
    if (loginZHtml === user.login){
        console.log("Paráda, zdařilo se! Uživatel " + user.login + " je v databázi.");
        if (user.hesilko == passwordZHtml){
            console.log("Uživatel " + loginZHtml + " je úspěšně přihlášen!");
            resObj.error = null;  //  vymažeme error
            resObj.userLogin = user.login;
            loggedUser = user;
        } else {
        console.log("Uživatele " + user.login + " jsme našli, zadané heslo ovšem neodpovídá.");
        }
    }

}

if (loggedUser) {
    console.log("Uživatel přilášen")
} else {
    console.log("Uživatele jsme nenašli.")
}
console.log("Chyba: " + resObj.error);