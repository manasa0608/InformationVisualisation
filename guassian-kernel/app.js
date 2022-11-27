'use strict'

//Author: Manasa Shivakumar
function getTutorialInfo() {
  return {
    exerciseNum: 2, //make sure that this is the right number of the current exercise
    groupNames: 'Manasa Shivakumar', //provide the names of each team member
    isAnimated: false, //if set to true, shapes will be rendered roughly 60 times per second
  }
}

const bandwidth = 0.5

function draw(two) {
  const numbers = getData().dataTask3

  const X = [] // X positions
  const Y = [] // Y positions

  for (let x = 0; x <= 100; x += 0.1) {
    let temp = 0
    for (let j = 0; j < numbers.length; j++) {
      let difference = (x - numbers[j]) / bandwidth
      temp += GaussKDE(difference)
    }

    X.push(x)
    Y.push(temp / numbers.length) // TODO: replace by KDE(x)
  }

  drawAxesForTask3(two)
  const path = createPathFromXY(X, Y)
  two.add(path)
}

function GaussKDE(difference) {
  let exp = Math.exp(-0.5 * Math.pow(difference, 2))
  let pie = 1 / Math.sqrt(2 * Math.PI * Math.pow(bandwidth, 2))
  return pie * exp
}
