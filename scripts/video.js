const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.error(err));
};


//     "category_id": "1001",
//     "category": "Music"


const displayCategories = (categories) => {
  console.log(categories);

  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);

    // Button create
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // Add btn to category
    categoryContainer.append(button);
  });
};

loadCategories();
