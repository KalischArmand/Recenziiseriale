document.addEventListener("DOMContentLoaded", function() {
    const seriesList = document.getElementById("series-list");
    const seriesDetails = document.getElementById("series-details");
    const loginBtn = document.getElementById("login-btn"); // Adding login button
    const signupLink = document.getElementById("signup-link"); // Adding signup link

    // Dummy data for IMDb series
    const imdbSeries = [
        { 
            title: "Stranger Things", 
            synopsis: "A group of kids uncover supernatural mysteries in their small town.", 
            rating: 8.7, 
            image: "strangerthings.jpg", 
            id: "stranger-things",
            imdbLink: "https://www.imdb.com/title/tt4574334/" // IMDb link for Stranger Things
        },
        { 
            title: "The Crown", 
            synopsis: "The story of the reign of Queen Elizabeth II.", 
            rating: 8.7, 
            image: "thecrown.jpg", 
            id: "the-crown",
            imdbLink: "https://www.imdb.com/title/tt4786824/" // IMDb link for The Crown
        },
        { 
            title: "Narcos", 
            synopsis: "The story of drug kingpin Pablo Escobar.", 
            rating: 8.8, 
            image: "narcos.jpg", 
            id: "narcos",
            imdbLink: "https://www.imdb.com/title/tt2707408/" // IMDb link for Narcos
        }
        // Add more series here...
    ];

    // Function to display IMDb series
    function displayImdbSeries() {
        imdbSeries.forEach(series => {
            const seriesItem = document.createElement("div");
            seriesItem.classList.add("series-item");
            seriesItem.innerHTML = `
                <img src="images/${series.image}" alt="${series.title}">
                <h2>${series.title}</h2>
                <p>${series.synopsis}</p>
                <div class="rating">
                    <p>Rating:</p>
                    <div class="stars">${series.rating}</div>
                </div>
            `;
            seriesItem.addEventListener("click", () => {
                window.open(series.imdbLink, "_blank");
            });
            seriesList.appendChild(seriesItem);
        });
    }

    // Function to display series details
    function displaySeriesDetails(seriesId) {
        const series = imdbSeries.find(series => series.id === seriesId);
        if (series) {
            seriesDetails.innerHTML = `
                <div class="series-item">
                    <img src="images/${series.image}" alt="${series.title}">
                    <h2>${series.title}</h2>
                    <p><strong>Synopsis:</strong> ${series.synopsis}</p>
                    <p><strong>Rating:</strong> ${series.rating}</p>
                </div>
            `;
        } else {
            seriesDetails.innerHTML = "<p>Series not found.</p>";
        }
    }

    // Check if series details page
    const urlParams = new URLSearchParams(window.location.search);
    const seriesId = urlParams.get('id');
    if (seriesId) {
        displaySeriesDetails(seriesId);
    } else {
        displayImdbSeries();
    }

    // Function to handle login button click
    loginBtn.addEventListener("click", () => {
        // Redirect user to the login page (you need to implement this)
        window.location.href = "login.html";
    });

    // Function to handle signup link click
    signupLink.addEventListener("click", () => {
        // Redirect user to the signup page (you need to implement this)
        window.location.href = "signup.html";
    });
});
