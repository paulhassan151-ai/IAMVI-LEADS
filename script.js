/* ==========================================
   IAMVI LEADS
   Frontend Demo Search System
========================================== */

const demoBusinesses = [
    {
        name: "Royal Palace Hotel",
        category: "Hotel",
        location: "Abuja",
        phone: "+234 801 234 5678",
        rating: "4.8"
    },
    {
        name: "Capital View Restaurant",
        category: "Restaurant",
        location: "Abuja",
        phone: "+234 802 345 6789",
        rating: "4.6"
    },
    {
        name: "Luxury Touch Salon",
        category: "Salon",
        location: "Abuja",
        phone: "+234 803 456 7890",
        rating: "4.7"
    },
    {
        name: "Prime Auto Centre",
        category: "Car Dealer",
        location: "Lagos",
        phone: "+234 804 567 8901",
        rating: "4.5"
    },
    {
        name: "City View Hotel",
        category: "Hotel",
        location: "Lagos",
        phone: "+234 805 678 9012",
        rating: "4.4"
    },
    {
        name: "Elite Fashion House",
        category: "Fashion",
        location: "Kano",
        phone: "+234 806 789 0123",
        rating: "4.7"
    },
    {
        name: "Northern Tech Hub",
        category: "Technology",
        location: "Kano",
        phone: "+234 807 890 1234",
        rating: "4.6"
    },
    {
        name: "Golden Events Centre",
        category: "Events",
        location: "Abuja",
        phone: "+234 808 901 2345",
        rating: "4.9"
    }
];


/* ==========================================
   SEARCH LEADS
========================================== */

function searchLeads() {

    const businessInput =
        document.getElementById("businessType");

    const locationInput =
        document.getElementById("location");

    const businessType =
        businessInput.value.trim().toLowerCase();

    const location =
        locationInput.value.trim().toLowerCase();


    if (!businessType || !location) {

        alert(
            "Please enter both a business type and a location."
        );

        return;
    }


    const results = demoBusinesses.filter(business => {

        const categoryMatch =
            business.category
                .toLowerCase()
                .includes(businessType) ||
            business.name
                .toLowerCase()
                .includes(businessType);

        const locationMatch =
            business.location
                .toLowerCase()
                .includes(location);

        return categoryMatch && locationMatch;
    });


    displayResults(
        results,
        businessType,
        location
    );

}


/* ==========================================
   DISPLAY RESULTS
========================================== */

function displayResults(results, businessType, location) {

    const leadCount =
        document.getElementById("leadCount");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultSubtitle =
        document.getElementById("resultSubtitle");


    leadCount.textContent = results.length;

    resultTitle.textContent =
        `${capitalize(businessType)} leads`;

    resultSubtitle.textContent =
        `Search results for ${capitalize(businessType)} in ${capitalize(location)}`;


    const table =
        document.querySelector(".lead-table");


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
                padding:50px 25px;
                text-align:center;
                color:#777;
            ">
                <div style="font-size:35px;margin-bottom:10px;">
                    🔎
                </div>

                <strong style="color:white;">
                    No demo leads found
                </strong>

                <p style="margin-top:8px;">
                    Try another business type or location.
                </p>
            </div>
        `;

    } else {

        const rows = results.map((business, index) => {

            const status =
                index === 0
                    ? "Hot Lead"
                    : index === 1
                    ? "Warm"
                    : "New";

            const statusClass =
                index === 0
                    ? "hot"
                    : index === 1
                    ? "warm"
                    : "new";


            return `
                <div class="lead-row">

                    <div class="business-info">

                        <div class="business-icon">
                            ${getBusinessIcon(business.category)}
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
                        ${status}
                    </span>

                </div>
            `;

        }).join("");


        table.innerHTML =
            header + rows;
    }


    document
        .getElementById("results")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ==========================================
   BUSINESS ICONS
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
   CAPITALIZE TEXT
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
   MOBILE MENU
========================================== */

function toggleMenu() {

    const navbar = document.querySelector(".navbar");

    const nav = document.querySelector(".navbar nav");

    const buttons =
        document.querySelector(".nav-buttons");


    if (nav.style.display === "flex") {

        nav.style.display = "none";
        buttons.style.display = "none";

    } else {

        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "76px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.padding = "25px";
        nav.style.background = "#090909";

        buttons.style.display = "flex";
        buttons.style.position = "absolute";
        buttons.style.top = "300px";
        buttons.style.left = "0";
        buttons.style.width = "100%";
        buttons.style.padding = "20px";
        buttons.style.background = "#090909";
    }
}


/* ==========================================
   ENTER KEY SEARCH
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const inputs =
        document.querySelectorAll(".search-field input");

    inputs.forEach(input => {

        input.addEventListener("keypress", event => {

            if (event.key === "Enter") {
                searchLeads();
            }

        });

    });

});
