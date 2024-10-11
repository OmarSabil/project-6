
// create loadCategories
const loadCategories = (ccategories) => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}
// create loadCategoryPets
const loadCategoryPets = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => displayCards(data.data))
        .catch((error) => console.log(error))
}
// create loadDetailModal
const loadDetailModal = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}

// create displayCategories
const displayCategories = (categories) => {
    categories.forEach((item) => {
        const categoryContainer = document.getElementById("categories")
        const categoryName = item.category
        const itemCategory = item.category /**/
        console.log(categoryName)

        const buttonContainer = document.createElement("div");
        // buttonContainer.classList
        buttonContainer.innerHTML =
            `
        <button onclick="loadCategoryPets('${itemCategory}')" class="btn w-[120px] m-3">
            <img class="w-5 mr-2" src=${item.category_icon}>
            ${itemCategory}
        </button>
        ` /**/

        // append button category
        categoryContainer.append(buttonContainer);
    });
};
// create loadCards
const loadCards = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayCards(data.pets))
        .catch((error) => console.log(error))
}
// create displayCards
const displayCards = (pets) => {
    const cardsContainer = document.getElementById("pet-cards");
    const likedThePet = document.getElementById("liked")

    cardsContainer.innerHTML = "";

    if(pets.length === 0){
        cardsContainer.classList.remove("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
        // likedThePet.classList.add("hidden")
        cardsContainer.innerHTML = `
        <div class="border-2 rounded-xl bg-gray-100 min-h-[500px] w-[750px] flex flex-col gap-5 justify-center items-center">
            <img src="assets/error.webp">
            <h4 class="text-3xl font-bold">No Information Available</h4>

        </div>
        `;
        return
    } else {
        likedThePet.classList.remove("hidden")
        cardsContainer.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3")
    }


    pets.forEach((pet) => {
        console.log(pet);
        const card = document.createElement("div");
        card.classList = "border-2 p-5 w-fit rounded-xl";
        card.innerHTML =
            `
                <img id="pet-image" class="w-[300px] rounded-lg h-[150px]"
                src=${pet.image} >
                <div class="border-b-2 pt-3 flex flex-col gap-2">
                    <h4 class="text-lg font-bold">${pet.pet_name}</h4>
                    <div class="flex flex-col gap-.5 pb-2">
                        ${pet.breed == undefined || null ? `<p class="text-sm text-gray-400">Breed: Unknown</p>` : `<p class="text-sm text-gray-400">Breed: ${pet.breed}</p>` }

                        ${pet.date_of_birth == undefined || null ? `<p class="text-sm text-gray-400">Birth: Unknown</p>` : `<p class="text-sm text-gray-400">Birth: ${pet.date_of_birth}</p>` }

                        ${pet.gender == undefined || null ? `<p class="text-sm text-gray-400">Gender: Unknown</p>` : `<p class="text-sm text-gray-400">Gender: ${pet.gender}</p>` }

                        ${pet.price == undefined || null ? `<p class="text-sm text-gray-400">Price: Unknown</p>` : `<p class="text-sm text-gray-400">Price: ${pet.price}</p>` }
                    </div>
                </div>

                <div class="pt-5 flex justify-between">
                    <button onclick = "likePet('${pet.image}')"
                    class="btn btn-sm btn-outline">
                    <i class="fa-regular fa-thumbs-up">
                    </i></button>
                    <button class="btn btn-sm btn-outline">Adopt</button>
                    <button id=${pet.petId} class="detail_btn btn btn-sm btn-outline" onclick="my_modal_4.showModal()">Details</button>
                        <dialog id="my_modal_4" class="modal" onclick="detailButton()">
                          <div class="modal-box w-11/12 max-w-5xl">
                            <h3 class="text-lg font-bold">${pet.pet_name}</h3>
                            <p class="py-4">Click the button below to close</p>
                            <div class="modal-action">
                              <form method="dialog">
                                <!-- if there is a button, it will close the modal -->
                                <button class="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                </div>
        `
        cardsContainer.append(card);
    });
    // Call modal
    const detailButton = document.getElementById('detail_btn-$');
    detailButton.addEventListener("click", function () {
        const myModal = document.getElementById('my_modal_4')
        myModal.showModal()

    });
}
// create likePet loader
const likePet = (petImage) => {
    console.log(petImage)
    const likedThePet = document.getElementById("liked")

    const likeToImage = document.createElement("div")
    likeToImage.classList = "";
    likeToImage.innerHTML =
        `
    <img class="lg:w-[200px] max-h-[150px] h-full object-cover rounded-lg mx-auto" src=${petImage} alt="">
    `
    likedThePet.appendChild(likeToImage)
}

// function call
loadCategories();
loadCards();


