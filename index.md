---
layout: default
title: My GitHub Repositories
---

<h1 class="sr-only">GitHub Repositories — Volkan Sah</h1>

<div class="row" id="repo-list" aria-live="polite"></div>

<div class="row mt-3">
    <div class="col-12 text-center">
        <button id="prevPage" type="button" class="btn btn-secondary" disabled>Previous</button>
        <button id="nextPage" type="button" class="btn btn-secondary" disabled>Next</button>
    </div>
</div>

<script>
(function () {
'use strict';

var currentPage = 1;
var perPage = 18;
var CACHE_TTL = 3 * 60 * 1000;   /* 3 min — schont das Rate-Limit (60 req/h ohne Token) */
var cache = {};                  /* page -> { data, linkHeader, ts } */

var listEl  = document.getElementById('repo-list');
var prevBtn = document.getElementById('prevPage');
var nextBtn = document.getElementById('nextPage');

/* API-Daten nie ungefiltert in innerHTML */
function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

function renderError(msg) {
    listEl.innerHTML =
        '<div class="col-12">' +
            '<div class="card"><div class="card-body text-center">' +
                '<p class="card-text">' + esc(msg) + '</p>' +
                '<button type="button" class="btn btn-secondary" onclick="location.reload()">Retry</button>' +
            '</div></div>' +
        '</div>';
}

function parseLinkHeader(header) {
    var links = {};
    if (!header) return links;
    header.split(',').forEach(function (part) {
        var section = part.split(';');
        if (section.length !== 2) return;
        links[section[1].replace(/rel="(.*)"/, '$1').trim()] =
            section[0].replace(/[<>]/g, '').trim();
    });
    return links;
}

function updatePaginationButtons(linkHeader) {
    var links = parseLinkHeader(linkHeader);
    prevBtn.disabled = currentPage <= 1 || !links.prev;
    nextBtn.disabled = !links.next;
}

function fetchAllRepos(page) {
    var hit = cache[page];
    if (hit && Date.now() - hit.ts < CACHE_TTL) {
        renderRepos(hit.data, hit.linkHeader);
        return;
    }

    listEl.innerHTML = '<div class="col-12 text-center text-muted py-5">Loading repositories…</div>';

    fetch('https://api.github.com/users/volkansah/repos?type=owner&sort=updated&per_page=' + perPage + '&page=' + page)
        .then(function (response) {
            if (response.status === 403) {
                throw new Error('GitHub API rate limit reached — please try again in a few minutes.');
            }
            if (!response.ok) {
                throw new Error('GitHub API error ' + response.status);
            }
            var linkHeader = response.headers.get('Link');
            return response.json().then(function (data) { return { data: data, link: linkHeader }; });
        })
        .then(function (result) {
            cache[page] = { data: result.data, linkHeader: result.link, ts: Date.now() };
            renderRepos(result.data, result.link);
        })
        .catch(function (error) {
            console.error('Error:', error);
            renderError(error.message || 'Error loading repositories.');
        });
}

function renderRepos(data, linkHeader) {
    /* alte Modals entsorgen (ID-Kollisionen zwischen Seiten vermeiden) */
    document.querySelectorAll('.repo-modal-dynamic').forEach(function (el) { el.remove(); });

    var repos = data.filter(function (repo) {
        return !repo.fork &&
               repo.name !== 'volkansah.github.io' &&
               repo.name !== 'VolkanSah';
    });

    if (repos.length === 0) {
        listEl.innerHTML = '<div class="col-12 text-center text-muted py-5">No repositories on this page.</div>';
        updatePaginationButtons(linkHeader);
        return;
    }

    var cards = '', modals = document.createDocumentFragment();

    repos.forEach(function (repo, i) {
        var readme = "loadReadme('" + esc(repo.full_name) + "', " + i + ", '" + esc(repo.default_branch || 'master') + "')";

        cards +=
            '<div class="col-md-4">' +
                '<div class="card mb-4"><div class="card-body">' +
                    '<h5 class="card-title">' + esc(repo.name) + '</h5>' +
                    '<p class="card-text">' + esc(repo.description || 'No description available') + '</p>' +
                    '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#repoModal-' + i + '" onclick="' + readme + '">View Details</button>' +
                '</div></div>' +
            '</div>';

        var modal = document.createElement('div');
        modal.className = 'modal fade repo-modal-dynamic';
        modal.id = 'repoModal-' + i;
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'repoModalLabel-' + i);
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML =
            '<div class="modal-dialog modal-lg" role="document">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h3 class="modal-title" id="repoModalLabel-' + i + '">' + esc(repo.name) + '</h3>' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '</div>' +
                    '<div class="modal-body" id="repoContent-' + i + '" style="max-height:70vh;overflow-y:auto;"><p>Loading…</p></div>' +
                    '<div class="modal-footer">' +
                        '<a href="' + esc(repo.html_url) + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Go to Repository</a>' +
                        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        modals.appendChild(modal);
    });

    listEl.innerHTML = cards;
    document.body.appendChild(modals);

    /* Karten haben keine Bilder → imagesLoaded überflüssig, Masonry direkt */
    new Masonry(listEl, { itemSelector: '.col-md-4', percentPosition: true });
    updatePaginationButtons(linkHeader);
}

prevBtn.addEventListener('click', function () {
    if (currentPage > 1) fetchAllRepos(--currentPage);
});
nextBtn.addEventListener('click', function () {
    fetchAllRepos(++currentPage);
});

fetchAllRepos(currentPage);
})();
</script>
