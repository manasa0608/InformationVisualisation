'use strict'

//Author: Manasa Shivakumar
function getTutorialInfo() {
  return {
    exerciseNum: 4, //make sure that this is the right number of the current exercise
    groupNames: 'Manasa Shivakumar',//provide the names of each team member
    isAnimated: false, //if set to true, shapes will be rendered roughly 60 times per second
  }
}

function draw(two) {
  /* perform drawing operations using 'two'
   * the drawing area comprises 900px (width) x 600px (height)
   * you can find a comprehensive documentation on https://two.js.org
   *
   * for instance, draw a rectangle like this:
   * (replace the following code with your actual drawing logic of the exercise)
   */

  //draw rectangle with x, y, width, height in constructor (x,y relate to center of rect!)

  //do the weight alignment correctly

  const data = getData().dataEx4

  const rect = two.makeRectangle(302, 50, 552, 100)
  rect.fill = 'rgb(173,199,234)' //fill with blueish color
  two.makeText('Root', 302, 50, {
    size: 10,
    alignment: 'right',
    family: 'monospace',
    weight: 'Bold',
  })
  rect.opacity = 0.75

  drawBar(two, data.children)
}

var leaf = false
var height = 150
var parentWeight = 0

var xPosition = 0
var parentPosition = 0
var counter = 0

const drawBar = (two, childData, parent) => {
  for (const i in childData) {
    leaf = isTheNodeALeaf(childData[i])
    if (childData[i] == null || childData[i] == undefined) {
      return
    }
    if (leaf) {
      xPosition = getLeafPosition(childData[i].name)

      const rect = two.makeRectangle(
        xPosition,
        height,
        childData[i].weight * 12,
        100,
      )

      two.makeText(childData[i].name, xPosition, height, {
        size: childData[i].weight * 2,
        alignment: 'center',
        family: 'monospace',
      })

      rect.opacity = 0.75
      rect.fill = 'rgb(255,129,6)'
    } else {
      height += 100
      drawBar(two, childData[i].children, childData[i])
    }
  }

  height -= 100
  if (leaf == true && parent != undefined) {
    parentWeight = calculateParentNodeWeight(parent)
    parentPosition = getParentNodePosition(parent.name)
    drawParentNode(two, height, parentWeight, parent, parentPosition)
    parentWeight = 0
  }
}

function isTheNodeALeaf(childData) {
  var keys = Object.keys(childData)
  return keys.includes('weight') ? true : false
}

function drawParentNode(two, height, parentWeight, parent, parentPosition) {
  const rect = two.makeRectangle(parentPosition, height, parentWeight * 12, 100)
  rect.fill = 'rgb(173,199,234)'
  rect.opacity = 0.76 //fill with blueish color
  two.makeText(parent.name, parentPosition - 10, height, {
    size: 10,
    alignment: 'left',
    family: 'monospace',
  })
}

function calculateParentNodeWeight(parent) {
  for (const i in parent.children) {
    var keys = Object.keys(parent.children[i])
    if (keys.includes('weight')) {
      parentWeight += parent.children[i].weight
    } else {
      calculateParentNodeWeight(parent.children[i])
    }
  }
  return parentWeight
}

function getLeafPosition(child) {
  var leafMap = new Map()
  leafMap.set('A1-I', 50)
  leafMap.set('A1-II', 86)
  leafMap.set('A1-III', 116)
  leafMap.set('A1-IV-I', 137.25)
  leafMap.set('A1-IV-II', 143)
  leafMap.set('A2-I', 182)
  leafMap.set('A2-II', 236)
  leafMap.set('A3', 284)
  leafMap.set('B1-I', 320)
  leafMap.set('B1-II', 338)
  leafMap.set('B2-II', 392)
  leafMap.set('B2-III', 404)
  leafMap.set('B2-IV', 416)
  leafMap.set('B2-V', 428)
  leafMap.set('B2-VI', 440)

  leafMap.set('B3', 452)
  leafMap.set('B4', 470)

  leafMap.set('B2-I-I', 359)
  leafMap.set('B2-I-II', 371)
  leafMap.set('B2-I-III', 375.5)
  leafMap.set('B2-I-IV', 378.5)
  leafMap.set('B2-I-V', 381.5)
  leafMap.set('B2-I-VI', 384.5)
  leafMap.set('C', 530)
  return leafMap.get(child)
}

function getParentNodePosition(parent) {
  var parentMap = new Map()
  parentMap.set('A1-IV', 140)
  parentMap.set('A1', 86)
  parentMap.set('A2', 200)
  parentMap.set('A', 170)
  parentMap.set('B1', 332)
  parentMap.set('B', 398)
  parentMap.set('B2-I', 368)
  parentMap.set('B2', 398)
  return parentMap.get(parent)
}
