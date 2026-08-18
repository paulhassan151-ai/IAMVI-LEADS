/* ==========================================
   IAMVI LEADS
   SEARCH + DASHBOARD CONNECTION
========================================== */

const demoBusinesses = [
    {
        name: "Royal Palace Hotel",
        category: "Hotel",
        location: "Abuja",
        phone: "+234 801 234 5678",
        email: "royalpalace@example.com",
        rating: "4.8",
        status: "Hot Lead"
    },
    {
        name: "Capital View Restaurant",
        category: "Restaurant",
        location: "Abuja",
        phone: "+234 802 345 6789",
        email: "capitalview@example.com",
        rating: "4.6",
        status: "Warm"
    },
    {
        name: "Luxury Touch Salon",
        category: "Salon",
        location: "Abuja",
        phone: "+234 803 456 7890",
        email: "luxury@example.com",
        rating: "4.7",
        status: "New"
    },
    {
        name: "Prime Auto Centre",
        category: "Car Dealer",
        location: "Lagos",
        phone: "+234 804 567 8901",
        email: "primeauto@example.com",
        rating: "4.5",
        status: "Hot Lead"
    },
    {
        name: "City View Hotel",
        category: "Hotel",
        location: "Lagos",
        phone: "+234 805 678 9012",
        email: "cityview@example.com",
        rating: "4.4",
        status: "Warm"
    },
    {
        name: "Elite Fashion House",
        category: "Fashion",
        location: "Kano",
        phone: "+234 806 789 0123",
        email: "elitefashion@example.com",
        rating: "4.7",
        status: "New"
    },
    {
        name: "Northern Tech Hub",
        category: "Technology",
        location: "Kano",
        phone: "+234 807 890 1234",
        email: "northerntech@example.com",
        rating: "4.6",
        status: "Warm"
    },
    {
        name: "Golden Events Centre",
        category: "Events",
        location: "Abuja",
        phone: "+234 808 901 2345",
        email: "goldenevents@example.com",
        rating: "4.9",
        status: "Hot Lead"
    }
];


/* ==========================================
   SEARCH FROM HOMEPAGE
========================================== */

function searchLeads() {

    const businessInput =
        document.getElementById("businessType");

    const locationInput =
        document.getElementById("location");

    const businessType =
        businessInput.value.trim();

    const location =
        locationInput.value.trim();


    if (!businessType || !location) {

        alert(
            "Please enter a business type and location."
        );

        return;
    }


    const results = findBusinesses(
        businessType,
        location
    );


    /*
       Save the search temporarily.
       The dashboard can read this later.
    */

    sessionStorage.setItem(
        "iamviSearchType",
        businessType
    );

    sessionStorage.setItem(
        "iamviSearchLocation",
        location
    );

    sessionStorage.setItem(
        "iamviSearchResults",
        JSON.stringify(results)
    );


    displayResults(
        results,
        businessType,
        location
    );

}


/* ==========================================
   FIND BUSINESSES
========================================== */

function findBusinesses(type, location) {

    const searchType =
        type.toLowerCase();

    const searchLocation =
        location.toLowerCase();


    return demoBusinesses.filter(business => {

        const matchesType =
            business.category
                .toLowerCase()
                .includes(searchType) ||

            business.name
                .toLowerCase()
                .includes(searchType);


        const matchesLocation =
            business.location
                .toLowerCase()
                .includes(searchLocation);


        return matchesType && matchesLocation;

    });

}


/* ==========================================
   DISPLAY SEARCH RESULTS
========================================== */

function displayResults(
    results,
    businessType,
    location
) {

    const leadCount =
        document.getElementById("leadCount");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultSubtitle =
        document.getElementById("resultSubtitle");

    const table =
        document.querySelector(".lead-table");


    leadCount.textContent =
        results.length;


    resultTitle.textContent =
        `${capitalize(businessType)} leads`;


    resultSubtitle.textContent =
        `Results for ${capitalize(businessType)} in ${capitalize(location)}`;


    const header = `
        <div class="table-header">

            <span>BUSINESS</span>
            <span>CATEGORY</span>
            <span>LOCATION</span>
            <span>RATING</span>
            <span>STATUS</span>

        </div>
    `;


    if (results.length === 0) {

        table.innerHTML = `
            ${header}

            <div style="
                padding:55px 20px;
                text-align:center;
                color:#777;
            ">

                <div style="font-size:38px;">
                    🔎
                </div>

                <strong style="
                    display:block;
                    color:white;
                    margin-top:10px;
                ">
                    No demo leads found
                </strong>

                <p>
                    Try another business type or city.
                </p>

            </div>
        `;

        return;
    }


    const rows =
        results.map((business, index) => {

            const statusClass =
                business.status === "Hot Lead"
                    ? "hot"
                    : business.status === "Warm"
                    ? "warm"
                    : "new";


            return `
                <div class="lead-row">

                    <div class="business-info">

                        <div class="business-icon">
                            ${getBusinessIcon(
                                business.category
                            )}
                        </div>

                        <div>

                            <strong>
                                ${business.name}
                            </strong>

                            <small>
                                ${business.phone}
                            </small>

                        </div>

                    </div>

                    <span>
                        ${business.category}
                    </span>

                    <span>
                        ${business.location}
                    </span>

                    <span>
                        ⭐ ${business.rating}
                    </span>

                    <span class="status ${statusClass}">
                        ${business.status}
                    </span>

                </div>
            `;

        }).join("");


    table.innerHTML =
        header + rows;
}


/* ==========================================
   BUSINESS ICON
========================================== */

function getBusinessIcon(category) {

    const icons = {

        "Hotel": "🏨",

        "Restaurant": "🍽️",

        "Salon": "💇",

        "Car Dealer": "🚗",

        "Fashion": "👕",

        "Technology": "💻",

        "Events": "🎉"

    };

    return icons[category] || "🏢";
}


/* ==========================================
   CAPITALIZE
========================================== */

function capitalize(text) {

    return text
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");

}


/* ==========================================
   ENTER KEY SEARCH
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const inputs =
            document.querySelectorAll(
                ".search-field input"
            );


        inputs.forEach(input => {

            input.addEventListener(
                "keypress",
                event => {

                    if (event.key === "Enter") {
                        searchLeads();
                    }

                }
            );

        });

    }
);
