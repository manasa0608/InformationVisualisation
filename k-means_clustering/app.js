'use strict'

function getTutorialInfo() {
  return {
    exerciseNum: 9,
    groupNames: 'Manasa Shivakumar',
    isAnimated: false,
  }
}

function draw(two) {
  //TODO (b): Play around with different values of k
  const k = 5
  //-------------
  const colors = getTenDistinctColors()
  const data = getData().dataEx9
  const clusters = getClustering(k, data)
  drawUnitSquareScatterPlotAxes(two)
  for (let i = 0; i < clusters.length; i++) {
    drawToUnitSquareScatterPlot(two, clusters[i], colors[i])
  }
}

function getClustering(k, data) {
  if (k <= 1) {
    return [data]
  }

  var centroids = []
  for (var i = 0; i < k; i++) {
    centroids.push(data[i])
  }

  var clusters = []
  var oldCentroids
  do {
    // Assign each data point to the closest centroid
    clusters = Array.from({ length: k }, () => [])
    for (var i = 0; i < data.length; i++) {
      var minDistance = Number.MAX_VALUE
      var clusterIndex = 0
      for (var j = 0; j < k; j++) {
        var distance = euclideanDistance(data[i], centroids[j])
        if (distance < minDistance) {
          minDistance = distance
          clusterIndex = j
        }
      }
      clusters[clusterIndex].push(data[i])
    }

    oldCentroids = centroids
    centroids = []
    for (var i = 0; i < k; i++) {
      var mean = Array.from({ length: data[0].length }, () => 0)
      for (var j = 0; j < clusters[i].length; j++) {
        for (var d = 0; d < data[0].length; d++) {
          mean[d] += clusters[i][j][d]
        }
      }
      for (var d = 0; d < data[0].length; d++) {
        mean[d] /= clusters[i].length
      }
      centroids.push(mean)
    }
  } while (centroidsChanged(oldCentroids, centroids))

  return clusters
}

function euclideanDistance(a, b) {
  var distance = 0
  for (var i = 0; i < a.length; i++) {
    distance += Math.pow(a[i] - b[i], 2)
  }
  return Math.sqrt(distance)
}

function centroidsChanged(oldCentroids, centroids) {
  for (var i = 0; i < oldCentroids.length; i++) {
    for (var j = 0; j < oldCentroids[i].length; j++) {
      if (oldCentroids[i][j] !== centroids[i][j]) {
        return true
      }
    }
  }
  return false
}
