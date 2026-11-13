/* ==================================================================
   site.js — ersetzt jQuery + Bootstrap (Modal, Collapse) + Masonry
   Vanilla, ~100 Zeilen, keine Abhängigkeiten.
   ================================================================== */
(function () {
'use strict';

var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Collapse (Navbar-Toggler) ---------- */
document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toggle="collapse"]');
    if (!t) return;
    var target = document.querySelector(t.getAttribute('data-target'));
    if (!target) return;
    var open = target.classList.toggle('show');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ---------- Modal ---------- */
var current = null, backdrop = null, lastFocus = null;

function showModal(m) {
    if (current || !m) return;
    lastFocus = document.activeElement;
    backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade';
    document.body.appendChild(backdrop);

    m.style.display = 'block';
    m.removeAttribute('aria-hidden');
    m.setAttribute('aria-modal', 'true');
    document.body.classList.add('modal-open');
    void m.offsetWidth;                         /* Reflow → Transition startet */
    m.classList.add('show');
    backdrop.classList.add('show');
    m.focus();
    current = m;
}

function hideModal() {
    var m = current, b = backdrop;
    if (!m) return;
    current = null; backdrop = null;
    m.classList.remove('show');
    b.classList.remove('show');
    setTimeout(function () {
        m.style.display = 'none';
        m.setAttribute('aria-hidden', 'true');
        m.removeAttribute('aria-modal');
        b.remove();
        if (!current) document.body.classList.remove('modal-open');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, reduced ? 0 : 250);
}

document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-toggle="modal"]');
    if (open) { showModal(document.querySelector(open.getAttribute('data-target'))); return; }
    if (e.target.closest('[data-dismiss="modal"]') || e.target === current) hideModal();
});

document.addEventListener('keydown', function (e) {
    if (!current) return;
    if (e.key === 'Escape') { hideModal(); return; }
    if (e.key !== 'Tab') return;                /* simpler Focus-Trap */
    var f = current.querySelectorAll('a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === current)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ---------- Masonry (kürzeste Spalte zuerst, wie Masonry.js) ----------
   Erwartet Kinder mit CSS-Breite (.col-md-4). Aufruf: cardGrid(el) */
function cardGrid(container) {
    if (container._grid) container._grid.stop();
    container.classList.remove('grid-animate');   /* erster Layout ohne Animation */

    function layout() {
        var items = container.querySelectorAll(':scope > .col-md-4');
        if (!items.length) return;
        container.style.position = 'relative';
        items.forEach(function (it) { it.style.position = 'absolute'; });
        var iw = items[0].offsetWidth;
        if (!iw) return;
        var cols = Math.max(1, Math.round(container.clientWidth / iw));
        var heights = [], i;
        for (i = 0; i < cols; i++) heights.push(0);
        items.forEach(function (it) {
            var c = heights.indexOf(Math.min.apply(null, heights));
            it.style.left = (c * iw) + 'px';
            it.style.top = heights[c] + 'px';
            heights[c] += it.offsetHeight;
        });
        container.style.height = Math.max.apply(null, heights) + 'px';
    }

    var ro = window.ResizeObserver ? new ResizeObserver(layout) : null;
    if (ro) container.querySelectorAll(':scope > .col-md-4').forEach(function (it) { ro.observe(it); });
    window.addEventListener('resize', layout);
    container._grid = { stop: function () { if (ro) ro.disconnect(); window.removeEventListener('resize', layout); } };
    layout();
    requestAnimationFrame(function () { container.classList.add('grid-animate'); });
}
window.cardGrid = cardGrid;

})();
