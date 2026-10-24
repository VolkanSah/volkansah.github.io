---
layout: default
title: Devlog
permalink: /devlog/
---

<style>
.devlog-shell { max-width: 760px; margin-inline: auto; }

.devlog-term {
    background: #161B22; border: 1px solid #05172c; border-radius: 2px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, .5);
    margin-bottom: 2rem;
}
.term-bar { display: flex; gap: 6px; padding: 10px 14px; border-bottom: 1px solid #05172c; }
.term-bar i { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
.term-bar i:nth-child(1) { background: #FF5F56; }
.term-bar i:nth-child(2) { background: #FFBD2E; }
.term-bar i:nth-child(3) { background: #27C93F; }
.term-body { padding: 14px 18px; font-family: 'Fira Code', monospace; font-size: 13px; color: #8B949E; }
.term-body .prompt { color: #3FB950; }
.term-body .cmd { color: #C9D1D9; }
.cursor-blink { display: inline-block; width: .55em; height: 1em; background: #58A6FF; vertical-align: -2px; animation: blink 1.2s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

/* ---- commit timeline ---- */
.commits { list-style: none; padding: 0; margin: 0; position: relative; }
.commits::before { content: ""; position: absolute; left: 15px; top: 10px; bottom: 26px; width: 2px; background: #21262D; }
.commit { position: relative; padding-left: 46px; margin-bottom: 1.3rem; }
.commit-dot {
    position: absolute; left: 6px; top: 14px; width: 18px; height: 18px;
    border-radius: 50%; background: #0D1117; border: 2px solid #8B949E; z-index: 1;
    transition: border-color .2s ease, box-shadow .2s ease;
}
.commit:hover .commit-dot, .commit:focus-within .commit-dot {
    border-color: #58A6FF; box-shadow: 0 0 10px rgba(88, 166, 255, .45);
}
.commit-card {
    background: #161B22; border: 1px solid #05172c; border-radius: 2px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, .5);
    padding: 18px 22px;
    transition: transform .2s ease, border-color .2s ease;
}
.commit:hover .commit-card { transform: translateX(4px); border-color: #1F6FEB; }
.commit-meta {
    display: flex; flex-wrap: wrap; gap: .35rem 1rem; align-items: center;
    font-family: 'Fira Code', monospace; font-size: 12px; color: #8B949E; margin: 0;
}
.commit-hash { color: #A5D6FF; background: none; padding: 0; }
.commit-tag { border: 1px solid #05172c; background: #0D1117; color: #8B949E; padding: 2px 8px; border-radius: 2px; }
.commit-title { font-size: 1.3rem; margin: .55rem 0 .5rem; }
.commit-title a { color: #C9D1D9; }
.commit-title a:hover { color: #58A6FF; text-decoration: none; }
.commit-msg { color: #8B949E; margin: 0 0 .7rem; }
.commit-foot {
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'Fira Code', monospace; font-size: 12px; color: #6E7681; margin: 0;
}
.commit-foot a { color: #58A6FF; }
.commit-foot a:hover { color: #1F6FEB; text-decoration: none; }
.commit-foot .arrow { display: inline-block; transition: transform .2s ease; }
.commit-foot a:hover .arrow { transform: translateX(4px); }

@media (max-width: 576px) {
    .commit { padding-left: 34px; }
    .commits::before { left: 11px; }
    .commit-dot { left: 2px; }
}
@media (prefers-reduced-motion: reduce) {
    .commit-card, .commit-dot, .commit-foot .arrow { transition: none !important; }
    .cursor-blink { animation: none !important; }
}
</style>

<div class="devlog-shell">
    <div class="devlog-term">
        <div class="term-bar"><i></i><i></i><i></i></div>
        <div class="term-body">
            <span class="prompt">volkan@devlog:~$</span>
            <span class="cmd">git log --oneline --graph</span><span class="cursor-blink" aria-hidden="true"></span>
        </div>
    </div>

    <ol class="commits">
        {% if site.posts.size == 0 %}
        <li class="commit">
            <span class="commit-dot" aria-hidden="true"></span>
            <div class="commit-card">
                <p class="commit-msg">No commits yet &mdash; erste Datei in <code>_posts/</code> ablegen und pushen.</p>
            </div>
        </li>
        {% endif %}
        {% for post in site.posts %}
        {% assign ref = post.hash | default: post.slug %}
        <li class="commit">
            <span class="commit-dot" aria-hidden="true"></span>
            <div class="commit-card">
                <p class="commit-meta">
                    <code class="commit-hash">{{ ref | slice: 0, 7 }}</code>
                    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
                    {% for tag in post.tags %}<span class="commit-tag">{{ tag }}</span>{% endfor %}
                </p>
                <h2 class="commit-title"><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
                {% if post.excerpt %}<p class="commit-msg">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>{% endif %}
                {% assign minutes = post.content | number_of_words | divided_by: 200 | at_least: 1 %}
                <p class="commit-foot">
                    <span>~{{ minutes }} min read</span>
                    <a href="{{ post.url | relative_url }}">show commit <span class="arrow" aria-hidden="true">&rarr;</span></a>
                </p>
            </div>
        </li>
        {% endfor %}
    </ol>
</div>
