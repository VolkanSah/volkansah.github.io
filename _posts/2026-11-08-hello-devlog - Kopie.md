---
layout: post
title: "From Click to Conversation: How Google Gemini Changes SEO"
hash: a41c7e2
tags: [seo, ai, gemini, geo]
excerpt: "AI answers are replacing the list of blue links. What that means for SEO: where AI helps, where it hurts, and what I would do about it."
---

Google now puts AI answers at the top of the results page. The AI Overviews are built on Gemini models, and they answer a question directly and cite a few sources, so the user often does not need to click anything. For years the goal of SEO was simple: get one of the ten blue links on page one. That goal still exists, but it is no longer the whole picture.

For companies, publishers and marketers this is a big shift. Below I look at what AI does well for SEO, where it hurts, what is different about Gemini, and what I would do about it.

## Where AI helps

**Routine work.** Tasks that took days now take minutes.

- **Keyword research and content planning.** Give Gemini one idea, say "vertical garden", and it returns clusters of long-tail keywords, typical user questions and related topics like hydroponics, indoor grow lights or automatic irrigation.
- **On-page optimization.** Tools like SurferSEO or MarketMuse compare your page with the top-ranking ones and suggest length, terms and structure. Doing that by hand is tedious.
- **Technical audits.** Crawlers find orphan pages, crawl budget problems or broken canonical tags quickly.

**Understanding intent.** Language models can handle a full question like "Which smartphone under 500 euros has a good camera for social media?" and see what the person actually needs. For SEO this means you write for the need behind the query, not for a keyword. Done well, that gives you better content and longer visits.

**Data and trends.** AI can go through large amounts of data and spot patterns, for example which questions your audience will probably ask next, based on forums, social media and search queries. Tools like AnswerThePublic are useful for planning.

## Where it hurts

**Zero-click searches.** This is the biggest problem. An AI Overview puts the answer at the top, and many users never visit a site.

- **Fewer clicks.** Ahrefs measured about a third fewer clicks on the top result when an AI Overview was shown. It is worst for plain fact questions like "When was the Eiffel Tower built?"
- **Parasitic is the word that comes to mind.** The AI uses publishers' content to build its answer and sends little traffic back.
- **Brand bias.** Ahrefs looked at 75,000 brands. The ones in the top quarter by web mentions got more than ten times as many AI Overview mentions as the next quarter. That is a correlation, not proof of cause, but small niche sites clearly have a harder time.
- **Ranking is not everything.** Studies disagree on how often cited pages come from outside the top 10. Ahrefs found about three quarters of AI Overview citations on top-10 pages, other analyses found many more outside. So ranking helps, but you can get cited without it.

**Quality.** Letting AI write all your content is tempting and risky. AI texts mix up facts, misread sources or make things up. They mostly repeat what already exists, with no new insight and no personal experience. Google has said it does not punish AI content as such. It punishes low-quality content made to manipulate rankings. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is the filter that decides here.

**AI crawlers and JavaScript.** Many sites load their content with JavaScript. Googlebot can render that, but the crawlers of OpenAI (GPTBot) and Anthropic (ClaudeBot) do not execute JavaScript, as a crawl study by Vercel and MERJ showed. If your content only appears after client-side rendering, those crawlers see an empty page. Server-side rendering, static generation or prerendering fix that.

## Gemini and GEO

Gemini is multimodal. It handles text, images, code, audio and video together. That changes a few things:

- **All formats count.** Alt text for images, proper video descriptions, transcripts for podcasts and structured data where it fits. I would not call these ranking factors, but they make your content easier to understand for a system that looks at more than text.
- **Visual and voice search.** Requests like "show me how to assemble this chair", with a photo attached, will become normal.

Classic SEO aimed at rankings and clicks. Generative Engine Optimization (GEO) aims at being mentioned and cited in AI answers. The metrics change with it.

| | Traditional SEO | GEO |
| :--- | :--- | :--- |
| Main goal | Top 10 ranking in the blue links | Being cited in the AI answer |
| Content focus | Keywords, backlinks | Depth, answering follow-up questions |
| Success metrics | CTR, traffic, time on page | Mention rate, brand authority |
| Technical basics | Meta tags, sitemap, robots.txt | Structured data, server-rendered HTML |
| Key skill | Link building, on-page work | Topical authority, E-E-A-T signals |

## What I would do

No need to panic. Build on a solid foundation instead of patching the problem with quick tricks.

**1. Put quality and depth first.**

- Be the best source on your topic. Do not only answer "What is vertical gardening?" but also "Which plants work?", "What mistakes do beginners make?" and "Does it pay off?". Covering the related questions makes your page more useful for an AI that has to answer several things at once.
- Use your own data and experience: surveys, case studies, real photos and videos from your projects. An AI cannot fake the first E in E-E-A-T.

**2. Get the technical basics right.**

- Use structured data (Article, Product, Organization and so on). It gives machines a short summary of what your page is about. FAQ and HowTo markup no longer produce rich results in Google, so do not add them just for that. HowTo was dropped in 2023, FAQ was limited to government and health sites in the same update.
- Use robots.txt to allow or block AI crawlers. There is also the llms.txt proposal, a Markdown file that lists your important pages for AI systems. It is not an access control like robots.txt, and Google has said it does not use it. Treat it as an optional experiment.
- Page speed and Core Web Vitals still matter, because a good experience builds trust.

**3. Build your brand.**

- Unlinked brand mentions and people searching for your brand name may become more important than classic backlinks. Get people to talk about you across the web.
- Make E-E-A-T visible: author profiles with links to social accounts and other publications, reputable sources, claims backed by data.

## What comes next

- **Entities instead of keywords.** Google understands the world in entities (people, places, concepts) and how they relate. The goal is to become the central entity in your topic.
- **More personal answers.** Google is moving toward answers that use more context about the person, like location and search history.
- **Freshness.** Current information probably matters more. The date of the last update may become a stronger signal.

## Conclusion

AI does not remove the old SEO rules, it raises the stakes. Keyword hunting and pure click optimization are not enough anymore. The winners will be the sources that are the most trustworthy and most useful in their niche.

Use AI for analysis and speed, but do not hand it the voice of your content. Algorithms are built to rate what people value most, and that is still authenticity, real expertise and real usefulness.

Cheers!

> Originally published on Blogger, 10 July 2025. Updated in November 2026: figures rechecked against their sources and outdated claims corrected (llms.txt, FAQ markup). Translated from German with AI assistance (ClaudeAi).
