function multiply(a, b, c)
{ 
    return a*b*c;
}

function curry(func) {
    const argsLength = func.length; 

    return function curried(...args) {
            if (args.length >= argsLength) {
            return func(...args);
            } else {
            return (...args2) => curried(...args, ...args2);
            }
    };
}

let curried = curry (multiply);
console.log(curried(3)(2,4));
console.log(curried(3)(2)(4));
console.log(curried (3,2)(4));
