'use strict'

function getTutorialInfo() {
  return {
    exerciseNum: 3, //make sure that this is the right number of the current exercise
    groupNames: 'Manasa Shivakumar', //provide the names of each team member
    isAnimated: true, //if set to true, shapes will be rendered roughly 60 times per second
  }
}

var percentageIncrease = 0.3

function draw(two) {
  //skeleton
  const colorScale = getColorScale(24)

  let numberArray = []
  for (var i = 0; i < 24; i++) {
    numberArray.push(Math.random() * 390 + 10)
  }
  showA(two, numberArray, colorScale, getRandom())
}

function showA(two, a, colorScale, randomBar) {
  let distanceBetweenBars = 1.25
  var group = new Two.Group()
  for (var i = 0; i < 24; i++) {
    const rectangle = two.makeRectangle(
      xScale(distanceBetweenBars),
      yScale(1.75) + 50 - a[i] / 2,
      10,
      a[i],
    )
    rectangle.noStroke()
    rectangle.fill = colorScale[i]
    distanceBetweenBars += 0.5
    group.rectangle = rectangle

    group.add(rectangle)
    two.add(group)
  }

  two.makeGroup(group)

  showNothing(group)

  setTimeout(() => {
    showB(two, a, colorScale, randomBar)
  }, 5000)
}

function showB(two, a, colorScale, randomBar) {
  let distanceBetweenBars = 1.25
  var group = new Two.Group()
  for (var i = 0; i < 24; i++) {
    const rectangle = two.makeRectangle(
      xScale(distanceBetweenBars),
      i == randomBar
        ? yScale(1.75) + 50 - (a[i] + percentageIncrease * a[i]) / 2
        : yScale(1.75) + 50 - a[i] / 2,
      10,
      i == randomBar ? a[i] + percentageIncrease * a[i] : a[i],
    )
    rectangle.noStroke()
    rectangle.fill = colorScale[i]
    distanceBetweenBars += 0.5
    group.rectangle = rectangle

    group.add(rectangle)
    two.add(group)
  }
  two.makeGroup(group)

  showNothing(group)

  setTimeout(() => {
    showA(two, a, colorScale, getRandom())
  }, 5000)
}

function getRandom() {
  return Math.round(Math.random() * 23 + 1)
}

function showNothing(group) {
  setTimeout(() => {
    group.fill = 'white'
  }, 2000)
}
