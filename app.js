var arrInput = [];
arrInput.push('KittenService: ');
arrInput.push('Letmee: Cyberportal');
arrInput.push('Cyberportal: Ice');
arrInput.push('CamelCaser: KittenService');
arrInput.push('Fraudstream: Letmee');
arrInput.push('Ice: ');

var objFinal = {};
var finalArr = [];
var stack = [];


var arrInstall = InstallPackages(arrInput);
var str = 'Contains CYCLE.';
    if(arrInstall !== 'Error') {
        str = '\'';
    arrInstall.forEach(function(element) {
        str += element + ', '
    }, this);

    str = str.substring(0, str.length - 2);
    str += '\'';
}

console.log(str);

function InstallPackages(PackageArray) {
    
    PackageArray.forEach(function(element) {
        var splitArr = element.split(': ');

        var key_ele = splitArr[0];
        var key_val = splitArr[1];
        objFinal[key_ele] = key_val;
    }, this);

    var keys = Object.keys(objFinal);

    while(keys.length > 0) {
        if(stack.length === 0) {
            var item_key = keys.shift();
            if(!finalArr.includes(item_key)) {
                stack.push(item_key);
            }
        }
        if(stack.length > 0) {
            var next_key = findVal(stack[stack.length-1]);
            if(next_key !== false) {
                if(!finalArr.includes(next_key)) {
                    if(!stack.includes(next_key)) {
                        stack.push(next_key);
                    }
                    else {
                        return 'Error';
                        break;
                    }
                }
                else {
                    while(stack.length > 0) {
                        var item = stack.pop();
                        finalArr.push(item);
                    }
                }
            }
            else {
                while(stack.length > 0) {
                    var item = stack.pop();
                    finalArr.push(item);
                }
            }
        }
    }

    return finalArr;
}

function findVal(key_item) {
    if(objFinal[key_item] === '') {
        return false;
    }
    else {
        return objFinal[key_item];
    }
}