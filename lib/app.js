const $ = require('jquery')
const Chart = require('Chart.js')
const planetCtx = $("#planetChart")
const discoveryCtx = $("#discoveryChart")
const lifeCtx = $("#lifeChart")

$.getJSON( "/api/planets", (data) => {
  const planets = data.slice(1,-1)

  const trappist1E = planets.find((planet) => {
    return planet.pl_name === 'TRAPPIST-1 e'
  })

  console.log("Trappist-1 e: ", trappist1E)

  const planetNames = planets.map((planet) => {
    return planet.pl_name
  })

  const planetDistance = planets.map((planet) => {
    return parseInt(planet.st_dist)
  })

  const planetDensity = planets.map((planet) => {
    return parseInt(planet.pl_dens)
  })

  const planetRadius = planets.map((planet) => {
    return parseInt(planet.pl_radj)
  })

  const lifeRating = planets.map((planet) => {
    if(planet.pl_radj !== '' && planet.pl_orbper !== '' && planet.pl_bmasse !== '' && planet.pl_insol !== '') {
      return 100 - (Math.abs(parseInt(planet.pl_radj) - parseInt(trappist1E.pl_radj)) +
             Math.abs(parseInt(planet.pl_orbper) - parseInt(trappist1E.pl_orbper)) +
             Math.abs(parseInt(planet.pl_bmasse) - parseInt(trappist1E.pl_bmasse)) +
             Math.abs(parseInt(planet.pl_insol) - parseInt(trappist1E.pl_insol)))
    }
  })

  const lifePlanetNames = planets.map((planet) => {
    if(planet.pl_radj !== '' && planet.pl_orbper !== '' && planet.pl_bmasse !== '' && planet.pl_insol !== '') {
      return planet.pl_name
    }
  })


  const discoveryMethod = {}

  const findDiscoveryMethods = planets.map((planet) => {
    if(discoveryMethod[planet.pl_discmethod]) {
      discoveryMethod[planet.pl_discmethod] += 1
    } else {
      discoveryMethod[planet.pl_discmethod] = 1
    }
  })


  const planetData = {
      labels: planetNames,
      datasets: [{
                    label: 'Planet Distance from Earth',
                    data: planetDistance,
                    backgroundColor: [
                        'rgba(5, 194, 209, 0.2)',
                    ],
                    borderColor: [
                        'rgba(5, 194, 209, 1)',
                    ],
                    borderWidth: 1
                },
                {
                  label: 'Planet Density',
                  data: planetDensity,
                  backgroundColor: [
                      'rgba(51, 153, 34, 0.2)',
                  ],
                  borderColor: [
                      'rgba(51, 153, 34, 0.1)',
                  ],
                  borderWidth: 1
              },
              {
                  label: 'Planet Radius',
                  data: planetRadius,
                  backgroundColor: [
                      'rgba(17, 17, 17, 0.2)',
                  ],
                  borderColor: [
                      'rgba(17, 17, 17, 0.1)',
                  ],
                  borderWidth: 1
              }
              ]
  }

  const discoveryData = {
    labels: Object.keys(discoveryMethod),
    datasets: [{
                  label: 'Planet Discovery',
                  data: Object.values(discoveryMethod),
                  backgroundColor: [
                      'rgba(5, 194, 209, 0.2)',
                      'rgba(204, 85, 85, 0.2)',
                      'rgba(26, 26, 26, 0.2)',
                      'rgba(90, 23, 237, 0.2)',
                      'rgba(5, 194, 209, 0.2)',
                      'rgba(204, 85, 85, 0.2)',
                      'rgba(26, 26, 26, 0.2)',
                      'rgba(90, 23, 237, 0.2)',
                      'rgba(134, 65, 83, 0.2)',
                      'rgba(242, 200, 132, 0.2)',
                      'rgba(242, 165, 0, 0.2)'
                  ],
                  borderColor: [
                    'rgba(5, 194, 209, 1)',
                    'rgba(204, 85, 85, 1)',
                    'rgba(26, 26, 26, 1)',
                    'rgba(90, 23, 237, 1)',
                    'rgba(5, 194, 209, 1)',
                    'rgba(204, 85, 85, 1)',
                    'rgba(26, 26, 26, 1)',
                    'rgba(90, 23, 237, 1)',
                    'rgba(134, 65, 83, 1)',
                    'rgba(242, 200, 132, 1)',
                    'rgba(242, 165, 0, 1)'
                  ],
                  borderWidth: 1
              }
            ]
  }

  const lifeData = {
      labels: planetNames,
      datasets: [{
                    label: 'Probability of Life',
                    data: lifeRating,
                    backgroundColor: [
                        'rgba(5, 194, 209, 0.2)',
                    ],
                    borderColor: [
                        'rgba(5, 194, 209, 1)',
                    ],
                    borderWidth: 1
                }
              ]
  }



  const planetChart = new Chart(planetCtx,{
      type: 'line',
      data: planetData
  })

  const discoveryChart = new Chart(discoveryCtx, {
    type: 'pie',
    data: discoveryData
  })

  const lifeChart = new Chart(lifeCtx, {
    type: 'line',
    data: lifeData
  })
})
