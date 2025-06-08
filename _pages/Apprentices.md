---
layout: single
title: "Apprenticeship System Map"
permalink: /apprentices/
nav_exclude: false
---

Welcome to the Apprentices page. This map shows the spatial distribution of the apprenticeship system in 1851 by county.

<h2>Apprenticeship System: Total Participation</h2>

<!-- Slider for selecting year -->
<label for="year-slider">Select year: <span id="year-label">1851</span></label>
<input type="range" id="year-slider" min="1851" max="1911" step="10" value="1851" style="width: 300px;">

<div id="map-container">
  <svg width="960" height="600"></svg>
</div>

<div id="tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>

<script>
const width = 960, height = 600;
const svg = d3.select("svg");
const tooltip = d3.select("#tooltip");

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/total_by_year.json")
]).then(([geoData, yearData]) => {

  const projection = d3.geoMercator().fitSize([width, height], geoData);
  const path = d3.geoPath().projection(projection);

  const slider = d3.select("#year-slider");
  const yearLabel = d3.select("#year-label");

  function updateMap(year) {
    const values = yearData[year];
    const color = d3.scaleSequential(d3.interpolatePurples)
      .domain([0.1, 0.9]);

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
</script>

<!-- 🧭 Legend container: place this BEFORE the legend script -->
<div id="legend" style="margin-top: 10px;">
  <svg width="300" height="40"></svg>
  <div style="font-size: 12px;">Share of adult male population</div>
</div>


<script>
const legendSvg = d3.select("#legend svg");
const legendWidth = +legendSvg.attr("width");
const legendHeight = +legendSvg.attr("height");

const legendGradient = legendSvg.append("defs")
  .append("linearGradient")
  .attr("id", "legend-gradient")
  .attr("x1", "0%").attr("y1", "0%")
  .attr("x2", "100%").attr("y2", "0%");

const color = d3.scaleSequential(d3.interpolatePurples).domain([0.1, 0.9]);

legendGradient.selectAll("stop")
  .data(d3.range(0, 1.01, 0.01))
  .enter().append("stop")
  .attr("offset", d => `${d * 100}%`)
  .attr("stop-color", d => color(d * 0.8 + 0.1));

legendSvg.append("rect")
  .attr("x", 0).attr("y", 10)
  .attr("width", legendWidth)
  .attr("height", 10)
  .style("fill", "url(#legend-gradient)");

const legendScale = d3.scaleLinear().domain([0.1, 0.9]).range([0, legendWidth]);
const legendAxis = d3.axisBottom(legendScale)
  .tickValues([0.1, 0.3, 0.5, 0.7, 0.9])
  .tickFormat(d3.format(".2f"));

legendSvg.append("g")
  .attr("transform", "translate(0, 20)")
  .call(legendAxis);
</script>



<h2>Apprenticeship System: Role Breakdown</h2>

<label for="role-select">Select role: </label>
<select id="role-select">
  <option value="master">Master</option>
  <option value="journeyman">Journeyman</option>
  <option value="apprentice">Apprentice</option>
</select>

<input type="range" id="role-slider" min="1851" max="1911" step="10" value="1851">
<span id="role-year-label">1851</span>

<div id="role-map-container">
  <svg id="role-map" width="960" height="600"></svg>
</div>

<div id="role-tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script>
  // new Promise.all and new projection setup here for the second map
</script>

