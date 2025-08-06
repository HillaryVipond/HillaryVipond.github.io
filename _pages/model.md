---
layout: single
title: "Model"
permalink: /model/
nav_exclude: false
---

<h2>Simulation: Local Impacts of Technology Adoption</h2>

<p>Click "NewTech" to simulate the effects of uneven technology adoption across counties. Observe adoption patterns and how they affect wages, employment, and migration.</p>

<!-- Map grid -->
<div style="display: flex; gap: 30px;">
  <div>
    <h3>Adoption</h3>
    <svg id="map-adoption" width="300" height="400"></svg>
  </div>
  <div>
    <h3>Wages</h3>
    <svg id="map-wages" width="300" height="400"></svg>
  </div>
  <div>
    <h3>Employment</h3>
    <svg id="map-employment" width="300" height="400"></svg>
  </div>
  <div>
    <h3>Migration Out</h3>
    <svg id="map-migration" width="300" height="400"></svg>
  </div>
</div>

<!-- Button -->
<div style="margin-top: 20px;">
  <button id="btn-newtech">NewTech</button>
</div>

<!-- Tooltip -->
<div id="tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<!-- D3 -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<script>
const svgAdoption = d3.select("#map-adoption");
const svgWages = d3.select("#map-wages");
const svgEmployment = d3.select("#map-employment");
const svgMigration = d3.select("#map-migration");
const tooltip = d3.select("#tooltip");

let geoData, modelState;
let adopted = false;

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/data/model_state.json")
]).then(([geo, state]) => {
  geoData = geo;
  modelState = state;

  const projection = d3.geoMercator().fitSize([300, 400], geoData);
  path = d3.geoPath().projection(projection);

  updateAllMaps();
});

function updateAllMaps() {
  renderMap(svgAdoption, "adoption", null, null); // special handling
  renderMap(svgWages, "wages", d3.interpolateRdYlGn, [0.5, 1.0, 1.5]);
  renderMap(svgEmployment, "employment", d3.interpolatePiYG, [-4000, 0, 4000]);
  renderMap(svgMigration, "migration_out", d3.interpolateOranges, [0.01, 0.10]);
}

function renderMap(svg, variable, colorScaleFn, domain) {
  let color = null;
  if (colorScaleFn && domain.length === 3) {
    color = d3.scaleDiverging(colorScaleFn).domain(domain);
  } else if (colorScaleFn) {
    color = d3.scaleSequential(colorScaleFn).domain(domain);
  }

  svg.selectAll("path")
    .data(geoData.features)
    .join("path")
    .attr("d", path)
    .attr("fill", d => {
      const name = d.properties.R_CTY;
      const c = modelState.counties[name];
      if (!c) return "#eee";

      if (!adopted) return "#eee";

      if (variable === "adoption") {
        return c.adopted_wave1 ? "#2a9d8f" : "#bbbbbb";
      }

      let val = c[variable];
      if (c.adopted_wave1) {
        if (variable === "wages") val *= 1.1;
        if (variable === "employment") val *= 1.2;
        if (variable === "migration_out") val *= 0.6;
      }

      return color ? color(val) : "#ccc";
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .on("mouseover", function (event, d) {
      const name = d.properties.R_CTY;
      const c = modelState.counties[name];
      if (!c) return;

      tooltip.style("visibility", "visible")
        .html(`<b>${name}</b><br>
               Adopted: ${c.adopted_wave1 ? "Yes" : "No"}<br>
               Jobs: ${c.employment}<br>
               Wages: £${c.wages.toFixed(2)}<br>
               Migration Out: ${(c.migration_out * 100).toFixed(1)}%`);
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

d3.select("#btn-newtech").on("click", () => {
  adopted = true;
  updateAllMaps();
});
</script>
