---
layout: single
title: "Apprenticeship System Map"
permalink: /apprentices/
nav_exclude: false
---

Welcome to the Apprentices page. This map shows the spatial distribution of the apprenticeship system in England and Wales by county, between 1851-1911. All data is NLP processed text stored in the ICeM digitized historical census data project.

The apprenticeship system declines everywhere between 1851-1911. The decline is more rapid after 1881. The less urban areas seem to retain more of the system than elsewhere. What is somewhat surprising is how different the decline is by level of skill. Apprenticeships decline only slightly over the period - it is Masters and Journeymen who disappear. 




<h2>Apprenticeship System: Total Participation</h2>

<!-- 🎛️ Year control for total map -->
<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 10px;">
  <label for="year-slider">Select year: <span id="year-label">1851</span></label>
  <input type="range" id="year-slider" min="1851" max="1911" step="10" value="1851" style="width: 300px;">
</div>

<!-- 🗺️ Total map and legend container -->
<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 40px;">
  <svg id="total-map" width="960" height="600"></svg>

  <div style="margin-top: 10px;">
    <svg id="legend-svg" width="480" height="50"></svg>
    <div style="font-size: 12px; text-align: center;"> Percentage Share of Male Population</div>
  </div>
</div>

<div id="tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<script>
const svg = d3.select("#total-map");
const tooltip = d3.select("#tooltip");

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/share_total_by_county.json")
]).then(([geoData, yearData]) => {
  const projection = d3.geoMercator().fitSize([960, 600], geoData);
  const path = d3.geoPath().projection(projection);
  const slider = d3.select("#year-slider");
  const yearLabel = d3.select("#year-label");

  function updateMap(year) {
    const values = yearData[year];
    const color = d3.scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(d3.schemePurples[5]);

    svg.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", path)
      .attr("fill", d => {
        const name = d.properties.R_CTY;
        const v = values[name];
        return v != null ? color(v) : "#ccc";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
        const name = d.properties.R_CTY;
        const value = values[name];
        tooltip.style("visibility", "visible")
          .text(`${name}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY + 10) + "px")
               .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("stroke-width", 0.5);
      });
  }

  updateMap("1851");

  slider.on("input", function() {
    const year = this.value;
    yearLabel.text(year);
    updateMap(year);
  });
});

{
  const legendSvg = d3.select("#legend-svg");
  const legendWidth = +legendSvg.attr("width");
  const colors = d3.schemePurples[5];
  const binWidth = legendWidth / colors.length;

  colors.forEach((color, i) => {
    legendSvg.append("rect")
      .attr("x", i * binWidth)
      .attr("y", 10)
      .attr("width", binWidth)
      .attr("height", 10)
      .attr("fill", color);

    const label = i === colors.length - 1 ? "4+" : `${i}–${i + 1}`;
    legendSvg.append("text")
      .attr("x", i * binWidth + binWidth / 2)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(label);
  });
}
</script>



<h2>Apprenticeship System: Role Breakdown</h2>

<!-- 🎛️ Role + Year Controls: side-by-side -->
<div style="display: flex; align-items: center; gap: 48px; margin-bottom: 10px;">
  <label for="role-select">Select role:</label>
  <select id="role-select">
    <option value="master">Master</option>
    <option value="journeyman">Journeyman</option>
    <option value="apprentice">Apprentice</option>
  </select>

  <label for="role-slider">Select year: <span id="role-year-label">1851</span></label>
  <input type="range" id="role-slider" min="1851" max="1911" step="10" value="1851" style="width: 300px;">
</div>

<!-- 🗱️ Flex container for map + legend -->
<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 40px;">
  <svg id="role-map" width="960" height="600"></svg>

  <div style="margin-top: 10px;">
    <svg id="role-legend-svg" width="480" height="50"></svg>
    <div style="font-size: 12px; text-align: center;">Percentage Share of Male Population in Role</div>
  </div>
</div>

<div id="role-tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script>
const roleSvg = d3.select("#role-map");
const roleTooltip = d3.select("#role-tooltip");
const roleSlider = d3.select("#role-slider");
const roleSelect = d3.select("#role-select");

const roleThresholds = [0.2, 0.4, 0.6, 0.8, 1.0, 1.5, 2.0];
const roleColors = d3.schemeBlues[8];
const color = d3.scaleThreshold().domain(roleThresholds).range(roleColors);

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/share_granrole_by_county.json")
]).then(([geoData, roleData]) => {
  const projection = d3.geoMercator().fitSize([960, 600], geoData);
  const path = d3.geoPath().projection(projection);

  function updateRoleMap(year, role) {
    const values = roleData[year][role];

    roleSvg.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", path)
      .attr("fill", d => {
        const name = d.properties.R_CTY;
        const v = values[name];
        return v != null ? color(v) : "#ccc";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        const name = d.properties.R_CTY;
        const value = values[name];
        roleTooltip.style("visibility", "visible")
          .text(`${name}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        roleTooltip.style("top", (event.pageY + 10) + "px")
                   .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function () {
        roleTooltip.style("visibility", "hidden");
        d3.select(this).attr("stroke-width", 0.5);
      });
  }

  updateRoleMap("1851", "master");

  const roleYearLabel = d3.select("#role-year-label");

  roleSlider.on("input", function () {
    const year = this.value;
    roleYearLabel.text(year);
    updateRoleMap(year, roleSelect.node().value);
  });

  roleSelect.on("change", function () {
    const year = roleSlider.node().value;
    updateRoleMap(year, this.value);
  });
});

// Legend rendering
{
  const roleLegendSvg = d3.select("#role-legend-svg");
  const legendWidth = +roleLegendSvg.attr("width");
  const binCount = 8;
  const binWidth = legendWidth / binCount;

  const roleLabels = [
    "<0.2", "0.2–0.4", "0.4–0.6", "0.6–0.8",
    "0.8–1.0", "1.0–1.5", "1.5–2.0", "2.0+"
  ];

  roleColors.forEach((color, i) => {
    roleLegendSvg.append("rect")
      .attr("x", i * binWidth)
      .attr("y", 10)
      .attr("width", binWidth)
      .attr("height", 10)
      .attr("fill", color);
  });

  roleLabels.forEach((label, i) => {
    roleLegendSvg.append("text")
      .attr("x", i * binWidth + binWidth / 2)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(label);
  });
}
</script>


<h2> Occupational Skills Inheritance</h2>
<!-- Management: Intergenerational Occupation Table -->
<style>
  /* Container: horizontal scroll on small screens */
  .table-wrap { overflow-x:auto; margin: 0 0 12px; }
  .nice-table { border-collapse: collapse; width: 100%; font-size: 14px; }
  .nice-table caption { text-align:left; font-weight:600; margin-bottom:6px; }
  .nice-table th, .nice-table td { padding: 8px 10px; border-bottom: 1px solid #eee; }
  .nice-table thead th { position: sticky; top: 0; background: #fafbff; z-index: 1; }
  .nice-table tbody tr:hover { background: #fafafa; }
  .nice-table th { text-align: left; white-space: nowrap; }
  .nice-table td.num, .nice-table th.num { text-align: right; font-variant-numeric: tabular-nums; }

  /* Difference heat tint (light red for larger declines) */
  .diff { --v: 0; background:
    linear-gradient(90deg, rgba(255, 110, 110, 0.18) 0, rgba(255, 110, 110, 0.18) calc(var(--v)*1%), transparent 0);
    border-radius: 4px;
  }

  /* Small footnote */
  .table-note { font-size: 12px; opacity: .8; margin-top: 6px; }

  /* Sort indicators */
  .sortable { cursor: pointer; }
  .sortable::after { content: " ⬍"; color: #888; font-size: 12px; }
  .sortable.asc::after { content: " ▲"; }
  .sortable.desc::after { content: " ▼"; }
</style>

<div class="table-wrap">
  <table class="nice-table" id="sons-table">
    <caption>Share of sons taking up their fathers’ occupation, by father’s occupation</caption>
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
      <!-- Rows (values as data-* so JS can format & sort reliably) -->
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
    const fmt = n => (n==null || isNaN(n)) ? '—' : Number(n).toFixed(2) + '%';

    // 1) Format numeric cells & paint Difference heat
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
    // Scale diff heat: 0..maxDiff
    const maxDiff = Math.max(5, ...diffs); // avoid zero scale
    tbl.querySelectorAll('tbody td.diff').forEach(td => {
      const v = parseFloat(td.dataset.v) || 0;
      td.style.setProperty('--v', (100 * v / maxDiff).toFixed(1));
      td.title = `Difference: ${fmt(v)}`;
    });

    // 2) Sorting (click headers)
    let sortState = { key: null, dir: 1 }; // 1 asc, -1 desc
    const rows = Array.from(tbl.tBodies[0].rows);

    function cmp(a, b, key) {
      if (key === 'occupation') {
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
      }
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
        sortState = { key, dir: same ? -sortState.dir : -1 }; // default to DESC for numbers

        // update indicators
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

