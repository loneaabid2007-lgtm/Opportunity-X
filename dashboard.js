document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // TOTAL OPPORTUNITIES
    // ==================================================

    const totalElement =
        document.getElementById("dashboardTotal");

    if (
        totalElement &&
        typeof opportunities !== "undefined"
    ) {
        totalElement.textContent =
            opportunities.length;
    }


    // ==================================================
    // SAVED OPPORTUNITIES
    // ==================================================

    loadDashboardSaved();


    // ==================================================
    // PROFILE
    // ==================================================

    loadDashboardProfile();


    // ==================================================
    // APPLICATION STATISTICS
    // ==================================================

    loadApplicationStats();


    // ==================================================
    // EDIT PROFILE BUTTON
    // ==================================================

    const editProfileBtn =
        document.getElementById("editProfileBtn");

    if (editProfileBtn) {

        editProfileBtn.onclick = function () {
            openEditProfile();
        };

    }


    // ==================================================
    // EDIT PROFILE FORM
    // ==================================================

    const editProfileForm =
        document.getElementById("editProfileForm");

    if (editProfileForm) {

        editProfileForm.addEventListener(
            "submit",
            saveEditProfile
        );

    }


    // ==================================================
    // APPLICATION TRACKER BUTTON
    // ==================================================

    const trackerButton =
        document.getElementById("openTrackerBtn");

    if (trackerButton) {

        trackerButton.onclick = function () {
            openApplicationTracker();
        };

    }


    // ==================================================
    // TRACKER STATS
    // ==================================================

    const trackerApplications =
        getTrackerApplications();

    updateTrackerStats(
        trackerApplications
    );

});


// ==================================================
// SAVED OPPORTUNITIES
// ==================================================

function loadDashboardSaved() {

    const savedList =
        document.getElementById(
            "dashboardSavedList"
        );

    const emptyState =
        document.getElementById(
            "dashboardSavedEmpty"
        );

    const savedCountElement =
        document.getElementById(
            "dashboardSaved"
        );


    if (!savedList) return;


    let savedOpportunities =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_saved"
            )
        ) || [];


    if (
        savedOpportunities.length === 0 &&
        typeof getSavedOpportunities === "function"
    ) {

        const existingSaved =
            getSavedOpportunities();

        if (Array.isArray(existingSaved)) {

            savedOpportunities =
                existingSaved;

        }

    }


    savedList.innerHTML = "";


    if (savedCountElement) {

        savedCountElement.textContent =
            savedOpportunities.length;

    }


    if (savedOpportunities.length === 0) {

        if (emptyState) {

            emptyState.style.display =
                "block";

        }

        return;

    }


    if (emptyState) {

        emptyState.style.display =
            "none";

    }


    savedOpportunities
        .slice(0, 6)
        .forEach(function (saved) {

            let opportunity = saved;


            if (
                typeof saved === "string" &&
                typeof opportunities !== "undefined"
            ) {

                opportunity =
                    opportunities.find(
                        function (item) {

                            return item.id === saved;

                        }
                    );

            }


            if (!opportunity) return;


            const item =
                document.createElement("div");


            item.className =
                "dashboard-saved-item";


            item.innerHTML = `

                <h3>
                    ${escapeDashboardHTML(
                        opportunity.title ||
                        "Opportunity"
                    )}
                </h3>

                <p>
                    ${escapeDashboardHTML(
                        opportunity.description ||
                        ""
                    )}
                </p>

                <div class="dashboard-saved-meta">

                    <span>
                        <i class="fa-solid fa-layer-group"></i>
                        ${escapeDashboardHTML(
                            opportunity.type ||
                            "Opportunity"
                        )}
                    </span>

                    <span>
                        <i class="fa-regular fa-calendar"></i>
                        ${escapeDashboardHTML(
                            opportunity.deadline ||
                            "No deadline"
                        )}
                    </span>

                </div>

            `;


            savedList.appendChild(item);

        });

}


// ==================================================
// PROFILE
// ==================================================

function loadDashboardProfile() {

    const profile =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_profile"
            )
        ) || {};


    const education =
        document.getElementById(
            "profileEducation"
        );

    const location =
        document.getElementById(
            "profileLocation"
        );

    const interests =
        document.getElementById(
            "profileInterests"
        );

    const skills =
        document.getElementById(
            "profileSkills"
        );


    if (education) {

        education.textContent =
            profile.education ||
            "Not set";

    }


    if (location) {

        location.textContent =
            profile.location ||
            "Not set";

    }


    if (interests) {

        interests.textContent =
            profile.interests ||
            "Not set";

    }


    if (skills) {

        skills.textContent =
            profile.skills ||
            "Not set";

    }

}


// ==================================================
// EDIT PROFILE
// ==================================================

function openEditProfile() {

    const modal =
        document.getElementById(
            "editProfileModal"
        );


    if (!modal) {

        console.error(
            "Edit Profile modal not found."
        );

        return;

    }


    const profile =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_profile"
            )
        ) || {};


    const education =
        document.getElementById(
            "editEducation"
        );

    const location =
        document.getElementById(
            "editLocation"
        );

    const interests =
        document.getElementById(
            "editInterests"
        );

    const skills =
        document.getElementById(
            "editSkills"
        );


    if (education) {

        education.value =
            profile.education &&
            profile.education !== "Not set"
                ? profile.education
                : "";

    }


    if (location) {

        location.value =
            profile.location &&
            profile.location !== "Not set"
                ? profile.location
                : "";

    }


    if (interests) {

        interests.value =
            profile.interests &&
            profile.interests !== "Not set"
                ? profile.interests
                : "";

    }


    if (skills) {

        skills.value =
            profile.skills &&
            profile.skills !== "Not set"
                ? profile.skills
                : "";

    }


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


// ==================================================
// SAVE PROFILE
// ==================================================

function saveEditProfile(event) {

    event.preventDefault();


    const educationInput =
        document.getElementById(
            "editEducation"
        );

    const locationInput =
        document.getElementById(
            "editLocation"
        );

    const interestsInput =
        document.getElementById(
            "editInterests"
        );

    const skillsInput =
        document.getElementById(
            "editSkills"
        );


    const profile = {

        education:
            educationInput
                ? educationInput.value.trim() || "Not set"
                : "Not set",

        location:
            locationInput
                ? locationInput.value.trim() || "Not set"
                : "Not set",

        interests:
            interestsInput
                ? interestsInput.value.trim() || "Not set"
                : "Not set",

        skills:
            skillsInput
                ? skillsInput.value.trim() || "Not set"
                : "Not set"

    };


    localStorage.setItem(
        "opportunityX_profile",
        JSON.stringify(profile)
    );


    loadDashboardProfile();

    closeEditProfile();

}


// ==================================================
// CLOSE EDIT PROFILE
// ==================================================

function closeEditProfile() {

    const modal =
        document.getElementById(
            "editProfileModal"
        );


    if (!modal) return;


    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


// ==================================================
// APPLICATION STATISTICS
// ==================================================

function loadApplicationStats() {

    const applications =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_applications"
            )
        ) || [];


    const completed =
        JSON.parse(
            localStorage.getItem(
                "opportunityX_completed"
            )
        ) || [];


    const applicationElement =
        document.getElementById(
            "dashboardApplications"
        );

    const completedElement =
        document.getElementById(
            "dashboardCompleted"
        );


    if (applicationElement) {

        applicationElement.textContent =
            applications.length;

    }


    if (completedElement) {

        completedElement.textContent =
            completed.length;

    }

}


// ==================================================
// APPLICATION TRACKER
// ==================================================


// GET TRACKER DATA

function getTrackerApplications() {

    return JSON.parse(
        localStorage.getItem(
            "opportunityX_tracker"
        )
    ) || [];

}


// OPEN TRACKER

function openApplicationTracker() {

    const modal =
        document.getElementById(
            "trackerModal"
        );


    if (!modal) {

        console.error(
            "Application Tracker modal not found."
        );

        return;

    }


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";


    loadApplicationTracker();

}


// CLOSE TRACKER

function closeApplicationTracker() {

    const modal =
        document.getElementById(
            "trackerModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


// LOAD TRACKER

function loadApplicationTracker() {

    const applications =
        getTrackerApplications();


    const list =
        document.getElementById(
            "applicationTrackerList"
        );


    const empty =
        document.getElementById(
            "trackerEmpty"
        );


    if (!list) return;


    list.innerHTML = "";


    if (applications.length === 0) {

        if (empty) {

            empty.style.display =
                "block";

        }


        updateTrackerStats(
            applications
        );


        return;

    }


    if (empty) {

        empty.style.display =
            "none";

    }


    applications.forEach(
        function (application) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "tracker-item";


            item.innerHTML = `

                <div class="tracker-item-info">

                    <h4>
                        ${escapeDashboardHTML(
                            application.title
                        )}
                    </h4>

                    <p>
                        Deadline:
                        ${escapeDashboardHTML(
                            application.deadline ||
                            "Not specified"
                        )}
                    </p>

                </div>

                <div class="tracker-item-actions">

                    <select
                        class="tracker-status"
                        data-id="${escapeDashboardHTML(
                            application.id
                        )}"
                    >

                        <option value="Saved">
                            Saved
                        </option>

                        <option value="Applied">
                            Applied
                        </option>

                        <option value="Under Review">
                            Under Review
                        </option>

                        <option value="Selected">
                            Selected
                        </option>

                        <option value="Rejected">
                            Rejected
                        </option>

                    </select>


                    <button
                        type="button"
                        class="tracker-delete"
                        data-id="${escapeDashboardHTML(
                            application.id
                        )}"
                        aria-label="Delete application"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;


            const statusSelect =
                item.querySelector(
                    ".tracker-status"
                );


            if (statusSelect) {

                statusSelect.value =
                    application.status ||
                    "Saved";


                statusSelect.addEventListener(
                    "change",
                    function () {

                        updateApplicationStatus(
                            application.id,
                            statusSelect.value
                        );

                    }
                );

            }


            const deleteButton =
                item.querySelector(
                    ".tracker-delete"
                );


            if (deleteButton) {

                deleteButton.addEventListener(
                    "click",
                    function () {

                        deleteApplicationFromTracker(
                            application.id
                        );

                    }
                );

            }


            list.appendChild(item);

        }
    );


    updateTrackerStats(
        applications
    );

}


// ADD APPLICATION

function addApplicationToTracker() {

    const opportunityInput =
        document.getElementById(
            "trackerOpportunity"
        );


    const deadlineInput =
        document.getElementById(
            "trackerDeadline"
        );


    if (
        !opportunityInput ||
        !deadlineInput
    ) {

        return;

    }


    const title =
        opportunityInput.value.trim();


    const deadline =
        deadlineInput.value;


    if (!title) {

        alert(
            "Please enter the opportunity name."
        );

        opportunityInput.focus();

        return;

    }


    const applications =
        getTrackerApplications();


    const application = {

        id:
            Date.now().toString(),

        title:
            title,

        deadline:
            deadline || "Not specified",

        status:
            "Saved"

    };


    applications.unshift(
        application
    );


    localStorage.setItem(
        "opportunityX_tracker",
        JSON.stringify(
            applications
        )
    );


    opportunityInput.value = "";

    deadlineInput.value = "";


    loadApplicationTracker();

}


// UPDATE STATUS

function updateApplicationStatus(
    applicationId,
    newStatus
) {

    const applications =
        getTrackerApplications();


    const application =
        applications.find(
            function (item) {

                return String(item.id) ===
                    String(applicationId);

            }
        );


    if (!application) return;


    application.status =
        newStatus;


    localStorage.setItem(
        "opportunityX_tracker",
        JSON.stringify(
            applications
        )
    );


    updateTrackerStats(
        applications
    );

}


// DELETE APPLICATION

function deleteApplicationFromTracker(
    applicationId
) {

    const shouldDelete =
        confirm(
            "Remove this application from your tracker?"
        );


    if (!shouldDelete) return;


    let applications =
        getTrackerApplications();


    applications =
        applications.filter(
            function (item) {

                return String(item.id) !==
                    String(applicationId);

            }
        );


    localStorage.setItem(
        "opportunityX_tracker",
        JSON.stringify(
            applications
        )
    );


    loadApplicationTracker();

}


// TRACKER STATS

function updateTrackerStats(
    applications
) {

    const total =
        applications.length;


    const applied =
        applications.filter(
            function (item) {

                return item.status ===
                    "Applied";

            }
        ).length;


    const pending =
        applications.filter(
            function (item) {

                return item.status ===
                    "Under Review";

            }
        ).length;


    const completed =
        applications.filter(
            function (item) {

                return (
                    item.status === "Selected" ||
                    item.status === "Rejected"
                );

            }
        ).length;


    const totalElement =
        document.getElementById(
            "trackerTotal"
        );

    const appliedElement =
        document.getElementById(
            "trackerApplied"
        );

    const pendingElement =
        document.getElementById(
            "trackerPending"
        );

    const completedElement =
        document.getElementById(
            "trackerCompleted"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (appliedElement) {

        appliedElement.textContent =
            applied;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }

}


// ==================================================
// EDIT PROFILE MODAL - OUTSIDE CLICK
// ==================================================

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "editProfileModal"
            );


        if (
            modal &&
            modal.classList.contains("active") &&
            event.target === modal
        ) {

            closeEditProfile();

        }

    }
);


// ==================================================
// TRACKER MODAL - OUTSIDE CLICK
// ==================================================

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "trackerModal"
            );


        if (
            modal &&
            modal.classList.contains("active") &&
            event.target === modal
        ) {

            closeApplicationTracker();

        }

    }
);


// ==================================================
// ESCAPE KEY
// ==================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            const trackerModal =
                document.getElementById(
                    "trackerModal"
                );


            const editModal =
                document.getElementById(
                    "editProfileModal"
                );


            if (
                trackerModal &&
                trackerModal.classList.contains("active")
            ) {

                closeApplicationTracker();

            }


            if (
                editModal &&
                editModal.classList.contains("active")
            ) {

                closeEditProfile();

            }

        }

    }
);


// ==================================================
// ESCAPE HTML
// ==================================================

function escapeDashboardHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}