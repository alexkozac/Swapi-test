window.addEventListener('DOMContentLoaded', () => {
    main();
  });
  
  async function main() {
    const starshipsResource = 'starships';
    const peopleResource = 'people';
    const planetsResource = 'planets';
  
    const [starships, people, planets] = await Promise.all([
      fetchAll(starshipsResource),
      fetchAll(peopleResource),
      fetchAll(planetsResource)
    ]);
  
    const cards = [
      {
        id: '#card-id-1',
        answer: findFastestShip(starships).name
      },
      {
        id: '#card-id-2',
        answer: findShipWithMostCapacity(starships).name
      },
      {
        id: '#card-id-3',
        answer: `${findShipInMostFilms(starships).ship.name} its in ${findShipInMostFilms(starships).numberOfFilms} film`
      },
      {
        id: '#card-id-4',
        answer: findOldestCharacter(people).name
      },
      {
        id: '#card-id-5',
        answer: calculateAverageHeight(people)
      },
      {
        id: '#card-id-6',
        answer: findMostDenselyPopulatedPlanet(planets, people).name
      }
    ];
  
    cards.forEach(card => {
      addAnswerToCard(card.id, card.answer);
    });
  }
  
  async function fetchAll(resource) {
    const res = await fetch(`https://swapi.dev/api/${resource}/`);
    const json = await res.json();
    return json.results;
  }
  
  function addAnswerToCard(cardId, answer) {
    const button = document.querySelector(`${cardId} .card-body .btn`);
    const answerElement = document.querySelector(`${cardId} .card-footer em`);
  
    button.addEventListener('click', () => {
      answerElement.textContent = answer;
    });
  }
  
  function findFastestShip(starships) {
    let fastest = starships[0];
    for (const ship of starships) {
      if (parseInt(ship.MGLT) > parseInt(fastest.MGLT)) {
        fastest = ship;
      }
    }
    return fastest;
  }
  
  function findShipWithMostCapacity(starships) {
    let maxCapacity = 0;
    let shipWithMostCapacity = null;
  
    for (const ship of starships) {
      const passengers = parseInt(ship.passengers);
      const crew = parseInt(ship.crew);
      const totalCapacity = passengers + crew;
  
      if (!isNaN(totalCapacity) && totalCapacity > maxCapacity) {
        maxCapacity = totalCapacity;
        shipWithMostCapacity = ship;
      }
    }
  
    return shipWithMostCapacity;
  }
  
  function findShipInMostFilms(starships) {
    let maxFilms = 0;
    let shipInMostFilms = null;
    for (const ship of starships) {
      const films = ship.films.length;
      if (films > maxFilms) {
        maxFilms = films;
        shipInMostFilms = ship;
      }
    }
    return { ship: shipInMostFilms, numberOfFilms: maxFilms };
  }
  
  function findOldestCharacter(people) {
    let oldestCharacter = people[0];
    for (const character of people) {
      if (parseInt(character.birth_year) < parseInt(oldestCharacter.birth_year)) {
        oldestCharacter = character;
      }
    }
    return oldestCharacter;
  }
  
  function calculateAverageHeight(people) {
    let totalHeight = 0;
    for (const person of people) {
      if (person.height !== 'unknown') {
        totalHeight += parseInt(person.height);
      }
    }
    const averageHeight = totalHeight / people.length;
    return `L'altezza media è ${averageHeight.toFixed(2)} cm`;
  }
  
  function findMostDenselyPopulatedPlanet(planets, people) {
    let mostDenselyPopulatedPlanet = planets[0];
    let maxPopulationDensity = 0;
    for (const planet of planets) {
      const population = parseInt(planet.population);
      const planetPeople = people.filter(person => person.homeworld === planet.url).length;
      const populationDensity = population === 0 ? 0 : planetPeople / population;
      if (populationDensity > maxPopulationDensity) {
        maxPopulationDensity = populationDensity;
        mostDenselyPopulatedPlanet = planet;
      }
    }
    return mostDenselyPopulatedPlanet;
  }
  