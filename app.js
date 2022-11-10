'use strict'

const { Gradient } = require('two.js/src/effects/gradient')

//Code written by Manasa Shivakumar
//Date: 3rd November 2022
function getTutorialInfo() {
  return {
    exerciseNum: 1,
    groupNames: 'Manasa Shivakumar',
    isAnimated: false,
  }
}

function draw(two) {
  //add part A title
  two.makeText(
    'Global Land and Ocean Temperature Anomalies 1880 - 2021',
    0,
    10,
    { size: 20, alignment: 'left', family: 'monospace', weight: 'Bold' },
  )
  //draw axis for exercise part A
  drawAxes(two)
  //draw exercise part A
  drawTask4a(two)

  //add part B title
  two.makeText('Global Warming Stripes 1880 - 2021', 0, 500, {
    size: 20,
    alignment: 'left',
    family: 'monospace',
    weight: 'Bold',
  })
  //draw exercise part B
  drawTask4b(two)
}

function drawTask4a(two) {
  // data for bar chart
  const barWidth = 4
  const maxBarHeight = 250

  const data = getData().a01Task4

  //insert your code here

  var distanceBetweenBars = 0.5
  for (const temp in data.tempAnomalies) {
    const rect = two.makeRectangle(
      xScale(distanceBetweenBars),
      yScale(1 - 0.5 * data.tempAnomalies[temp]) + 50,
      barWidth,
      maxBarHeight * data.tempAnomalies[temp] * 0.9,
    )

    rect.fill = getTempColor(data.tempAnomalies[temp])
    distanceBetweenBars += 0.08
  }
}

function drawTask4b(two) {
  // data for stripes
  const barWidth = 4

  const data = getData().a01Task4

  let tempArray = Object.values(data.tempAnomalies)
  const max = Math.max(...tempArray)
  const min = Math.min(...tempArray)

  const sum = tempArray.reduce((a, b) => a + b, 0)

  const avg = sum / tempArray.length || 0

  let color_scale = getStripesColorScale(min, avg, max)

  let distanceBetweenBars = 0.5

  //insert your code here
  for (const temp in tempArray) {
    const tempVal = tempArray[temp]

    const barHeight = yScale(1)
    const rect = two.makeRectangle(
      xScale(distanceBetweenBars),
      yScale(2.8) + 50,
      barWidth,
      barHeight,
    )

    distanceBetweenBars += 0.08
    rect.noStroke()
    rect.fill = color_scale(tempVal).hex()
  }
}
