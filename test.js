const crypto = require("crypto");
function zamyxujHeslo(heslo) {
    //let mix = heslo.split("").reverse().join("");
    let mix = crypto.createHash("sha256").update(heslo).digest("hex");
    //mix = heslo.split("").reverse().join("");
    return mix;
}
//registrace
let hesloZRegistrace = "testicek";
let mixZRegistrace = zamyxujHeslo(hesloZRegistrace);
console.log( "heslo z registrace" + mixZRegistrace);
//přihlášení
let hesloZPrihlaseni = "testicek";
let mixZPrihlaseni = zamyxujHeslo(hesloZPrihlaseni);
if (mixZPrihlaseni===mixZRegistrace){
console.log("Parádááááááá! Vstupte dále!")
} else {
    console.error("Špatné heslo")
};