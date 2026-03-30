
const API_KEY = "3xr0jljfl3JR8rFnw5Nf4KYwQD8sHSmW"; 
const defaultSearchTerm = "dogs";

// DOM elements
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// Function to fetch GIFs
async function fetchGifs(searchTerm = defaultSearchTerm) {
    try {
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

        const response = await fetch(endpoint);
        const data = await response.json();

        // Clear previous GIFs
        gifContainer.innerHTML = "";

        // Loop through GIFs and display
        data.data.forEach(gif => {
            gifContainer.innerHTML += `
                <div class="col-3 mb-3">
                    <img src="${gif.images.original.url}" class="img-fluid" alt="GIF">
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching GIFs:", error);
        gifContainer.innerHTML = "<p class='text-danger'>Failed to load GIFs.</p>";
    }
}

// Initial fetch on page load
fetchGifs();

// Event listener for search button
fetchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim() || defaultSearchTerm; // Default if input empty
    fetchGifs(searchTerm);
});