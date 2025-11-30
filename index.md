---
layout: default
title: My GitHub Repositories
---

<div class="container">
    <div class="row" id="repo-list" data-masonry='{"percentPosition": true }'></div>
    
    <div class="row mt-3">
        <div class="col-12 text-center">
            <button id="prevPage" class="btn btn-secondary" onclick="loadPrevPage()" disabled>Previous</button>
            <button id="nextPage" class="btn btn-secondary" onclick="loadNextPage()" disabled>Next</button>
        </div>
    </div>
</div>

<script>
// --- Configuration and State ---
let currentPage = 1;
const perPage = 18; // Number of repositories to display per page (GitHub API limit is 100)
const githubUsername = 'volkansah'; // **IMPORTANT: Change this to your GitHub username**


// --- Main Data Fetching Function ---

/**
 * Fetches and displays GitHub repositories for the configured user and page.
 * @param {number} page - The page number to fetch.
 */
function fetchAllRepos(page = 1) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?type=owner&sort=updated&per_page=${perPage}&page=${page}`)
        .then(response => {
            // Read the 'Link' header to determine if there are next/previous pages
            const linkHeader = response.headers.get('Link');
            updatePaginationButtons(linkHeader);
            return response.json();
        })
        .then(data => {
            let repoList = document.getElementById('repo-list');
            // Clear the existing content before adding new page content
            repoList.innerHTML = '';

            // Filter out specific repositories (e.g., fork, personal site, etc.)
            let filteredData = data.filter(repo => {
                // Ensure it's not a fork and exclude the two specified repos
                return !repo.fork && 
                       repo.name !== 'volkansah.github.io' && 
                       repo.name !== 'VolkanSah';
            });

            // Iterate over filtered data and create a card/modal for each repository
            filteredData.forEach((repo, index) => {
                // We calculate a global index by combining current page and local index
                const globalIndex = (page - 1) * perPage + index; 
                let listItem = document.createElement('div');
                listItem.className = 'col-md-4'; // Bootstrap grid class for 3-column layout
                
                // HTML for the repository card and its corresponding modal
                listItem.innerHTML = `
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'No description available'}</p>
                            <button class="btn btn-primary" data-toggle="modal" data-target="#repoModal-${globalIndex}" onclick="loadReadme('${repo.full_name}', ${globalIndex})">View Details</button>
                        </div>
                    </div>
                    <div class="modal fade" id="repoModal-${globalIndex}" tabindex="-1" role="dialog" aria-labelledby="repoModalLabel-${globalIndex}" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title" id="repoModalLabel-${globalIndex}">Name: ${repo.name}</h3>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body" id="repoContent-${globalIndex}">
                                    <p>Loading README...</p>
                                </div>
                                <div class="modal-footer">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Go to Repository</a>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                repoList.appendChild(listItem);
            });

            // **SCROLL FIX IMPLEMENTATION:**
            // Scroll the window up to the start of the repository list 
            // after the new content has been loaded, solving the UX issue.
            const repoListElement = document.getElementById('repo-list');
            if (repoListElement) {
                // Use smooth behavior for a better user experience
                repoListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }


            // Reinitialize Masonry after all new items are added and images are loaded
            imagesLoaded(repoList, function() {
                new Masonry(repoList, {
                    itemSelector: '.col-md-4',
                    percentPosition: true
                });
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            let repoList = document.getElementById('repo-list');
            repoList.innerHTML = '<div class="col-12"><p class="text-danger">Error loading repositories. Check console for details.</p></div>';
        });
}


// --- Pagination Helper Functions ---

/**
 * Updates the 'Previous' and 'Next' button states based on the GitHub API 'Link' header.
 * @param {string} linkHeader - The value of the 'Link' HTTP header.
 */
function updatePaginationButtons(linkHeader) {
    const links = parseLinkHeader(linkHeader);
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    // Disable button if 'prev' or 'next' link is not present
    prevButton.disabled = !links.prev;
    nextButton.disabled = !links.next;
}

/**
 * Parses the GitHub API 'Link' header string into an object.
 * @param {string} header - The Link header string.
 * @returns {Object} An object containing 'next', 'prev', 'first', 'last' URLs if present.
 */
function parseLinkHeader(header) {
    if (!header) return {};
    const parts = header.split(',');
    const links = {};
    parts.forEach(p => {
        const section = p.split(';');
        if (section.length != 2) return;
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    });
    return links;
}

/**
 * Decrements the page number and loads the previous page.
 */
function loadPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchAllRepos(currentPage);
    }
}

/**
 * Increments the page number and loads the next page.
 */
function loadNextPage() {
    // Note: The GitHub API will return an empty array if the page is beyond the last page.
    currentPage++;
    fetchAllRepos(currentPage);
}


// --- README Content Loader (Required for Modal) ---

/**
 * Fetches the README.md content as HTML from a repository and injects it into a specific modal body.
 * @param {string} repoFullName - The full name of the repository (e.g., 'volkansah/repo-name').
 * @param {number} index - The unique index of the modal element.
 */
function loadReadme(repoFullName, index) {
    fetch(`https://api.github.com/repos/${repoFullName}/readme`, {
        // Request the README as HTML to include styling and markdown rendering
        headers: { 'Accept': 'application/vnd.github.v3.html' }
    })
        .then(response => response.text())
        .then(data => {
            
            // 1. Ensure relative image URLs work by pointing them to raw GitHub content
            // Note: This is a simplified approach; handling all asset types is complex.
            const repoUrl = `https://raw.githubusercontent.com/${repoFullName}/master/`;
            data = data.replace(/src="([^"]+)"/g, (match, p1) => {
                if (!p1.startsWith('http') && !p1.startsWith('//')) {
                    return `src="${repoUrl}${p1}"`;
                }
                return match;
            });

            // 2. Make internal anchor links (like #heading) and IDs unique to this modal
            // This prevents clicking a link in one modal from scrolling the main page 
            // or interfering with elements in other modals.
            const uniqueIdPrefix = `repoContent-${index}-`;
            
            // Replace anchor hrefs
            data = data.replace(/href="#([^"]+)"/g, `href="#${uniqueIdPrefix}$1"`);

            // Replace element IDs (including heading IDs generated by GitHub's markdown rendering)
            data = data.replace(/id="([^"]+)"/g, `id="${uniqueIdPrefix}$1"`);

            // Inject the processed HTML content into the modal body
            document.getElementById(`repoContent-${index}`).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading README:', error);
            document.getElementById(`repoContent-${index}`).innerHTML = '<p>README could not be loaded. Please check the repository settings or API limits.</p>';
        });
}


// --- Initialisation ---
// Start loading the first page of repositories when the page loads
fetchAllRepos();
</script>
