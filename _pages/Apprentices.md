---
layout: single
title: "Apprenticeship System Map"
permalink: /apprentices/
nav_exclude: false
---

Welcome to the Apprentices page. This map shows the spatial distribution of the apprenticeship system in 1851 by county.

<!-- Load D3 -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- SVG container -->
<div id="map-container">
  <svg width="960" height="600"></svg>
</div>

<!-- Optional styling -->
<style>
#region-tooltip {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  padding: 5px 10px;
  font-size: 14px;
  pointer-events: none;
  visibility: hidden;
}
</style>

<!-- Tooltip element -->
<div id="region-tooltip"></div>

<!-- Load the map script -->
<script src="/assets/maps/map.js"></script>

