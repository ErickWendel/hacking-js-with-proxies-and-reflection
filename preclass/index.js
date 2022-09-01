function decorate(context) {
  const fns = Reflect.ownKeys(context).filter(item => item !== 'constructor')
  for (const fn of fns) {

    context[fn] = new Proxy(context[fn], {
      __proto__: null,
      apply(fn, thisArg, argList) {
        console.log(`[${fn.name}] was called with: [${argList}] args `)
        console.time('speed')
        const result = fn.apply(thisArg, argList)
        console.timeEnd('speed')
        return result
      }
    })
  }
}

class Data {
  person = new Proxy({ name: '' }, {
    set: (currentContext, propertyKey, newValue) => {
      console.log({
        currentContext,
        propertyKey,
        newValue
      })

      currentContext[propertyKey] = newValue
      return true
    }
  })

  constructor() {
    decorate(Data.prototype)  
  }

  create() {
    console.log('creating...')
    let counter = 10e4
    for (let i = 0; i <= counter; i++);

    this.person.name = 'test' 

    return 'created!'
  }
}

const d = new Data()
console.log('create response', d.create())