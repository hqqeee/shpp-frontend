// 1.
function getFirstWord(a:string) {
    return a.split(/ +/)[0].length;
}

// 2. 
type fullName = {
    name: string;
    surname: string;
}
function getUserNamings(a : fullName) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3.

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a : {products?:{name?:string}[]}) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
type aObj = {
    name():  string;
};
function hey(a: aObj & ({cuteness:number} | {coolness:number})) {
    return "hey! i'm " + a.name();
}
hey({name: () => "roman", cuteness: 100})
hey({name: () => "vasyl", coolness: 100})


// 4.2
interface Pet{
    name():string;
}
class Cat implements Pet{
    constructor(private _name:string, private isCute: boolean) {}
    name(): string {
        return this._name;
    }
}
class Dog implements Pet{
    constructor(private _name:string, private coolness: number) {}
    name(): string {
        return this._name;
    }
}
function hey2(abstractPet: Pet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("snizhok", true)
let b = new Dog("sirko", 333)
hey2(a)
hey2(b)


// 4.3
//  type extendedAObj = aObj & ({type: string, coolness: number} | {type: "cat", cuteness: number} );
// type extendedAObj = aObj & {coolness?: number} & ({type: string} | {type: "cat", cuteness?: number});
type extendedAObj = aObj & {type: string} & {cuteness?: number} & {coolness?: number};
function hey3(a:extendedAObj) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey3({name: () => "snizhok", type: "cat", cuteness: 100})
hey3({name: () => "sirko", type: "dog", coolness: 100})