ReactApp  = class {
  stateIndex = 0
  stateValues = []
  components = {}
  instances = {}

  constructor(_components) {
    this.components = _components
  }

  render() {
    let renderOuput = []
    for (const key in this.components) {
      const component = this.components[key]()
      this.instances[key] = component
      renderOuput.push(component.render().content)
    }
    output(renderOuput.join(' '))
    this.stateIndex = 0
  }

  useState(initialValue) {
    const state = this.stateValues[this.stateIndex] ?? initialValue
    // this.stateIndex is reset after rendering, so the setState handler must close over the current index 
    const _stateIndex = this.stateIndex
    const setState = newVal => {
      if (this.stateValues[_stateIndex] === newVal) return
      this.stateValues[_stateIndex] = newVal
      // IRL React batches state updates
      setTimeout(() => this.render(), 200)
    }
    this.stateIndex++
    return [state, setState]
  }
}

Counter = function() {
  const [count, setCount] = React.useState(0)
  const click = () => { setCount(count + 1) }
  const content = `Count: ${count}`

  return {
    render: () => ({ content }),
    click
  }
}

Weekday = function() {
  const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const [day, setDay] = React.useState(0)
  const next = () => { setDay(day + 1); }
  const content = `Day: ${week[day % week.length]}`
  
  return {
    render: () => ({ content }),
    next
  }
}

React = new ReactApp({ Counter, Weekday })

output = (...msg) => console.log(...msg)