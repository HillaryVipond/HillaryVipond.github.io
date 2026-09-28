---
layout: single
title: "Mapping the Second Industrial Revolution"
permalink: /PSE/
classes: wide
noindex: true
---


<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<style>
/* ---------------------------------------------------------------
   Beamer-style deck. One .frame per slide.
   Generated from _pages/Tasks.md -- see scratchpad/build_pse.py
   --------------------------------------------------------------- */
:root { --accent: #238B45; --ink: #1c1c1c; --muted: #8a8a8a; }

.deck { width: 100vw; margin-left: calc(50% - 50vw); padding: 0; }
.page__title { display: none; }   /* duplicates the title frame */
.page__content .deck h2,
.page__content .deck h3,
.page__content .deck h4 { border: 0; }

.frame {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 4.2vh 5vw 7vh;
  display: flex; flex-direction: column; justify-content: flex-start;
  position: relative; background: #fff;
  border-bottom: 1px solid #ececec;
  scroll-snap-align: start;
  overflow-x: auto;
}

.frame > h2:first-of-type,
.frame > h3:first-of-type,
.fig-flow > h2:first-of-type,
.fig-flow > h3:first-of-type,
.frame__title {
  font-size: 1.62rem; font-weight: 700; color: var(--ink);
  letter-spacing: -0.01em; margin: 0 0 4px 0; padding: 0 0 10px 0; line-height: 1.25;
}
.frame > h2:first-of-type::after,
.frame > h3:first-of-type::after,
.fig-flow > h2:first-of-type::after,
.fig-flow > h3:first-of-type::after,
.frame__title::after {
  content: ""; display: block; width: 100%; height: 2px;
  background: var(--accent); margin-top: 10px;
}
.frame > h4 { font-size: 1rem; font-weight: 600; color: #444; margin: 2px 0 10px; }

.frame__body { flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center; }
.frame__body > p { font-size: 0.95rem; line-height: 1.55; max-width: 1000px; }
.fig-flow { width: 100%; }
/* space between the drill-down controls and the chart they drive */
.deck #treemap, .deck #mech-legend { margin-top: 16px; }
.deck #treemap-time { margin-top: 34px; }
/* .frame__body is a flex column, so its direct children stretch to the full
   frame width. That turned the ported control buttons into full-width bars.
   Keep interactive controls at their natural size, as on the website. */
.frame__body > button,
.frame__body > select,
.frame__body > label,
.frame__body > span   { align-self: flex-start; }

.frame__num  { position: absolute; right: 5vw; bottom: 2.4vh; font-size: 12px; color: var(--muted); letter-spacing: .04em; }

.frame--title, .frame--section { justify-content: center; }
.frame--title h1 { font-size: 2.9rem; font-weight: 700; line-height: 1.15; margin: 0 0 14px; color: var(--ink); letter-spacing: -0.02em; }
.frame--title .sub  { font-size: 1.25rem; color: #555; margin-bottom: 34px; }
.frame--title .who  { font-size: 1.05rem; color: #333; }
.frame--title .rule { width: 90px; height: 3px; background: var(--accent); margin: 0 0 30px; }

.frame--section .kicker { font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); font-weight: 700; margin-bottom: 12px; }
.frame--section h2 { font-size: 2.3rem; margin: 0; border: 0; padding: 0; }
.frame--section .blocklab { font-size: 1.32rem; color: #9a9a9a; margin-top: 14px; letter-spacing: .01em; }
.frame--section h2::after { display: none; }

/* a frame that needs more than one screen: roughly two slides tall */
.frame--tall { min-height: 195vh; }
/* the ported figures cap their container at the width of the original
   article column (760px, 920px...), which no frame height can undo.
   On a tall frame let the chart have the whole width. */
.frame--tall .fig-flow > div    { max-width: none !important; }
.frame--tall .frame__body > p   { max-width: 1100px; }
/* free-flowing: no fixed height, no divider, so a run of these reads as
   one continuous page rather than a sequence of slides */
.frame--free { min-height: auto; padding-top: 3vh; padding-bottom: 5vh;
               border-bottom: 0; scroll-snap-align: none; }
.frame--free .frame__num { display: none; }

.frame--todo { background: #fffdf5; }
.frame--todo .box { border: 1px dashed #d8c48a; background: #fffbe9; color: #7a5c00; padding: 22px 26px; border-radius: 4px; max-width: 760px; line-height: 1.6; }

#deck-bar {
  position: fixed; right: 18px; bottom: 16px; z-index: 900;
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.94); border: 1px solid #e0e0e0;
  border-radius: 22px; padding: 5px 8px; box-shadow: 0 2px 10px rgba(0,0,0,.08); font-size: 13px;
}
#deck-bar button { border: 0; background: none; cursor: pointer; font-size: 19px; color: #444; padding: 2px 14px; border-radius: 14px; line-height: 1.4; }
#deck-next { padding: 2px 34px; }
#deck-prev { padding: 2px 20px; }
#deck-bar button:hover { background: #f0f0f0; }
#deck-count { color: #555; font-variant-numeric: tabular-nums; padding: 0 10px; font-size: 19px; font-weight: 700; }

body.present .masthead,
body.present .page__footer,
body.present .page__title,
body.present .breadcrumbs { display: none !important; }
body.present .page__content { padding-top: 0 !important; }

@media (max-width: 760px) { .frame { min-height: auto; padding: 30px 20px 54px; } }
@media print { #deck-bar { display: none; } .frame { page-break-after: always; min-height: auto; border: 0; } }
</style>

<div id="deck-bar">
  <button id="deck-prev" title="Previous frame (left arrow)">&lsaquo;</button>
  <span id="deck-count">1 / 1</span>
  <button id="deck-next" title="Next frame (right arrow or space)">&rsaquo;</button>
</div>

<div class="deck">

<section class="frame frame--title">
  <div class="rule"></div>
  <h1>Mapping the 2nd Industrial Revolution</h1>
  <div class="sub">The Emergence of New Jobs in 19th-Century Britain</div>
  <div class="who">H.&thinsp;G. Vipond<br><span style="color:#777;">Complexity Science Hub</span></div>
</section>

<section class="frame">
  <div class="in-kicker">Introduction</div>
  <h3>Introduction</h3>
  <div class="frame__body">
    <div class="in-split">
      <ul class="in-list">
        <li>19th Century: rapid technological change</li>
        <li>Creative destruction: destroyed jobs, created new jobs
            <span class="in-cite">(Acemoglu &amp; Restrepo 2019)</span></li>
        <li>New Jobs: have been vital
            <span class="in-cite">(Autor et al, 2025; Kalyani et al 2025)</span></li>
        <li>60% of the jobs that employ Americans today did not exist in the 1950s.</li>
      </ul>
      <figure class="in-fig">
        <img src="/assets/images/Tesla.jpg" alt="Tesla's magnifying transmitter generating millions of volts">
        <figcaption>Tesla and his &ldquo;magnifying transmitter&rdquo;, generating millions of volts.</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">Introduction</div>
  <h3>This Paper: Map Emergence of New Jobs in 2nd IR</h3>
  <div class="frame__body">
    <ol class="in-num">
      <li><strong>Aim:</strong> Understand how and where job creation mapped on to job loss</li>
      <li><strong>Problem:</strong> No systematic quantitative record of job creation and loss in
          Victorian Britain</li>
      <li><strong>Solution:</strong> Generate &ldquo;micro-occupation&rdquo; data.
          800 industries &rarr; 10,000 micro-occupations.</li>
      <li><strong>Quantify:</strong> new and declining occupations in Britain 1851&ndash;1921</li>
    </ol>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">History</div>
  <h3>History: 2nd Industrial Revolution</h3>
  <div class="frame__body">
    <div class="in-split">
      <ul class="in-list">
        <li><strong>1851:</strong> Crystal Palace &mdash; Workshop of the World</li>
        <li><strong>1870s:</strong> Britain &mdash; shift to a new phase of industrialization.</li>
        <li>Traditional crafts sectors start declining</li>
        <li>Vast numbers of new jobs emerging: electricians, engineers, railway workers</li>
      </ul>
      <figure class="in-fig">
        <img src="/assets/images/CrystalPalace.jpg" alt="The Great Exhibition at the Crystal Palace, 1851">
        <figcaption>The Crystal Palace, 1851.</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">History</div>
  <h3>History: British Census</h3>
  <div class="frame__body">
    <div class="in-split">
      <ul class="in-list">
        <li><strong>1753 Thomas Potter:</strong> bill introduced to Parliament. Army, emigration to
            the colonies, burden of the poor law. Population growth.</li>
        <li><strong>1801&ndash;1831:</strong> Parish (township) register aggregates</li>
        <li><strong>1841&ndash;1921:</strong> Individual Level</li>
      </ul>
      <figure class="in-fig in-fig--narrow">
        <img src="/assets/images/Census1851.jpg" alt="Title page of the Census of Great Britain, 1851">
      </figure>
    </div>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">History</div>
  <h3>History: British Census Classification Schema</h3>
  <div class="frame__body">
    <div class="in-split">
      <ul class="in-list">
        <li><strong>1841:</strong> First individual level census</li>
        <li><strong>1851:</strong> 18 orders, 90 sub-orders</li>
        <li><strong>1861:</strong> &ldquo;The classification of 1851 has been entirely revised&rdquo;.
            Dress goes from Services to Textiles. Animal/Vegetable matter go.</li>
        <li><strong>By 1901:</strong> 23 Orders, substantial changes in sub-orders</li>
      </ul>
      <figure class="in-fig">
        <img src="/assets/images/CensusClassification.jpg" alt="Census table showing the occupancy of classes of persons">
      </figure>
    </div>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">Data</div>
  <h3>Data: The Integrated Census Microdata Project (ICeM)</h3>
  <div class="frame__body">
    <ul class="in-list in-list--wide">
      <li>Decennial English census data from 1851 to 1921 (excluding 1871)</li>
      <li>220 million individual level census records, digitized</li>
      <li>Occupation: at industry level</li>
    </ul>
    <figure class="in-fig in-fig--full">
      <img src="/assets/images/Census.jpg" alt="A page from a census enumerator's book">
    </figure>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">Data &middot; Task Data</div>
  <h3>Data Construction 1: &ldquo;Task&rdquo; Occupation</h3>
  <div class="frame__body">
    <table class="in-table">
      <thead>
        <tr>
          <th>Industry Code</th>
          <th>Occupation &mdash; Original Strings</th>
          <th>New Variable: &ldquo;Task&rdquo;</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>663 (Bootmaker)</td><td>CORDWAINER</td><td>Cordwainer</td></tr>
        <tr><td>663 (Bootmaker)</td><td>BOOT &amp; SHOE MAKER</td><td>Maker</td></tr>
        <tr><td>663 (Bootmaker)</td><td>BOOT AND SHOE BINDER</td><td>Binder</td></tr>
        <tr><td>663 (Bootmaker)</td><td>BOOT &amp; SHOE RIVETTER</td><td>Rivetter</td></tr>
        <tr><td>663 (Bootmaker)</td><td>SEWING MACHINIST</td><td>Sewing Machinist</td></tr>
      </tbody>
    </table>
    <p class="in-note">
      The table shows examples of original occupation strings from Census records and their
      corresponding new variable &ldquo;Task&rdquo;. I assign 97% of them to &ldquo;Task&rdquo;.
    </p>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">Data &middot; Task Data</div>
  <h3>Data Construction 1: &ldquo;Task&rdquo; Occupation</h3>
  <div class="frame__body">
    <p class="in-lead">Every spelling of <strong>tailor</strong> found in the census strings:</p>
    <div class="in-strings">
      &hellip;tailor', 'failor', 'tailar', 'tailaress', 'tailer', 'taileres', 'taileress',
      'tailering', 'tailers', 'taillor', 'tailloress', 'tailor', "tailor's", 'tailor(journeyman',
      'tailor(master', 'tailor,', 'tailor-', 'tailor-maker', 'tailor&hellip;', 'tailor:', 'tailore',
      "tailore's", "tailore'ss", 'tailorees', 'tailorefs', 'tailorer', 'tailorers', 'tailorerss',
      'tailores', "tailores's", 'tailoress', "tailoress's", 'tailoress-', 'tailoress&hellip;',
      'tailoresse', 'tailoresses', 'tailoresss', 'tailorest', 'tailories', 'tailoriess',
      'tailoring', 'tailorings', 'tailoris', 'tailoriss', 'tailorist', 'tailorists', 'tailormaker',
      'tailorman', 'tailorness', 'tailorous', 'tailorress', 'tailors', 'tailors&hellip;', 'tailorss',
      'tailory', 'tailorys', 'tailoting', 'tailour', 'tailouress', 'tailours', 'tailress',
      'tailroess', 'taioleress', 'tairloress', 'taitor', 'taitoress', 'talior', 'talioress',
      'tallor', 'talloress', 'talloring', 'talor', 'talores', 'taloress', 'taloring', 'tayler',
      'tayleress', 'taylor', "taylor's", 'taylores', 'tayloress', 'taylorest', 'tayloring',
      'tayloris', 'tayloriss', 'taylorist', 'taylors', 'tialor', 'tialoress', 'tilloter', 'tailess'
    </div>
  </div>
</section>

<section class="frame">
  <div class="in-kicker">Data &middot; Task Data</div>
  <h3>Data Construction 2: Census Linking</h3>
  <div class="frame__body">
    <ul class="in-list in-list--wide">
      <li><strong>Context:</strong> Census linking is indispensable</li>
      <li><strong>Concern:</strong> False positives pose threat to inference:
        <ol class="in-sub">
          <li>Migration: O'Grada et al. (2025), 68&ndash;77% vs 14%</li>
          <li>Occupation: Helgertz et al. (2023)</li>
        </ol>
      </li>
      <li><strong>Problem:</strong> Without ground truth, how to check?</li>
      <li><strong>Solution:</strong> Leverage statistical regularities of false matches:
          <em>litmus test</em></li>
    </ul>
  </div>
</section>

<style>
  /* intro frames, ported from the Beamer deck */
  .in-kicker {
    font-size:.72rem; letter-spacing:.14em; text-transform:uppercase;
    color:#9a9a9a; font-weight:700; margin-bottom:6px;
  }
  .in-split { display:flex; gap:44px; align-items:center; flex-wrap:wrap; }
  .in-split > .in-list { flex:1 1 400px; min-width:300px; }
  .in-split > .in-fig  { flex:0 1 480px; min-width:260px; }
  .in-fig { margin:0 auto; width:fit-content; max-width:100%; }
  /* as large as the space allows, but capped against the viewport so a frame
     can never grow past one screen */
  .in-fig img {
    width:100%; height:auto; display:block; border-radius:2px;
  }
  /* the 1851 title page is only 180px wide in the source deck, so this is a
     deliberate upscale and it will look soft -- a better scan would fix it */
  .in-fig--narrow { flex:0 1 430px !important; }

  .in-fig--full { margin:20px 0 0; max-width:100%; }
  .in-fig--full { max-width:1000px; }
  .in-fig figcaption { font-size:.78rem; color:#999; margin-top:8px; line-height:1.45; text-align:center; }

  .in-list, .in-num { margin:0; padding-left:0; list-style:none; }
  .in-list li, .in-num li {
    position:relative; padding-left:26px; margin-bottom:16px;
    font-size:1.12rem; line-height:1.55; color:#2b2b2b;
  }
  .in-list--wide li { font-size:1.18rem; }
  .in-list > li::before {
    content:"\25B8"; position:absolute; left:2px; top:0; color:#238B45; font-size:1rem;
  }
  .in-num { counter-reset:inum; }
  .in-num > li { counter-increment:inum; padding-left:34px; }
  .in-num > li::before {
    content:counter(inum) "."; position:absolute; left:0; top:0;
    color:#238B45; font-weight:700;
  }
  .in-sub { margin:10px 0 0 0; padding-left:20px; }
  .in-sub li { font-size:1rem; margin-bottom:6px; color:#444; padding-left:4px; }
  .in-sub li::before { content:none; }
  .in-cite { color:#888; font-size:.92em; }

  .in-table { border-collapse:collapse; font-size:1rem; max-width:1000px; }
  .in-table th {
    text-align:left; font-weight:700; color:#222; padding:9px 26px 9px 0;
    border-bottom:2px solid #238B45;
  }
  .in-table td { padding:9px 26px 9px 0; border-bottom:1px solid #eee; color:#333; }
  .in-table td:nth-child(2) { font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:.92em; }
  .in-note { font-size:.85rem; color:#888; margin-top:16px; max-width:900px; line-height:1.6; }
  .in-lead { font-size:1.05rem; color:#444; margin:0 0 14px; }
  .in-strings {
    font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:.86rem; line-height:1.85; color:#444; background:#fafafa;
    border-left:3px solid #e0e0e0; padding:18px 22px; max-width:1050px;
    word-spacing:.05em;
  }
  @media (max-width:760px){
    .in-split { gap:22px; }
    .in-list li, .in-num li { font-size:1rem; }
  }
</style>


<section class="frame frame--section">
  <h2>Descriptive Evidence</h2>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Descriptive Evidence</div>
<h2>1. Occupational Orders over Time</h2>

<div style="margin-bottom: 1em;">
  <button onclick="loadYear(1851)">1851</button>
  <button onclick="loadYear(1861)">1861</button>
  <button onclick="loadYear(1881)">1881</button>
  <button onclick="loadYear(1891)">1891</button>
  <button onclick="loadYear(1901)">1901</button>
  <button onclick="loadYear(1911)">1911</button>
</div>

<div id="treemap-time"></div>

<script>
(function(){
  const width = 960;
  const height = 600;

  // Calm, professional palette: an even hue spread (so Orders stay distinguishable),
  // but desaturated and lightened to a soft pastel — and dark labels rather than white.
  const ORDERS = ["Agriculture","Brick","Building","Chemicals","Commerce","Conveyancing","Defence","Domestic","Dress","Fishing","Food","Gas and Electric","General","Government","Leather","Machines","Mining","Paper","Precious Metals","Professions","Textiles","Wood"];
  const color = d3.scaleOrdinal(ORDERS, ORDERS.map((_, i) => {
    const c = d3.hsl(d3.interpolateRainbow((i / ORDERS.length) * 0.92 + 0.02));
    c.s *= 0.42;   // mute saturation
    c.l = 0.74;    // soft, pastel lightness
    return c.formatHex();
  }));

  const svg = d3.select("#treemap-time")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font-family", "sans-serif")
    .style("font-size", "14px");

  const fmt = d3.format(",");
  const tip = d3.select("body").append("div")
    .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
    .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
    .style("border-radius","5px").style("font-size","13px").style("box-shadow","0 2px 6px rgba(0,0,0,.2)");

  // Load a year's JSON and render the treemap
  window.loadYear = function(year) {
    d3.json(`/assets/data/orders_${year}.json`).then(data => {
      const root = d3.hierarchy(data)
        .sum(d => d.size || 0)
        .sort((a, b) => b.value - a.value);

      d3.treemap().size([width, height]).paddingInner(2)(root);

      svg.selectAll("*").remove();

      const nodes = svg.selectAll("g")
        .data(root.children)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

      nodes.append("rect")
        .attr("width",  d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.data.name))
        .on("mouseover", function(event, d){ tip.style("visibility","visible").html(`<strong>${d.data.name}</strong><br>${fmt(d.value)} workers`); })
        .on("mousemove", event => tip.style("left",(event.pageX+12)+"px").style("top",(event.pageY-10)+"px"))
        .on("mouseout", () => tip.style("visibility","hidden"));

      // label only where it fits; otherwise it's available on hover
      nodes.append("text")
        .attr("x", 5).attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", "#333").style("font-weight", "600").style("pointer-events", "none")
        .each(function(d){
          const pad = 6;
          if ((d.y1 - d.y0) < 18 || this.getComputedTextLength() > (d.x1 - d.x0) - pad) d3.select(this).remove();
        });

    }).catch(err => console.error("Error loading JSON:", err));
  };

  // Default load on page ready
  document.addEventListener("DOMContentLoaded", () => loadYear(1851), { once: true });
})();
</script>
</div>
</div>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Descriptive Evidence</div>
<h3>2. Orders ranked by growth, 1851–1911</h3>
<p>Showing the growth in different sectors of the economy over the period. Sectors shown in blue are growing more rapidly than average population growth.</p>

<div id="growth-chart" style="margin-top: 2em;"></div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function() {
    const width  = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 50, left: 150 };

    d3.csv("/assets/data/Orders.csv", d3.autoType).then(data => {
      const allOrders = data.sort((a, b) =>
        d3.descending(a.fold_growth_1851_1911, b.fold_growth_1851_1911));

      const svg = d3.select("#growth-chart").append("svg")
        .attr("width", width).attr("height", height)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const innerW = width  - margin.left - margin.right;
      const innerH = height - margin.top  - margin.bottom;

      const x = d3.scaleLinear()
        .domain([0, d3.max(allOrders, d => d.fold_growth_1851_1911)]).nice()
        .range([0, innerW]);

      const y = d3.scaleBand()
        .domain(allOrders.map(d => d.order))
        .range([0, innerH]).padding(0.2);

      svg.append("g").call(d3.axisLeft(y).tickSize(0))
        .selectAll("text").style("font-size", "13px");

      svg.append("g").attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(x).tickValues([2, 4, 6, 8, 10]))
        .selectAll("text").style("font-size", "12px");

      svg.append("text")
        .attr("x", innerW / 2).attr("y", innerH + 40)
        .attr("text-anchor", "middle").style("font-size", "12px").style("fill", "#333")
        .text("Fold growth");

      // Blue = above population growth threshold (2×), orange = below
      const colorFn = d => d.fold_growth_1851_1911 >= 2 ? "#6BAED6" : "#FD8D3C";

      const bars = svg.selectAll(".bar").data(allOrders).join("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.order)).attr("height", y.bandwidth())
        .attr("x", 0).attr("width", d => x(d.fold_growth_1851_1911))
        .attr("fill", colorFn);

      const tooltip = d3.select("body").append("div")
        .style("position", "absolute").style("background", "white")
        .style("border", "1px solid #ccc").style("padding", "8px 12px")
        .style("border-radius", "5px").style("pointer-events", "none")
        .style("font-size", "14px").style("visibility", "hidden")
        .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)");

      bars.on("mouseover", function(event, d) {
          tooltip.style("visibility", "visible")
            .text(`${d.order}: ${d.fold_growth_1851_1911.toFixed(2)}×`);
          d3.select(this).attr("fill", "#3182BD");
        })
        .on("mousemove", event => {
          tooltip.style("left", (event.pageX + 10) + "px")
                 .style("top",  (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
          tooltip.style("visibility", "hidden");
          d3.select(this).attr("fill", colorFn(d));
        });
    });
  }, { once: true });
})();
</script>
</div>
</div>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Descriptive Evidence</div>
<h2>3. Occupational Industries: Growth and Decline</h2>
<p>Showing growth by industry over the period. Note that the extreme outliers are primarily in industries which were very small or non-existent in 1851.</p>

<div id="scatterplot"></div>

<div style="display:flex;gap:24px;align-items:center;margin-top:12px;font-size:0.92em;">
  <span style="display:inline-flex;align-items:center;gap:7px;">
    <span style="width:13px;height:13px;border-radius:50%;background:#238B45;display:inline-block;"></span>
    New occupations (new to the 19th century)
  </span>
  <span style="display:inline-flex;align-items:center;gap:7px;">
    <span style="width:13px;height:13px;border-radius:50%;background:#fff;border:1.5px solid #6BAED6;display:inline-block;"></span>
    Established occupations
  </span>
</div>

<h4 style="margin-top: 1em;">
  Population doubled over the period: any industry growing more than 100% outpaced population growth, industries which grew less lagged.
</h4>

<div style="display:flex;gap:10px;margin-top:1em;">
  <button onclick="showThreshold()" style="padding:6px 12px;font-size:14px;">Show Population Threshold</button>
  <button onclick="toggleZoom()"    style="padding:6px 12px;font-size:14px;">Toggle Zoom to 0–10 Fold Growth</button>
</div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function() {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width  = 960 - margin.left - margin.right;
    const height = 500 - margin.top  - margin.bottom;

    const svg = d3.select("#scatterplot").append("svg")
      .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])
      .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select("body").append("div")
      .style("position", "absolute").style("background", "white")
      .style("border", "1px solid #ccc").style("padding", "8px 12px")
      .style("border-radius", "5px").style("pointer-events", "none")
      .style("font-size", "15px").style("font-weight", "bold")
      .style("visibility", "hidden")
      .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)");

    Promise.all([
      d3.csv("/assets/data/Industry.csv", d3.autoType),
      d3.csv("/assets/data/occode_names.csv?v=2")
    ]).then(([data, names]) => {
      // occode -> occupation (Level3) name lookup, for the hover tooltip
      const nameByOccode = new Map(names.map(n => [String(n.occode), n.occ_name]));

      // occodes flagged as new-to-the-19th-century: filled green; the rest hollow
      const newOccodes  = new Set(names.filter(n => +n.is_new === 1).map(n => String(n.occode)));
      const isNew       = d => newOccodes.has(String(d.occode));
      const NEW_FILL    = "#238B45";   // dark green from "Change in Number of New Tasks"
      const OLD_OUTLINE = "#6BAED6";   // blue outline for established occupations

      data = data.filter(d => d.fold_growth != null && !isNaN(d.fold_growth));

      const x = d3.scaleLog()
        .domain(d3.extent(data, d => d.final_size).map(d => d > 0 ? d : 1))
        .nice().range([0, width]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.fold_growth)).nice()
        .range([height, 0]);

      // Stash globally so zoom/threshold buttons can access them
      window._scatter_x    = x;
      window._scatter_y    = y;
      window._scatter_svg  = svg;
      window._scatter_data = data;

      svg.append("g").attr("transform", `translate(0,${height})`)
        .attr("class", "x-axis").call(d3.axisBottom(x).ticks(10, "~s"));

      svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

      svg.append("text").attr("x", width / 2).attr("y", height + 40)
        .attr("text-anchor", "middle").text("Log of Final Size of Industry");

      svg.append("text").attr("transform", "rotate(-90)")
        .attr("x", -height / 2).attr("y", -45)
        .attr("text-anchor", "middle").text("Fold Increase (1851–1911)");

      // Population-doubling reference line (hidden until button clicked)
      svg.append("line").attr("class", "threshold-line")
        .attr("x1", 0).attr("x2", width)
        .attr("y1", y(2)).attr("y2", y(2))
        .attr("stroke", "grey").attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "5,5").style("visibility", "hidden");

      svg.append("text").attr("class", "threshold-text")
        .attr("x", width - 10).attr("y", y(2) - 6)
        .attr("text-anchor", "end").style("fill", "grey")
        .style("font-size", "12px").style("visibility", "hidden")
        .text("Population doubled");

      svg.selectAll("circle").data(data).join("circle")
        .attr("cx", d => x(d.final_size))
        .attr("cy", d => y(d.fold_growth))
        .attr("r", 6)
        .attr("fill",         d => isNew(d) ? NEW_FILL : "none")
        .attr("stroke",       d => isNew(d) ? "none" : OLD_OUTLINE)
        .attr("stroke-width", 1.5)
        .attr("pointer-events", "all")   // make the whole disc hoverable, even when fill is none
        .on("mouseover", function(event, d) {
          // Show the occode (Level3 occupation) name on every dot
          const label = nameByOccode.get(String(d.occode)) || `Occ ${d.occode}`;
          tooltip.style("visibility", "visible").text(label);
          d3.select(this).attr("stroke", "black").attr("stroke-width", 1.5);
        })
        .on("mousemove", event => {
          tooltip.style("left", (event.pageX + 10) + "px")
                 .style("top",  (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
          tooltip.style("visibility", "hidden");
          d3.select(this)
            .attr("stroke", isNew(d) ? "none" : OLD_OUTLINE)
            .attr("stroke-width", 1.5);
        });
    });

    // Show population-doubling line
    window.showThreshold = function() {
      d3.selectAll(".threshold-line").style("visibility", "visible");
      d3.selectAll(".threshold-text").style("visibility", "visible");
    };

    // Toggle y-axis zoom between full range and 0–10×
    let zoomed = false;
    window.toggleZoom = function() {
      const y    = window._scatter_y;
      const svg  = window._scatter_svg;
      const data = window._scatter_data;

      y.domain(zoomed ? d3.extent(data, d => d.fold_growth) : [0, 10]);
      zoomed = !zoomed;

      svg.select(".y-axis").transition().duration(750).call(d3.axisLeft(y));
      svg.selectAll("circle").transition().duration(750).attr("cy", d => y(d.fold_growth));
      svg.selectAll(".threshold-line").transition().duration(750).attr("y1", y(2)).attr("y2", y(2));
      svg.selectAll(".threshold-text").transition().duration(750).attr("y", y(2) - 6);
    };

  }, { once: true });
})();
</script>
</div>
</div>
</section>


<section class="frame frame--tall">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Descriptive Evidence</div>
<h2>4. Micro-Occupations: Growth and Decline</h2>

<p>Each industry is itself made up of many different jobs: micro-occupations. In moving one level deeper, we can see the distinct occupations within each industry. This makes it possible to track how they grew and declined over the 2nd Industrial Revolution.</p>

<p style="font-size:0.9em;color:#666;margin-top:-0.4em;">Click the <strong>Dress</strong> order to open it up, then click a highlighted occupation to see how its tasks changed over time. Click the background to step back out.</p>

<button id="treemap-back" style="display:none;margin:0 0 10px;padding:5px 12px;font-size:13px;cursor:pointer;">← Back to all orders</button>
<button id="treemap-mech" style="display:none;margin:0 0 10px 6px;padding:5px 12px;font-size:13px;cursor:pointer;">Shade by mechanization</button>
<div id="mech-legend" style="display:none;margin:0 0 8px;"></div>

<div id="treemap"></div>

<!-- Lightbox overlay for task charts -->
<div id="chart-lightbox" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:24px;">
  <div style="position:relative;background:#fff;border-radius:8px;padding:16px 16px 12px;max-width:92vw;max-height:90vh;box-shadow:0 8px 30px rgba(0,0,0,0.35);">
    <button id="chart-lightbox-close" aria-label="Close" style="position:absolute;top:4px;right:12px;border:none;background:none;font-size:28px;line-height:1;cursor:pointer;color:#888;">&times;</button>
    <h3 id="chart-lightbox-title" style="margin:0 28px 10px 0;font-size:1.05em;"></h3>
    <img id="chart-lightbox-img" src="" alt="" style="max-width:88vw;max-height:78vh;object-fit:contain;display:block;">
  </div>
</div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function() {
    const W = 960, H = 600;
    const GREY = "#dcdcdc", HILITE = "#6BAED6";   // grey = inactive, blue = highlighted / clickable

    const svg = d3.select("#treemap").append("svg")
      .attr("viewBox", [0, 0, W, H])
      .style("font-family", "sans-serif").style("font-size", "13px");
    const g = svg.append("g");

    const backBtn   = document.getElementById("treemap-back");
    const lbox      = document.getElementById("chart-lightbox");
    const lboxImg   = document.getElementById("chart-lightbox-img");
    const lboxTitle = document.getElementById("chart-lightbox-title");

    function closeLightbox(){ lbox.style.display = "none"; lboxImg.removeAttribute("src"); }
    document.getElementById("chart-lightbox-close").onclick = closeLightbox;
    lbox.addEventListener("click", e => { if (e.target === lbox) closeLightbox(); });        // click backdrop
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); }); // Esc to close

    // Larger styled hover tooltip (replaces the tiny native browser tooltip)
    const tooltip = d3.select("body").append("div")
      .style("position","absolute").style("background","white")
      .style("border","1px solid #ccc").style("padding","8px 12px")
      .style("border-radius","5px").style("pointer-events","none")
      .style("font-size","15px").style("font-weight","bold")
      .style("max-width","340px").style("line-height","1.35")
      .style("visibility","hidden").style("box-shadow","0 2px 6px rgba(0,0,0,0.2)");

    d3.json("/assets/data/dress_micro.json?v=2").then(rootData => {
      // View A: all orders (Dress highlighted, sized by 1911)
      const ordersRoot = d3.hierarchy(rootData).sum(d => d.size || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(2)(ordersRoot);

      // View B: Dress expanded to fill the whole box
      const dressData = rootData.children.find(c => c.name === "Dress");
      const dressRoot = d3.hierarchy(dressData).sum(d => d.size || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(2)(dressRoot);

      // --- mechanization shading (toggle, only in the Dress view) ---
      const mechBtn = document.getElementById("treemap-mech");
      const mechMax = d3.max(dressRoot.children, d => d.data.mech || 0) || 1;
      const mechColor = d3.scaleSequential(d3.interpolateOranges).domain([0, mechMax]);
      let mechMode = false;
      mechBtn.onclick = () => { mechMode = !mechMode; drawDress(); };
      function drawMechLegend(){
        const el = document.getElementById("mech-legend");
        if (!mechMode){ el.style.display = "none"; el.innerHTML = ""; return; }
        const n = 28, w = 240, h = 12; let bars = "";
        for (let i = 0; i < n; i++) bars += `<rect x="${(i*w/n).toFixed(1)}" y="0" width="${(w/n+0.6).toFixed(1)}" height="${h}" fill="${mechColor(i/(n-1)*mechMax)}"/>`;
        el.style.display = "block";
        el.innerHTML = `<span style="font-size:12px;color:#444;margin-right:8px;">Share of workers doing machine work in 1911</span><svg width="${w}" height="${h}" style="vertical-align:middle;border:1px solid #ddd;">${bars}</svg> <span style="font-size:11px;color:#666;margin-left:6px;">0% &ndash; ${Math.round(mechMax*100)}%</span>`;
      }

      backBtn.onclick = drawOrders;
      drawOrders();

      function clearImage(){ closeLightbox(); }

      // Word-wrap a string to a given character width; null if any word can't fit.
      function wrapText(str, maxChars){
        const words = String(str).split(/\s+/);
        if (words.some(w => w.length > maxChars)) return null;
        const lines = []; let line = "";
        for (const word of words){
          const test = line ? line + " " + word : word;
          if (test.length <= maxChars) line = test;
          else { lines.push(line); line = word; }
        }
        if (line) lines.push(line);
        return lines;
      }

      // Show getFull(d) word-wrapped if it fits the box; else show getShort(d)
      // (e.g. the occode) if that fits; else leave blank and rely on the tooltip.
      // Records d._full = true when the box shows its full name inline.
      function drawLabel(textSel, getFull, getShort){
        textSel.each(function(d){
          const self = d3.select(this); self.text(null);
          d._full = false;
          const w = d.x1 - d.x0, h = d.y1 - d.y0;
          const lineH = 13, padX = 5;
          const maxChars = Math.floor((w - padX*2) / 7.3);
          const maxLines = Math.floor((h - 4) / lineH);
          if (maxChars < 2 || maxLines < 1) return;                 // too small for any text
          const lines = wrapText(getFull(d), maxChars);
          if (lines && lines.length <= maxLines){
            lines.forEach((ln,i) => self.append("tspan").attr("x", padX).attr("y", 15 + i*lineH).text(ln));
            d._full = true;
            return;
          }
          const short = getShort ? getShort(d) : null;              // fallback: occode only
          if (short && short.length <= maxChars){
            self.append("tspan").attr("x", padX).attr("y", 15).text(short);
          }
        });
      }

      // Larger hover tooltip — only for boxes that aren't already showing their full name.
      function addTip(node, getText){
        node
          .on("mouseover", function(e,d){ if (d._full && !mechMode) return; tooltip.style("visibility","visible").text(getText(d)); d3.select(this).select("rect").attr("stroke","#333"); })
          .on("mousemove", function(e,d){ if (d._full && !mechMode) return; tooltip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"); })
          .on("mouseout", function(){ tooltip.style("visibility","hidden"); d3.select(this).select("rect").attr("stroke","#fff"); });
      }

      // --- View A: all orders ---
      function drawOrders(){
        clearImage(); backBtn.style.display="none"; svg.on("click", null);
        mechMode = false; mechBtn.style.display="none"; drawMechLegend();
        g.selectAll("*").remove();
        const node = g.selectAll("g").data(ordersRoot.children).join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .style("cursor", d => d.data.name==="Dress" ? "pointer" : "default")
          .on("click", (e,d) => { e.stopPropagation(); if (d.data.name==="Dress") expandToDress(); });
        node.append("rect")
          .attr("width", d=>d.x1-d.x0).attr("height", d=>d.y1-d.y0)
          .attr("fill", d => d.data.name==="Dress" ? HILITE : GREY).attr("stroke","#fff");
        node.append("text").style("pointer-events","none")
          .attr("fill", d => d.data.name==="Dress" ? "#fff" : "#8a8a8a")
          .call(s => drawLabel(s, d => d.data.name, null));
        addTip(node, d => d.data.name);
      }

      // --- Transition: Dress grows to fill, then show its occupations ---
      function expandToDress(){
        const sel = g.selectAll("g");
        sel.filter(d => d.data.name!=="Dress").transition().duration(450).style("opacity",0).remove();
        const dg = sel.filter(d => d.data.name==="Dress");
        dg.select("text").transition().duration(250).style("opacity",0);
        dg.transition().duration(600).attr("transform","translate(0,0)");
        dg.select("rect").transition().duration(600)
          .attr("width", W).attr("height", H)
          .on("end", drawDress);
      }

      // --- View B: Dress occupations (charted ones highlighted) ---
      function drawDress(){
        clearImage(); backBtn.style.display="inline-block";
        mechBtn.style.display="inline-block";
        mechBtn.textContent = mechMode ? "Back to normal view" : "Shade by mechanization";
        drawMechLegend();
        g.selectAll("*").remove();
        const node = g.selectAll("g").data(dressRoot.children).join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .style("cursor", d => d.data.chart ? "pointer" : "default")
          .on("click", (e,d) => { e.stopPropagation(); if (d.data.chart) showChart(d); });
        node.append("rect")
          .attr("width", d=>d.x1-d.x0).attr("height", d=>d.y1-d.y0)
          .attr("fill", d => mechMode ? mechColor(d.data.mech || 0) : (d.data.chart ? HILITE : GREY)).attr("stroke","#fff")
          .style("opacity",0).transition().duration(450).style("opacity",1);
        node.append("text").style("pointer-events","none")
          .attr("fill", d => mechMode ? ((d.data.mech || 0) > mechMax*0.5 ? "#fff" : "#333") : (d.data.chart ? "#fff" : "#6f6f6f"))
          .call(s => drawLabel(s, d => d.data.occode + ": " + d.data.name, d => String(d.data.occode)));
        addTip(node, d => d.data.name + (mechMode ? " — " + Math.round((d.data.mech||0)*100) + "% machine work" : ""));
        svg.on("click", () => drawOrders());   // background click → back to orders
      }

      function showChart(d){
        lboxTitle.textContent = d.data.occode + ": " + d.data.name;
        lboxImg.alt = d.data.name;
        lboxImg.onerror = () => { lboxImg.alt = "Chart not available"; };
        lboxImg.src = `/assets/task_charts/${d.data.chart}.png`;
        lbox.style.display = "flex";
      }
    });
  }, { once: true });
})();
</script>
</div>
</div>
</section>


<section class="frame frame--section">
  <h2>New Evidence</h2>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">New Evidence</div>
<h3>1. Map of specific new jobs</h3>

<p>
  Where did specific new occupations emerge across the country? Choose a trade and a census
  year to see the share of the workforce it accounted for in each county.
</p>

<div style="display:flex;gap:28px;flex-wrap:wrap;align-items:flex-start;">

  <!-- LEFT: controls + map -->
  <div style="flex:2 1 520px;min-width:320px;">
    <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;margin-bottom:10px;">
      <label>Job:
        <select id="newjob-select" style="font-size:14px;padding:3px 6px;">
          <option value="electrician" selected>Electrician</option>
          <option value="motor_driver">Motor driver</option>
          <option value="typist">Typist</option>
          <option value="bicycle_maker">Bicycle maker</option>
          <option value="telegraph">Telegraph</option>
          <option value="telephonist">Telephonist</option>
          <option value="photographer">Photographer</option>
        </select>
      </label>
      <label>Select year: <span id="newjob-year-label">1911</span>
        <input type="range" id="newjob-year" min="0" max="5" step="1" value="5" style="width:240px;vertical-align:middle;">
      </label>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:16px;position:relative;">
      <svg id="newjob-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
      <div style="margin-top:10px;">
        <svg id="newjob-legend" width="480" height="50" style="max-width:100%;height:auto;"></svg>
        <div id="newjob-legend-caption" style="font-size:12px;text-align:center;"></div>
      </div>
      <div id="newjob-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
    </div>
  </div>

  <!-- RIGHT: biggest new jobs table -->
  <div style="flex:1 1 300px;min-width:280px;">
    <h4 style="margin:0 0 4px;">New jobs of the 19th century</h4>
    <style>
      .xray-cell { position:relative; cursor:help; border-bottom:1px dotted #999; }
      .xray-pop { position:absolute; bottom:135%; left:0; z-index:60; display:none; width:230px;
        background:#fff; border:1px solid #ccc; border-radius:6px; padding:8px 10px; font-size:0.8rem;
        font-weight:400; color:#333; line-height:1.5; text-align:left; white-space:normal;
        box-shadow:0 3px 12px rgba(0,0,0,.18); }
      .xray-cell:hover .xray-pop { display:block; }
    </style>
    <p style="font-size:0.82em;color:#888;margin:0 0 12px;">Ranked by number of workers, 1911.</p>
    <table style="border-collapse:collapse;width:100%;font-size:0.9em;">
      <thead>
        <tr style="text-align:left;border-bottom:2px solid #238B45;">
          <th style="padding:7px 8px;font-weight:600;">Occupation</th>
          <th style="padding:7px 8px;font-weight:600;text-align:right;">Workers, 1911</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Electrician</td><td style="padding:7px 8px;text-align:right;">55,447</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Motor driver</td><td style="padding:7px 8px;text-align:right;">44,947</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Typist</td><td style="padding:7px 8px;text-align:right;">41,927</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Bicycle maker</td><td style="padding:7px 8px;text-align:right;">33,461</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Telegraph</td><td style="padding:7px 8px;text-align:right;">33,129</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Telephonist</td><td style="padding:7px 8px;text-align:right;">19,230</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Photographer</td><td style="padding:7px 8px;text-align:right;">17,134</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Asphalter</td><td style="padding:7px 8px;text-align:right;">1,612</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Anaesthetist</td><td style="padding:7px 8px;text-align:right;">353</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;"><span class="xray-cell">X-ray operator<span class="xray-pop"><strong>Also known as&hellip;</strong><br>radiographer &middot; skiagraphist &middot; roentgenologist &middot; x-rayist &middot; x-ray man (even <em>railway xrayman</em>) &middot; x-ray attendant &middot; x-ray photographer</span></span></td><td style="padding:7px 8px;text-align:right;">77</td></tr>
      </tbody>
    </table>
  </div>

</div>

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  // One consistent colour ramp; thresholds are auto-computed per job from its own data.
  const RAMP = d3.schemeGreens[5];
  const JOBS = {
    electrician:   { dataUrl: '/assets/maps/share_electrician_by_county.json',   caption: 'Share of workforce: electricians' },
    motor_driver:  { dataUrl: '/assets/maps/share_motor_driver_by_county.json',  caption: 'Share of workforce: motor drivers' },
    typist:        { dataUrl: '/assets/maps/share_typist_by_county.json',        caption: 'Share of workforce: typists' },
    bicycle_maker: { dataUrl: '/assets/maps/share_bicycle_maker_by_county.json', caption: 'Share of workforce: bicycle makers' },
    telegraph:     { dataUrl: '/assets/maps/share_telegraph_by_county.json',     caption: 'Share of workforce: telegraph workers' },
    telephonist:   { dataUrl: '/assets/maps/share_telephonist_by_county.json',   caption: 'Share of workforce: telephonists' },
    photographer:  { dataUrl: '/assets/maps/share_photographer_by_county.json',  caption: 'Share of workforce: photographers' }
  };

  ready(async function(){
    const GEO_URL = '/assets/maps/Counties1851.geojson';
    let geoData;
    try { geoData = await d3.json(GEO_URL); } catch { return; }

    const projection = d3.geoMercator().fitSize([960, 600], geoData);
    const path = d3.geoPath().projection(projection);
    const countyKey = f => f.properties?.R_CTY;
    const fmt = v => (v == null || isNaN(v)) ? 'N/A' : d3.format('.2f')(v) + '%';
    const getYearValues = (data, y) => data && (data[y] ?? data[String(y)] ?? data[+y] ?? null);

    const svg       = d3.select('#newjob-map');
    const tooltip   = d3.select('#newjob-tooltip');
    const slider    = d3.select('#newjob-year');
    const label     = d3.select('#newjob-year-label');
    const legendSvg = d3.select('#newjob-legend');
    const caption   = d3.select('#newjob-legend-caption');
    const select    = d3.select('#newjob-select');
    const YEARS     = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)

    svg.selectAll('path').data(geoData.features).join('path')
      .attr('d', path).attr('fill', '#eee').attr('stroke', '#fff').attr('stroke-width', 0.5);

    const dataCache = {};
    let current = null, color = null;

    function paint(year){
      const values = getYearValues(current, year);
      svg.selectAll('path')
        .attr('fill', d => {
          if (!values) return '#eee';
          const v = values[countyKey(d)];
          return v != null ? color(v) : '#ccc';
        })
        .on('mouseover', function(event, d){
          const name = countyKey(d) ?? 'Unknown';
          const v = getYearValues(current, year)?.[name];
          tooltip.style('visibility','visible').text(`${name}: ${fmt(v)}`);
          d3.select(this).attr('stroke-width', 2);
        })
        .on('mousemove', function(event){
          const bbox = this.ownerSVGElement.getBoundingClientRect();
          tooltip.style('top', (event.clientY - bbox.top + 10) + 'px')
                 .style('left', (event.clientX - bbox.left + 10) + 'px');
        })
        .on('mouseout', function(){
          tooltip.style('visibility','hidden');
          d3.select(this).attr('stroke-width', 0.5);
        });
    }

    const pct = d3.format('~r');
    function drawLegend(thr, ramp, captionText){
      const binWidth = 480 / ramp.length;
      legendSvg.selectAll('*').remove();
      ramp.forEach((c, i) => {
        const lab = (i === 0) ? '0–' + pct(thr[0]) + '%'
                  : (i === ramp.length - 1) ? pct(thr[thr.length-1]) + '%+'
                  : pct(thr[i-1]) + '–' + pct(thr[i]) + '%';
        legendSvg.append('rect').attr('x', i * binWidth).attr('y', 10)
          .attr('width', binWidth).attr('height', 10).attr('fill', c);
        legendSvg.append('text').attr('x', i * binWidth + binWidth / 2).attr('y', 35)
          .attr('text-anchor', 'middle').attr('font-size', '9px').text(lab);
      });
      caption.text(captionText);
    }

    // round up to a "nice" 1 / 2 / 5 x 10^k value
    function niceNum(x){
      if (x <= 0) return 0;
      const b = Math.pow(10, Math.floor(Math.log10(x))), f = x / b;
      const n = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
      return +(n * b).toPrecision(2);
    }
    async function loadJob(key){
      const cfg = JOBS[key];
      if (!dataCache[key]) {
        try { dataCache[key] = await d3.json(cfg.dataUrl); } catch { dataCache[key] = null; }
      }
      current = dataCache[key];
      // quintiles of the positive values, rounded to nice round bands
      const vals = [];
      if (current) for (const y in current) for (const c in current[y]) { const v = current[y][c]; if (v > 0) vals.push(v); }
      vals.sort(d3.ascending);
      const hi = d3.max(vals) || 1;
      const raw = [hi/16, hi/8, hi/4, hi/2];   // step down from the peak so standout counties pop
      let thr = Array.from(new Set(raw.map(niceNum))).filter(v => v > 0 && v < hi).sort(d3.ascending);
      if (!thr.length) thr = [niceNum(hi / 2) || 0.1];
      const ramp = d3.schemeGreens[Math.min(9, Math.max(3, thr.length + 1))];
      color = d3.scaleThreshold().domain(thr).range(ramp);
      drawLegend(thr, ramp, cfg.caption);
      paint(YEARS[+slider.property('value')]);
    }

    slider.on('input', function(){ const yr = YEARS[+this.value]; label.text(yr); paint(yr); });
    select.on('change', function(){ loadJob(this.value); });

    loadJob('electrician');   // default selection
  });
})();
</script>
</div>
</div>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">New Evidence</div>
<h3>2. Mapping of management jobs</h3>

<h4 style="margin-top: 1em;">
  An initial mapping of the rise of management jobs in the UK, by county.
</h4>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="mgmt-year-slider">Select year: <span id="mgmt-year-label">1851</span></label>
  <input type="range" id="mgmt-year-slider" min="0" max="5" step="1" value="0" style="width:300px;">
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:40px;position:relative;">
  <svg id="mgmt-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
  <div style="margin-top:10px;">
    <svg id="mgmt-legend" width="480" height="50"></svg>
    <div style="font-size:12px;text-align:center;">Percentage Share of the Working Male Population</div>
  </div>
  <div id="mgmt-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<hr style="margin:32px 0;">

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(async function initMgmtMap(){
    const svg = d3.select('#mgmt-map');
    const tooltip = d3.select('#mgmt-tooltip');
    const slider = d3.select('#mgmt-year-slider');
    const yearLabel = d3.select('#mgmt-year-label');
    const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)
    if (svg.empty()) return;

    const GEO_URL  = '/assets/maps/Counties1851.geojson';
    const DATA_URL = '/assets/maps/share_management_by_county.json';

    let geoData;
    try { geoData = await d3.json(GEO_URL); } catch { return; }

    const projection = d3.geoMercator().fitSize([960, 600], geoData);
    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', path)
      .attr('fill', '#eee')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5);

    let yearData = null;
    try { yearData = await d3.json(DATA_URL); } catch {}

    const thresholds = [1, 2, 3, 4];
    const color = d3.scaleThreshold().domain(thresholds).range(d3.schemePurples[5]);
    const countyKey = f => f.properties?.R_CTY;
    const fmt = v => (v == null || isNaN(v)) ? 'N/A' : d3.format('.2f')(v) + '%';
    const getYearValues = y => yearData && (yearData[y] ?? yearData[String(y)] ?? yearData[+y] ?? null);

    function paint(year){
      const values = getYearValues(year);
      svg.selectAll('path')
        .attr('fill', d => {
          if (!values) return '#eee';
          const v = values[countyKey(d)];
          return v != null ? color(v) : '#ccc';
        })
        .on('mouseover', function(event, d){
          const vals = getYearValues(year);
          const name = countyKey(d) ?? 'Unknown';
          const v = vals ? vals[name] : null;
          tooltip.style('visibility','visible').text(`${name}: ${fmt(v)}`);
          d3.select(this).attr('stroke-width', 2);
        })
        .on('mousemove', function(event){
          const bbox = this.ownerSVGElement.getBoundingClientRect();
          tooltip.style('top', (event.clientY - bbox.top + 10) + 'px')
                 .style('left', (event.clientX - bbox.left + 10) + 'px');
        })
        .on('mouseout', function(){
          tooltip.style('visibility','hidden');
          d3.select(this).attr('stroke-width', 0.5);
        });
    }

    // Legend
    (function legend(){
      const legendSvg = d3.select('#mgmt-legend');
      const legendWidth = +legendSvg.attr('width');
      const colors = d3.schemePurples[5];
      const binWidth = legendWidth / colors.length;
      legendSvg.selectAll('*').remove();
      colors.forEach((c, i) => {
        legendSvg.append('rect').attr('x', i * binWidth).attr('y', 10)
          .attr('width', binWidth).attr('height', 10).attr('fill', c);
        const label = i === colors.length - 1 ? '4%+' : `${i}%–${i+1}%`;
        legendSvg.append('text').attr('x', i * binWidth + binWidth / 2).attr('y', 35)
          .attr('text-anchor', 'middle').attr('font-size', '10px').text(label);
      });
    })();

    paint(YEARS[0]);
    if (!slider.empty()) {
      slider.on('input', function(){
        const y = YEARS[+this.value];
        yearLabel.text(y);
        paint(y);
      });
    }
  });
})();
</script>
</div>
</div>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">New Evidence</div>
<h3>3. Map of mechanization</h3>

<h4 style="margin-top: 1em;">
  An initial mapping of the emergence of new technologies in the UK, by county.
</h4>

<p>Unlike the apprenticeship system, mechanization rises on <em>both</em> measures &mdash; in share <em>and</em> in absolute numbers: by 1911 there are at least about 1.5 million more people working with machines.</p>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="tech-year-slider">Select year: <span id="tech-year-label">1851</span></label>
  <input type="range" id="tech-year-slider" min="0" max="5" step="1" value="0" style="width:300px;">
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:40px;position:relative;">
  <svg id="tech-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
  <div style="margin-top:10px;">
    <svg id="tech-legend" width="480" height="50"></svg>
    <div style="font-size:12px;text-align:center;">Percentage share of male population</div>
  </div>
  <div id="tech-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(async function initTechMap(){
    const svg = d3.select('#tech-map');
    const tooltip = d3.select('#tech-tooltip');
    const slider = d3.select('#tech-year-slider');
    const yearLabel = d3.select('#tech-year-label');
    const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)
    if (svg.empty()) return;

    const GEO_URL  = '/assets/maps/Counties1851.geojson';
    const DATA_URL = '/assets/maps/share_machine_men_by_county.json';

    let geoData;
    try { geoData = await d3.json(GEO_URL); } catch { return; }

    const projection = d3.geoMercator().fitSize([960, 600], geoData);
    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', path)
      .attr('fill', '#eee')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5);

    let yearData = null;
    try { yearData = await d3.json(DATA_URL); } catch {}

    const thresholds = [4, 8, 12, 16];
    const color = d3.scaleThreshold().domain(thresholds).range(d3.schemeGreens[5]);
    const countyKey = f => f.properties?.R_CTY;
    const fmt = v => (v == null || isNaN(v)) ? 'N/A' : d3.format('.2f')(v) + '%';
    const getYearValues = y => yearData && (yearData[y] ?? yearData[String(y)] ?? yearData[+y] ?? null);

    function paint(year){
      const values = getYearValues(year);
      svg.selectAll('path')
        .attr('fill', d => {
          if (!values) return '#eee';
          const v = values[countyKey(d)];
          return v != null ? color(v) : '#ccc';
        })
        .on('mouseover', function(event, d){
          const name = countyKey(d) ?? 'Unknown';
          const v = getYearValues(year)?.[name];
          tooltip.style('visibility','visible').text(`${name}: ${fmt(v)}`);
          d3.select(this).attr('stroke-width', 2);
        })
        .on('mousemove', function(event){
          const bbox = this.ownerSVGElement.getBoundingClientRect();
          tooltip.style('top', (event.clientY - bbox.top + 10) + 'px')
                 .style('left', (event.clientX - bbox.left + 10) + 'px');
        })
        .on('mouseout', function(){
          tooltip.style('visibility','hidden');
          d3.select(this).attr('stroke-width', 0.5);
        });
    }

    (function legend(){
      const legendSvg = d3.select('#tech-legend');
      const colors = d3.schemeGreens[5];
      const binWidth = 480 / colors.length;
      legendSvg.selectAll('*').remove();
      const labels = ['0–4%', '4–8%', '8–12%', '12–16%', '16%+'];
      colors.forEach((c, i) => {
        legendSvg.append('rect').attr('x', i * binWidth).attr('y', 10)
          .attr('width', binWidth).attr('height', 10).attr('fill', c);
        legendSvg.append('text').attr('x', i * binWidth + binWidth / 2).attr('y', 35)
          .attr('text-anchor', 'middle').attr('font-size', '10px').text(labels[i]);
      });
    })();

    paint(YEARS[0]);
    if (!slider.empty()) {
      slider.on('input', function(){
        const y = YEARS[+this.value];
        yearLabel.text(y);
        paint(y);
      });
    }
  });
})();
</script>
</div>
</div>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">New Evidence</div>
<h3>4. Mapping of the apprenticeship system</h3>

<p>The apprenticeship system declines everywhere between 1851–1911. The decline is more rapid after 1881. Less urban areas seem to retain more of the system than elsewhere.</p>

<p>But this is a decline in <em>share</em>, not in absolute numbers. Summed across the three roles, the system actually grows slightly — from about 252,000 in 1851 to about 261,000 in 1911, a net rise of roughly 9,000. Apprentices themselves increase substantially, by almost 90,000; the real decline is among journeymen (down about 65,000) and masters.</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:40px;">

  <!-- LEFT: Total participation -->
  <div>
    <h3 style="font-size:1em;margin-bottom:10px;">Total Participation</h3>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
      <label for="year-slider" style="font-size:13px;">Year: <span id="year-label">1851</span></label>
      <input type="range" id="year-slider" min="0" max="5" step="1" value="0" style="width:180px;">
    </div>
    <div style="position:relative;">
      <svg id="total-map" style="width:100%;display:block;" viewBox="0 0 480 300"></svg>
      <div style="margin-top:6px;">
        <svg id="legend-svg" width="100%" height="50"></svg>
        <div style="font-size:11px;text-align:center;">% Share of Male Population</div>
      </div>
      <div id="tooltip" style="position:absolute;background:white;border:1px solid #aaa;padding:5px;visibility:hidden;font-size:12px;border-radius:4px;pointer-events:none;"></div>
    </div>
  </div>

  <!-- RIGHT: Role breakdown -->
  <div>
    <h3 style="font-size:1em;margin-bottom:10px;">Role Breakdown</h3>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
      <label for="role-select" style="font-size:13px;">Role:</label>
      <select id="role-select" style="font-size:13px;">
        <option value="master">Master</option>
        <option value="journeyman">Journeyman</option>
        <option value="apprentice">Apprentice</option>
      </select>
      <label for="role-slider" style="font-size:13px;">Year: <span id="role-year-label">1851</span></label>
      <input type="range" id="role-slider" min="0" max="5" step="1" value="0" style="width:180px;">
    </div>
    <div style="position:relative;">
      <svg id="role-map" style="width:100%;display:block;" viewBox="0 0 480 300"></svg>
      <div style="margin-top:6px;">
        <svg id="role-legend-svg" width="100%" height="50"></svg>
        <div style="font-size:11px;text-align:center;">% Share of Male Population in Role</div>
      </div>
      <div id="role-tooltip" style="position:absolute;background:white;border:1px solid #aaa;padding:5px;visibility:hidden;font-size:12px;border-radius:4px;pointer-events:none;"></div>
    </div>
  </div>

</div>

<script>
const svg_total = d3.select("#total-map");
const tooltip_total = d3.select("#tooltip");

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/share_total_by_county.json?v=2")
]).then(([geoData, yearData]) => {
  const projection = d3.geoMercator().fitSize([480, 300], geoData);
  const path = d3.geoPath().projection(projection);
  const slider = d3.select("#year-slider");
  const yearLabel = d3.select("#year-label");
  const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)

  function updateMap(year) {
    const values = yearData[year];
    const color = d3.scaleThreshold().domain([1, 2, 3, 4]).range(d3.schemePurples[5]);
    svg_total.selectAll("path").data(geoData.features).join("path")
      .attr("d", path)
      .attr("fill", d => { const v = values[d.properties.R_CTY]; return v != null ? color(v) : "#ccc"; })
      .attr("stroke", "#fff").attr("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        const value = values[d.properties.R_CTY];
        tooltip_total.style("visibility", "visible").text(`${d.properties.R_CTY}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        const bbox = this.ownerSVGElement.getBoundingClientRect();
        tooltip_total.style("top", (event.clientY - bbox.top + 10) + "px").style("left", (event.clientX - bbox.left + 10) + "px");
      })
      .on("mouseout", function() { tooltip_total.style("visibility", "hidden"); d3.select(this).attr("stroke-width", 0.5); });
  }

  updateMap(YEARS[0]);
  slider.on("input", function() { const yr = YEARS[+this.value]; yearLabel.text(yr); updateMap(yr); });
});

{
  const legendSvg = d3.select("#legend-svg");
  const colors = d3.schemePurples[5];
  const binWidth = 100 / colors.length;
  colors.forEach((color, i) => {
    legendSvg.append("rect").attr("x", i * binWidth + "%").attr("y", 10).attr("width", binWidth + "%").attr("height", 10).attr("fill", color);
    legendSvg.append("text").attr("x", (i * binWidth + binWidth / 2) + "%").attr("y", 35).attr("text-anchor", "middle").attr("font-size", "10px")
      .text(i === colors.length - 1 ? "4+" : `${i}–${i+1}`);
  });
}
</script>

<script>
const roleSvg = d3.select("#role-map");
const roleTooltip = d3.select("#role-tooltip");
const roleSlider = d3.select("#role-slider");
const roleSelect = d3.select("#role-select");
const roleThresholds = [0.2, 0.4, 0.6, 0.8, 1.0, 1.5, 2.0];
const roleColors = d3.schemeBlues[8];
const roleColor = d3.scaleThreshold().domain(roleThresholds).range(roleColors);

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/share_granrole_by_county.json?v=2")
]).then(([geoData, roleData]) => {
  const projection = d3.geoMercator().fitSize([480, 300], geoData);
  const path = d3.geoPath().projection(projection);
  const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)

  function updateRoleMap(year, role) {
    const values = roleData[year][role];
    roleSvg.selectAll("path").data(geoData.features).join("path")
      .attr("d", path)
      .attr("fill", d => { const v = values[d.properties.R_CTY]; return v != null ? roleColor(v) : "#ccc"; })
      .attr("stroke", "#fff").attr("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        const value = values[d.properties.R_CTY];
        roleTooltip.style("visibility", "visible").text(`${d.properties.R_CTY}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        const bbox = this.ownerSVGElement.getBoundingClientRect();
        roleTooltip.style("top", (event.clientY - bbox.top + 10) + "px").style("left", (event.clientX - bbox.left + 10) + "px");
      })
      .on("mouseout", function() { roleTooltip.style("visibility", "hidden"); d3.select(this).attr("stroke-width", 0.5); });
  }

  const roleYearLabel = d3.select("#role-year-label");
  updateRoleMap(YEARS[0], "master");
  roleSlider.on("input", function() { const yr = YEARS[+this.value]; roleYearLabel.text(yr); updateRoleMap(yr, roleSelect.node().value); });
  roleSelect.on("change", function() { updateRoleMap(YEARS[+roleSlider.node().value], this.value); });
});

{
  const roleLegendSvg = d3.select("#role-legend-svg");
  const binWidth = 100 / 8;
  const roleLabels = ["<0.2","0.2–0.4","0.4–0.6","0.6–0.8","0.8–1.0","1.0–1.5","1.5–2.0","2.0+"];
  roleColors.forEach((color, i) => {
    roleLegendSvg.append("rect").attr("x", i * binWidth + "%").attr("y", 10).attr("width", binWidth + "%").attr("height", 10).attr("fill", color);
  });
  roleLabels.forEach((label, i) => {
    roleLegendSvg.append("text").attr("x", (i * binWidth + binWidth / 2) + "%").attr("y", 35).attr("text-anchor", "middle").attr("font-size", "9px").text(label);
  });
}
</script>
</div>
</div>
</section>


<section class="frame frame--section">
  <h2>Methods</h2>
</section>


<section class="frame frame--tall">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Methods</div>
<h3>1. The shape of the workforce: Orders, sub-Orders, and occupations</h3>

<p>Every occupation nests inside a sub-Order, and every sub-Order inside one of the 22 Orders. The circles below pack that whole structure, with each circle's area proportional to its 1911 workforce. Click any bubble to zoom in; click the background to zoom back out.</p>

<div id="circlepack" style="max-width:760px;margin:8px auto 0;"></div>

<script>
(function(){
  function ready(fn){ if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true}); else fn(); }
  ready(function(){
    const W = 760, H = 760;
    d3.json("/assets/data/occ_hierarchy.json").then(data => {
      const root = d3.pack().size([W, H]).padding(3)(
        d3.hierarchy(data).sum(d => d.value).sort((a, b) => b.value - a.value)
      );

      const orders  = root.children.map(d => d.data.name);
      const color   = d3.scaleOrdinal(orders, d3.quantize(t => d3.interpolateRainbow(t * 0.92 + 0.02), orders.length));
      const orderOf = d => { let n = d; while (n.depth > 1) n = n.parent; return n.data.name; };
      const fmt = d3.format(",");

      const svg = d3.select("#circlepack").append("svg")
        .attr("viewBox", `-${W/2} -${H/2} ${W} ${H}`)
        .attr("width", "100%").style("height", "auto").style("display", "block")
        .style("cursor", "pointer").style("font", "11px sans-serif").style("background", "#fff");

      const tip = d3.select("body").append("div")
        .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
        .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
        .style("border-radius","5px").style("font-size","13px").style("max-width","260px")
        .style("box-shadow","0 2px 6px rgba(0,0,0,.2)");

      let focus = root, view;

      const node = svg.append("g").selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
          .attr("fill", d => color(orderOf(d)))
          .attr("fill-opacity", d => d.children ? 0.3 : 0.85)
          .attr("stroke", d => d.children ? "#fff" : "none")
          .attr("stroke-width", d => d.children ? 1 : 0)
          .attr("pointer-events", "all")
          .on("mouseover", function(event, d){
            tip.style("visibility","visible").html(
              d.children
                ? `<strong>${d.data.name}</strong><br>${fmt(d.value)} workers`
                : `<strong>${d.data.name}</strong><br>${fmt(d.value)} workers<br><span style="color:#888">${orderOf(d)}</span>`
            );
            d3.select(this).attr("stroke","#333").attr("stroke-width",1.5);
          })
          .on("mousemove", e => tip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"))
          .on("mouseout", function(event, d){
            tip.style("visibility","hidden");
            d3.select(this).attr("stroke", d.children ? "#fff" : "none").attr("stroke-width", d.children ? 1 : 0);
          })
          .on("click", (event, d) => { if (focus !== d) { zoom(event, d); event.stopPropagation(); } });

      const label = svg.append("g")
          .style("pointer-events","none").attr("text-anchor","middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
          .style("fill-opacity", d => d.parent === root ? 1 : 0)
          .style("display", d => d.parent === root ? "inline" : "none")
          .style("font-weight", d => d.depth === 1 ? "600" : "400")
          .text(d => d.data.name);

      svg.on("click", (event) => zoom(event, root));
      zoomTo([root.x, root.y, root.r * 2]);

      function zoomTo(v){
        const k = W / v[2]; view = v;
        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
      }

      function zoom(event, d){
        focus = d;
        const transition = svg.transition().duration(700)
          .tween("zoom", () => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });
        label.filter(function(d){ return d.parent === focus || this.style.display === "inline"; })
          .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d){ if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d){ if (d.parent !== focus) this.style.display = "none"; });
      }
    });
  });
})();
</script>
</div>
</div>
</section>


<section class="frame frame--tall">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Methods</div>
<h3>2. Changing Taxonomies: Census Waves 1851–1911</h3>

<p>The grey treemap is the <strong>1911 classification</strong> — Orders, their sub-Orders, and the occupations within them: the structure everything eventually settled into. Pick an earlier census and <strong>hover any occupation</strong> to light up the others it was lumped with <em>that</em> year — wherever they ended up on the 1911 map. The more scattered the highlight, the more that early census cut across the modern Orders.</p>

<div style="display:flex;align-items:center;gap:10px;margin:8px 0;flex-wrap:wrap;">
  <span>Census year:</span>
  <span id="tm-buttons" style="display:inline-flex;gap:6px;flex-wrap:wrap;"></span>
  <span id="tm-info" style="font-size:0.85em;color:#888;margin-left:6px;">hover an occupation</span>
</div>
<style>
  .tm-yrbtn { padding:5px 14px; font-size:14px; cursor:pointer; border:1px solid #bbb; background:#fff; border-radius:4px; }
  .tm-yrbtn.active { background:#333; color:#fff; border-color:#333; }
</style>

<div id="tm-pack" style="max-width:920px;margin:0 auto;"></div>

<script>
(function(){
  function ready(fn){ if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true}); else fn(); }
  ready(function(){
    const W = 920, H = 620, HI = '#E6550D';
    Promise.all([
      d3.json("/assets/data/occ_hierarchy.json"),
      d3.json("/assets/data/occ_census_codes.json")
    ]).then(([hier, census]) => {
      const byOcc = new Map(census.nodes.map(n => [n.occode, n]));
      function gby(yr){ const m = new Map(); census.nodes.forEach(n => { const c = n.codes[yr] || '(none)'; if (!m.has(c)) m.set(c, []); m.get(c).push(n.occode); }); return m; }
      const YEARS = census.years.map(String).filter(y => y !== '1911');
      const groups = {}; YEARS.forEach(y => groups[y] = gby(y));
      let curYear = YEARS[0];

      const root = d3.hierarchy(hier).sum(d => d.value || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(1).paddingTop(d => d.depth === 1 ? 14 : 1).round(true)(root);

      const svg = d3.select("#tm-pack").append("svg")
        .attr("viewBox", `0 0 ${W} ${H}`).attr("width","100%").style("height","auto")
        .style("display","block").style("font","10px sans-serif");

      // Order rectangles (depth 1): grey frame + label
      const og = svg.append("g");
      og.selectAll("rect").data(root.children).join("rect")
        .attr("x",d=>d.x0).attr("y",d=>d.y0).attr("width",d=>Math.max(0,d.x1-d.x0)).attr("height",d=>Math.max(0,d.y1-d.y0))
        .attr("fill","#f4f4f4").attr("stroke","#c8c8c8").attr("stroke-width",1);
      og.selectAll("text").data(root.children).join("text")
        .attr("x",d=>d.x0+4).attr("y",d=>d.y0+11).style("font-size","10px").style("font-weight","600")
        .style("fill","#999").style("pointer-events","none").text(d=>d.data.name);

      const tip = d3.select("body").append("div")
        .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
        .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
        .style("border-radius","5px").style("font-size","13px").style("max-width","280px")
        .style("box-shadow","0 2px 6px rgba(0,0,0,.2)");
      const info = d3.select("#tm-info");

      // occupation cells (leaves) — the grey holding space
      let pinned = null;
      const cell = svg.append("g").selectAll("rect").data(root.leaves()).join("rect")
        .attr("x",d=>d.x0).attr("y",d=>d.y0).attr("width",d=>Math.max(0,d.x1-d.x0)).attr("height",d=>Math.max(0,d.y1-d.y0))
        .attr("fill","#e0e0e0").attr("stroke","#fff").attr("stroke-width",0.5)
        .on("mouseover", function(e,d){ if (pinned === null) paintCategory(d, false); showTip(d); })
        .on("mousemove", e => tip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"))
        .on("mouseout", function(){ tip.style("visibility","hidden"); if (pinned === null) { resetCells(); resetInfo(); } })
        .on("click", function(e,d){
          e.stopPropagation();
          if (pinned === d.data.occode) { clear(); }
          else { pinned = d.data.occode; paintCategory(d, true); }
        });

      function membersOf(d){
        const n = byOcc.get(d.data.occode), code = n ? n.codes[curYear] : null;
        return new Set(code ? (groups[curYear].get(code) || [d.data.occode]) : [d.data.occode]);
      }
      function paintCategory(d, isPin){
        const set = membersOf(d);
        cell.attr("fill", c => set.has(c.data.occode) ? HI : "#e8e8e8")
            .attr("fill-opacity", c => set.has(c.data.occode) ? 0.95 : 0.45)
            .attr("stroke", c => c.data.occode === d.data.occode ? "#000" : "#fff")
            .attr("stroke-width", c => c.data.occode === d.data.occode ? 1.6 : 0.5);
        info.html(`<strong style="color:${HI}">${set.size}</strong> shared this census category in ${curYear}` + (isPin ? ` &nbsp;·&nbsp; <em>pinned — hover the others to read them; click it again to release</em>` : ``));
      }
      function showTip(d){
        const n = byOcc.get(d.data.occode), code = n ? n.codes[curYear] : null;
        tip.style("visibility","visible").html(`<strong>${d.data.name}</strong>` + (n ? `<br>${n.order}<br><span style="color:#888">${curYear} census code ${code}</span>` : ''));
      }
      function resetInfo(){ info.html("hover an occupation · click to pin it"); }
      function resetCells(){ cell.attr("fill","#e0e0e0").attr("fill-opacity",1).attr("stroke","#fff").attr("stroke-width",0.5); }
      function clear(){ pinned = null; resetCells(); tip.style("visibility","hidden"); resetInfo(); }

      svg.on("click", () => { if (pinned !== null) clear(); });

      const btnSel = d3.select("#tm-buttons").selectAll("button").data(YEARS).join("button")
        .attr("class","tm-yrbtn").text(y => y).on("click", (e, y) => setYear(y));
      function setYear(yr){ curYear = yr; btnSel.classed("active", y => y === yr); clear(); }
      setYear(YEARS[0]);
    });
  });
})();
</script>
</div>
</div>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Methods</div>
<h3>3. Migration within Orders, 1851 &rarr; 1861</h3>

<p>Zoom in one level. Even <em>within</em> a single Order, the census kept reorganising. Here the 22 Orders stay fixed as the outer bubbles, and inside each one the occupations are grouped by their <em>real census category</em> for the chosen year. Flip between 1851 and 1861 to watch occupations <strong style="color:#E6550D;">split</strong> apart, <strong style="color:#3182BD;">merge</strong> together, or <strong style="color:#756BB1;">reshuffle</strong> within their Order. Unchanged occupations stay grey.</p>

<div style="display:flex;align-items:center;gap:10px;margin:8px 0;flex-wrap:wrap;">
  <span>Census year:</span>
  <button id="cc-btn-1851" class="cc-yrbtn">1851</button>
  <button id="cc-btn-1861" class="cc-yrbtn">1861</button>
  <span id="cc-count" style="font-size:0.85em;color:#888;margin-left:6px;"></span>
</div>
<style>
  .cc-yrbtn { padding:5px 14px; font-size:14px; cursor:pointer; border:1px solid #bbb; background:#fff; border-radius:4px; }
  .cc-yrbtn.active { background:#333; color:#fff; border-color:#333; }
</style>

<div id="cc-legend" style="font-size:0.85em;margin:2px 0 8px;line-height:1.8;">
  <span style="margin-right:14px;white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#E6550D;margin-right:4px;"></span>Split apart</span>
  <span style="margin-right:14px;white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#3182BD;margin-right:4px;"></span>Merged together</span>
  <span style="margin-right:14px;white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#756BB1;margin-right:4px;"></span>Reshuffled</span>
  <span style="white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#dcdcdc;margin-right:4px;"></span>Unchanged</span>
</div>

<div id="cc-pack" style="max-width:820px;margin:0 auto;"></div>

<script>
(function(){
  function ready(fn){ if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true}); else fn(); }
  ready(function(){
    const W = 820, H = 820;
    d3.json("/assets/data/occ_census_codes.json").then(D => {
      const nodes = D.nodes;
      const codeOf = (n, yr) => n.codes[yr] || '(none)';

      // classify each occupation's move 1851 -> 1861 by the change in its category companions
      function groupsByYear(yr){ const m = new Map(); nodes.forEach(n => { const c = codeOf(n, yr); if (!m.has(c)) m.set(c, []); m.get(c).push(n.occode); }); return m; }
      const g51 = groupsByYear('1851'), g61 = groupsByYear('1861');
      const MCOL = { stable:'#dcdcdc', merge:'#3182BD', split:'#E6550D', reshuffle:'#756BB1' };
      const moveType = {};
      nodes.forEach(n => {
        const c51 = new Set(g51.get(codeOf(n,'1851')).filter(o => o !== n.occode));
        const c61 = new Set(g61.get(codeOf(n,'1861')).filter(o => o !== n.occode));
        let lost = 0, gained = 0;
        c51.forEach(o => { if (!c61.has(o)) lost++; });
        c61.forEach(o => { if (!c51.has(o)) gained++; });
        moveType[n.occode] = (lost===0 && gained===0) ? 'stable' : (gained>0 && lost===0) ? 'merge' : (lost>0 && gained===0) ? 'split' : 'reshuffle';
      });

      // fixed Order layout (sized by total 1911 workforce), computed once
      const orderTotals = d3.rollups(nodes, v => d3.sum(v, d => Math.max(d.size,1)), d => d.order);
      const orderRoot = d3.hierarchy({ children: orderTotals.map(([o,t]) => ({ order:o, value:t })) }).sum(d => d.value || 0).sort((a,b)=>b.value-a.value);
      d3.pack().size([W,H]).padding(6)(orderRoot);

      // For a year: occode positions + the census-category bubbles (>=2 members),
      // each packed INSIDE its fixed Order circle.
      function layoutFor(yr){
        const occ = {}, cats = [];
        orderRoot.children.forEach(oc => {
          const members = nodes.filter(n => n.order === oc.data.order);
          const groups = d3.groups(members, n => codeOf(n, yr));
          const sub = d3.hierarchy({ children: groups.map(([c, ms]) => ({ code:c, children: ms.map(m => ({ leaf:m })) })) })
            .sum(d => d.leaf ? Math.max(d.leaf.size,1) : 0).sort((a,b)=>b.value-a.value);
          const R = Math.max(oc.r - 2, 1);
          d3.pack().size([2*R, 2*R]).padding(1.5)(sub);
          (sub.children || []).forEach(c => {
            if ((c.children ? c.children.length : 0) >= 2)
              cats.push({ key: oc.data.order + '|' + c.data.code, x: oc.x - R + c.x, y: oc.y - R + c.y, r: c.r });
          });
          sub.leaves().forEach(lf => { occ[lf.data.leaf.occode] = { x: oc.x - R + lf.x, y: oc.y - R + lf.y, r: lf.r }; });
        });
        return { occ, cats };
      }

      const svg = d3.select("#cc-pack").append("svg")
        .attr("viewBox", `0 0 ${W} ${H}`).attr("width","100%").style("height","auto")
        .style("display","block").style("font","10px sans-serif").style("background","#fcfcfc");

      // fixed Order outlines + labels (never move)
      svg.append("g").selectAll("circle").data(orderRoot.children).join("circle")
        .attr("cx",d=>d.x).attr("cy",d=>d.y).attr("r",d=>d.r)
        .attr("fill","none").attr("stroke","#d0d0d0").attr("stroke-width",1.2);
      svg.append("g").attr("text-anchor","middle").style("pointer-events","none").style("fill","#999")
        .selectAll("text").data(orderRoot.children).join("text")
        .attr("x",d=>d.x).attr("y",d=>d.y-d.r+12).style("font-size","11px").style("font-weight","600").text(d=>d.data.order);

      const tip = d3.select("body").append("div")
        .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
        .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
        .style("border-radius","5px").style("font-size","13px").style("max-width","280px")
        .style("box-shadow","0 2px 6px rgba(0,0,0,.2)");

      const catG  = svg.append("g");
      const leafG = svg.append("g");
      const layoutByYear = { '1851': layoutFor('1851'), '1861': layoutFor('1861') };

      const sel = leafG.selectAll("circle").data(nodes, d => d.occode)
        .join("circle")
          .attr("cx", d => layoutByYear['1851'].occ[d.occode].x)
          .attr("cy", d => layoutByYear['1851'].occ[d.occode].y)
          .attr("r",  d => layoutByYear['1851'].occ[d.occode].r)
          .attr("fill", d => MCOL[moveType[d.occode]])
          .attr("fill-opacity", d => moveType[d.occode]==='stable' ? 0.5 : 0.9)
          .attr("stroke","#fff").attr("stroke-width",0.4)
          .on("mouseover", function(e,d){
            tip.style("visibility","visible").html(`<strong>${d.name}</strong><br>${d.order}<br><span style="color:#888">1851 code ${codeOf(d,'1851')} &rarr; 1861 code ${codeOf(d,'1861')}</span><br><em>${moveType[d.occode]}</em>`);
            d3.select(this).attr("stroke","#222").attr("stroke-width",1.2);
          })
          .on("mousemove", e => tip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"))
          .on("mouseout", function(){ tip.style("visibility","hidden"); d3.select(this).attr("stroke","#fff").attr("stroke-width",0.4); });

      function show(yr){
        const L = layoutByYear[yr];
        // census-category bubbles (the lumps) grow / shrink / move so splits & merges are visible
        const cs = catG.selectAll("circle").data(L.cats, d => d.key);
        cs.exit().transition().duration(2000).ease(d3.easeCubicInOut).attr("r",0).style("opacity",0).remove();
        cs.enter().append("circle")
            .attr("fill","#000").attr("fill-opacity",0.045).attr("stroke","#aaa").attr("stroke-width",0.8)
            .attr("cx",d=>d.x).attr("cy",d=>d.y).attr("r",0).style("opacity",0)
          .merge(cs).transition().duration(2000).ease(d3.easeCubicInOut)
            .attr("cx",d=>d.x).attr("cy",d=>d.y).attr("r",d=>d.r).style("opacity",1);
        // occupations glide into their new groups
        sel.transition().duration(2000).ease(d3.easeCubicInOut)
          .attr("cx", d => L.occ[d.occode].x).attr("cy", d => L.occ[d.occode].y).attr("r", d => L.occ[d.occode].r);
        d3.select("#cc-btn-1851").classed("active", yr==='1851');
        d3.select("#cc-btn-1861").classed("active", yr==='1861');
        d3.select("#cc-count").text(`${(yr==='1851'?g51:g61).size} census categories in ${yr}`);
      }
      d3.select("#cc-btn-1851").on("click", () => show('1851'));
      d3.select("#cc-btn-1861").on("click", () => show('1861'));
      show('1851');
    });
  });
})();
</script>
</div>
</div>
</section>


<section class="frame frame--section">
  <h2>Results</h2>
  <div class="blocklab">A: Workforce in Transition</div>
</section>


<section class="frame">
  <div class="in-kicker">Results · A: Workforce in Transition</div>
<h3>1.1. Measuring displacement</h3>
  <div class="frame__body">

    <div class="eq-box"><div id="eq-did"></div></div>

    <div class="eq-split">
      <div class="eq-terms">
        <div class="eq-term"><span class="eq-sym" data-tex="\textit{Data}"></span>
          <span>2&nbsp;&times;&nbsp;2 difference-in-differences, over two stacked transition
            windows: 1851&ndash;1861 and 1861&ndash;1881</span></div>
        <div class="eq-term"><span class="eq-sym" data-tex="Exit_{ic\tau}"></span>
          <span>exit rate, occupation <em>i</em>, county <em>c</em>, census <em>&tau;</em></span></div>
        <div class="eq-term"><span class="eq-sym" data-tex="\delta_c"></span>
          <span>county fixed effects</span></div>
        <div class="eq-term"><span class="eq-sym" data-tex="Boot_{i\tau}"></span>
          <span>treated occupation</span></div>
        <div class="eq-term"><span class="eq-sym" data-tex="Post_\tau"></span>
          <span>after mechanization</span></div>
        <div class="eq-term"><span class="eq-sym" data-tex="\beta"></span>
          <span>the coefficient of interest</span></div>
        <div class="eq-term"><span class="eq-sym" data-tex="X_{i\tau}"></span>
          <span>covariates, interacted with <span class="eq-sym-i" data-tex="Post_\tau"></span></span></div>
      </div>

      <div class="eq-logic">
        <p class="eq-label">Picking out an outlier</p>
        <ul class="in-list eq-points">
          <li>I run this regression 231 times.</li>
          <li><span class="eq-sym-i" data-tex="\beta"></span> shows how much an occupation&rsquo;s
              exit rate moves vis-&agrave;-vis the average.</li>
        </ul>
      </div>
    </div>

  </div>
</section>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script>
(function(){
  var DID = "\\begin{aligned}"
    + "Exit_{ic\\tau} ={}& \\delta_c + \\theta\\, Boot_{i\\tau} + \\phi\\, Post_\\tau"
    + " + \\beta\\, (Boot_{i\\tau} \\times Post_\\tau) \\\\"
    + "&+ \\gamma' X_{i\\tau} + \\kappa'(X_{i\\tau} \\times Post_\\tau) + \\varepsilon_{ic\\tau}."
    + "\\end{aligned}";

  function draw(){
    if (!window.katex) return;
    var main = document.getElementById("eq-did");
    if (main) katex.render(DID, main, { displayMode: true, throwOnError: false });
    document.querySelectorAll(".eq-sym[data-tex], .eq-sym-i[data-tex]").forEach(function(el){
      katex.render(el.getAttribute("data-tex"), el, { throwOnError: false });
    });
  }

  if (window.katex) draw();
  else window.addEventListener("load", draw);
})();
</script>

<style>
  /* the DiD equation slide */
  .eq-box {
    border-left: 3px solid #238B45; background: #fafafa;
    padding: 36px 44px; margin: 6px 0 34px; max-width: 1200px; overflow-x: auto;
  }
  .eq-box .katex-display { margin: 0; }
  .eq-box .katex { font-size: 1.72em; }

  .eq-split { display: flex; gap: 96px; align-items: flex-start; flex-wrap: wrap; }
  .eq-terms { flex: 0 1 660px; min-width: 340px; }
  .eq-logic { flex: 0 1 400px; min-width: 290px; padding-top: 4px; }

  .eq-term {
    display: flex; gap: 20px; align-items: baseline;
    padding: 8px 0; border-bottom: 1px solid #f2f2f2;
    font-size: .94rem; line-height: 1.5; color: #555;
  }
  .eq-term .eq-sym { flex: 0 0 96px; text-align: right; color: #333; }
  .eq-term em { color: #777; }
  .eq-sym-i { white-space: nowrap; color: #555; }

  .eq-label {
    font-size: .78rem; letter-spacing: .14em; text-transform: uppercase;
    color: #9a9a9a; font-weight: 400; margin: 0 0 16px;
  }
  .eq-points li { font-size: 1.1rem; line-height: 1.55; color: #333; margin-bottom: 16px; }
  .eq-points .eq-sym-i { color: #238B45; }

  @media (max-width: 980px) {
    .eq-box { padding: 20px 22px; }
    .eq-box .katex { font-size: 1.1em; }
    .eq-split { gap: 28px; }
    .eq-term .eq-sym { flex-basis: 76px; }
    .eq-points li { font-size: 1rem; }
  }
</style>


<section class="frame">
  <div class="in-kicker">Results · A: Workforce in Transition</div>
<h3>1.2. Who was displaced</h3>
  <div class="frame__body">

  <div id="placebo-men">
    <div class="ph-readout" aria-live="polite"></div>

    <div class="ph-wrap">
      <svg role="img" aria-labelledby="ph-title ph-desc">
        <title id="ph-title">Male occupation placebo DiD distribution</title>
        <desc id="ph-desc">A density curve formed from 231 large control occupations. Hollow
          circles mark each occupation. Bootmakers are highlighted in red at 0.68 percentage
          points, the 77.9th percentile.</desc>
      </svg>
      <div class="ph-tip" role="tooltip" hidden></div>
    </div>

  </div>

  </div>
</section>

<style>
  #placebo-men { width: 100%; position: relative; color: #333; }
  #placebo-men .ph-sub { font-size: .95rem; color: #555; line-height: 1.6; max-width: 900px; margin: 2px 0 14px; }
  #placebo-men .ph-legend { display: flex; flex-wrap: wrap; gap: 8px 22px; align-items: center; color: #777; font-size: .85rem; }
  #placebo-men .ph-legend span { display: inline-flex; align-items: center; gap: 7px; }
  #placebo-men .ph-note { color: #999; }
  #placebo-men .ph-line { display: inline-block; width: 18px; border-top: 1px dashed #aaa; }
  #placebo-men .ph-readout { min-height: 22px; margin: 10px 0 2px; font-weight: 600; font-variant-numeric: tabular-nums; color: #222; }
  #placebo-men .ph-wrap { position: relative; width: 100%; }
  #placebo-men svg { display: block; width: 100%; height: auto; overflow: visible; }
  #placebo-men .ph-frame { fill: none; stroke: #e2e2e2; stroke-width: 1; }
  #placebo-men .ph-density { fill: none; stroke: #2f4b7c; stroke-width: 2.25; }
  #placebo-men .ph-quant { stroke: #bbb; stroke-width: 1; stroke-dasharray: 4 4; opacity: .7; }
  #placebo-men .ph-quant.median { stroke-dasharray: none; opacity: .8; }
  #placebo-men .ph-quant-label { fill: #999; font-size: 12px; }
  #placebo-men .ph-pt { fill: #fff; stroke: #9aa0a6; stroke-width: 1.15; opacity: .62; pointer-events: none; }
  #placebo-men .ph-boot-pt { fill: #fff; stroke: #9aa0a6; stroke-width: 1.15; opacity: .62; pointer-events: none; }
  #placebo-men .ph-hover-pt { fill: #ffe9a8; stroke: #333; stroke-width: 1.5; pointer-events: none; }
  #placebo-men .ph-axis text, #placebo-men .ph-axis-title { fill: #555; font-size: 12px; }
  #placebo-men .ph-axis path, #placebo-men .ph-axis line { stroke: #ccc; }
  #placebo-men .ph-hit { fill: transparent; pointer-events: all; }
  #placebo-men .ph-tip {
    position: absolute; z-index: 3; pointer-events: none; max-width: 280px; padding: 9px 11px;
    background: #fff; border: 1px solid #ccc; border-radius: 6px; font-size: 13px; line-height: 1.45;
    box-shadow: 0 4px 14px rgba(0,0,0,.14);
  }
  #placebo-men .ph-tip strong { display: block; margin-bottom: 3px; }
  #placebo-men .ph-take { font-size: .95rem; color: #444; line-height: 1.6; max-width: 900px; margin: 14px 0 0; }
</style>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    var root = document.getElementById("placebo-men");
    if (!root || typeof d3 === "undefined") return;

    var svg     = d3.select(root.querySelector("svg"));
    var wrap    = root.querySelector(".ph-wrap");
    var tip     = root.querySelector(".ph-tip");
    var readout = root.querySelector(".ph-readout");

    var fB = d3.format(".2f"), fP = d3.format(".1f");
    var controls = [], boot = null, pinned = false;

    function titleCase(s){
      return String(s).toLowerCase().replace(/\b[a-z]/g, function(m){ return m.toUpperCase(); });
    }
    function suffix(v){
      var r = Math.round(v), m100 = r % 100;
      if (m100 >= 11 && m100 <= 13) return "th";
      var m10 = r % 10;
      return m10 === 1 ? "st" : m10 === 2 ? "nd" : m10 === 3 ? "rd" : "th";
    }
    function resetReadout(){
      if (!boot) return;
      readout.textContent = "Bootmakers · " + fB(boot.beta) + " percentage points · " +
                            fP(boot.percentile) + suffix(boot.percentile) + " percentile";
    }

    d3.csv("/assets/Results/Change_Exit_M_Large.csv?v=1").then(function(rows){
      rows.forEach(function(r){
        var beta = parseFloat(r["DiD_beta_pp.x"]);
        var pct  = parseFloat(r["DiD_percentile"]);
        if (!isFinite(beta)) return;
        if (/^Pooled bootmaker/i.test(r.DiD_beta_type)) {
          if (!boot) boot = { code: "663–666", name: "Bootmakers", beta: beta, percentile: pct };
        } else {
          controls.push({ code: r.occode, name: titleCase(r.level3), beta: beta, percentile: pct });
        }
      });
      controls.sort(function(a, b){ return d3.ascending(a.beta, b.beta); });
      if (!boot || !controls.length) return;
      resetReadout();
      new ResizeObserver(draw).observe(wrap);
      draw();
    });

    function gauss(u){ return Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI); }

    function bandwidth(v){
      var n = v.length, sd = d3.deviation(v) || 0;
      var s = v.slice().sort(d3.ascending);
      var iqr = d3.quantileSorted(s, .75) - d3.quantileSorted(s, .25);
      var scale = Math.min(sd || Infinity, iqr > 0 ? iqr / 1.34 : Infinity);
      if (!isFinite(scale) || scale <= 0) scale = sd || 1;
      return 0.9 * scale * Math.pow(n, -0.2);
    }

    function draw(){
      var width  = Math.max(360, Math.floor(wrap.getBoundingClientRect().width));
      var height = Math.max(330, Math.min(470, Math.round(width * 0.42)));
      var M = { top: 28, right: 26, bottom: 58, left: 64 };
      var iW = width - M.left - M.right, iH = height - M.top - M.bottom;

      svg.attr("viewBox", "0 0 " + width + " " + height);
      svg.selectAll("g.ph-layer").remove();

      var vals = controls.map(function(d){ return d.beta; });
      var ext  = d3.extent(vals.concat([boot.beta]));
      var span = (ext[1] - ext[0]) || 1;
      var xDom = [ext[0] - span * 0.055, ext[1] + span * 0.055];
      var bw   = bandwidth(vals);

      function densityAt(v){ return d3.mean(vals, function(u){ return gauss((v - u) / bw); }) / bw; }

      var samples = d3.range(420).map(function(i){
        var xv = xDom[0] + (i / 419) * (xDom[1] - xDom[0]);
        return { x: xv, y: densityAt(xv) };
      });
      controls.forEach(function(d){ d.density = densityAt(d.beta); });
      boot.density = densityAt(boot.beta);

      var x = d3.scaleLinear().domain(xDom).range([M.left, M.left + iW]);
      var y = d3.scaleLinear().domain([0, d3.max(samples, function(d){ return d.y; }) * 1.1]).nice()
                .range([M.top + iH, M.top]);

      var g = svg.append("g").attr("class", "ph-layer");

      g.append("rect").attr("class", "ph-frame")
        .attr("x", M.left).attr("y", M.top).attr("width", iW).attr("height", iH);

      var sorted = vals.slice().sort(d3.ascending);
      var quants = [
        { label: "P10", v: d3.quantileSorted(sorted, .10) },
        { label: "P25", v: d3.quantileSorted(sorted, .25) },
        { label: "Median", v: d3.quantileSorted(sorted, .50), median: true },
        { label: "P75", v: d3.quantileSorted(sorted, .75) },
        { label: "P90", v: d3.quantileSorted(sorted, .90) }
      ];

      g.selectAll("line.ph-quant").data(quants).join("line")
        .attr("class", function(d){ return "ph-quant" + (d.median ? " median" : ""); })
        .attr("x1", function(d){ return x(d.v); }).attr("x2", function(d){ return x(d.v); })
        .attr("y1", M.top).attr("y2", M.top + iH);

      g.selectAll("text.ph-quant-label")
        .data(width < 560 ? quants.filter(function(d){ return d.median || d.label === "P10" || d.label === "P90"; }) : quants)
        .join("text").attr("class", "ph-quant-label")
        .attr("x", function(d){ return x(d.v); }).attr("y", M.top + 14)
        .attr("text-anchor", "middle").text(function(d){ return d.label; });

      g.append("path").datum(samples).attr("class", "ph-density")
        .attr("d", d3.line().x(function(d){ return x(d.x); }).y(function(d){ return y(d.y); }).curve(d3.curveBasis));

      g.selectAll("circle.ph-pt").data(controls).join("circle").attr("class", "ph-pt")
        .attr("cx", function(d){ return x(d.beta); })
        .attr("cy", function(d){ return y(d.density); })
        .attr("r", 2.7);

      g.append("circle").attr("class", "ph-boot-pt")
        .attr("cx", x(boot.beta)).attr("cy", y(boot.density)).attr("r", 2.7);


      g.append("g").attr("class", "ph-axis")
        .attr("transform", "translate(0," + (M.top + iH) + ")")
        .call(d3.axisBottom(x).ticks(width < 560 ? 5 : 8).tickSizeOuter(0));
      g.append("g").attr("class", "ph-axis")
        .attr("transform", "translate(" + M.left + ",0)")
        .call(d3.axisLeft(y).ticks(4).tickSizeOuter(0));

      g.append("text").attr("class", "ph-axis-title")
        .attr("x", M.left + iW / 2).attr("y", height - 12).attr("text-anchor", "middle")
        .text("Regression-adjusted DiD coefficient (percentage points)");
      g.append("text").attr("class", "ph-axis-title")
        .attr("transform", "rotate(-90)").attr("x", -(M.top + iH / 2)).attr("y", 15)
        .attr("text-anchor", "middle").text("Density");

      var hoverPt = g.append("circle").attr("class", "ph-hover-pt").attr("r", 5).style("display", "none");
      var bisect = d3.bisector(function(d){ return d.beta; }).center;

      function pick(event){
        var px = d3.pointer(event, g.node())[0];
        var beta = x.invert(Math.max(M.left, Math.min(M.left + iW, px)));
        var d = controls[Math.max(0, Math.min(controls.length - 1, bisect(controls, beta)))];
        hoverPt.style("display", null).attr("cx", x(d.beta)).attr("cy", y(d.density));
        readout.textContent = d.name + " (code " + d.code + ") · " + fB(d.beta) +
                              " percentage points · " + fP(d.percentile) + suffix(d.percentile) + " percentile";
        var rect = root.getBoundingClientRect();
        tip.innerHTML = "<strong>" + d.name + "</strong>" +
          "<div>Occupation code: " + d.code + "</div>" +
          "<div>DiD: " + fB(d.beta) + " percentage points</div>" +
          "<div>Percentile: " + fP(d.percentile) + "</div>";
        tip.hidden = false;
        var left = Math.max(6, Math.min(rect.width - tip.offsetWidth - 6, event.clientX - rect.left + 14));
        var top  = Math.max(6, event.clientY - rect.top - tip.offsetHeight - 12);
        tip.style.left = left + "px";
        tip.style.top  = top + "px";
      }

      g.append("rect").attr("class", "ph-hit")
        .attr("x", M.left).attr("y", M.top).attr("width", iW).attr("height", iH)
        .on("pointermove", function(e){ if (!pinned) pick(e); })
        .on("pointerdown", function(e){ pinned = !pinned; pick(e); })
        .on("pointerleave", function(){
          if (pinned) return;
          tip.hidden = true;
          hoverPt.style("display", "none");
          resetReadout();
        });
    }
  });
})();
</script>


<section class="frame">
  <div class="in-kicker">Results · A: Workforce in Transition</div>
<h3>1.3. Did contraction push workers out?</h3>
  <div class="frame__body">

  <div id="sc-legend-a" class="sc-legend"></div>

  <div class="sc-row">
    <div class="sc-panel" style="flex:0 1 880px;">
      <div class="sc-ptitle">Change in exit</div>
      <svg id="sc-svg-exit"></svg>
      <div class="sc-tip" id="sc-tip-exit"></div>
    </div>
  </div>

  </div>
</section>

<section class="frame">
  <div class="in-kicker">Results · A: Workforce in Transition</div>
<h3>1.4. Or did it stop new ones coming in?</h3>
  <div class="frame__body">

  <div id="sc-legend-c" class="sc-legend"></div>

  <div class="sc-row">
    <div class="sc-panel" style="flex:0 1 1060px;">
      <div class="sc-ptitle">Change in entry</div>
      <svg id="sc-svg-entry"></svg>
      <div class="sc-pnote sc-pnote--below" id="sc-entry-note">Change in entry relative to the occupation's own 1851&ndash;61 rate</div>
      <div class="sc-tip" id="sc-tip-entry"></div>
    </div>
  </div>

  </div>
</section>

<section class="frame">
  <div class="in-kicker">Results · A: Workforce in Transition</div>
<h3>1.5. More unusual on exit, or on entry?</h3>
  <div class="frame__body">

  <p class="sc-sub sc-sub--wide">
    Each occupation is ranked twice against the same universe of 235 large male occupations:
    once on how far its exit rate rose, once on how far its entry collapsed. Putting both on a
    percentile scale makes the two margins comparable, and asks which of them an occupation is
    really an outlier on.
  </p>

  <div id="sc-legend-b" class="sc-legend"></div>

  <div class="sc-row">
    <div class="sc-panel sc-panel--joint" style="flex:0 1 820px;">
      <div class="sc-ptitle">Exit percentile against entry percentile</div>
      <svg id="sc-svg-joint"></svg>
      <div class="sc-tip" id="sc-tip-joint"></div>
    </div>
    <div class="sc-aside">
      <ul class="in-list sc-points">
        <li>Everything is extreme on entry. All 18 sit above the 71st percentile of entry
            collapse.</li>
        <li>Exit is what separates them.</li>
      </ul>
    </div>
  </div>

  </div>
</section>

<style>
  .sc-sub { font-size:.95rem; color:#555; line-height:1.6; max-width:1000px; margin:10px 0 16px; }

  #sc-legend-a, #sc-legend-c { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:4px; }
  #sc-legend-a button, #sc-legend-c button {
    font:inherit; font-size:13px; display:inline-flex; align-items:center; gap:7px;
    padding:5px 13px 5px 10px; border:1px solid #ddd; border-radius:16px; background:#fff;
    color:#444; cursor:pointer;
  }
  #sc-legend-a button .sw, #sc-legend-c button .sw { width:11px; height:11px; border-radius:50%; display:inline-block; }
  #sc-legend-a button .n, #sc-legend-c button .n { color:#999; font-variant-numeric:tabular-nums; }
  #sc-legend-a button.off, #sc-legend-c button.off { opacity:.4; background:#fafafa; text-decoration:line-through; }
  .sc-sub--wide { max-width: none; }
  .sc-aside { flex: 0 1 280px; min-width: 210px; padding-top: 74px; }
  .sc-panel--joint { margin-top: 30px; }
  .sc-pnote--below { margin: 10px 0 0; min-height: 0; }
  .sc-points li { font-size: .98rem; line-height: 1.55; color: #444; margin-bottom: 18px; }
  .sc-hint { font-size:.82rem; color:#999; margin:2px 0 14px; }

  .sc-row { display:flex; gap:26px; flex-wrap:wrap; align-items:flex-start; }
  .sc-panel { flex:1 1 520px; min-width:430px; position:relative; }
  .sc-ptitle { font-size:1.02rem; font-weight:700; color:#222; margin:0 0 2px; }
  .sc-pnote { font-size:.84rem; color:#888; margin:0 0 6px; min-height:1.2em; }

  svg { display:block; width:100%; height:auto; overflow:visible; }
  .sc-grid line { stroke:#f1f1f1; }
  .sc-axis text { fill:#666; font-size:11.5px; }
  .sc-axis path, .sc-axis line { stroke:#ccc; }
  .sc-axis-title { fill:#666; font-size:11.5px; }
  .sc-zero { stroke:#999; stroke-width:1; stroke-dasharray:5 4; }
  .sc-zerolab { fill:#aaa; font-size:10.5px; }
  .sc-dot { stroke:#fff; stroke-width:1.4; cursor:pointer; }
  .sc-lab { font-size:10px; fill:#666; pointer-events:none; }
  .sc-tip { position:absolute; pointer-events:none; visibility:hidden; background:#fff;
         border:1px solid #ccc; border-radius:6px; padding:8px 11px; font-size:13px;
         line-height:1.45; box-shadow:0 4px 14px rgba(0,0,0,.14); z-index:5; max-width:290px; }
  .sc-tip strong { display:block; margin-bottom:3px; }

  /* scatter frames */
  .sc-sub { font-size:.95rem; color:#555; line-height:1.6; max-width:1040px; margin:6px 0 14px; }
  .sc-legend { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:4px; }
  .sc-legend button {
    font:inherit; font-size:13px; display:inline-flex; align-items:center; gap:7px;
    padding:5px 13px 5px 10px; border:1px solid #ddd; border-radius:16px; background:#fff;
    color:#444; cursor:pointer;
  }
  .sc-legend button .sw { width:11px; height:11px; border-radius:50%; display:inline-block; }
  .sc-legend button .n { color:#999; font-variant-numeric:tabular-nums; }
  .sc-legend button.off { opacity:.4; background:#fafafa; text-decoration:line-through; }
</style>

<script>
(function(){
  var SHORT = {
    "37":"Church officers", "84":"Domestic servants", "91":"Prison officers",
    "175":"Farmers' sons",  "181":"Ag. labourers",    "208":"Copper miners",
    "210":"Lead miners",    "211":"Other miners",     "257":"Patternmakers",
    "305":"Nail makers",    "339":"Other metal",      "406":"Thatchers",
    "453":"Sawyers",        "486":"Tallow chandlers", "558":"Wool carding",
    "561":"Wool weaving",   "566":"Wool, other",      "574":"Silk spinners",
    "576":"Silk weaving",   "577":"Ribbon",           "580":"Flax & linen",
    "584":"Rope & twine",   "592":"Hosiery",          "606":"Weavers",
    "607":"Sundry fabrics", "608":"Factory hands",    "627":"Textile finishers",
    "653":"Tailors",        "660":"Button makers",    "661":"Gloves",
    "750":"Sundry trades",  "768":"Artisans",         "770":"Factory labourers"
  };
  var CATS = [
    { key:"Adjustment",       label:"Adjustment",       col:"#238B45" },
    { key:"Rubbish category", label:"Rubbish category", col:"#D99A2B" },
    { key:"Category error",   label:"Category error",   col:"#7E57C2" }
  ];
  var hidden = {};

  var fmt1 = d3.format(".1f"), fmt2 = d3.format(".2f"), fmt3 = d3.format(".3f");
  function clean(s){ return String(s).replace(/�|â€“|Â€“/g,"–").replace(/\s+/g," ").trim(); }
  function title(s){ return clean(s).toLowerCase().replace(/\b[a-z]/g,function(m){return m.toUpperCase();}); }
  function colOf(t){ var c = CATS.filter(function(c){return c.key===t;})[0]; return c ? c.col : "#888"; }

  function makeChart(opts){
    var W = 700, H = 460, M = { top:18, right:26, bottom:54, left:66 };
    var iW = W-M.left-M.right, iH = H-M.top-M.bottom;
    var svg = d3.select(opts.svg).attr("viewBox",[0,0,W,H]);
    var tip = d3.select(opts.tip);
    var g   = svg.append("g").attr("transform","translate("+M.left+","+M.top+")");

    var gridY = g.append("g").attr("class","sc-grid"), gridX = g.append("g").attr("class","sc-grid");
    var zero = g.append("line").attr("class","sc-zero");
    var zlab  = g.append("text").attr("class","sc-zerolab");
    var axX   = g.append("g").attr("class","sc-axis").attr("transform","translate(0,"+iH+")");
    var axY   = g.append("g").attr("class","sc-axis");
    g.append("text").attr("class","sc-axis-title").attr("x",iW/2).attr("y",iH+42)
      .attr("text-anchor","middle").text("Change in employment, 1851–1881");
    var yTitle = g.append("text").attr("class","sc-axis-title").attr("transform","rotate(-90)")
      .attr("x",-(iH/2)).attr("y",-48).attr("text-anchor","middle");
    var labLayer = g.append("g"), dotLayer = g.append("g");
    var x = d3.scaleLinear().range([0,iW]), y = d3.scaleLinear().range([iH,0]);

    function render(data, accessor, yLabel){
      var live = data.filter(function(d){ return !hidden[d.type]; });
      var vals = data.map(accessor).filter(isFinite);

      x.domain(d3.extent(data,function(d){return d.x;})).nice();
      x.domain([x.domain()[0]-3, Math.min(2, x.domain()[1]+3)]);
      // Always keep zero in view: "every occupation sits below the line" is only
      // visible if the line is on the chart. opts.yMax forces headroom above it,
      // so the empty space itself carries the point.
      var ye = d3.extent(vals.concat([0])), pad = (ye[1]-ye[0])*0.08 || 1;
      y.domain([ye[0]-pad, opts.yMax != null ? opts.yMax : ye[1]+pad]);
      yTitle.text(yLabel);

      gridY.selectAll("line").data(y.ticks(7)).join("line")
        .attr("x1",0).attr("x2",iW).attr("y1",y).attr("y2",y);
      gridX.selectAll("line").data(x.ticks(7)).join("line")
        .attr("y1",0).attr("y2",iH).attr("x1",x).attr("x2",x);

      zero.attr("x1",0).attr("x2",iW).attr("y1",y(0)).attr("y2",y(0));
      zlab.attr("x",4).attr("y",y(0)-6).text(opts.zeroLabel);

      axX.call(d3.axisBottom(x).ticks(7).tickFormat(function(v){return v+"%";}).tickSizeOuter(0));
      axY.call(d3.axisLeft(y).ticks(7).tickSizeOuter(0));

      dotLayer.selectAll("circle").data(data, function(d){return d.code;}).join("circle")
        .attr("class","sc-dot").attr("r",6)
        .attr("cx",function(d){return x(d.x);})
        .attr("cy",function(d){return y(accessor(d));})
        .attr("fill",function(d){return colOf(d.type);})
        .attr("display",function(d){return hidden[d.type] ? "none" : null;})
        .on("mouseover",function(event,d){
          d3.select(this).attr("r",9);
          tip.style("visibility","visible").html(
            "<strong>"+d.name+"</strong>"+
            "<div style='color:#777'>code "+d.code+" · "+d.type+"</div>"+
            "<div>Employment 1851–1881: "+fmt1(d.x)+"%</div>"+
            opts.tipExtra(d));
        })
        .on("mousemove",function(event){
          var r = this.closest(".sc-panel").getBoundingClientRect();
          tip.style("left", Math.min(r.width-300, event.clientX-r.left+14)+"px")
             .style("top",  Math.max(4, event.clientY-r.top-10)+"px");
        })
        .on("mouseout",function(){ d3.select(this).attr("r",6); tip.style("visibility","hidden"); });

      // greedy label placement; anything that would collide is dropped
      var placed = [], out = [];
      function fits(b){
        if (b.x < -60 || b.x+b.w > iW+22 || b.y < -4 || b.y+b.h > iH+4) return false;
        return !placed.some(function(p){
          return !(b.x+b.w<p.x || p.x+p.w<b.x || b.y+b.h<p.y || p.y+p.h<b.y);
        });
      }
      live.slice().sort(function(a,b){ return Math.abs(accessor(b))-Math.abs(accessor(a)); })
        .forEach(function(d){
          var cx=x(d.x), cy=y(accessor(d)), w=d.short.length*5.3+4, h=11;
          var tries=[
            {x:cx+9,   y:cy-5.5, a:"start"},
            {x:cx-9-w, y:cy-5.5, a:"end"},
            {x:cx-w/2, y:cy-17,  a:"middle"},
            {x:cx-w/2, y:cy+7,   a:"middle"}
          ];
          for (var i=0;i<tries.length;i++){
            var b={x:tries[i].x,y:tries[i].y,w:w,h:h};
            if (fits(b)){
              placed.push(b);
              out.push({ d:d, tx: tries[i].a==="end"?cx-9:(tries[i].a==="middle"?cx:cx+9),
                         ty: b.y+8.5, a:tries[i].a });
              return;
            }
          }
        });
      labLayer.selectAll("text").data(out,function(o){return o.d.code;}).join("text")
        .attr("class","sc-lab")
        .attr("x",function(o){return o.tx;}).attr("y",function(o){return o.ty;})
        .attr("text-anchor",function(o){return o.a;})
        .text(function(o){return o.d.short;});
    }
    return render;
  }

  Promise.all([
    d3.csv("/assets/Results/scatter_M_negative_classified.csv"),
    d3.csv("/assets/Results/scatter_M_negative_classified_Entry.csv"),
    d3.csv("/assets/Results/entry_exit_percentiles_M_33_contracting.csv?v=1")
  ]).then(function(res){
    var exitRows = res[0], entryRows = res[1], pctRows = res[2];
    var entryBy = {}, pctBy = {};
    entryRows.forEach(function(r){ entryBy[r.occode] = r; });
    // percentiles are against all 235 large male occupations, not within the 33,
    // so the two margins can be compared without the ranks being zero-sum
    pctRows.forEach(function(r){ pctBy[r.occode] = r; });

    var data = exitRows.map(function(r){
      var e = entryBy[r.occode] || {};
      var q = pctBy[r.occode] || {};
      return {
        exit_q:  +q.exit_increase_percentile,
        entry_q: +q.entry_collapse_percentile,
        bal:     +q.mechanism_balance_percentile,
        code: r.occode,
        name: title(r.level3),
        short: SHORT[r.occode] || title(r.level3).split(/[ ,;(]/)[0],
        x: +r.employment_pct_change_1851_1881,
        exit: +r.DiD_beta_pp,
        pct: +r.DiD_percentile,
        entry_pp: +e.entry_change_pp,
        entry_pct: +e.entry_change_pct,
        rate1: +e.Rate_P1, rate2: +e.Rate_P2,
        ent1: +e.Entrants_P1, ent2: +e.Entrants_P2,
        type: r.occupation_type
      };
    }).filter(function(d){ return isFinite(d.x); });

    // Sample restriction: an occupation must have at least 250 entrants in BOTH
    // panels. Entrants are a small fraction of the linked sample, so without this
    // the entry sc-panel rests on a few dozen people for some occupations.
    var MIN_ENTRANTS = 250;
    data = data.filter(function(d){ return d.ent1 >= MIN_ENTRANTS && d.ent2 >= MIN_ENTRANTS; });

    var renderExit = makeChart({
      svg:"#sc-svg-exit", tip:"#sc-tip-exit", zeroLabel:"no change in exit",
      tipExtra: function(d){
        return "<div>Change in exit: "+fmt2(d.exit)+" pp</div>"+
               "<div style='color:#777'>"+fmt1(d.pct)+"th percentile</div>";
      }
    });
    var renderEntry = makeChart({
      svg:"#sc-svg-entry", tip:"#sc-tip-entry", zeroLabel:"no change in entry", yMax:40,
      tipExtra: function(d){
        return "<div>Change in entry: "+fmt1(d.entry_pct)+"% ("+fmt3(d.entry_pp)+" pp)</div>"+
               "<div style='color:#777'>entry rate "+fmt3(d.rate1)+"% → "+fmt3(d.rate2)+"%</div>"+
               "<div style='color:#777'>entrants "+d3.format(",")(d.ent1)+" → "+d3.format(",")(d.ent2)+"</div>";
      }
    });

    function renderJoint(){
      // A square plot area, so the diagonal really is 45 degrees on screen and
      // "further from the line" means what it looks like it means.
      var SIDE = 620, M = { top:18, right:26, bottom:56, left:70 };
      var W = SIDE+M.left+M.right, H = SIDE+M.top+M.bottom, iW = SIDE, iH = SIDE;
      var svg = d3.select("#sc-svg-joint").attr("viewBox",[0,0,W,H]);
      var tip = d3.select("#sc-tip-joint");
      svg.selectAll("*").remove();
      var g = svg.append("g").attr("transform","translate("+M.left+","+M.top+")");

      // fixed 0-100 on both axes: the point is partly that the cloud is jammed
      // against the right-hand edge, and a fitted domain would hide that
      var x = d3.scaleLinear().domain([0,100]).range([0,iW]);
      var y = d3.scaleLinear().domain([0,100]).range([iH,0]);

      g.append("g").attr("class","sc-grid").selectAll("line").data(y.ticks(10)).join("line")
        .attr("x1",0).attr("x2",iW).attr("y1",y).attr("y2",y);
      g.append("g").attr("class","sc-grid").selectAll("line").data(x.ticks(10)).join("line")
        .attr("y1",0).attr("y2",iH).attr("x1",x).attr("x2",x);

      // the 45-degree line: equally unusual on both margins
      g.append("line").attr("class","sc-zero")
        .attr("x1",x(0)).attr("y1",y(0)).attr("x2",x(100)).attr("y2",y(100));
      g.append("text").attr("class","sc-zerolab")
        .attr("x",10).attr("y",16).attr("fill","#999")
        .text("above the line: more unusual on EXIT");
      g.append("text").attr("class","sc-zerolab")
        .attr("x",iW-6).attr("y",iH-10).attr("text-anchor","end").attr("fill","#999")
        .text("below the line: more unusual on ENTRY");

      g.append("g").attr("class","sc-axis").attr("transform","translate(0,"+iH+")")
        .call(d3.axisBottom(x).ticks(10).tickSizeOuter(0));
      g.append("g").attr("class","sc-axis")
        .call(d3.axisLeft(y).ticks(10).tickSizeOuter(0));
      g.append("text").attr("class","sc-axis-title").attr("x",iW/2).attr("y",iH+42)
        .attr("text-anchor","middle").text("Entry collapse — percentile among 235 large occupations");
      g.append("text").attr("class","sc-axis-title").attr("transform","rotate(-90)")
        .attr("x",-(iH/2)).attr("y",-52).attr("text-anchor","middle")
        .text("Exit increase — percentile among 235 large occupations");

      var live = data.filter(function(d){ return !hidden[d.type]; });
      var labLayer = g.append("g"), dotLayer = g.append("g");

      dotLayer.selectAll("circle").data(data, function(d){return d.code;}).join("circle")
        .attr("class","sc-dot").attr("r",6)
        .attr("cx",function(d){return x(d.entry_q);})
        .attr("cy",function(d){return y(d.exit_q);})
        .attr("fill",function(d){return colOf(d.type);})
        .attr("display",function(d){return hidden[d.type] ? "none" : null;})
        .on("mouseover",function(event,d){
          d3.select(this).attr("r",9);
          var side = d.bal >= 0 ? "more unusual on exit" : "more unusual on entry";
          tip.style("visibility","visible").html(
            "<strong>"+d.name+"</strong>"+
            "<div style='color:#777'>code "+d.code+" · "+d.type+"</div>"+
            "<div>Exit: "+fmt1(d.exit_q)+"th percentile</div>"+
            "<div>Entry: "+fmt1(d.entry_q)+"th percentile</div>"+
            "<div style='color:#777'>"+d3.format("+.1f")(d.bal)+" — "+side+"</div>"+
            "<div style='color:#777'>employment "+fmt1(d.x)+"%</div>");
        })
        .on("mousemove",function(event){
          var r2 = this.closest(".sc-panel").getBoundingClientRect();
          tip.style("left", Math.min(r2.width-300, event.clientX-r2.left+14)+"px")
             .style("top",  Math.max(4, event.clientY-r2.top-10)+"px");
        })
        .on("mouseout",function(){ d3.select(this).attr("r",6); tip.style("visibility","hidden"); });

      var placed = [], out = [];
      function fits(b){
        if (b.x < -60 || b.x+b.w > iW+22 || b.y < -4 || b.y+b.h > iH+4) return false;
        return !placed.some(function(p){
          return !(b.x+b.w<p.x || p.x+p.w<b.x || b.y+b.h<p.y || p.y+p.h<b.y);
        });
      }
      // label the most lopsided first -- those are the ones worth naming
      live.slice().sort(function(a2,b2){ return Math.abs(b2.bal)-Math.abs(a2.bal); })
        .forEach(function(d){
          var cx=x(d.entry_q), cy=y(d.exit_q), w=d.short.length*5.3+4, h=11;
          var tries=[{x:cx-9-w,y:cy-5.5,a:"end"},{x:cx+9,y:cy-5.5,a:"start"},
                     {x:cx-w/2,y:cy-17,a:"middle"},{x:cx-w/2,y:cy+7,a:"middle"}];
          for (var i2=0;i2<tries.length;i2++){
            var b={x:tries[i2].x,y:tries[i2].y,w:w,h:h};
            if (fits(b)){
              placed.push(b);
              out.push({d:d, tx: tries[i2].a==="end"?cx-9:(tries[i2].a==="middle"?cx:cx+9),
                        ty:b.y+8.5, a:tries[i2].a});
              return;
            }
          }
        });
      labLayer.selectAll("text").data(out,function(o){return o.d.code;}).join("text")
        .attr("class","sc-lab")
        .attr("x",function(o){return o.tx;}).attr("y",function(o){return o.ty;})
        .attr("text-anchor",function(o){return o.a;})
        .text(function(o){return o.d.short;});
    }

    function drawAll(){
      renderExit(data, function(d){return d.exit;}, "Change in exit, DiD coefficient (pp)");
      // Relative, not percentage points: entry rates differ by an order of magnitude
      // across these occupations, so pp changes are not comparable between them.
      renderEntry(data, function(d){return d.entry_pct;},
                  "Change in entry (% of its own 1851–61 rate)");
      renderJoint();
    }

    var counts = {};
    data.forEach(function(d){ counts[d.type] = (counts[d.type]||0)+1; });
    d3.selectAll("#sc-legend-a, #sc-legend-b, #sc-legend-c").selectAll("button").data(CATS).join("button")
      .html(function(c){
        return '<span class="sw" style="background:'+c.col+'"></span>'+c.label+
               ' <span class="n">'+(counts[c.key]||0)+'</span>';
      })
      .on("click", function(event,c){
        hidden[c.key] = !hidden[c.key];
        d3.selectAll("#sc-legend-a button, #sc-legend-b button, #sc-legend-c button")
          .classed("off", function(cc){ return !!hidden[cc.key]; });
        drawAll();
      });

    drawAll();
  });
})();
</script>


<section class="frame frame--section frame--block">
  <h2>Results</h2>
  <div class="blocklab">B: Social Mobility</div>
</section>


<section class="frame">
  <div class="in-kicker">Results · B: Social Mobility</div>
<h3>2.1. Who were the managers?</h3>
  <div class="frame__body">

  <div class="fm-row fm-row--low">
    <div class="fm-panel">
      <div class="fm-ptitle">Occupations totaling 50% of all managers by census year</div>
      <svg id="fm-svg"></svg>
      <div class="fm-tip" id="fm-tip"></div>
    </div>
    <div class="fm-aside">
      <ul class="in-list fm-points">
        <li>In 1851, seven occupations held half the managers.</li>
        <li>By 1901 it took thirty-one.</li>
        <li>Supervision spread out across the economy.</li>
      </ul>
    </div>
  </div>

  </div>
</section>

<section class="frame">
  <div class="in-kicker">Results · B: Social Mobility</div>
<h3>2.2. How many managers?</h3>
  <div class="frame__body">

  <div class="fm-row">
    <div class="fm-panel">
      <svg id="fm-svg-abs"></svg>
      <div class="fm-tip" id="fm-tip-abs"></div>
    </div>
    <div class="fm-aside">
      <ul class="in-list fm-points">
        <li>25,000 managers in 1851.</li>
        <li>282,000 by 1911, an elevenfold rise.</li>
        <li>More supervisors, spread over more trades.</li>
      </ul>
    </div>
  </div>

  </div>
</section>

<script>
(function(){
  var FM_W = 980, FM_H = 560, FM_M = { top: 26, right: 20, bottom: 46, left: 74 };

  function fmClean(s){
    return String(s || "").replace(/�|â€“|Â€“/g, "–").replace(/\s+/g, " ").trim();
  }
  function fmTitle(s){
    return fmClean(s).toLowerCase().replace(/\b[a-z]/g, function(m){ return m.toUpperCase(); });
  }
  var fmN = d3.format(","), fmP = d3.format(".1f");

  Promise.all([
    d3.csv("/assets/Foreman_by_occode_year2.csv?v=1"),
    d3.csv("/assets/data/occode_names.csv")
  ]).then(function(res){
    var rows = res[0].filter(function(r){ return r.occode && r.occode !== "NA"; });
    var names = {};
    res[1].forEach(function(r){ names[r.occode] = fmTitle(r.occ_name); });

    // Per year: rank the occupations and take them until they cover half the
    // managers. That cut-off is the point -- it needs 7 occupations in 1851 and
    // 31 by 1901. Both charts use this same selection.
    var byYear = d3.group(rows, function(r){ return +r.census_year; });
    var years = Array.from(byYear.keys()).sort(d3.ascending);
    var union = [], series = [];

    years.forEach(function(y){
      var v = byYear.get(y)
        // the column is foreman_n in the file; accept either spelling so a
        // rename of the wording can never silently zero the chart again
        .map(function(r){
          return { code: r.occode,
                   n: +(r.foreman_n !== undefined ? r.foreman_n : r.manager_n) };
        })
        .sort(function(a, b){ return b.n - a.n; });
      var total = d3.sum(v, function(d){ return d.n; });
      var cum = 0, top = [];
      for (var i = 0; i < v.length; i++){
        cum += v[i].n;
        top.push({ code: v[i].code, n: v[i].n, rank: i + 1 });
        if (cum / total >= 0.5) break;
      }
      top.forEach(function(d){ if (union.indexOf(d.code) < 0) union.push(d.code); });
      series.push({ year: y, total: total, top: top, topSum: cum, nOther: v.length - top.length });
    });

    // One global bottom-to-top order for every bar, so an occupation keeps its
    // place from census to census. Sort by how many years it appears in at all,
    // then by size: the three that show up in all six censuses -- farm bailiffs,
    // the unspecified managers, cotton -- therefore sit at the bottom each time,
    // and the occupations that come and go float above them.
    var appears = {}, weight = {};
    series.forEach(function(s){
      s.top.forEach(function(d){
        appears[d.code] = (appears[d.code] || 0) + 1;
        weight[d.code] = (weight[d.code] || 0) + d.n;
      });
    });
    var order = union.slice().sort(function(a, b){
      return (appears[b] - appears[a]) || (weight[b] - weight[a]);
    });
    var pos = {};
    order.forEach(function(c, i){ pos[c] = i; });

    // one stable colour per occupation across every bar and both charts
    var palette = d3.schemeTableau10
      .concat(d3.schemeSet2 || [])
      .concat(d3.schemeSet3 || [])
      .concat(d3.schemePaired || []);
    var colour = d3.scaleOrdinal().domain(order).range(palette);

    var maxTotal = d3.max(series, function(s){ return s.total; });

    // mode "share": every bar is 100% tall, so composition is comparable.
    // mode "count": bars are the actual number of managers, so the growth from
    // 25k to 282k is what you see instead.
    function draw(svgSel, tipSel, mode){
      var share = mode === "share";
      var svg = d3.select(svgSel).attr("viewBox", [0, 0, FM_W, FM_H]);
      var tip = d3.select(tipSel);
      var iW = FM_W - FM_M.left - FM_M.right, iH = FM_H - FM_M.top - FM_M.bottom;
      var g = svg.append("g").attr("transform", "translate(" + FM_M.left + "," + FM_M.top + ")");

      var x = d3.scaleBand().domain(years).range([0, iW]).padding(0.34);
      var y = d3.scaleLinear().domain([0, share ? 100 : maxTotal]).range([iH, 0]);
      function val(n, s){ return share ? 100 * n / s.total : n; }

      g.append("g").attr("class", "fm-grid").selectAll("line").data(y.ticks(5)).join("line")
        .attr("x1", 0).attr("x2", iW).attr("y1", y).attr("y2", y);

      // the grey remainder: every other occupation in that census
      g.selectAll("rect.fm-rest").data(series).join("rect").attr("class", "fm-rest")
        .attr("x", function(d){ return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", function(d){ return y(val(d.total, d)); })
        .attr("height", function(d){ return y(val(d.topSum, d)) - y(val(d.total, d)); })
        .on("mouseover", function(event, d){
          place();
          tip.style("visibility", "visible").html(
            "<strong>All other occupations</strong>" +
            "<div style='color:#777'>" + fmN(d.nOther) + " occupations</div>" +
            "<div>" + fmN(d.total - d.topSum) + " managers &middot; " +
              fmP(100 - 100 * d.topSum / d.total) + "% of " + d.year + "</div>");
        })
        .on("mouseout", out);

      var flat = [];
      series.forEach(function(s){
        var acc = 0;
        s.top.slice()
          .sort(function(a, b){ return pos[a.code] - pos[b.code]; })
          .forEach(function(d){
            var h = val(d.n, s);
            flat.push({ year: s.year, code: d.code, n: d.n, y0: acc, h: h,
                        pct: 100 * d.n / s.total, rank: d.rank,
                        appears: appears[d.code] });
            acc += h;
          });
      });

      g.selectAll("rect.fm-seg").data(flat).join("rect").attr("class", "fm-seg")
        .attr("x", function(d){ return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", function(d){ return y(d.y0 + d.h); })
        .attr("height", function(d){ return Math.max(0.6, y(d.y0) - y(d.y0 + d.h)); })
        .attr("fill", function(d){ return colour(d.code); })
        .on("mouseover", function(event, d){
          // light this occupation up in every year it appears
          g.selectAll("rect.fm-seg").classed("fm-dim", function(o){ return o.code !== d.code; });
          place();
          tip.style("visibility", "visible").html(
            "<strong>" + (names[d.code] || ("Occode " + d.code)) + "</strong>" +
            "<div style='color:#777'>occode " + d.code + " &middot; rank " + d.rank + " in " + d.year +
              " &middot; in the top half of " + d.appears + " of 6 censuses</div>" +
            "<div>" + fmN(d.n) + " managers &middot; " + fmP(d.pct) + "% of " + d.year + "</div>");
        })
        .on("mouseout", out);

      // over each bar: how many occupations it took, or the headcount itself
      g.selectAll("text.fm-count").data(series).join("text").attr("class", "fm-count")
        .attr("x", function(d){ return x(d.year) + x.bandwidth() / 2; })
        .attr("y", function(d){ return y(val(d.total, d)) - 8; })
        .attr("text-anchor", "middle")
        .text(function(d){ return share ? d.top.length : fmN(d.total); });

      g.append("g").attr("class", "fm-axis").attr("transform", "translate(0," + iH + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));
      g.append("g").attr("class", "fm-axis")
        .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0)
          .tickFormat(share ? function(v){ return v + "%"; } : fmN));

      // Fixed position rather than cursor-following: map a viewBox point in
      // the empty top-left of the plot into panel pixels, so the box never
      // lands on top of the bars whatever the svg has been scaled to.
      function place(){
        var node = svg.node();
        var p = node.closest(".fm-panel").getBoundingClientRect();
        var r = node.getBoundingClientRect();
        if (!r.width) return;
        tip.style("left", (r.left - p.left + (FM_M.left + 20) * (r.width / FM_W)) + "px")
           .style("top",  (r.top  - p.top  + (FM_M.top  + 16) * (r.height / FM_H)) + "px");
      }
      function out(){
        g.selectAll("rect.fm-seg").classed("fm-dim", false);
        tip.style("visibility", "hidden");
      }
    }

    draw("#fm-svg", "#fm-tip", "share");
    draw("#fm-svg-abs", "#fm-tip-abs", "count");
  });
})();
</script>

<style>
  .fm-row { display: flex; gap: 30px; align-items: flex-start; flex-wrap: wrap; }
  .fm-panel { flex: 0 1 980px; min-width: 420px; position: relative; margin-top: 18px; }
  .fm-row--low { margin-top: 70px; }
  .fm-aside { flex: 0 1 280px; min-width: 210px; padding-top: 66px; }
  .fm-ptitle { font-size: 1.02rem; font-weight: 700; color: #222; margin: 0 0 8px; }

  .fm-grid line { stroke: #f1f1f1; }
  .fm-axis text { fill: #666; font-size: 12px; }
  .fm-axis path, .fm-axis line { stroke: #ccc; }

  .fm-seg { stroke: #fff; stroke-width: 1; cursor: pointer; transition: opacity .12s; }
  .fm-dim { opacity: .18; }
  .fm-rest { fill: #ededed; stroke: #fff; stroke-width: 1; }
  .fm-count { fill: #555; font-size: 12.5px; font-variant-numeric: tabular-nums; }

  .fm-note { font-size: .84rem; color: #8a8a8a; line-height: 1.6; margin: 12px 0 0; max-width: 900px; }
  .fm-points li { font-size: .98rem; line-height: 1.55; color: #444; margin-bottom: 18px; }

  .fm-tip {
    position: absolute; pointer-events: none; visibility: hidden; background: #fff;
    border: 1px solid #ddd; border-radius: 4px; padding: 8px 11px; font-size: .84rem;
    color: #333; box-shadow: 0 2px 10px rgba(0,0,0,.10); width: 300px; line-height: 1.45;
  }
  .fm-tip strong { display: block; margin-bottom: 3px; }

  @media (max-width: 900px) {
    .fm-row { gap: 18px; }
    .fm-aside { padding-top: 0; }
  }
</style>


<section class="frame">
  <div class="in-kicker">Results · B: Social Mobility</div>
<h3>2.3. Where did managers come from?</h3>
  <div class="frame__body">

  <div class="fo-readout" id="fo-readout"></div>

  <div class="fo-grid" id="fo-grid"></div>

  </div>
</section>

<script>
(function(){
  // The branches to show, chosen by hand. Everything else falls into the tail.
  var KEEP = ["787", "181", "551", "119", "697", "765", "173"];

  var FILES = [1851, 1861, 1881, 1891, 1901].map(function(y){
    return d3.csv("/assets/Results/Foreman_origins_" + y + ".csv?v=1");
  });
  FILES.push(d3.csv("/assets/data/occode_names.csv"));

  var FO_W = 320, FO_H = 620;
  var TOP_Y = 30, TOP_H = 26;
  var NODE_H = 26, BOT_PAD = 26;
  var SIDE = 10, GAP_B = 5, GAP_T = 2.5, NECK = 0.84;
  var REST_FRAC = 0.085;          // the tail's fixed slice of the panel

  var NONE_COL = "#B9BFC6", REST_COL = "#E4E4E4";
  var PALETTE = ["#3C7DB1", "#6B9E78", "#C08A2E", "#9C6FA8",
                 "#5FA8A0", "#E0B66A", "#B07C5A"];

  function clean(s){
    return String(s || "").replace(/�|â€“/g, "–").replace(/\s+/g, " ").trim();
  }
  function title(s){
    return clean(s).toLowerCase().replace(/\b[a-z]/g, function(m){ return m.toUpperCase(); });
  }
  var fmt1 = d3.format(".1f"), fmtN = d3.format(",");

  Promise.all(FILES).then(function(res){
    var names = {};
    res.pop().forEach(function(r){ names[r.occode] = title(r.occ_name); });

    var wins = res.map(function(rows){
      var tot = d3.sum(rows, function(r){ return +r.foreman_n; });
      var by = {};
      rows.forEach(function(r){ by[r.occode_first_year] = +r.foreman_n; });
      return { lab: rows[0].first_year + " → " + rows[0].second_year,
               total: tot, by: by, nOrigins: rows.length };
    });

    // biggest first, measured over all five windows together
    var occ = KEEP.slice().sort(function(a, b){
      return d3.sum(wins, function(w){ return w.by[b] || 0; }) -
             d3.sum(wins, function(w){ return w.by[a] || 0; });
    });
    var order = occ.concat(["NA", "__REST__"]);

    var colour = {}, label = {};
    occ.forEach(function(c, i){
      colour[c] = PALETTE[i % PALETTE.length];
      label[c] = names[c] || ("Occode " + c);
    });
    colour["NA"] = NONE_COL;   label["NA"] = "No occupation recorded";
    colour["__REST__"] = REST_COL; label["__REST__"] = "All other occupations";

    var share = {};
    wins.forEach(function(w){
      var acc = 0;
      order.forEach(function(c){
        if (c === "__REST__") return;
        var v = 100 * (w.by[c] || 0) / w.total;
        share[c + "|" + w.lab] = v;
        acc += v;
      });
      share["__REST__|" + w.lab] = 100 - acc;
      w.named = acc;
      w.nRest = w.nOrigins - order.filter(function(c){
        return c !== "__REST__" && (w.by[c] || 0) > 0; }).length;
    });

    var INNER = FO_W - SIDE * 2;
    var REST_W = INNER * REST_FRAC;

    var grid = d3.select("#fo-grid"), readout = d3.select("#fo-readout");


    wins.forEach(function(w){
      var cell = grid.append("div").attr("class", "fo-cell");
      var svg = cell.append("svg").attr("class", "fo-svg").attr("viewBox", [0, 0, FO_W, FO_H]);
      cell.append("div").attr("class", "fo-wlab").text(w.lab);

      var live = order.filter(function(c){ return share[c + "|" + w.lab] > 0; });
      var yTopBot = TOP_Y + TOP_H, yNodeTop = FO_H - BOT_PAD - NODE_H;
      var mid = (yTopBot + yNodeTop) / 2;

      // The named branches share out everything the tail and the gaps leave,
      // so every panel spans the full width and the flows are as wide as the
      // space allows. Proportions within a panel stay true.
      var avail = INNER - REST_W - (live.length - 1) * GAP_B;
      var namedSum = d3.sum(live, function(c){
        return c === "__REST__" ? 0 : share[c + "|" + w.lab]; });

      var wid = live.map(function(c){
        return c === "__REST__" ? REST_W : avail * share[c + "|" + w.lab] / namedSum;
      });
      var neckSum = d3.sum(wid) * NECK + (live.length - 1) * GAP_T;
      var xb = SIDE, xt = SIDE + (INNER - neckSum) / 2;

      var bands = live.map(function(c, i){
        var b = { id: c, share: share[c + "|" + w.lab],
                  xb: xb, wb: wid[i], xt: xt, wt: wid[i] * NECK };
        xb += b.wb + GAP_B;
        xt += b.wt + GAP_T;
        return b;
      });

      svg.append("rect").attr("class", "fo-bar").attr("x", SIDE).attr("y", TOP_Y)
        .attr("width", INNER).attr("height", TOP_H).attr("rx", 2);
      svg.append("text").attr("class", "fo-cap")
        .attr("x", SIDE + INNER / 2).attr("y", TOP_Y - 10)
        .attr("text-anchor", "middle").text("all managers");

      svg.append("g").selectAll("path").data(bands).join("path")
        .attr("class", function(d){
          return "fo-ribbon" + (d.id === "__REST__" ? " fo-trunc" : ""); })
        .attr("data-src", function(d){ return d.id; })
        .attr("fill", function(d){ return colour[d.id]; })
        .attr("d", function(d){
          var l0 = d.xb, l1 = d.xt, r0 = d.xb + d.wb, r1 = d.xt + d.wt;
          return "M" + l0 + "," + yNodeTop +
                 "C" + l0 + "," + mid + " " + l1 + "," + mid + " " + l1 + "," + yTopBot +
                 "L" + r1 + "," + yTopBot +
                 "C" + r1 + "," + mid + " " + r0 + "," + mid + " " + r0 + "," + yNodeTop + "Z";
        })
        .on("mouseover", over).on("mouseout", out);

      svg.append("g").selectAll("rect.fo-node").data(bands).join("rect")
        .attr("class", function(d){
          return "fo-node" + (d.id === "__REST__" ? " fo-trunc" : ""); })
        .attr("data-src", function(d){ return d.id; })
        .attr("x", function(d){ return d.xb; }).attr("y", yNodeTop)
        .attr("width", function(d){ return d.wb; }).attr("height", NODE_H).attr("rx", 1.5)
        .attr("fill", function(d){ return colour[d.id]; })
        .on("mouseover", over).on("mouseout", out);
    });

    function over(event, d){
      d3.selectAll(".fo-ribbon, .fo-node")
        .classed("fo-dim", function(){ return this.getAttribute("data-src") !== d.id; });
      var trail = wins.map(function(w){
        return '<span class="fo-step"><span class="fo-step__w">' +
               w.lab.replace("→", "–") + '</span><span class="fo-step__v">' +
               fmt1(share[d.id + "|" + w.lab] || 0) + '%</span></span>';
      }).join("");
      var sub = d.id === "__REST__"
        ? '<span class="fo-step__w">not to scale</span>'
        : (d.id === "NA" ? '' : '<span class="fo-step__w">occode ' + d.id + '</span>');
      readout.html('<span class="fo-readout__sw" style="background:' + colour[d.id] + '"></span>' +
                   '<span class="fo-readout__name">' + label[d.id] + '</span>' + sub + trail);
    }
    function out(){
      d3.selectAll(".fo-ribbon, .fo-node").classed("fo-dim", false);
      readout.html('');
    }
  });
})();
</script>

<style>
  /* Fixed height and no wrapping: a long occupation name used to wrap onto a
     second line, which changed the height of this strip and shunted the whole
     grid down as the pointer moved. */
  .fo-readout {
    height: 30px; display: flex; align-items: center; flex-wrap: nowrap;
    overflow: hidden; gap: 0 16px; margin: 0 0 6px;
    font-size: .92rem; color: #333; white-space: nowrap;
  }
  .fo-readout__hint { color: #9a9a9a; font-size: .86rem; }
  .fo-readout__sw { width: 12px; height: 12px; border-radius: 2px; display: inline-block; margin-right: 9px; flex: none; }
  .fo-readout__name { font-weight: 600; margin-right: 10px; flex: none; }
  .fo-step { color: #666; font-size: .86rem; white-space: nowrap; flex: none; }
  .fo-step__w { color: #a0a0a0; margin-right: 6px; }
  .fo-step__v { font-variant-numeric: tabular-nums; color: #222; }

  .fo-grid { display: flex; gap: 18px; align-items: flex-start; }
  .fo-cell { flex: 1 1 0; min-width: 0; }
  .fo-svg { width: 100%; height: auto; display: block; }
  .fo-wlab {
    text-align: center; font-size: .9rem; color: #444; font-variant-numeric: tabular-nums;
    margin-top: 4px;
  }

  .fo-bar { fill: #c9ccd1; }
  .fo-ribbon { opacity: .62; stroke: #fff; stroke-width: .5; transition: opacity .12s; cursor: pointer; }
  .fo-node { cursor: pointer; transition: opacity .12s; }
  /* the bundled tail is drawn at a fixed width, not to scale */
  .fo-trunc { stroke: #a8adb4; stroke-width: .8; stroke-dasharray: 3 2.5; }
  .fo-dim { opacity: .07 !important; }
  .fo-cap { fill: #9a9a9a; font-size: 11px; }

  .fo-note {
    font-size: .84rem; color: #8a8a8a; line-height: 1.65;
    margin: 20px 0 0; max-width: 1150px;
  }

  @media (max-width: 1000px) {
    .fo-grid { flex-wrap: wrap; }
    .fo-cell { flex: 1 1 260px; }
  }
</style>


<section class="frame">
  <div class="in-kicker">Results · B: Social Mobility</div>
<h3>2.4. Fathers&rsquo; occupations in occupation space</h3>
  <div class="frame__body">

  <div class="sp-readout" id="sp-readout"></div>
  <div class="sp-grid" id="sp-grid"></div>
  <div class="sp-note" id="sp-note"></div>

  </div>
</section>

<script>
(function(){
  var SP_W = 380, SP_H = 410, SP_M = { top: 12, right: 12, bottom: 14, left: 40 };

  var GROUPS = [
    { g: "1", name: "Professional & technical", col: "#9C6FA8" },
    { g: "2", name: "Administrative & managerial", col: "#6A5ACD" },
    { g: "3", name: "Clerical", col: "#3C7DB1" },
    { g: "4", name: "Sales", col: "#7FA9CB" },
    { g: "5", name: "Service", col: "#5FA8A0" },
    { g: "6", name: "Agriculture & fishing", col: "#6B9E78" },
    { g: "7", name: "Production — materials", col: "#C08A2E" },
    { g: "8", name: "Production — metal, wood", col: "#E0B66A" },
    { g: "9", name: "Transport & labourers", col: "#B07C5A" }
  ];
  var GCOL = {}, GNAME = {};
  GROUPS.forEach(function(d){ GCOL[d.g] = d.col; GNAME[d.g] = d.name; });

  var COH = ["1851", "1861", "1881"], ENDS = { "1851": "1881", "1861": "1891", "1881": "1911" };
  var f1 = d3.format(".1f"), f2 = d3.format(".2f"), fN = d3.format(",");

  // a stable offset per occupation, so a node sits in the same place in all
  // three panels and the eye can follow it
  function jitter(code){
    var h = 0;
    for (var i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) % 100000;
    return (h % 1000) / 1000;
  }

  Promise.all([
    d3.csv("/assets/Results/father_space_by_cohort.csv?v=1"),
    d3.csv("/assets/data/occode_names.csv")
  ]).then(function(res){
    var names = {};
    res[1].forEach(function(r){
      names[r.occode] = String(r.occ_name || "").toLowerCase()
        .replace(/\s+/g, " ").trim()
        .replace(/\b[a-z]/g, function(m){ return m.toUpperCase(); });
    });

    var nodes = res[0].filter(function(r){ return GCOL[r.hisco]; }).map(function(r){
      return { code: r.occode, g: r.hisco, hiscam: +r.hiscam,
               name: names[r.occode] || ("Occode " + r.occode),
               n: { "1851": r.n_1851 === "" ? null : +r.n_1851,
                    "1861": r.n_1861 === "" ? null : +r.n_1861,
                    "1881": r.n_1881 === "" ? null : +r.n_1881 },
               j: jitter(r.occode) };
    });

    var totals = {};
    COH.forEach(function(y){
      totals[y] = d3.sum(nodes, function(d){ return d.n[y] || 0; });
    });
    var maxShare = d3.max(nodes, function(d){
      return d3.max(COH, function(y){ return 100 * (d.n[y] || 0) / totals[y]; });
    });
    var rad = d3.scalePow().exponent(0.4).domain([0, maxShare]).range([1.5, 14]);
    var SUPP_R = 1.5;   // a cell too thin to publish still gets a dot

    var iW = SP_W - SP_M.left - SP_M.right, iH = SP_H - SP_M.top - SP_M.bottom;
    var gx = d3.scaleBand().domain(GROUPS.map(function(d){ return d.g; }))
      .range([0, iW]).paddingInner(0.12);
    var yext = d3.extent(nodes, function(d){ return d.hiscam; });
    var y = d3.scaleLinear().domain([yext[0] - 2, yext[1] + 2]).nice().range([iH, 0]);


    var readout = d3.select("#sp-readout");
    var grid = d3.select("#sp-grid");

    COH.forEach(function(yr){
      var cell = grid.append("div").attr("class", "sp-cell");
      var svg = cell.append("svg").attr("class", "sp-svg").attr("viewBox", [0, 0, SP_W, SP_H]);
      cell.append("div").attr("class", "sp-wlab").text(yr + " → " + ENDS[yr]);
      var g = svg.append("g").attr("transform", "translate(" + SP_M.left + "," + SP_M.top + ")");

      g.append("g").attr("class", "sp-grid-l").selectAll("line").data(y.ticks(6)).join("line")
        .attr("x1", 0).attr("x2", iW).attr("y1", y).attr("y2", y);
      g.append("g").attr("class", "sp-axis")
        .call(d3.axisLeft(y).ticks(6).tickSizeOuter(0));

      // faint bands so the nine families read as regions of the space
      g.selectAll("rect.sp-band").data(GROUPS).join("rect").attr("class", "sp-band")
        .attr("x", function(d){ return gx(d.g); }).attr("y", 0)
        .attr("width", gx.bandwidth()).attr("height", iH)
        .attr("fill", function(d){ return d.col; });

      g.selectAll("circle").data(nodes).join("circle")
        .attr("class", "sp-node").attr("data-sp", function(d){ return d.code; })
        .attr("cx", function(d){ return gx(d.g) + 3 + d.j * (gx.bandwidth() - 6); })
        .attr("cy", function(d){ return y(d.hiscam); })
        .attr("r", function(d){
          return d.n[yr] === null ? SUPP_R : rad(100 * d.n[yr] / totals[yr]); })
        .attr("fill", function(d){ return GCOL[d.g]; })
        .attr("opacity", function(d){ return d.n[yr] === null ? .28 : .66; })
        .on("mouseover", function(event, d){ over(d); })
        .on("mouseout", out);
    });

    function over(d){
      d3.selectAll(".sp-node").classed("sp-dim", function(){
        return this.getAttribute("data-sp") !== d.code; });
      var trail = COH.map(function(yr){
        var v = d.n[yr] === null ? "&lt;5" : f2(100 * d.n[yr] / totals[yr]) + "%";
        return '<span class="sp-step"><span class="sp-step__w">' + yr + "–" + ENDS[yr] +
               '</span><span class="sp-step__v">' + v + '</span></span>';
      }).join("");
      readout.html(
        '<div class="sp-l1">' +
          '<span class="sp-sw" style="background:' + GCOL[d.g] + '"></span>' +
          '<span class="sp-name">' + d.name + '</span>' +
          '<span class="sp-step__w">' + GNAME[d.g] + ' &middot; HISCAM ' +
          f1(d.hiscam) + '</span>' +
        '</div>' +
        '<div class="sp-l2">' + trail + '</div>');
    }
    function out(){
      d3.selectAll(".sp-node").classed("sp-dim", false);
      readout.html("");
    }

    d3.select("#sp-note").html(
      "Y axis: HISCAM occupational status. Dot size is that occupation’s share "
      + "of the manager sons in that cohort.");
  });
})();
</script>

<style>
  /* two fixed lines, so a hover can never change the height and shunt the
     panels down the page */
  .sp-readout {
    height: 48px; overflow: hidden; margin: 0 0 4px;
    font-size: .92rem; color: #333; white-space: nowrap;
  }
  .sp-l1 { display: flex; align-items: center; height: 24px; }
  .sp-l2 { display: flex; align-items: center; height: 24px; gap: 0 18px; padding-left: 21px; }
  .sp-sw { width: 12px; height: 12px; border-radius: 2px; display: inline-block; margin-right: 9px; flex: none; }
  .sp-name { font-weight: 600; margin-right: 10px; flex: none; }
  .sp-step { color: #666; font-size: .86rem; white-space: nowrap; flex: none; }
  .sp-step__w { color: #a0a0a0; margin-right: 6px; }
  .sp-step__v { font-variant-numeric: tabular-nums; color: #222; }


  .sp-grid { display: flex; gap: 22px; align-items: flex-start; }
  .sp-cell { flex: 1 1 0; min-width: 0; }
  .sp-svg { width: 100%; height: auto; display: block; }
  .sp-wlab {
    text-align: center; font-size: .9rem; color: #444;
    font-variant-numeric: tabular-nums; margin-top: 4px;
  }

  .sp-band { opacity: .045; }
  .sp-grid-l line { stroke: #f2f2f2; }
  .sp-axis text { fill: #888; font-size: 11px; }
  .sp-axis path, .sp-axis line { stroke: #ddd; }
  .sp-node { cursor: pointer; transition: opacity .12s; stroke: #fff; stroke-width: .35; }
  .sp-dim { opacity: .06 !important; }

  .sp-note {
    font-size: .84rem; color: #8a8a8a; line-height: 1.65; margin: 34px 0 0; max-width: 1150px;
  }
  .sp-note em { color: #9a8a5a; font-style: italic; }
</style>


<section class="frame">
  <div class="in-kicker">Results · B: Social Mobility</div>
<h3>2.5. Fathers&rsquo; occupational status</h3>
  <div class="frame__body">

  <div class="hc-row">
    <div class="hc-panel">
      <svg id="hc-svg"></svg>
    </div>
    <div class="hc-aside">
      <ul class="in-list hc-points" id="hc-points"></ul>
    </div>
  </div>

  <div class="hc-note" id="hc-note"></div>

  </div>
</section>

<script>
(function(){
  var W = 940, H = 470, M = { top: 18, right: 26, bottom: 54, left: 58 };
  var LO = 25, HI = 78, BW = 2.4;          // HISCAM window and kernel bandwidth
  var COLS = ["#6B9E78", "#C08A2E", "#3C7DB1"];
  var f1 = d3.format(".1f"), fN = d3.format(",");

  d3.csv("/assets/Results/father_hiscam_by_cohort.csv?v=1").then(function(rows){
    var g0 = d3.group(rows, function(r){ return r.baseline_year; });
    var cohorts = Array.from(g0.keys()).sort(d3.ascending).map(function(y, i){
      var rs = g0.get(y);
      var pts = rs.map(function(r){ return { x: +r.hiscam, n: +r.sons_n }; })
                  .sort(function(a, b){ return a.x - b.x; });
      return { y: y, lab: y + " → " + rs[0].endpoint_year, pts: pts,
               col: COLS[i % COLS.length],
               kept: d3.sum(pts, function(p){ return p.n; }),
               unscaled: +rs[0].unscaled_n, total: +rs[0].total_n };
    });

    // weighted quantiles straight off the counts, no resampling
    function quant(pts, p){
      var tot = d3.sum(pts, function(d){ return d.n; }), c = 0;
      for (var i = 0; i < pts.length; i++){
        c += pts[i].n;
        if (c >= tot * p) return pts[i].x;
      }
      return pts[pts.length - 1].x;
    }
    cohorts.forEach(function(c){
      c.mean = d3.sum(c.pts, function(d){ return d.x * d.n; }) / c.kept;
      c.p25 = quant(c.pts, 0.25);
      c.med = quant(c.pts, 0.50);
      c.p75 = quant(c.pts, 0.75);
      c.iqr = c.p75 - c.p25;
    });

    // Gaussian kernel density, weighted by the number of sons at each value
    var grid = d3.range(LO, HI + 0.25, 0.25);
    cohorts.forEach(function(c){
      c.curve = grid.map(function(x){
        var s = 0;
        c.pts.forEach(function(p){
          var z = (x - p.x) / BW;
          s += p.n * Math.exp(-0.5 * z * z);
        });
        return { x: x, y: s / (c.kept * BW * Math.sqrt(2 * Math.PI)) };
      });
    });

    var svg = d3.select("#hc-svg").attr("viewBox", [0, 0, W, H]);
    var iW = W - M.left - M.right, iH = H - M.top - M.bottom;
    var g = svg.append("g").attr("transform", "translate(" + M.left + "," + M.top + ")");

    var x = d3.scaleLinear().domain([LO, HI]).range([0, iW]);
    var y = d3.scaleLinear().range([iH, 0]).domain([0, d3.max(cohorts, function(c){
      return d3.max(c.curve, function(p){ return p.y; }); }) * 1.14]);

    g.append("g").attr("class", "hc-grid").selectAll("line").data(y.ticks(5)).join("line")
      .attr("x1", 0).attr("x2", iW).attr("y1", y).attr("y2", y);

    var area = d3.area().x(function(p){ return x(p.x); }).y0(iH)
      .y1(function(p){ return y(p.y); }).curve(d3.curveBasis);
    var line = d3.line().x(function(p){ return x(p.x); })
      .y(function(p){ return y(p.y); }).curve(d3.curveBasis);

    cohorts.forEach(function(c){
      g.append("path").datum(c.curve).attr("d", area).attr("fill", c.col).attr("opacity", .13);
      g.append("path").datum(c.curve).attr("d", line).attr("fill", "none")
        .attr("stroke", c.col).attr("stroke-width", 2);
      g.append("line").attr("class", "hc-med")
        .attr("x1", x(c.med)).attr("x2", x(c.med)).attr("y1", iH).attr("y2", y(0) - iH * 0.86)
        .attr("stroke", c.col);
    });

    g.append("g").attr("class", "hc-axis").attr("transform", "translate(0," + iH + ")")
      .call(d3.axisBottom(x).ticks(9).tickSizeOuter(0));
    g.append("text").attr("class", "hc-axt").attr("x", iW / 2).attr("y", iH + 42)
      .attr("text-anchor", "middle").text("Father's HISCAM occupational status");

    var lg = g.append("g").attr("transform", "translate(" + (iW - 250) + ",4)");
    cohorts.forEach(function(c, i){
      lg.append("rect").attr("x", 0).attr("y", i * 21).attr("width", 11).attr("height", 11)
        .attr("fill", c.col).attr("rx", 2);
      lg.append("text").attr("class", "hc-axt").attr("x", 18).attr("y", i * 21 + 10)
        .text(c.lab.replace("→", "–") + "   median " + f1(c.med) +
              "   IQR " + f1(c.iqr));
    });

    var a = cohorts[0], z = cohorts[cohorts.length - 1];
    d3.select("#hc-points").selectAll("li").data([
      "The middle barely moves: median " + f1(a.med) + " to " + f1(z.med) + ".",
      "The spread widens: interquartile range " + f1(a.iqr) + " to " + f1(z.iqr) + ".",
      "Managers were drawn from a broader range of homes, not a higher one."
    ]).join("li").text(function(d){ return d; });

    d3.select("#hc-note").text(
      "Each curve is the distribution of father's HISCAM status among men observed as managers " +
      "at the end of the window, weighted by the number of sons. " +
      fN(a.total) + ", " + fN(cohorts[1].total) + " and " + fN(z.total) +
      " sons respectively. Occupations HISCAM does not scale — private means, no specified " +
      "occupation, and the wives categories — are left out rather than counted as status " +
      "zero, which is " + f1(100 * a.unscaled / a.total) + "% to " +
      f1(100 * cohorts[1].unscaled / cohorts[1].total) + "% of sons.");
  });
})();
</script>

<style>
  .hc-row { display: flex; gap: 34px; align-items: flex-start; flex-wrap: wrap; }
  .hc-panel { flex: 0 1 940px; min-width: 420px; }
  .hc-aside { flex: 0 1 300px; min-width: 230px; padding-top: 46px; }
  .hc-points li { font-size: .98rem; line-height: 1.55; color: #444; margin-bottom: 18px; }

  .hc-grid line { stroke: #f1f1f1; }
  .hc-axis text { fill: #666; font-size: 12px; }
  .hc-axis path, .hc-axis line { stroke: #ccc; }
  .hc-axt { fill: #666; font-size: 12px; }
  .hc-med { stroke-dasharray: 4 4; opacity: .6; }

  .hc-note {
    font-size: .84rem; color: #8a8a8a; line-height: 1.65;
    margin: 18px 0 0; max-width: 1150px;
  }
</style>


<section class="frame frame--section frame--block">
  <h2>Results</h2>
  <div class="blocklab">C: Fertility</div>
</section>


<section class="frame">
<div class="frame__body">
<div class="fig-flow">
<div class="in-kicker">Results · C: Fertility</div>
<h3>3.1. Occupational Skills Inheritance</h3>

<style>
  .table-wrap { overflow-x:auto; margin: 0 0 12px; }
  .nice-table { border-collapse: collapse; width: 100%; font-size: 14px; }
  .nice-table caption { text-align:left; font-weight:600; margin-bottom:6px; }
  .nice-table th, .nice-table td { padding: 8px 10px; border-bottom: 1px solid #eee; }
  .nice-table thead th { position: sticky; top: 0; background: #fafbff; z-index: 1; }
  .nice-table tbody tr:hover { background: #fafafa; }
  .nice-table th { text-align: left; white-space: nowrap; }
  .nice-table td.num, .nice-table th.num { text-align: right; font-variant-numeric: tabular-nums; }
  .diff { --v: 0; background:
    linear-gradient(90deg, rgba(255,110,110,0.18) 0, rgba(255,110,110,0.18) calc(var(--v)*1%), transparent 0);
    border-radius: 4px; }
  .table-note { font-size: 12px; opacity: .8; margin-top: 6px; }
  .sortable { cursor: pointer; }
  .sortable::after { content: " ⬍"; color: #888; font-size: 12px; }
  .sortable.asc::after { content: " ▲"; }
  .sortable.desc::after { content: " ▼"; }
</style>

<div class="table-wrap">
  <table class="nice-table" id="sons-table">
    <caption>Share of sons taking up their fathers' occupation, by father's occupation</caption>
    <thead>
      <tr>
        <th class="sortable" data-key="occupation">Occupation</th>
        <th class="num sortable" data-key="y1851">1851</th>
        <th class="num sortable" data-key="y1861">1861</th>
        <th class="num sortable" data-key="y1881">1881</th>
        <th class="num sortable" data-key="diff">Difference</th>
        <th class="num sortable" data-key="occ">OccScore</th>
        <th class="num sortable" data-key="sons">SonsScore</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Coal Miners</td><td class="num" data-v="54.19"></td><td class="num" data-v="52.99"></td><td class="num" data-v="48.04"></td><td class="num diff" data-v="6.15"></td><td class="num" data-v="33.20"></td><td class="num" data-v="45.20"></td></tr>
      <tr><td>Farmer, Grazier</td><td class="num" data-v="40.63"></td><td class="num" data-v="37.65"></td><td class="num" data-v="37.21"></td><td class="num diff" data-v="3.42"></td><td class="num" data-v="51.61"></td><td class="num" data-v="46.93"></td></tr>
      <tr><td>Bricklayer</td><td class="num" data-v="39.92"></td><td class="num" data-v="36.85"></td><td class="num" data-v="26.79"></td><td class="num diff" data-v="13.13"></td><td class="num" data-v="44.15"></td><td class="num" data-v="48.18"></td></tr>
      <tr><td>Mason</td><td class="num" data-v="36.68"></td><td class="num" data-v="31.10"></td><td class="num" data-v="17.50"></td><td class="num diff" data-v="19.18"></td><td class="num" data-v="36.61"></td><td class="num" data-v="47.98"></td></tr>
      <tr><td>Carpenter, Joiner</td><td class="num" data-v="33.25"></td><td class="num" data-v="29.77"></td><td class="num" data-v="19.94"></td><td class="num diff" data-v="13.32"></td><td class="num" data-v="50.00"></td><td class="num" data-v="48.61"></td></tr>
      <tr><td>Agricultural Labour</td><td class="num" data-v="31.72"></td><td class="num" data-v="27.23"></td><td class="num" data-v="16.95"></td><td class="num diff" data-v="14.77"></td><td class="num" data-v="46.73"></td><td class="num" data-v="43.71"></td></tr>
      <tr><td>Blacksmiths</td><td class="num" data-v="31.46"></td><td class="num" data-v="28.50"></td><td class="num" data-v="20.34"></td><td class="num diff" data-v="11.12"></td><td class="num" data-v="46.09"></td><td class="num" data-v="46.76"></td></tr>
      <tr><td>Butchers</td><td class="num" data-v="27.40"></td><td class="num" data-v="28.34"></td><td class="num" data-v="26.10"></td><td class="num diff" data-v="1.30"></td><td class="num" data-v="51.30"></td><td class="num" data-v="48.56"></td></tr>
      <tr><td>Tailors</td><td class="num" data-v="20.68"></td><td class="num" data-v="18.65"></td><td class="num" data-v="16.07"></td><td class="num diff" data-v="4.61"></td><td class="num" data-v="51.56"></td><td class="num" data-v="49.22"></td></tr>
      <tr><td>General Labour</td><td class="num" data-v="12.50"></td><td class="num" data-v="12.93"></td><td class="num" data-v="10.95"></td><td class="num diff" data-v="1.55"></td><td class="num" data-v="34.52"></td><td class="num" data-v="45.96"></td></tr>
      <tr><td>Gardener</td><td class="num" data-v="10.46"></td><td class="num" data-v="10.53"></td><td class="num" data-v="5.70"></td><td class="num diff" data-v="4.76"></td><td class="num" data-v="53.54"></td><td class="num" data-v="47.33"></td></tr>
      <tr><td>Innkeepers</td><td class="num" data-v="7.87"></td><td class="num" data-v="7.29"></td><td class="num" data-v="7.57"></td><td class="num diff" data-v="0.30"></td><td class="num" data-v="47.35"></td><td class="num" data-v="49.72"></td></tr>
    </tbody>
  </table>
  <div class="table-note"><em>3 million linked father–son pairs. Sons linked forward 30 years (ICeM).</em></div>
</div>

<script>
  (function(){
    const tbl = document.getElementById('sons-table');
    const fmt = n => (n == null || isNaN(n)) ? '—' : Number(n).toFixed(2) + '%';

    const diffs = [];
    tbl.querySelectorAll('tbody td.num').forEach(td => {
      const v = parseFloat(td.dataset.v);
      if (!isNaN(v)) {
        td.textContent = fmt(v);
        if (td.classList.contains('diff')) diffs.push(v);
      } else {
        td.textContent = '—';
      }
    });

    const maxDiff = Math.max(5, ...diffs);
    tbl.querySelectorAll('tbody td.diff').forEach(td => {
      const v = parseFloat(td.dataset.v) || 0;
      td.style.setProperty('--v', (100 * v / maxDiff).toFixed(1));
      td.title = `Difference: ${fmt(v)}`;
    });

    let sortState = { key: null, dir: 1 };
    const rows = Array.from(tbl.tBodies[0].rows);

    function cmp(a, b, key) {
      if (key === 'occupation') return a.localeCompare(b, undefined, { sensitivity: 'base' });
      return (parseFloat(a) || 0) - (parseFloat(b) || 0);
    }

    function getVal(tr, key){
      switch(key){
        case 'occupation': return tr.cells[0].textContent.trim();
        case 'y1851': return tr.cells[1].dataset.v;
        case 'y1861': return tr.cells[2].dataset.v;
        case 'y1881': return tr.cells[3].dataset.v;
        case 'diff':  return tr.cells[4].dataset.v;
        case 'occ':   return tr.cells[5].dataset.v;
        case 'sons':  return tr.cells[6].dataset.v;
      }
    }

    tbl.querySelectorAll('thead th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.key;
        const same = sortState.key === key;
        sortState = { key, dir: same ? -sortState.dir : -1 };

        tbl.querySelectorAll('thead th.sortable').forEach(t => t.classList.remove('asc','desc'));
        th.classList.add(sortState.dir === 1 ? 'asc' : 'desc');

        const sorted = rows.slice().sort((r1, r2) => {
          const v1 = getVal(r1, key), v2 = getVal(r2, key);
          return sortState.dir * cmp(String(v1), String(v2), key);
        });

        const tb = tbl.tBodies[0];
        sorted.forEach(tr => tb.appendChild(tr));
      });
    });
  })();
</script>
</div>
</div>
</section>


<section class="frame frame--todo">
  <div class="in-kicker">Results · C: Fertility</div>
<h3>3.2. Fertility</h3>
  <div class="frame__body">
    <div class="box">
      <strong>Placeholder.</strong> Send the data and a sketch of what this should show,
      and I will build it here.
    </div>
  </div>
</section>


<section class="frame frame--plain">
<div class="frame__body">
<div class="fig-flow">
<h2 style="margin-top:2em;">Conclusion</h2>

<ul style="max-width:820px;line-height:1.8;padding-left:1.2em;">
  <li>From roughly 800 industries to about 10,000 micro-occupations.</li>
  <li>Micro-occupations are necessary to track the emergence of new work and the decline of older jobs.</li>
  <li>Rise of management jobs and factory work.</li>
  <li>Decline of the apprenticeship system, in terms of shares. In absolute numbers, it increases by about 9,000.</li>
  <li><strong>Implications:</strong> how society absorbs technological shocks; who gets the new jobs.</li>
  <li><strong>Next steps:</strong> finalise boundaries and definitions of new jobs.</li>
</ul>

</div>
</div>
</section>

</div>


<script>
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    var frames = Array.prototype.slice.call(document.querySelectorAll(".frame"));
    if (!frames.length) return;
    var count = document.getElementById("deck-count");

    frames.forEach(function(f, i){
      var n = document.createElement("div");
      n.className = "frame__num";
      n.textContent = (i + 1) + " / " + frames.length;
      f.appendChild(n);
    });

    function current(){
      var best = 0, bd = Infinity;
      frames.forEach(function(f, i){
        var d = Math.abs(f.getBoundingClientRect().top);
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    }
    function go(i){
      i = Math.max(0, Math.min(frames.length - 1, i));
      frames[i].scrollIntoView({ behavior: "smooth", block: "start" });
      count.textContent = (i + 1) + " / " + frames.length;
    }

    document.getElementById("deck-prev").onclick = function(){ go(current() - 1); };
    document.getElementById("deck-next").onclick = function(){ go(current() + 1); };

    document.addEventListener("keydown", function(e){
      var t = e.target.tagName;
      if (t === "INPUT" || t === "SELECT" || t === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(current() + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(current() - 1); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End")  { e.preventDefault(); go(frames.length - 1); }
      else if (e.key === "f")    { document.body.classList.toggle("present"); }
    });

    var tick;
    window.addEventListener("scroll", function(){
      clearTimeout(tick);
      tick = setTimeout(function(){ count.textContent = (current() + 1) + " / " + frames.length; }, 90);
    }, { passive: true });

    count.textContent = "1 / " + frames.length;

    // Several charts ported from the website are drawn at a fixed pixel size
    // with no viewBox, so they cannot scale and end up squeezed or overflowing.
    // Give them a viewBox derived from their own attributes, then let them fill
    // the frame width and cap their height against the viewport. Small SVGs
    // (legends and colour ramps) are left alone.
    function fitSvgs(){
      document.querySelectorAll(".frame svg").forEach(function(svg){
        if (svg.dataset.fitted) return;
        var wA = parseFloat(svg.getAttribute("width"));
        var hA = parseFloat(svg.getAttribute("height"));
        var vb = svg.getAttribute("viewBox");
        if (!vb) {
          if (!(wA >= 600 && hA > 0)) return;      // leave legends as they are
          svg.setAttribute("viewBox", "0 0 " + wA + " " + hA);
        } else {
          var parts = vb.split(/[ ,]+/);
          if (!(parseFloat(parts[2]) >= 600)) return;
        }
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.style.width = "100%";
        svg.style.height = "auto";
        var host = svg.parentElement ? svg.parentElement.id : "";
        if (host === "treemap-time" || host === "growth-chart"
            || svg.id === "sc-svg-joint") {
          svg.setAttribute("preserveAspectRatio", "xMinYMid meet");
        }
        svg.style.maxHeight = svg.closest(".frame--tall") ? "150vh"
                            : (host === "growth-chart" ? "76vh" : "68vh");
        svg.dataset.fitted = "1";
      });
    }
    fitSvgs();
    new MutationObserver(fitSvgs).observe(document.body, { childList: true, subtree: true });
    [400, 1200, 3000].forEach(function(t){ setTimeout(fitSvgs, t); });

  });
})();
</script>
