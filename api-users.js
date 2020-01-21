const dateFormat = require('dateformat');
const fs = require('fs');
const crypto = require("crypto");
const FILE_USERS = "users.json";

function zamyxujHeslo(heslo) {
    //let mix = heslo.split("").reverse().join("");
    let mix = crypto.createHash("sha256").update(heslo).digest("hex");
    return mix;
}

let list = new Array();
if(fs.existsSync(FILE_USERS)){
    list = JSON.parse(fs.readFileSync(FILE_USERS).toString());
}

console.log(list);

exports.apiUsers = function (req, res, obj) {
    if (req.pathname.endsWith("/list")) {
        obj.list = list;
    } else if (req.pathname.endsWith("/reg")) {
        for (let u of list) {//for (let i=0; i<list.length; i++){let u = list[i]}
            if (u.login === req.parameters.login) {
                obj.error = "Uživatelské jméno již existuje";
                break;
            }
        }
        if (!obj.error) { //(obj.error == undefined)
            let addObj = {};
            let dt = new Date();
            addObj.time = dateFormat(dt, "HH.MM.ss");
            addObj.login = req.parameters.login;
            addObj.hesilko = zamyxujHeslo(req.parameters.hesilko);
            list.push(addObj);
            fs.writeFileSync(FILE_USERS, JSON.stringify(list, null, 2));
        }

    } else if (req.pathname.endsWith("/prihl")) {
        obj.error = "Uživatelské jméno je špatně!";
        for (let u of list) {
            if (u.login === req.parameters.login) {
                if (u.hesilko === zamyxujHeslo(req.parameters.hesilko)) {
                    obj.error = null; //tímto error není nastaven - naopak rušíme jej
                }
                break;
            }
        }
    }
};
