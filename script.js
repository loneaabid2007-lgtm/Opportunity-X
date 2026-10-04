/* ========================================
   OPPORTUNITYX — MAIN JAVASCRIPT
======================================== */


/* ========================================
   REAL / VERIFIED OPPORTUNITY DATA
======================================== */

const opportunities = [

    {
        id: 1,
        title: "PM-USP Special Scholarship Scheme for Jammu Kashmir and Ladakh",
        type: "Scholarship",
        icon: "fa-graduation-cap",
        location: "Jammu & Kashmir",

        education: [
            "12th",
            "College"
        ],

        interests: [
            "Education",
            "Scholarship"
        ],

        skills: [
            "Academic"
        ],

        deadline: "31 Oct 2026",

        description:
            "Merit-based scholarship scheme available through the National Scholarship Portal for eligible students from Jammu, Kashmir and Ladakh.",

        eligibility:
            "Eligibility depends on the official scheme conditions. Check the National Scholarship Portal before applying.",

        benefits:
            "Scholarship financial assistance as per the official scheme guidelines.",

        documents:
            "Required documents depend on the scheme and applicant profile.",

        applyLink:
            "https://scholarships.gov.in/",

        source:
            "National Scholarship Portal",

        verifiedDate:
            "4 Oct 2026"
    },


    {
        id: 2,
        title: "National Scholarship Portal — 2026-27 Scholarships",
        type: "Scholarship",
        icon: "fa-graduation-cap",
        location: "India",

        education: [
            "10th",
            "12th",
            "College"
        ],

        interests: [
            "Education",
            "Scholarship"
        ],

        skills: [
            "Academic"
        ],

        deadline: "31 Oct 2026",

        description:
            "National Scholarship Portal provides access to multiple Central and State scholarship schemes for eligible students.",

        eligibility:
            "Eligibility varies by scholarship scheme. Students should check the individual scheme requirements on NSP.",

        benefits:
            "Financial assistance according to the selected scholarship scheme.",

        documents:
            "Documents vary by scheme and applicant category.",

        applyLink:
            "https://scholarships.gov.in/",

        source:
            "National Scholarship Portal",

        verifiedDate:
            "4 Oct 2026"
    },


    {
        id: 3,
        title: "Peyjal Gatha — National Water Stories & Water Ideas Challenge",
        type: "Competition",
        icon: "fa-trophy",
        location: "India",

        education: [
            "8th",
            "9th",
            "10th",
            "11th",
            "12th"
        ],

        interests: [
            "Environment",
            "Science",
            "Writing",
            "Innovation"
        ],

        skills: [
            "Writing",
            "Research",
            "Creativity"
        ],

        deadline: "8 Dec 2026",

        description:
            "A national MyGov challenge inviting students to document drinking-water stories, traditional water knowledge and practical ideas for water security.",

        eligibility:
            "Open to students of Classes VIII–XII in eligible school systems across India.",

        benefits:
            "Opportunity to showcase student work through a national-level government platform.",

        documents:
            "Submission requirements depend on the selected competition category.",

        applyLink:
            "https://secure.mygov.in/task/peyjal-gatha-national-water-stories-water-ideas-challenge",

        source:
            "MyGov India",

        verifiedDate:
            "4 Oct 2026"
    },


    {
        id: 4,
        title: "Essay Competition — 12 Years of Make in India",
        type: "Competition",
        icon: "fa-pen-nib",
        location: "India",

        education: [
            "12th",
            "College",
            "Graduate"
        ],

        interests: [
            "Writing",
            "Business",
            "Technology",
            "Innovation"
        ],

        skills: [
            "Writing",
            "Research"
        ],

        deadline: "5 Oct 2026",

        description:
            "A nationwide MyGov essay competition organised by DPIIT to mark 12 years of Make in India.",

        eligibility:
            "Open to citizens across India. Essay length is 500–600 words in Hindi or English.",

        benefits:
            "Selected essays may be featured on official digital platforms and social media channels.",

        documents:
            "Online submission through the MyGov portal.",

        applyLink:
            "https://secure.mygov.in/task/essay-competition-12-years-make-india",

        source:
            "MyGov India",

        verifiedDate:
            "4 Oct 2026"
    }

];


/* ========================================
   FIND OPPORTUNITIES
======================================== */

function findOpportunities() {

    const finder =
        document.getElementById("finder");

    if (finder) {

        finder.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ========================================
   EXPLORE OPPORTUNITIES
======================================== */

function exploreOpportunities() {

    const opportunitiesSection =
        document.getElementById("opportunities");

    if (opportunitiesSection) {

        opportunitiesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ========================================
   CATEGORY SELECTION
======================================== */

function selectCategory(category) {

    const finder =
        document.getElementById("finder");

    const opportunityType =
        document.getElementById("opportunityType");

    if (!finder || !opportunityType) {
        return;
    }

    finder.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(function () {

        opportunityType.value = category;

    }, 500);

}


/* ========================================
   FINDER FORM
======================================== */

const opportunityForm =
    document.getElementById("opportunityForm");


if (opportunityForm) {

    opportunityForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const education =
                document.getElementById("education").value;

            const location =
                document.getElementById("location").value.trim();

            const interest =
                document.getElementById("interest").value;

            const skills =
                document.getElementById("skills").value.trim();

            const opportunityType =
                document.getElementById("opportunityType").value;


            if (
                !education ||
                !location ||
                !interest ||
                !skills ||
                !opportunityType
            ) {

                alert(
                    "Please complete all fields before searching."
                );

                return;

            }


            /* ========================================
               USER SKILLS
            ======================================== */

            const userSkills =
                skills.toLowerCase();

            const skillWords =
                userSkills
                    .split(",")
                    .map(function (skill) {
                        return skill.trim();
                    })
                    .filter(Boolean);


            /* ========================================
               SMART MATCHING
            ======================================== */

            const scoredOpportunities =
                opportunities.map(function (opportunity) {

                    let score = 0;

                    const opportunityText = (
                        opportunity.title +
                        " " +
                        opportunity.description +
                        " " +
                        opportunity.interests.join(" ") +
                        " " +
                        opportunity.benefits
                    ).toLowerCase();


                    /* Education */

                    if (
                        opportunity.education.includes(
                            education
                        )
                    ) {

                        score += 3;

                    }


                    /* Interest */

                    if (
                        opportunity.interests.includes(
                            interest
                        )
                    ) {

                        score += 3;

                    }


                    /* Opportunity type */

                    if (
                        opportunity.type ===
                        opportunityType
                    ) {

                        score += 3;

                    }


                    /* Skills */

                    let skillMatch = false;

                    skillWords.forEach(
                        function (skill) {

                            if (
                                opportunityText.includes(
                                    skill
                                )
                            ) {

                                score += 2;

                                skillMatch = true;

                            }

                        }
                    );


                    /* Location */

                    if (
                        location.toLowerCase() ===
                        opportunity.location.toLowerCase()
                    ) {

                        score += 1;

                    }


                    return {

                        opportunity:
                            opportunity,

                        score:
                            score,

                        skillMatch:
                            skillMatch

                    };

                });


            /* ========================================
               SORT + CREATE MATCH DATA
            ======================================== */

            const matchedOpportunities =
                scoredOpportunities

                    .filter(function (item) {

                        return item.score >= 3;

                    })

                    .sort(function (a, b) {

                        return b.score - a.score;

                    })

                    .map(function (item) {

                        let matchPercentage =
                            Math.round(
                                (item.score / 12) * 100
                            );


                        if (matchPercentage > 100) {
                            matchPercentage = 100;
                        }


                        const reasons = [];


                        if (
                            item.opportunity.education.includes(
                                education
                            )
                        ) {

                            reasons.push(
                                "Your education matches"
                            );

                        }


                        if (
                            item.opportunity.interests.includes(
                                interest
                            )
                        ) {

                            reasons.push(
                                "Your interest matches"
                            );

                        }


                        if (
                            item.opportunity.type ===
                            opportunityType
                        ) {

                            reasons.push(
                                "Opportunity type matches"
                            );

                        }


                        if (item.skillMatch) {

                            reasons.push(
                                "Your skills are relevant"
                            );

                        }


                        if (
                            location.toLowerCase() ===
                            item.opportunity.location.toLowerCase()
                        ) {

                            reasons.push(
                                "Location matches"
                            );

                        }


                        return {

                            ...item.opportunity,

                            matchPercentage:
                                matchPercentage,

                            matchReasons:
                                reasons

                        };

                    });


            displayResults(
                matchedOpportunities,
                education,
                location,
                interest,
                skills
            );

        }
    );

}


/* ========================================
   DISPLAY RESULTS
======================================== */

function displayResults(
    matchedOpportunities,
    education,
    location,
    interest,
    skills
) {

    const results =
        document.getElementById("results");

    const resultsGrid =
        document.getElementById("resultsGrid");

    const resultsMessage =
        document.getElementById("resultsMessage");

    const noResults =
        document.getElementById("noResults");


    if (
        !results ||
        !resultsGrid ||
        !resultsMessage ||
        !noResults
    ) {

        return;

    }


    resultsGrid.innerHTML = "";

    noResults.style.display =
        "none";

    results.style.display =
        "block";


    const count =
        matchedOpportunities.length;


    if (count === 1) {

        resultsMessage.textContent =
            "1 matching opportunity found for your profile.";

    } else {

        resultsMessage.textContent =
            count +
            " matching opportunities found for your profile.";

    }


    /* ========================================
       NO RESULTS
    ======================================== */

    if (count === 0) {

        noResults.style.display =
            "block";

        resultsMessage.textContent =
            "We couldn't find a matching opportunity right now.";

        results.scrollIntoView({
            behavior: "smooth"
        });

        return;

    }


    /* ========================================
       CREATE RESULT CARDS
    ======================================== */

    matchedOpportunities.forEach(
        function (opportunity) {

            const card =
                document.createElement("div");


            card.className =
                "opportunity-card";


            /* ========================================
               MATCH REASONS
            ======================================== */

            let reasonsHTML = "";


            if (
                opportunity.matchReasons &&
                opportunity.matchReasons.length > 0
            ) {

                reasonsHTML = `
                    <div class="match-reasons">

                        <strong>
                            <i class="fa-solid fa-circle-check"></i>
                            Why this matches you
                        </strong>

                        ${opportunity.matchReasons
                            .map(function (reason) {

                                return `
                                    <div class="match-reason">

                                        <i class="fa-solid fa-check"></i>

                                        <span>
                                            ${reason}
                                        </span>

                                    </div>
                                `;

                            })
                            .join("")
                        }

                    </div>
                `;

            }


            /* ========================================
               CARD HTML
            ======================================== */

            card.innerHTML = `

                <div class="verified-source">

                    <i class="fa-solid fa-circle-check"></i>

                    Verified Official Source

                    <span class="source-name">
                        • ${opportunity.source}
                    </span>

                </div>


                <div class="verified-date">

                    <i class="fa-regular fa-clock"></i>

                    Verified ${opportunity.verifiedDate}

                </div>


                <div class="match-score">

                    <i class="fa-solid fa-bolt"></i>

                    ${opportunity.matchPercentage}% Match

                </div>


                <div class="opportunity-card-top">

                    <span class="opportunity-type">

                        <i class="fa-solid ${opportunity.icon || "fa-star"}"></i>

                        ${opportunity.type}

                    </span>


                    <button
                        class="opportunity-save"
                        onclick="saveOpportunity(this)"
                        aria-label="Save opportunity"
                    >

                        <i class="fa-regular fa-bookmark"></i>

                    </button>

                </div>


                <h3>
                    ${opportunity.title}
                </h3>


                <p class="opportunity-card-description">

                    ${opportunity.description}

                </p>


                ${reasonsHTML}


                <div class="opportunity-info">


                    <div class="opportunity-info-item">

                        <i class="fa-solid fa-user-check"></i>

                        <span>
                            ${opportunity.eligibility}
                        </span>

                    </div>


                    <div class="opportunity-info-item">

                        <i class="fa-regular fa-calendar"></i>

                        <span>
                            Deadline:
                            ${opportunity.deadline}
                        </span>

                    </div>


                    <div class="opportunity-info-item">

                        <i class="fa-solid fa-gift"></i>

                        <span>
                            ${opportunity.benefits}
                        </span>

                    </div>


                    <div class="opportunity-info-item">

                        <i class="fa-solid fa-location-dot"></i>

                        <span>
                            ${opportunity.location}
                        </span>

                    </div>


                </div>


                <div class="opportunity-actions">


                    <button
                        class="details-btn"
                        onclick='showOpportunityDetails(${JSON.stringify(opportunity)})'
                    >

                        <i class="fa-solid fa-circle-info"></i>

                        View Details

                    </button>


                    <button
                        class="apply-btn"
                        onclick="applyOpportunity('${escapeAttribute(opportunity.applyLink)}')"
                    >

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                        Apply Now

                    </button>


                    <a
                        href="${opportunity.applyLink}"
                        class="source-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                        Official Source

                    </a>


                </div>

            `;


            resultsGrid.appendChild(card);

        }
    );


    restoreSavedOpportunities();


    results.scrollIntoView({
        behavior: "smooth"
    });

}


function showOpportunityDetails(opportunity) {

    const modal = document.getElementById("detailsModal");

    // Basic information
    document.getElementById("modalIcon").className =
        `fa-solid ${opportunity.icon}`;

    document.getElementById("modalType").textContent =
        opportunity.type;

    document.getElementById("modalTitle").textContent =
        opportunity.title;

    document.getElementById("modalDescription").textContent =
        opportunity.description;

    // Verification information
    document.getElementById("modalSource").textContent =
        `• ${opportunity.source}`;

    document.getElementById("modalVerifiedDate").textContent =
        opportunity.verifiedDate;

    // Opportunity details
    document.getElementById("modalEligibility").textContent =
        opportunity.eligibility;

    document.getElementById("modalDocuments").textContent =
        opportunity.documents;

    document.getElementById("modalDeadline").textContent =
        opportunity.deadline;

    document.getElementById("modalBenefits").textContent =
        opportunity.benefits;

    document.getElementById("modalLocation").textContent =
        opportunity.location;

    document.getElementById("modalHowToApply").textContent =
        "Visit the official source and follow the application instructions.";

    // Official source link
    const sourceLink =
        document.getElementById("modalSourceLink");

    sourceLink.href =
        opportunity.applyLink;

    // Apply button
    const applyButton =
        document.getElementById("modalApplyBtn");

    applyButton.onclick = function () {
        applyOpportunity(opportunity.id);
    };

    // Show modal
    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* ========================================
   CLOSE MODAL
======================================== */

function closeOpportunityDetails() {

    const modal =
        document.getElementById("detailsModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


/* ========================================
   CLOSE MODAL OUTSIDE
======================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("detailsModal");


        if (
            modal &&
            event.target === modal
        ) {

            closeOpportunityDetails();

        }

    }
);


/* ========================================
   ESC CLOSE MODAL
======================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeOpportunityDetails();

        }

    }
);


/* ========================================
   APPLY NOW
======================================== */

function applyOpportunity(link) {

    if (
        link &&
        link !== "#"
    ) {

        window.open(
            link,
            "_blank",
            "noopener,noreferrer"
        );

        return;

    }


    alert(
        "The official application link will be added here."
    );

}


/* ========================================
   SAVE OPPORTUNITY
======================================== */

function saveOpportunity(button) {

    if (!button) {
        return;
    }


    const card =
        button.closest(
            ".opportunity-card"
        );


    if (!card) {
        return;
    }


    const title =
        card.querySelector("h3");


    if (!title) {
        return;
    }


    const opportunityTitle =
        title.textContent.trim();


    let savedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_saved"
            )
        ) || [];


    const alreadySaved =
        savedOpportunities.includes(
            opportunityTitle
        );


    const icon =
        button.querySelector("i");


    if (!icon) {
        return;
    }


    if (alreadySaved) {

        savedOpportunities =
            savedOpportunities.filter(
                function (item) {

                    return item !==
                        opportunityTitle;

                }
            );


        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

        button.classList.remove(
            "saved"
        );


    } else {

        savedOpportunities.push(
            opportunityTitle
        );


        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

        button.classList.add(
            "saved"
        );

    }


    localStorage.setItem(
        "opportunityX_saved",
        JSON.stringify(
            savedOpportunities
        )
    );


    updateSavedCount();

    displaySavedOpportunities();

}


/* ========================================
   RESTORE SAVED STATUS
======================================== */

function restoreSavedOpportunities() {

    const savedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_saved"
            )
        ) || [];


    const saveButtons =
        document.querySelectorAll(
            ".opportunity-save"
        );


    saveButtons.forEach(
        function (button) {

            const card =
                button.closest(
                    ".opportunity-card"
                );


            if (!card) {
                return;
            }


            const title =
                card.querySelector("h3");


            if (!title) {
                return;
            }


            const opportunityTitle =
                title.textContent.trim();


            const icon =
                button.querySelector("i");


            if (!icon) {
                return;
            }


            if (
                savedOpportunities.includes(
                    opportunityTitle
                )
            ) {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

                button.classList.add(
                    "saved"
                );

            } else {

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

                button.classList.remove(
                    "saved"
                );

            }

        }
    );

}


/* ========================================
   SAVED COUNT
======================================== */

function updateSavedCount() {

    const savedCount =
        document.getElementById(
            "savedCount"
        );


    if (!savedCount) {
        return;
    }


    const savedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_saved"
            )
        ) || [];


    savedCount.textContent =
        savedOpportunities.length;

}


/* ========================================
   DISPLAY SAVED OPPORTUNITIES
======================================== */

function displaySavedOpportunities() {

    const savedGrid =
        document.getElementById(
            "savedGrid"
        );

    const savedEmpty =
        document.getElementById(
            "savedEmpty"
        );

    const savedMessage =
        document.getElementById(
            "savedMessage"
        );


    if (
        !savedGrid ||
        !savedEmpty
    ) {

        return;

    }


    const savedTitles =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_saved"
            )
        ) || [];


    savedGrid.innerHTML = "";


    /* ========================================
       NO SAVED OPPORTUNITIES
    ======================================== */

    if (
        savedTitles.length === 0
    ) {

        savedEmpty.style.display =
            "block";


        if (savedMessage) {

            savedMessage.textContent =
                "Opportunities you save will appear here.";

        }


        updateSavedCount();

        return;

    }


    savedEmpty.style.display =
        "none";


    if (savedMessage) {

        const count =
            savedTitles.length;


        savedMessage.textContent =
            count === 1
                ? "You have 1 saved opportunity."
                : `You have ${count} saved opportunities.`;

    }


    /* ========================================
       FIND SAVED DATA
    ======================================== */

    const savedData =
        opportunities.filter(
            function (opportunity) {

                return savedTitles.includes(
                    opportunity.title
                );

            }
        );


    savedData.forEach(
        function (opportunity) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "saved-card";


            card.innerHTML = `

                <div class="saved-card-top">

                    <div class="saved-card-icon">

                        <i class="fa-solid ${opportunity.icon || "fa-star"}"></i>

                    </div>


                    <button
                        class="saved-remove-btn"
                        onclick="removeSavedOpportunity('${escapeAttribute(opportunity.title)}')"
                        aria-label="Remove saved opportunity"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>


                <span class="saved-card-type">

                    ${opportunity.type}

                </span>


                <h3>

                    ${opportunity.title}

                </h3>


                <p>

                    ${opportunity.description}

                </p>


                <div class="saved-card-info">

                    <div>

                        <i class="fa-regular fa-calendar"></i>

                        <span>
                            Deadline:
                            ${opportunity.deadline}
                        </span>

                    </div>


                    <div>

                        <i class="fa-solid fa-location-dot"></i>

                        <span>
                            ${opportunity.location}
                        </span>

                    </div>


                    <div>

                        <i class="fa-solid fa-gift"></i>

                        <span>
                            ${opportunity.benefits}
                        </span>

                    </div>

                </div>


                <button
                    class="saved-view-btn"
                    onclick="showOpportunityDetailsByTitle('${escapeAttribute(opportunity.title)}')"
                >

                    <i class="fa-solid fa-eye"></i>

                    View Details

                </button>

            `;


            savedGrid.appendChild(
                card
            );

        }
    );


    updateSavedCount();

}


/* ========================================
   REMOVE SAVED OPPORTUNITY
======================================== */

function removeSavedOpportunity(title) {

    let savedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_saved"
            )
        ) || [];


    savedOpportunities =
        savedOpportunities.filter(
            function (savedTitle) {

                return savedTitle !== title;

            }
        );


    localStorage.setItem(
        "opportunityX_saved",
        JSON.stringify(
            savedOpportunities
        )
    );


    const resultCards =
        document.querySelectorAll(
            ".opportunity-card"
        );


    resultCards.forEach(
        function (card) {

            const cardTitle =
                card.querySelector("h3");


            if (!cardTitle) {
                return;
            }


            if (
                cardTitle.textContent.trim() ===
                title
            ) {

                const bookmarkButton =
                    card.querySelector(
                        ".opportunity-save"
                    );


                if (bookmarkButton) {

                    bookmarkButton.classList.remove(
                        "saved"
                    );


                    bookmarkButton.innerHTML =
                        '<i class="fa-regular fa-bookmark"></i>';

                }

            }

        }
    );


    displaySavedOpportunities();

    updateSavedCount();

}


/* ========================================
   VIEW SAVED DETAILS
======================================== */

function showOpportunityDetailsByTitle(
    title
) {

    const opportunity =
        opportunities.find(
            function (item) {

                return item.title ===
                    title;

            }
        );


    if (!opportunity) {
        return;
    }


    showOpportunityDetails(
        opportunity
    );

}


/* ========================================
   ESCAPE ATTRIBUTE
======================================== */

function escapeAttribute(value) {

    return String(value)
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        );

}


/* ========================================
   INITIAL LOAD
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSavedCount();

        displaySavedOpportunities();

    }
);


/* ========================================
   SMOOTH NAVIGATION
======================================== */

document.querySelectorAll(
    ".navbar nav a"
).forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId &&
                    targetId.startsWith("#")
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }

            }
        );

    }
);
// ================= ADVANCED FILTERS =================

function applyAdvancedFilters() {

    const search =
        document.getElementById("searchKeyword").value
        .trim()
        .toLowerCase();

    const type =
        document.getElementById("filterType").value;

    const education =
        document.getElementById("filterEducation").value;

    const location =
        document.getElementById("filterLocation").value
        .trim()
        .toLowerCase();

    const sort =
        document.getElementById("sortOpportunities").value;


    let filtered = opportunities.filter(opportunity => {

        // Search filter
        const searchMatch =
            !search ||
            opportunity.title.toLowerCase().includes(search) ||
            opportunity.description.toLowerCase().includes(search) ||
            opportunity.type.toLowerCase().includes(search) ||
            opportunity.interests.some(
                interest =>
                    interest.toLowerCase().includes(search)
            );


        // Type filter
        const typeMatch =
            type === "all" ||
            opportunity.type === type;


        // Education filter
        const educationMatch =
            education === "all" ||
            opportunity.education.includes(education);


        // Location filter
        const locationText =
            opportunity.location.toLowerCase();

        const locationMatch =
            !location ||
            locationText.includes(location) ||
            locationText.includes("india") &&
            location.includes("india");


        return (
            searchMatch &&
            typeMatch &&
            educationMatch &&
            locationMatch
        );

    });


    // ================= SORT =================

    if (sort === "match") {

        filtered.sort((a, b) => {

            const aScore = calculateMatchScore(a);
            const bScore = calculateMatchScore(b);

            return bScore.score - aScore.score;
        });

    }


    else if (sort === "deadline") {

        filtered.sort((a, b) => {

            return new Date(a.deadline) -
                   new Date(b.deadline);

        });

    }


    else if (sort === "title") {

        filtered.sort((a, b) => {

            return a.title.localeCompare(
                b.title
            );

        });

    }


    displayFilteredResults(filtered);

}


// ================= FILTERED RESULTS =================

function displayFilteredResults(filtered) {

    const resultsGrid =
        document.getElementById("resultsGrid");

    const noResults =
        document.getElementById("noResults");


    resultsGrid.innerHTML = "";


    if (filtered.length === 0) {

        noResults.style.display = "block";

        return;
    }


    noResults.style.display = "none";


    filtered.forEach(opportunity => {

        const match =
            calculateMatchScore(opportunity);


        const card =
            document.createElement("div");

        card.className = "opportunity-card";


        card.innerHTML = `

            <div class="opportunity-card-top">

                <div class="opportunity-icon">

                    <i class="fa-solid ${opportunity.icon}">
                    </i>

                </div>

                <span class="opportunity-type">
                    ${opportunity.type}
                </span>

            </div>


            <div class="verified-source">

                <i class="fa-solid fa-circle-check"></i>

                Verified Official Source

                <span class="source-name">
                    • ${opportunity.source}
                </span>

            </div>


            <div class="verified-date">

                <i class="fa-regular fa-clock"></i>

                Verified ${opportunity.verifiedDate}

            </div>


            <div class="match-score">

                <i class="fa-solid fa-bullseye"></i>

                ${match.percentage}% Match

            </div>


            <h3>
                ${opportunity.title}
            </h3>


            <p>
                ${opportunity.description}
            </p>


            <div class="opportunity-info">

                <div>
                    <i class="fa-solid fa-user-check"></i>

                    ${opportunity.eligibility}

                </div>

                <div>
                    <i class="fa-regular fa-calendar"></i>

                    ${opportunity.deadline}

                </div>

                <div>
                    <i class="fa-solid fa-gift"></i>

                    ${opportunity.benefits}

                </div>

                <div>
                    <i class="fa-solid fa-location-dot"></i>

                    ${opportunity.location}

                </div>

            </div>


            <div class="opportunity-actions">

                <button
                    class="view-details-btn"
                    onclick="showOpportunityDetailsByTitle('${escapeAttribute(opportunity.title)}')"
                >
                    <i class="fa-solid fa-eye"></i>
                    View Details
                </button>


                <button
                    class="apply-btn"
                    onclick="applyOpportunity('${opportunity.id}')"
                >
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    Apply Now
                </button>

            </div>

        `;


        resultsGrid.appendChild(card);

    });

}


// ================= FILTER EVENTS =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const filterIds = [
            "searchKeyword",
            "filterType",
            "filterEducation",
            "filterLocation",
            "sortOpportunities"
        ];


        filterIds.forEach(id => {

            const element =
                document.getElementById(id);


            if (!element) return;


            element.addEventListener(
                "input",
                applyAdvancedFilters
            );


            element.addEventListener(
                "change",
                applyAdvancedFilters
            );

        });

    }
);


// ================= CLEAR FILTERS =================

function clearAdvancedFilters() {

    document.getElementById(
        "searchKeyword"
    ).value = "";


    document.getElementById(
        "filterType"
    ).value = "all";


    document.getElementById(
        "filterEducation"
    ).value = "all";


    document.getElementById(
        "filterLocation"
    ).value = "";


    document.getElementById(
        "sortOpportunities"
    ).value = "match";


    displayFilteredResults(
        opportunities
    );

}