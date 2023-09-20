function Person(name) {
    this.name = name;
}

Person.getName = function() {
    return this.name;
}

const SanE = new Person('SanE');
console.log(SanE.getName());