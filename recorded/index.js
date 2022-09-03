function decorator(prototypeClass) {
  const fns = Reflect.ownKeys(prototypeClass).filter(item => item !== "constructor")
  for( const fn of fns) {

    prototypeClass[fn] = new Proxy(prototypeClass[fn], {
      __proto__: null,
      apply(fn, thisArg, argList) {
        // console.log(`[${fn.name}] was called with: ${JSON.stringify(argList)} args`)
        console.time('speed')
        const result = fn.apply(thisArg, argList)
        console.timeEnd('speed')
        return result
      }

    })
  }
}

class Database {
  
  person = new Proxy({ name: ''}, {
    set(currentContext, propertyKey, newValue) {
      // console.log({
      //   currentContext,
      //   propertyKey,
      //   newValue
      // })
      
      currentContext[propertyKey] = newValue
      return true
    }
  })

  constructor() {
    decorator(Database.prototype);

  }

  create() {
    // console.log('creating...')
    let counter = 10e4
    for(let i=0; i <=counter; i++);

    this.person.name = 'test'
    return 'created!'
  }
}

const database = new Database()
console.log('create response', database.create({ name: 'erick'}))
console.log('person', database.person)