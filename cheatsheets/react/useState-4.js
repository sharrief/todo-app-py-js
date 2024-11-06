ReactApp  = class {
  stateIndex = 0
  stateValues = []
  effectIndex = 0
  effectDependencies = []
  root = {}
  Component = null

  constructor(_Component) {
    this.Component = _Component
  }

  render() {
    let renderOuput = ''
    this.root.component = this.Component()
    const componentResult = this.root.component.render()
    if ('content' in componentResult) {
      renderOuput += componentResult.content + ' '
    }
    if ('children' in componentResult) {
      // imagine this is a recursive function
      renderOuput += componentResult.children.map(child => child.render().content).join(' ')
    }
    output(renderOuput)
    this.stateIndex = 0
    this.effectIndex = 0
    return ''
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
  
  useEffect(callback, currDependencies) {
    const oldDependencies = this.effectDependencies[this.effectIndex]

    if (oldDependencies !== null) {
      const firstRun = oldDependencies === undefined
      const hasDeps = !!(firstRun ? currDependencies : oldDependencies)
      if (!firstRun && hasDeps && oldDependencies.length !== currDependencies.length) {
        throw new Error('Number of dependencies should be static')
      }

      const alwaysRun = !hasDeps
      const runOnce = !alwaysRun && currDependencies.length === 0
      const depsChanged = firstRun || (hasDeps && currDependencies.some((dep, i) => dep !== oldDependencies[i]))
      
      if (runOnce || alwaysRun || depsChanged) {
        callback()
      }

      this.effectDependencies[this.effectIndex] = runOnce ? null : currDependencies
    }

    this.effectIndex++
  }
}

const colors = {
  red: (msg) => '\u001b[38;5;197m' + msg + '\u001b[38;5;15m',
  green: (msg) => '\u001b[38;5;120m' + msg + '\u001b[38;5;15m',
  blue: (msg) => '\u001b[38;5;33m' + msg + '\u001b[38;5;15m',
}

const padStart = (val) => val.toString().padStart(2, '0')
let startingTime = new Date().getTime()

Clock = function({ secondsOffset }) {
  const [secondsElapsed, setSecondsElapsed] = React.useState(0)
  const [beforeMidday, setBeforeMidday] = React.useState(true)
  const virutalSeconds = secondsElapsed + secondsOffset
  const hours24 = Math.floor(virutalSeconds / 3600) % 24
  const hours12 = padStart((hours24 % 12) || 12)
  const minutes = padStart(Math.floor(virutalSeconds / 60) % 60)
  const seconds = padStart(Math.floor(virutalSeconds % 60))
  const lastTenSeconds = seconds >= 50
  const time = `${hours12}:${minutes}:${lastTenSeconds ? colors.red(seconds) : seconds} ${beforeMidday ? 'AM' : 'PM'}`

  React.useEffect(() => {
    clockIntervalRef = setInterval(() => {
      setSecondsElapsed((Date.now() - startingTime)/1000)
    }, 1000)
  }, [])

  React.useEffect(() => {
    if (hours24 >= 12) {
      setBeforeMidday(false)
    } else {
      setBeforeMidday(true)
    }
  }, [hours24])

  return {
    render: () => ({ content: time })
  }
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
Weekday = function({ daysSinceEpoch }) {
  const currentWeekday = WEEKDAYS[daysSinceEpoch % WEEKDAYS.length]
  const firstDayOfWeek = currentWeekday === 'Sunday'
  const content = firstDayOfWeek ? colors.blue(currentWeekday) : currentWeekday

  return {
    render: () => ({ content })
  }
}

const payDay = new Set([15, 30])
const getDateFromEpoch = (daysSinceEpoch) => {
  const daysOfYear = daysSinceEpoch % 365
  const milliseconds = daysOfYear * 24 * 60 * 60 * 1000
  return new Date(milliseconds)
}
DayOfMonth = function({ daysSinceEpoch }) {
  const date = getDateFromEpoch(daysSinceEpoch)
  const dayOfMonth = date.getDate()
  const isPayDay = payDay.has(dayOfMonth)
  const content = isPayDay ? colors.green(dayOfMonth) : dayOfMonth

  return {
    render: () => ({ content })
  }
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
DateDisplay = function() {
  const [daysSinceEpoch, setDaysSinceEpoch] = React.useState(0)
  const [secondsOffset, setSecondsOffset] = React.useState(0)
  const date = getDateFromEpoch(daysSinceEpoch)
  const month = MONTHS[date.getMonth()]

  const nextDay = () => setDaysSinceEpoch(daysSinceEpoch + 1);
  const prevDay = () => setDaysSinceEpoch(Math.max(0, daysSinceEpoch - 1));
  const addHour = () => setSecondsOffset(secondsOffset + 3600)
  const subHour = () => setSecondsOffset(Math.max(0, secondsOffset - 3600))

  React.useEffect(() => {
    output('Day number', daysSinceEpoch)
  }, [])

  const content = month + ':'

  return {
    render: () => ({ 
      content,
      children: [
        Weekday({ daysSinceEpoch }),
        DayOfMonth({ daysSinceEpoch }),
        Clock({ secondsOffset })
      ]
    }),
    nextDay,
    prevDay,
    addHour,
    subHour
  }
}

let input = ''
output = (msg) => {
  console.clear()
  process.stdout.write(`${msg}\n\r${input}`)
}

start = function userInterface() {
  React = new ReactApp(DateDisplay)
  React.render()
  const stdin = process.stdin
  stdin.setRawMode(true)
  stdin.setEncoding('utf8')
  stdin.on('keypress', (input) => {
    switch (input) {
      case 'u':
        React.root.component.addHour()
        break;
      case 'e':
        React.root.component.subHour()
        break;
      case 'o':
        React.root.component.nextDay()
        break;
      case 'n':
        React.root.component.prevDay()
        break;
      default:
    }
  })
}