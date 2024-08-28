let jsonData; // Global variable to store the fetched JSON data


// Function to reset the search
function resetSearch() {
    document.querySelector('.search-input').value = '';
    displayResults([]); // Clear displayed results
}



 function fetchData(){
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    if (keyword === '') {
        console.log('Please enter a valid search keyword.');
        return;
    }
    
    // Fetch data from data.json file
    fetch('./travel_recommendation_api.json')
    .then(response => {
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Parse JSON data from response
    })
    .then(data => {

        jsonData = data; // Store the fetched data globally

        filterResults(keyword);


        //  Display data in the div
        //  console.log(data.countries[0].cities[0].description)

          })
    .catch(error => {
        // Handle any errors
        console.error('There was a problem with the fetch operation:', error);
    });

    


}

function filterResults(keyword) {
   //This line initializes an empty array named filteredCities. This array will store the cities that match the user's keyword
    const filteredCities = [];

    jsonData.countries.forEach(country=>{
        country.cities.forEach(city=>{
           if (city.name.toLowerCase().includes(keyword)||
           city.description.toLowerCase().includes(keyword)
           ) {

               filteredCities.push(city);
              }


        });
    });

    // Search in temples
    if (keyword.toLowerCase().includes('temple')) {
        jsonData.temples.forEach(temple => {
            filteredCities.push(temple);
        });
    }

    // Search in beaches
    if (keyword.toLowerCase().includes('beach')) {
        jsonData.beaches.forEach(beach => {
            filteredCities.push(beach);
        });
    }


    displayResults(filteredCities);

}

function displayResults(results) {
         // Display data as cards
        const cardsContainer = document.getElementById('displayData');
        cardsContainer.innerHTML = ''; // Clear previous results

        results.forEach(city => {
        const card = `
            <div class="card">
                <img src="${city.imageUrl}" alt="${city.name}">
                <h3>${city.name}</h3>
                <p>${city.description}</p>
            </div>
        `;
        cardsContainer.innerHTML += card;
    });
}
