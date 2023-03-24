"use strict";
function isCustomElement(obj) {
    return typeof obj.cvalue !== "number" && typeof obj.cvalue !== "string" && typeof obj.cvalue !== undefined;
}
function summ(a) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (elem === undefined || elem.cvalue === undefined)
            return 2021;
        if (typeof elem.cvalue === 'string')
            return Number(+elem.cvalue || '2021');
        if (typeof elem.cvalue === 'number')
            return elem.cvalue;
        else
            return summ(elem.cvalue);
    });
    let sum = 0;
    console.log(x);
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
let customElement = {
    hello: { cvalue: 1 },
    world: { cvalue: { yay: { cvalue: "2" } }
    }
};
console.log(summ(customElement));
