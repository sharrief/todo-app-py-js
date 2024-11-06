ReactApp = class {
  val = null
  component = null
  instance = null
  
  constructor(_components) {
    this.component = _components
  }

  render() {
    const component = this.component()
    output(component.render().content)
    this.instance = component
  }

  useState(initialValue) {
    const state = this.val ?? initialValue
    const setState = newVal => {
      this.val = newVal
      setTimeout(() => this.render(), 200)
    }
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

React = new ReactApp([Counter])

output = (...msg) => console.log(...msg)