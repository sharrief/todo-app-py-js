ReactApp = class {
  component = null
  instance = null
  
  constructor(_component) {
    this.component = _component
  }

  render() {
    const component = this.component()
    output(component.render().content)
    this.instance = component
  }
} 

Counter = function() {
  let count = 0
  const click = () => { count++ }
  const content = `Count: ${count}`

  return {
    render: () => ({ content }),
    click
  }
}

React = new ReactApp(Counter)

output = (...msg) => console.log(...msg)