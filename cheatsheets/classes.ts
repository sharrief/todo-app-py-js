
type Address = {
  street: string
  city: string
  state: string
  zip: number
}

interface Person {
  firstName: string
  lastName: string
  heightInFeet: number
  dateOfBirth: Date
  address: Address
  relatives: Person[]
  serialNum: number
}

async function populateNeighborhood() {
  const { faker } = await import('@faker-js/faker')
  faker.seed(420)

  const addressMap = new Map<number, Address>()
  while (addressMap.size < 5) {
    const address: Address = {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: +faker.location.zipCode('#####')
    }
    addressMap.set(addressMap.size, address)
  }

  const pplMap = new Map<number, Person>()
  while (pplMap.size < 20) {
    const serialNum = pplMap.size
    const person: Person = {
      serialNum,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      heightInFeet: faker.number.int({ min: 3, max: 8 }),
      dateOfBirth: faker.date.past({ years: 100 }),
      address: addressMap.get(Math.floor(Math.random() * addressMap.size))!,
      relatives: (() => {
        const numRelatives = Math.max(Math.floor(Math.random() * pplMap.size), 4)
        const relatives = []
        while (relatives.length < numRelatives) {
          const randomSerialNum = Math.floor(Math.random() * pplMap.size)
          relatives.push(pplMap.get(randomSerialNum)!)
        }
        return relatives
      })()
    }
    pplMap.set(serialNum, person)
  }
  console.log(pplMap.entries())
}
populateNeighborhood()