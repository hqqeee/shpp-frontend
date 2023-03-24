interface CustomElement {
    [key:string]: {
        cvalue: number | string | undefined | CustomElement
    } | undefined;
}

function summ(a:CustomElement):number {
    const x: number[] = Object.keys(a).map((k) => {
        const elem = a[k];
        if (elem === undefined || elem.cvalue === undefined) return 2021;
        if (typeof elem.cvalue === 'string') return +elem.cvalue || 2021;
        if (typeof elem.cvalue === 'number') return elem.cvalue;
        return summ(elem.cvalue);
    });

    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
