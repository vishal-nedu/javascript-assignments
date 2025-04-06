const mealContainer = document.getElementById("mealContainer");

async function fetchMeal() {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
    const data = await res.json();
    const meal = data.meals[0];

    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientsList += `<li>${measure} ${ingredient}</li>`;
      }
    }

    const youtubeID = meal.strYoutube ? meal.strYoutube.split("v=")[1] : null;
    const youtubeEmbed = youtubeID
      ? `<h3>Video Tutorial:</h3>
         <iframe src="https://www.youtube.com/embed/${youtubeID}" frameborder="0" allowfullscreen></iframe>`
      : "";

    const html = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h2>${meal.strMeal}</h2>
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags}</p>` : ""}
      <h3>Ingredients:</h3>
      <ul>${ingredientsList}</ul>
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
      ${youtubeEmbed}
      ${meal.strSource ? `<p><strong>Source:</strong> <a href="${meal.strSource}" target="_blank">${meal.strSource}</a></p>` : ""}
    `;

    mealContainer.innerHTML = html;
  } catch (error) {
    mealContainer.innerHTML = "<p>Failed to load meal details.</p>";
    console.error(error);
  }
}

fetchMeal();