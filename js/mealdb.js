const loadSearch = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
    `;
    if (searchText == '') {
        const errorMessage = document.getElementById('search-result');
        errorMessage.innerText = "Type Something";
    } else {
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals == null) {
        const errorMessage = document.getElementById('search-result');
        const div = document.createElement('div');
        div.innerHTML = `
        <h4 class="text">Not Found</h4>
        `;
        errorMessage.appendChild(div);
    } else {
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                    <div onclick="loadSingleMeal('${meal.idMeal}')"class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                        </div>
                    </div>
            `;
            searchResult.appendChild(div);
        });
    }
};

const loadSingleMeal = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals[0]))
};

const displayMeal = (meal) => {
    const singleMeal = document.getElementById('single-meal');
    singleMeal.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card">
         <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
         </div>
    </div>
    `;
    singleMeal.appendChild(div);
}