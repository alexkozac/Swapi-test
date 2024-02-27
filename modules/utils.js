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


  export{fetchAll,addAnswerToCard};