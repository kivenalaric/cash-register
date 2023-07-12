const purchase = document.getElementById('bill')
const payment = document.getElementById('cash')
const displayResult = document.getElementById('results')
const form = document.getElementById('submission-form')

const denominations = [
  ['PENNY', 1],

  ['NICKEL', 5],

  ['DIME', 10],

  ['QUARTER', 25],

  ['ONE', 100],

  ['FIVE', 500],

  ['TEN', 1000],

  ['TWENTY', 2000],

  ['ONE HUNDRED', 10000]
]

const penny = document.getElementById('penny')
const nickel = document.getElementById('nickel')
const dime = document.getElementById('dime')
const quarter = document.getElementById('quarter')
const one = document.getElementById('one')
const five = document.getElementById('five')
const ten = document.getElementById('ten')
const twenty = document.getElementById('twenty')
const onehundred = document.getElementById('one-hundred')

function checkCashRegister () {
  const penny1 = penny.value
  const nickel1 = nickel.value
  const dime1 = dime.value
  const quarter1 = quarter.value
  const one1 = one.value
  const five1 = five.value
  const ten1 = ten.value
  const twenty1 = twenty.value
  const onehundred1 = onehundred.value
  const purchase1 = purchase.value
  const payment1 = payment.value
  const cid = [
    ['PENNY', penny1],
    ['NICKEL', nickel1],
    ['DIME', dime1],
    ['QUARTER', quarter1],
    ['ONE', one1],
    ['FIVE', five1],
    ['TEN', ten1],
    ['TWENTY', twenty1],
    ['ONE HUNDRED', onehundred1]
  ]
  console.log(purchase1, payment1)

  let change = Math.round(payment1 * 100 - purchase1 * 100)
  const cashInHand = {}
  const cashToGive = {}

  cid.forEach((denominations) => {
    cashInHand[denominations[0]] = Math.round(denominations[1] * 100)
  })

  let index = denominations.length - 1

  while (index >= 0 && change > 0) {
    const moneyName = denominations[index][0]
    const moneyValue = denominations[index][1]
    if ((change - moneyValue > 0 && cashInHand[moneyName], change)) {
      cashToGive[moneyName] = 0
      while (cashInHand[moneyName] > 0 && change - moneyValue >= 0) {
        cashInHand[moneyName] -= moneyValue
        cashToGive[moneyName] += moneyValue
        change -= moneyValue
      }
    }
    index -= 1
  }

  if (change === 0) {
    let emptyRegister = true

    Object.keys(cashInHand).forEach((moneyType) => {
      if (cashInHand[moneyType] > 0) {
        emptyRegister = false
      }
    })

    if (emptyRegister) {
      return {
        status: 'CLOSED',
        change: cid
      }
    } else {
      const changeArray = []
      Object.keys(cashToGive).map((moneyType) => {
        if (cashToGive[moneyType] > 0) {
          changeArray.push([moneyType, cashToGive[moneyType] / 100])
        }
        return moneyType
      })
      return { status: 'OPEN', change: changeArray }
    }
  }
  return { status: 'INSUFFICIENT_FUNDS', change: [] }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const res = checkCashRegister()
  displayResult.innerHTML = `{ staus: ${res.status}, change: ${res.change}}`
})
