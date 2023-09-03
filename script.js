const welcomeMessage = document.querySelector('.calculator__welcome')
const resultMessage = document.querySelector('.calculator__result')
const result = document.querySelector('.result')
const resultDesc = document.querySelector('.desc')
const resultCategory = document.querySelector('.category')
const resultRange = document.querySelector('.range')

const radioWrapper = document.querySelector('.radio-wrapper')
const radioButtonMetric = document.querySelector('#radio-metric')
const radioButtonImperial = document.querySelector('#radio-imperial')

const numberWrapper = document.querySelectorAll('.number-wrapper')
const numberWrapperMetric = document.querySelector('.number-wrapper--metric')
const numberWrapperImperial = document.querySelector(
  '.number-wrapper--imperial'
)
const inputKG = document.querySelector('#weight-kg')
const inputCM = document.querySelector('#height-cm')
const inputST = document.querySelector('#weight-st')
const inputLBS = document.querySelector('#weight-lbs')
const inputFT = document.querySelector('#height-ft')
const inputIN = document.querySelector('#height-in')

radioWrapper.addEventListener('change', (e) => {
  if (e.target.matches('#radio-metric')) {
    showMetric()
  } else {
    showImperial()
  }
  updateBMI()
})

numberWrapper.forEach((el) => {
  el.addEventListener('change', (e) => {
    if (!welcomeMessage.classList.contains('hidden')) showResult()
    updateBMI()
  })
})

function updateBMI() {
  let height
  let weight
  let bmi
  let minWeight
  let maxWeight

  if (radioButtonMetric.checked) {
    weight = parseFloat(inputKG.value)
    height = parseFloat(inputCM.value) / 100
    bmi = height === 0 ? 0 : weight / height ** 2

    minWeight = (18.5 * height ** 2).toFixed(1) + 'kgs'
    maxWeight = (25 * height ** 2).toFixed(1) + 'kgs'
  } else {
    weight = parseFloat(inputST.value) * 14 + parseFloat(inputLBS.value)
    height = parseFloat(inputFT.value) * 12 + parseFloat(inputIN.value)

    bmi = height === 0 ? 0 : (weight / height ** 2) * 703

    const minWeightTotal = (18.5 * height ** 2) / 703
    const minWeightST = Math.floor(minWeightTotal / 14).toString() + 'st'
    const minWeightLBS = Math.round(minWeightTotal % 14).toString() + 'lbs'
    minWeight = `${minWeightST} ${minWeightLBS}`

    const maxWeightTotal = (25 * height ** 2) / 703
    const maxWeightST = Math.floor(maxWeightTotal / 14).toString() + 'st'
    const maxWeightLBS = Math.round(maxWeightTotal % 14).toString() + 'lbs'
    maxWeight = `${maxWeightST} ${maxWeightLBS}`
  }

  renderMessage(bmi, minWeight, maxWeight)
}

function renderMessage(bmi, minWeight, maxWeight) {
  let category = ''
  if (bmi < 18.5) {
    category = 'underweight'
  } else if (bmi < 25) {
    category = 'a healthy weight'
  } else if (bmi < 30) {
    category = 'overweight'
  } else category = 'obese'

  result.innerText = bmi.toFixed(1)
  resultCategory.innerText = category
  resultRange.innerText = `${minWeight} - ${maxWeight}`
}

function showImperial() {
  numberWrapperImperial.classList.remove('hidden')
  numberWrapperMetric.classList.add('hidden')
  radioButtonImperial.checked = true
  radioButtonMetric.checked = false
}

function showMetric() {
  numberWrapperMetric.classList.remove('hidden')
  numberWrapperImperial.classList.add('hidden')
  radioButtonMetric.checked = true
  radioButtonImperial.checked = false
}

function showResult() {
  welcomeMessage.classList.add('hidden')
  resultMessage.classList.remove('hidden')
}

function init() {
  showMetric()
  welcomeMessage.classList.remove('hidden')
}

init()
