---
layout: single
title: "Model"
permalink: /model/
nav_exclude: false
---

Uneven adoption of new technologies across space impacted on multiple domains of society. 
I model how a single process shaped mobility, migration, inequality, and regional divergence. Data from full count British historical census microdata


<h2>Tech Adoption Model: Toy Simulation</h2>


<!-- Map grid -->
<div style="display: flex; gap: 30px;">
  <div>
    <h3>Employment</h3>
    <svg id="map-employment" width="300" height="400"></svg>
  </div>
  <div>
    <h3>Wages</h3>
    <svg id="map-wages" width="300" height="400"></svg>
  </div>
  <div>
    <h3>Migration Out</h3>
    <svg id="map-migration" width="300" height="400"></svg>
  </div>
</div>

<!-- Buttons -->
<div style="margin-top: 20px; display: flex; gap: 20px;">
  <button id="btn-before">Before Adoption</button>
  <button id="btn-after">After Adoption</button>
</div>

<!-- Tooltip -->
<div id="tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<!-- D3 -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<script>
const svgEmployment = d3.select("#map-employment");
const svgWages = d3.select("#map-wages");
const svgMigration = d3.select("#map-migration");
const tooltip = d3.select("#tooltip");

let geoData, modelState;
let viewState = "before"; // toggles between "before" and "after"

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
  renderMap(svgEmployment, "employment", d3.interpolateBlues, [800, 1400]);
  renderMap(svgWages, "wages", d3.interpolateGreens, [0.9, 1.1]);
  renderMap(svgMigration, "migration_out", d3.interpolateOranges, [0.01, 0.10]);
}

function renderMap(svg, variable, colorScaleFn, domain) {
  const color = d3.scaleSequential(colorScaleFn).domain(domain);

  svg.selectAll("path")
    .data(geoData.features)
    .join("path")
    .attr("d", path)
    .attr("fill", d => {
      const name = d.properties.R_CTY;
      const c = modelState.counties[name];
      if (!c) return "#ccc";

      let val = c[variable];
      if (viewState === "after") {
        if (variable === "employment" && c.adopted_wave1) val *= 1.2;
        if (variable === "wages" && c.adopted_wave1) val *= 1.1;
        if (variable === "migration_out" && c.adopted_wave1) val *= 0.6;
      }

      return color(val);
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .on("mouseover", function (event, d) {
      const name = d.properties.R_CTY;
      const c = modelState.counties[name];
      if (!c) return;

      tooltip.style("visibility", "visible")
        .html(`<b>${name}</b><br>
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

// Button handlers
d3.select("#btn-before").on("click", () => {
  viewState = "before";
  updateAllMaps();
});

d3.select("#btn-after").on("click", () => {
  viewState = "after";
  updateAllMaps();
});
</script>
