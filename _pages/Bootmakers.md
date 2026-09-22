---
layout: single
title: "Technological Unemployment in Victorian Britain"
permalink: /bootmakers/
noindex: true
---

<p style="font-size:1.15em;color:#555;margin-top:-0.6em;margin-bottom:0.2em;font-style:italic;">
  Young Workers and the Collapse of Entry
</p>
<p style="color:#777;margin-bottom:2em;">H. G. Vipond</p>

<p style="font-size:1.05em;line-height:1.7;max-width:820px;">
  This page is a visual summary of my paper on the mechanization of the English
  bootmaking industry. It rebuilds the paper's figures as interactive graphics.
</p>

<!-- ================================================ -->
<!-- ABSTRACT                                         -->
<!-- ================================================ -->

<div style="background:#f7f7f4;border-left:4px solid #238B45;padding:22px 28px;margin:2.2em 0 2.8em 0;max-width:820px;border-radius:2px;">
  <div style="font-size:0.78em;letter-spacing:0.12em;text-transform:uppercase;color:#238B45;font-weight:700;margin-bottom:10px;">Abstract</div>
  <p style="line-height:1.75;margin-bottom:1em;">
    New technologies swept through Britain during the Second Industrial Revolution,
    destroying old jobs and creating new ones. We know little about how workers
    reallocated. Using 170 million full-count British census observations
    (1851&ndash;1911), I construct new task-level data on occupation and investigate
    English bootmaking as it mechanized. 153,000 artisanal jobs disappeared as skills
    became obsolete; 140,000 specialized jobs emerged. Incumbent artisans did not take
    the new jobs, nor were they displaced. Instead, entry collapsed &mdash; young men
    stopped entering the old trade. New jobs went primarily to young workers, though not
    in the same locations. Young cohorts absorbed the adjustment.
  </p>
  <p style="margin-bottom:0;font-size:0.9em;color:#666;">
    <strong>JEL codes:</strong> O33, N33, J24, J61, J62
  </p>
</div>

<hr style="border:none;border-top:1px solid #ddd;margin:48px 0;">

<!-- ================================================ -->
<!-- SECTION 1: NEW EVIDENCE                          -->
<!-- ================================================ -->

<h2>1. New Evidence</h2>

<p style="line-height:1.7;max-width:820px;">
  The new, granular data on occupation reveals structural change that was entirely obscured
  at the industry level of analysis. I find that approximately 153,000 old, artisanal
  bootmaking jobs disappeared as the industry mechanized, while 140,000 new, more
  specialized jobs emerged. At the national level, the countervailing forces of job loss and
  job creation nearly netted out. However, that was not true at the regional level. The
  older, artisanal jobs disappeared in every English county following mechanization, while
  the new jobs were heavily concentrated in Northamptonshire and Leicestershire. The
  geography of the industry shifted, and became much more heavily concentrated.
</p>

<h3 style="margin-top:1.8em;">1.1 Job Loss and Creation</h3>

<p style="line-height:1.7;max-width:820px;">
  Having classified the textual descriptions of occupation for the 1.3 million individual
  level observations of English bootmakers from 1851&ndash;1911 into micro-occupations, it is
  now possible to assess the impact of mechanization on the occupational structure of the
  bootmaking industry at both the industry level and the new &ldquo;task&rdquo; level.
</p>

<p style="line-height:1.7;max-width:820px;">
  The first finding is the extent to which the &ldquo;task&rdquo; level of analysis reveals
  changes in the occupational structure which were almost entirely masked at the industry
  level. If we assess the impacts of mechanization on total employment in the bootmaking
  industry &mdash; at the industry level &mdash; we see only minimal impact. Prior to
  mechanization, in 1851, the English bootmaking industry employed approximately 222,000
  workers. By 1911, post-mechanization, it employed approximately the same. This may seem to
  suggest little impact.
</p>

<div id="fig1" style="max-width:980px;margin-top:1.6em;">

  <div id="fig1-stats" style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px;"></div>

  <div id="fig1-views" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
  <p id="fig1-blurb" style="font-size:0.95em;color:#555;min-height:3.1em;margin:12px 0 2px 0;line-height:1.6;max-width:880px;"></p>

  <div id="fig1-chart"></div>

  <div id="fig1-legend" style="display:flex;flex-wrap:wrap;gap:5px 8px;margin-top:12px;"></div>

  <p style="font-size:0.85em;color:#777;line-height:1.6;margin-top:20px;max-width:880px;">
    <em>Notes:</em> This figure reports employment in the English bootmaking industry
    aggregated at the industry level (Panel A) and disaggregated to the task level (Panels B
    and C). Panel A shows that total employment in bootmaking remained relatively stable over
    the period of mechanization. Panel B shows a sustained decline in traditional artisanal
    tasks, with approximately 153,000 jobs disappearing nationally. Panel C shows the
    emergence of roughly 140,000 new, more specialized tasks associated with mechanized
    production.
    <br><br>
    <em>On this version:</em> counts are person-level observations in the expanded cleaned
    English bootmaker sample; unclassified occupation strings are excluded. The vertical
    marker is 1857, the year the first bootmaking sewing machines were imported into England
    and set to work. There is no 1871 census in the ICeM data. Hover a band for its count and
    share; click a task in the legend to isolate it. <em>Source:</em> data derived by the
    author from ICeM full-count census microdata.
  </p>
</div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
(function(){
  document.addEventListener("DOMContentLoaded", function(){

  // ---------------------------------------------------------------
  // English bootmaking employment by task, 1851-1911.
  // Expanded cleaned sample. Old tasks: 216,314 (1851) -> 63,207 (1911),
  // a fall of 153,107. New tasks: 3,930 -> 144,284, a rise of 140,354.
  // Rows are ordered old-first (descending 1851), then new (descending 1911),
  // which is also the bottom-to-top stacking order.
  // ---------------------------------------------------------------
  var YEARS = [1851, 1861, 1881, 1891, 1901, 1911];

  var RAW = [
    ["Maker",        "old", 133429, 137484, 113890, 113095, 91785, 55235],
    ["Cordwainer",   "old",  46006,  38700,  12866,   3714,  1952,   691],
    ["Binder",       "old",  28018,  29589,   3340,   1608,   761,   267],
    ["Closer",       "old",   5423,   9430,   4009,   3424,  2797,  2301],
    ["Clogger",      "old",   3438,   4631,   7071,   6489,  5868,  4713],
    ["Repairer",     "new",    253,    174,    530,   1608,  5396, 30339],
    ["Dealer",       "new",   1187,   1908,   5729,  10627, 20219, 23273],
    ["Machinist",    "new",      3,    437,  13105,  16934, 26073, 21563],
    ["Finisher",     "new",     40,    181,  12258,  20380, 20083, 15392],
    ["Clicker",      "new",    572,   1182,   6424,  10670, 12376, 11826],
    ["Laster",       "new",     85,     66,   1263,   4506,  9015,  6963],
    ["Riveter",      "new",      1,     52,  10283,  11451,  9552,  5990],
    ["Fitter",       "new",      8,    320,   7584,   9152, 10696,  5266],
    ["Manufacturer", "new",    886,   1365,   3231,   4212,  3988,  4078],
    ["Factory",      "new",     40,    180,   1257,   1713,  4486,  3861],
    ["Operator",     "new",      7,     33,    107,    222,  1043,  2398],
    ["Slipper",      "new",    276,    335,   1107,   2024,  2171,  2302],
    ["Presser",      "new",      7,     11,    848,   1480,  2563,  2068],
    ["Sewer",        "new",     50,     98,    497,    869,  1563,  1796],
    ["Cutter",       "new",     84,    161,    703,   1056,  1348,  1149],
    ["Manager",      "new",      9,     22,    254,    781,  1160,  1098],
    ["Heel builder", "new",    120,    188,     17,    376,   905,   971],
    ["Packer",       "new",     13,     22,    130,    381,   864,   957],
    ["Trimmer",      "new",     38,     30,    181,    357,   745,   735],
    ["Foreman",      "new",     55,     82,    208,    447,   743,   594],
    ["Boot rounder", "new",      2,      0,    133,    245,   487,   576],
    ["Skiver",       "new",      1,      0,     52,     87,   321,   357],
    ["Knot tier",    "new",      0,      2,    184,    250,   394,   306],
    ["Eyeletter",    "new",      0,      1,     31,    208,   335,   205],
    ["Blocker",      "new",    193,    141,    251,    200,   146,   145],
    ["Paster",       "new",      0,      3,    174,    165,   168,    76]
  ];

  var TASKS = RAW.map(function(r){
    return { name: r[0], group: r[1], vals: r.slice(2) };
  });
  var KEYS     = TASKS.map(function(t){ return t.name; });
  var OLD      = TASKS.filter(function(t){ return t.group === "old"; });
  var NEW      = TASKS.filter(function(t){ return t.group === "new"; });
  var byName   = new Map(TASKS.map(function(t){ return [t.name, t]; }));

  // --- colours: blues for the artisanal tasks, greens for the machine-era ones
  var COLOR = new Map();
  OLD.forEach(function(t, i){
    COLOR.set(t.name, d3.interpolateBlues(0.88 - 0.13 * i));
  });
  NEW.forEach(function(t, i){
    COLOR.set(t.name, d3.interpolateGreens(0.90 - 0.62 * (i / (NEW.length - 1))));
  });

  // --- totals
  function totalAt(i, subset){
    return (subset || TASKS).reduce(function(s, t){ return s + t.vals[i]; }, 0);
  }
  var TOTALS = YEARS.map(function(_, i){ return totalAt(i); });

  var fmt  = d3.format(",");
  var fmtS = d3.format("+,");

  // ---------------------------------------------------------------
  // Headline stat tiles
  // ---------------------------------------------------------------
  var stats = [
    { label: "Industry total",      sub: "all bootmakers",        a: totalAt(0),        b: totalAt(5),        col: "#4c5f9e" },
    { label: "Old artisanal tasks", sub: "makers, cordwainers…", a: totalAt(0, OLD), b: totalAt(5, OLD), col: "#08519c" },
    { label: "New machine-era tasks", sub: "machinists, riveters…", a: totalAt(0, NEW), b: totalAt(5, NEW), col: "#238B45" }
  ];
  d3.select("#fig1-stats").selectAll("div").data(stats).join("div")
    .attr("style", function(d){
      return "flex:1 1 210px;background:#fff;border:1px solid #e3e3e3;border-top:3px solid " +
             d.col + ";border-radius:3px;padding:12px 16px;";
    })
    .html(function(d){
      var diff = d.b - d.a;
      return '<div style="font-size:0.72em;letter-spacing:0.08em;text-transform:uppercase;color:#888;font-weight:700;">' + d.label + '</div>' +
             '<div style="font-size:1.45em;font-weight:700;color:' + d.col + ';margin:4px 0 2px 0;">' + fmtS(diff) + '</div>' +
             '<div style="font-size:0.85em;color:#666;">' + fmt(d.a) + ' &rarr; ' + fmt(d.b) + ' &nbsp;<span style="color:#aaa;">1851&ndash;1911</span></div>';
    });

  // ---------------------------------------------------------------
  // Chart scaffolding
  // ---------------------------------------------------------------
  var W = 940, H = 520;
  var M = { top: 18, right: 22, bottom: 46, left: 74 };
  var iW = W - M.left - M.right, iH = H - M.top - M.bottom;

  var svg = d3.select("#fig1-chart").append("svg")
    .attr("viewBox", [0, 0, W, H])
    .attr("width", "100%")
    .style("font-family", "sans-serif")
    .style("font-size", "13px")
    .style("overflow", "visible");

  var g = svg.append("g").attr("transform", "translate(" + M.left + "," + M.top + ")");

  var x = d3.scaleLinear().domain([1851, 1911]).range([0, iW]);
  var y = d3.scaleLinear().domain([0, 250000]).range([iH, 0]);

  // gridlines
  g.append("g").attr("class", "fig1-grid")
    .selectAll("line").data(y.ticks(6)).join("line")
      .attr("x1", 0).attr("x2", iW)
      .attr("y1", y).attr("y2", y)
      .attr("stroke", "#ececec").attr("stroke-width", 1);

  // layers, back to front
  var envLayer  = g.append("g");
  var areaLayer = g.append("g");
  var lineLayer = g.append("g");
  var markLayer = g.append("g");

  // axes
  g.append("g")
    .attr("transform", "translate(0," + iH + ")")
    .call(d3.axisBottom(x).tickValues(YEARS).tickFormat(d3.format("d")).tickSizeOuter(0))
    .call(function(s){ s.select(".domain").attr("stroke", "#bbb"); s.selectAll("line").attr("stroke", "#bbb"); })
    .selectAll("text").attr("fill", "#555");

  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d3.format(",")).tickSizeOuter(0))
    .call(function(s){ s.select(".domain").remove(); s.selectAll("line").attr("stroke", "#ddd"); })
    .selectAll("text").attr("fill", "#555");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -iH / 2).attr("y", -58)
    .attr("text-anchor", "middle").attr("fill", "#666")
    .style("font-size", "12px")
    .text("Workers employed");

  // 1857 sewing-machine marker
  markLayer.append("line")
    .attr("x1", x(1857)).attr("x2", x(1857))
    .attr("y1", 0).attr("y2", iH)
    .attr("stroke", "#999").attr("stroke-width", 1.5);
  markLayer.append("text")
    .attr("transform", "translate(" + (x(1857) - 6) + "," + (iH - 12) + ") rotate(-90)")
    .attr("fill", "#8a8a8a").style("font-size", "11px").style("letter-spacing", "0.06em")
    .text("sewing machine, 1857");

  // tooltip
  var tip = d3.select("body").append("div")
    .style("position", "absolute").style("pointer-events", "none").style("visibility", "hidden")
    .style("background", "#fff").style("border", "1px solid #ccc").style("padding", "8px 11px")
    .style("border-radius", "5px").style("font-size", "13px").style("line-height", "1.45")
    .style("box-shadow", "0 2px 8px rgba(0,0,0,.18)").style("z-index", 9999);

  function nearestYearIndex(px){
    var yr = x.invert(px), best = 0, bd = Infinity;
    YEARS.forEach(function(Y, i){
      var d = Math.abs(Y - yr);
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }

  // ---------------------------------------------------------------
  // Views
  // ---------------------------------------------------------------
  var VIEWS = [
    { id: "industry", label: "A · Industry level",
      blurb: "If we assess the impacts of mechanization on total employment in the bootmaking industry — at the industry level — we see only minimal impact. Prior to mechanization, in 1851, the English bootmaking industry employed approximately 222,000 workers. By 1911, post-mechanization, it employed approximately the same. This may seem to suggest little impact." },
    { id: "old", label: "B · Old tasks",
      blurb: "I define the “old” tasks as those which, together, were responsible for the employment of 97% of all English bootmakers prior to mechanization (in 1851 and 1861). As mechanization set in, the old jobs monotonically declined. In total, 153,000 artisanal bootmaking jobs disappeared over the period." },
    { id: "new", label: "C · New tasks",
      blurb: "Simultaneously, a set of new, more specialized jobs emerged. In total, 140,000 new jobs emerged over the period, in work including but not limited to: sewing machinists, riveters, operators, and the foremen and managers in the factories. A more modern production process was displacing the older, artisanal one." },
    { id: "all", label: "Old + New together",
      blurb: "At the national level, the countervailing forces of job creation and job loss as the English bootmaking industry mechanized very nearly balanced out." }
  ];

  var current = VIEWS[0], isolated = null;

  function activeSet(viewId){
    if (viewId === "industry") return new Set();
    if (viewId === "old")      return new Set(OLD.map(function(t){ return t.name; }));
    if (viewId === "new")      return new Set(NEW.map(function(t){ return t.name; }));
    return new Set(KEYS);
  }

  function stackFor(viewId){
    var active = activeSet(viewId);
    var rows = YEARS.map(function(Y, i){
      var o = { year: Y };
      TASKS.forEach(function(t){ o[t.name] = active.has(t.name) ? t.vals[i] : 0; });
      return o;
    });
    return d3.stack().keys(KEYS)(rows);
  }

  var area = d3.area()
    .x(function(d){ return x(d.data.year); })
    .y0(function(d){ return y(d[0]); })
    .y1(function(d){ return y(d[1]); });

  var envArea = d3.area()
    .x(function(d, i){ return x(YEARS[i]); })
    .y0(y(0))
    .y1(function(d){ return y(d); });

  var envLine = d3.line()
    .x(function(d, i){ return x(YEARS[i]); })
    .y(function(d){ return y(d); });

  // envelope (industry total) - always present, restyled per view
  var envPath = envLayer.append("path")
    .datum(TOTALS)
    .attr("d", envArea)
    .style("cursor", "crosshair");

  var envStroke = lineLayer.append("path")
    .datum(TOTALS)
    .attr("d", envLine)
    .attr("fill", "none")
    .attr("stroke-width", 2);

  envPath
    .on("mouseover", function(){ if (current.id === "industry") tip.style("visibility", "visible"); })
    .on("mousemove", function(event){
      if (current.id !== "industry") return;
      var mx = d3.pointer(event, g.node())[0];
      var i  = nearestYearIndex(mx);
      tip.html('<strong>All bootmakers</strong><br>' + YEARS[i] + ': ' + fmt(TOTALS[i]) + ' workers')
         .style("left", (event.pageX + 14) + "px")
         .style("top",  (event.pageY - 12) + "px");
    })
    .on("mouseout", function(){ tip.style("visibility", "hidden"); });

  function render(view, animate){
    var dur = animate ? 700 : 0;

    // envelope styling
    var industry = (view.id === "industry");
    envPath.transition().duration(dur)
      .attr("fill", industry ? "#8d97c9" : "#ededf2")
      .attr("opacity", industry ? 0.92 : 1);
    envStroke.transition().duration(dur)
      .attr("stroke", industry ? "#2d3d8f" : "#c9c9d4");

    // stacked task areas
    var data = stackFor(view.id);

    areaLayer.selectAll("path")
      .data(data, function(d){ return d.key; })
      .join(
        function(enter){
          return enter.append("path")
            .attr("fill", function(d){ return COLOR.get(d.key); })
            .attr("stroke", "#fff").attr("stroke-width", 0.5)
            .attr("d", area)
            .style("cursor", "crosshair")
            .on("mouseover", function(event, d){
              if (current.id === "industry") return;
              tip.style("visibility", "visible");
              d3.select(this).attr("stroke", "#333").attr("stroke-width", 1.2).raise();
            })
            .on("mousemove", function(event, d){
              if (current.id === "industry") return;
              var mx  = d3.pointer(event, g.node())[0];
              var i   = nearestYearIndex(mx);
              var t   = byName.get(d.key);
              var v   = t.vals[i];
              var pct = TOTALS[i] ? (100 * v / TOTALS[i]) : 0;
              tip.html('<strong>' + d.key + '</strong> <span style="color:#888;">(' +
                       (t.group === "old" ? "old" : "new") + ')</span><br>' +
                       YEARS[i] + ': ' + fmt(v) + ' workers<br>' +
                       '<span style="color:#777;">' + pct.toFixed(1) + '% of all bootmakers</span>')
                 .style("left", (event.pageX + 14) + "px")
                 .style("top",  (event.pageY - 12) + "px");
            })
            .on("mouseout", function(){
              tip.style("visibility", "hidden");
              d3.select(this).attr("stroke", "#fff").attr("stroke-width", 0.5);
            });
        },
        function(update){ return update; },
        function(exit){ return exit.remove(); }
      )
      .transition().duration(dur)
      .attr("d", area);

    applyIsolation();
    drawLegend(view);
  }

  function applyIsolation(){
    areaLayer.selectAll("path")
      .attr("opacity", function(d){
        if (!isolated) return 1;
        return d.key === isolated ? 1 : 0.13;
      });
  }

  // ---------------------------------------------------------------
  // Legend
  // ---------------------------------------------------------------
  function drawLegend(view){
    var items;
    if (view.id === "industry") {
      items = [{ name: "All bootmakers", swatch: "#8d97c9", inert: true }];
    } else {
      var list = view.id === "old" ? OLD : view.id === "new" ? NEW : TASKS;
      items = list.map(function(t){
        return { name: t.name, swatch: COLOR.get(t.name), inert: false };
      });
    }

    d3.select("#fig1-legend").selectAll("span")
      .data(items, function(d){ return d.name; })
      .join("span")
        .attr("style", function(d){
          var on = isolated && d.name === isolated;
          return "display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:3px 9px 3px 5px;" +
                 "border:1px solid " + (on ? "#333" : "#e0e0e0") + ";border-radius:12px;" +
                 "background:" + (on ? "#f4f4f4" : "#fff") + ";" +
                 "color:#444;cursor:" + (d.inert ? "default" : "pointer") + ";" +
                 "opacity:" + (isolated && !on && !d.inert ? 0.45 : 1) + ";";
        })
        .html(function(d){
          return '<span style="width:11px;height:11px;border-radius:2px;background:' + d.swatch +
                 ';display:inline-block;flex:none;"></span>' + d.name;
        })
        .on("click", function(event, d){
          if (d.inert) return;
          isolated = (isolated === d.name) ? null : d.name;
          applyIsolation();
          drawLegend(current);
        })
        .order();
  }

  // ---------------------------------------------------------------
  // View switcher
  // ---------------------------------------------------------------
  function styleButtons(){
    d3.select("#fig1-views").selectAll("button")
      .attr("style", function(d){
        var on = d.id === current.id;
        return "font-family:inherit;font-size:13px;padding:7px 15px;cursor:pointer;" +
               "border-radius:3px;letter-spacing:0.01em;" +
               "border:1px solid " + (on ? "#238B45" : "#d5d5d5") + ";" +
               "background:" + (on ? "#238B45" : "#fff") + ";" +
               "color:" + (on ? "#fff" : "#444") + ";" +
               "font-weight:" + (on ? 600 : 400) + ";";
      });
  }

  d3.select("#fig1-views").selectAll("button")
    .data(VIEWS)
    .join("button")
      .text(function(d){ return d.label; })
      .on("click", function(event, d){
        current = d;
        isolated = null;
        tip.style("visibility", "hidden");
        styleButtons();
        d3.select("#fig1-blurb").text(d.blurb);
        render(d, true);
      });

  styleButtons();
  d3.select("#fig1-blurb").text(current.blurb);
  render(current, false);

  });
})();
</script>

<p style="line-height:1.7;max-width:820px;margin-top:2em;">
  However, the new &ldquo;tasks&rdquo; level of analysis makes it possible to pry open this
  black box. I define the &ldquo;old&rdquo; tasks as those which, together, were responsible
  for the employment of 97% of all English bootmakers prior to mechanization (in 1851 and
  1861). These were the &ldquo;Shoemakers&rdquo;, &ldquo;Cordwainers&rdquo;,
  &ldquo;Cloggers&rdquo;, &ldquo;Binders&rdquo;, and &ldquo;Closers&rdquo;. As mechanization
  set in, the old jobs monotonically declined. In total, 153,000 artisanal bootmaking jobs
  disappeared over the period.
</p>

<p style="line-height:1.7;max-width:820px;">
  Simultaneously, a set of new, more specialized jobs emerged. In total, 140,000 new jobs
  emerged over the period, in work including but not limited to: sewing machinists, riveters,
  operators, and the foremen and managers in the factories. A more modern production process
  was displacing the older, artisanal one.
</p>

<p style="line-height:1.7;max-width:820px;">
  At the national level, the countervailing forces of job creation and job loss as the
  English bootmaking industry mechanized very nearly balanced out. Given the large increase
  in productivity associated with mechanization, far fewer workers would have been required
  to produce a given number of boots. Since the number of bootmakers did not fall to a fifth
  of its 1851 level, production must therefore have increased &mdash; substantially. This
  takes us into Jevons' paradox territory (Jevons, 1865). The fall in the cost of boots
  appears to have generated a sufficiently large increase in demand to offset much of the
  labour-saving effect of the new technology. Although job loss and job creation nearly
  balanced out at the national level, this was not at all the case at the more regional
  level. The following section turns to the geography of creative destruction at the county
  level.
</p>

<hr style="border:none;border-top:1px solid #eee;margin:44px 0;">

<h3 style="margin-top:1.8em;">1.2 Geography</h3>

<p style="line-height:1.7;max-width:820px;">
  My second finding is that the industry relocated spatially. The new task level of analysis
  shows that artisanal jobs disappeared in every county in England, while the new jobs
  emerged primarily in only a few counties. The figure below illustrates the total change in
  the number of bootmakers employed in &ldquo;new&rdquo; and &ldquo;old&rdquo; tasks, by
  county, between 1851 and 1911.
</p>

<div id="fig2a" style="max-width:960px;margin-top:1.6em;">
  <div id="fig2a-chart"></div>
  <p style="font-size:0.85em;color:#777;line-height:1.6;margin-top:14px;max-width:900px;">
    <em>Notes:</em> This figure reports county-level changes in the number of bootmakers
    employed, by task category, between 1851 and 1911. Panel A shows the change in the number
    of workers employed in traditional artisanal bootmaking tasks. Panel B shows the
    corresponding change in employment in newly emerging, more specialized bootmaking tasks.
    Counties are ordered by the size of their artisanal loss. Hover a county to read both
    figures and the net change.
    <em>Source:</em> data derived by the author from ICeM full-count census microdata.
  </p>
</div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function(){

  // paper palette
  var OLD_BLUE  = "#4F81BD";
  var NEW_GREEN = "#2E9B33";

  var W = 900, ROW = 13;
  var M = { top: 54, right: 14, bottom: 52, left: 8 };
  var LAB = 152, GAP = 26;
  var PW  = (W - M.left - M.right - LAB - GAP) / 2;

  var fmt  = d3.format(",");
  var fmtS = d3.format("+,");

  function pretty(c){
    return String(c).replace(/,/g, "").toLowerCase()
      .replace(/\b[a-z]/g, function(m){ return m.toUpperCase(); });
  }

  d3.json("/assets/maps/bootmaker_counts_by_county.json?v=1").then(function(rows){
    if (!rows) return;

    var at = {};
    rows.forEach(function(r){
      var c = String(r.county).toUpperCase().trim();
      (at[c] || (at[c] = {}))[r.year] = { old: +r.old, new: +r.new };
    });

    var data = Object.keys(at).map(function(c){
      var a = at[c][1851] || { old: 0, new: 0 };
      var b = at[c][1911] || { old: 0, new: 0 };
      return { county: c, name: pretty(c), dOld: b.old - a.old, dNew: b.new - a.new };
    }).sort(function(p, q){ return d3.ascending(p.dOld, q.dOld); });

    var H = M.top + data.length * ROW + M.bottom;

    var svg = d3.select("#fig2a-chart").append("svg")
      .attr("viewBox", [0, 0, W, H])
      .attr("width", "100%")
      .style("font-family", "sans-serif")
      .style("overflow", "visible");

    var xA = d3.scaleLinear()
      .domain([Math.min(0, d3.min(data, function(d){ return d.dOld; })), 0]).nice()
      .range([0, PW]);
    var xB = d3.scaleLinear()
      .domain([0, d3.max(data, function(d){ return d.dNew; })]).nice()
      .range([0, PW]);

    var AX = M.left + LAB;          // left edge of panel A
    var BX = AX + PW + GAP;         // left edge of panel B
    var y  = function(i){ return M.top + i * ROW; };

    // panel titles
    svg.append("text").attr("x", AX).attr("y", 20)
      .attr("fill", "#333").style("font-size", "13.5px").style("font-weight", "700")
      .text("A: Change in Number of 'Old' Tasks");
    svg.append("text").attr("x", BX).attr("y", 20)
      .attr("fill", "#333").style("font-size", "13.5px").style("font-weight", "700")
      .text("B: Change in Number of 'New' Tasks");

    // plot backgrounds
    [[AX, "a"], [BX, "b"]].forEach(function(p){
      svg.append("rect").attr("x", p[0]).attr("y", M.top - 6)
        .attr("width", PW).attr("height", data.length * ROW + 10)
        .attr("fill", "#f6f6f6");
    });

    // gridlines
    xA.ticks(6).forEach(function(t){
      svg.append("line").attr("x1", AX + xA(t)).attr("x2", AX + xA(t))
        .attr("y1", M.top - 6).attr("y2", M.top + data.length * ROW + 4)
        .attr("stroke", t === 0 ? "#bbb" : "#fff").attr("stroke-width", t === 0 ? 1 : 1);
    });
    xB.ticks(6).forEach(function(t){
      svg.append("line").attr("x1", BX + xB(t)).attr("x2", BX + xB(t))
        .attr("y1", M.top - 6).attr("y2", M.top + data.length * ROW + 4)
        .attr("stroke", t === 0 ? "#bbb" : "#fff").attr("stroke-width", 1);
    });

    // hover bands (full width, behind bars)
    var bands = svg.append("g").selectAll("rect").data(data).join("rect")
      .attr("x", M.left).attr("y", function(d, i){ return y(i); })
      .attr("width", W - M.left - M.right).attr("height", ROW)
      .attr("fill", "transparent").style("cursor", "crosshair");

    // county labels
    svg.append("g").selectAll("text").data(data).join("text")
      .attr("x", AX - 8).attr("y", function(d, i){ return y(i) + ROW - 3.5; })
      .attr("text-anchor", "end").attr("fill", "#444")
      .style("font-size", "10.5px").style("pointer-events", "none")
      .text(function(d){ return d.name; });

    // bars
    var barsA = svg.append("g").selectAll("rect").data(data).join("rect")
      .attr("x", function(d){ return AX + xA(Math.min(0, d.dOld)); })
      .attr("y", function(d, i){ return y(i) + 2; })
      .attr("width", function(d){ return Math.abs(xA(d.dOld) - xA(0)); })
      .attr("height", ROW - 4)
      .attr("fill", OLD_BLUE).style("pointer-events", "none");

    var barsB = svg.append("g").selectAll("rect").data(data).join("rect")
      .attr("x", BX + xB(0))
      .attr("y", function(d, i){ return y(i) + 2; })
      .attr("width", function(d){ return Math.max(0, xB(d.dNew) - xB(0)); })
      .attr("height", ROW - 4)
      .attr("fill", NEW_GREEN).style("pointer-events", "none");

    // axes
    var ay = M.top + data.length * ROW + 6;
    svg.append("g").attr("transform", "translate(" + AX + "," + ay + ")")
      .call(d3.axisBottom(xA).ticks(6).tickFormat(d3.format(",")).tickSizeOuter(0))
      .call(function(s){ s.select(".domain").attr("stroke", "#bbb"); s.selectAll("line").attr("stroke", "#bbb"); })
      .selectAll("text").attr("fill", "#666").style("font-size", "10px");
    svg.append("g").attr("transform", "translate(" + BX + "," + ay + ")")
      .call(d3.axisBottom(xB).ticks(6).tickFormat(d3.format(",")).tickSizeOuter(0))
      .call(function(s){ s.select(".domain").attr("stroke", "#bbb"); s.selectAll("line").attr("stroke", "#bbb"); })
      .selectAll("text").attr("fill", "#666").style("font-size", "10px");

    [[AX, "Change in Number, 1851–1911"], [BX, "Change in Number, 1851–1911"]].forEach(function(p){
      svg.append("text").attr("x", p[0] + PW / 2).attr("y", ay + 38)
        .attr("text-anchor", "middle").attr("fill", "#666").style("font-size", "11px")
        .text(p[1]);
    });

    // interaction
    var tip = d3.select("body").append("div")
      .style("position", "absolute").style("pointer-events", "none").style("visibility", "hidden")
      .style("background", "#fff").style("border", "1px solid #ccc").style("padding", "8px 11px")
      .style("border-radius", "5px").style("font-size", "13px").style("line-height", "1.5")
      .style("box-shadow", "0 2px 8px rgba(0,0,0,.18)").style("z-index", 9999);

    bands
      .on("mouseover", function(event, d){
        d3.select(this).attr("fill", "rgba(0,0,0,0.055)");
        tip.style("visibility", "visible");
      })
      .on("mousemove", function(event, d){
        var net = d.dOld + d.dNew;
        tip.html('<strong>' + d.name + '</strong><br>' +
                 '<span style="color:' + OLD_BLUE + ';">&#9632;</span> Old tasks: ' + fmtS(d.dOld) + '<br>' +
                 '<span style="color:' + NEW_GREEN + ';">&#9632;</span> New tasks: ' + fmtS(d.dNew) + '<br>' +
                 '<span style="color:#666;">Net: ' + fmtS(net) + '</span>')
           .style("left", (event.pageX + 14) + "px")
           .style("top", (event.pageY - 12) + "px");
      })
      .on("mouseout", function(){
        d3.select(this).attr("fill", "transparent");
        tip.style("visibility", "hidden");
      });
  });

  });
})();
</script>

<p style="line-height:1.7;max-width:820px;margin-top:2em;">
  The overall picture is one in which the older and more general types of work declined in
  every county in England, while employment in the new and more specialized tasks emerged in
  only a select few. The result is that the balancing of countervailing forces which we saw at
  the national level did not take place at the more local level. In most counties the
  bootmaking industry as a whole went into decline. In two counties &mdash; Northamptonshire
  and Leicestershire &mdash; the loss of employment in the older tasks was more than
  compensated by the surge in new opportunities, and the bootmaking industry flourished.
</p>

<p style="line-height:1.7;max-width:820px;">
  Interpreted geographically, the net result was a tectonic shift in the location of the
  industry. Nearly half of the new jobs were generated in Northamptonshire and Leicestershire
  alone, and those two counties became the enclaves of English bootmaking.
</p>

<h4 style="margin-top:2.2em;font-size:1.05em;color:#444;">The same shift, census by census</h4>

<p style="line-height:1.7;max-width:820px;">
  The figure above collapses six decades into a single number per county. The maps below
  unfold it again: drag the year slider, or press play, to watch the artisanal trade drain out
  of the country while the new work pools into Northamptonshire and Leicestershire.
</p>

<div id="fig2" style="max-width:1000px;margin-top:1.6em;">

  <div id="fig2-status"></div>

  <!-- controls -->
  <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:6px;">
    <button id="fig2-play" style="font-family:inherit;font-size:13px;padding:7px 16px;cursor:pointer;border-radius:3px;border:1px solid #238B45;background:#238B45;color:#fff;font-weight:600;min-width:86px;">&#9654;&nbsp; Play</button>
    <label style="display:flex;align-items:center;gap:10px;font-size:14px;">
      <span style="color:#666;">Census year</span>
      <input type="range" id="fig2-year" min="0" max="5" step="1" value="0" style="width:270px;vertical-align:middle;">
      <strong id="fig2-year-label" style="font-size:1.25em;color:#333;min-width:3.4em;">1851</strong>
    </label>
  </div>
  <div id="fig2-ticks" style="display:flex;justify-content:space-between;max-width:394px;margin:0 0 4px 104px;font-size:11px;color:#aaa;"></div>

  <!-- three maps -->
  <div id="fig2-maps" style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start;margin-top:10px;"></div>

  <!-- county readout -->
  <div id="fig2-readout" style="margin-top:16px;border:1px solid #e3e3e3;border-radius:3px;background:#fcfcfc;padding:14px 18px;min-height:74px;"></div>

  <p style="font-size:0.85em;color:#777;line-height:1.6;margin-top:18px;max-width:900px;">
    <em>Notes:</em> This figure reports county-level numbers of bootmakers employed, by task
    category. Panel A shows the number of workers employed in traditional artisanal bootmaking
    tasks. Panel B shows employment in newly emerging, more specialized bootmaking tasks.
    <br><br>
    <em>On this version:</em> where the paper's Figure 2 reports the total change between 1851
    and 1911, these maps report the level in each census year, so that the change can be
    played through. Each map keeps a <strong>single colour scale fixed across all six
    years</strong>, so a county fading between years is a real fall in employment rather than
    an artefact of rescaling; bands are anchored to the maximum observed in that measure over
    the whole period. Wales is outside the sample and is shown in grey. There is no 1871
    census in the ICeM data. Hover any county to read its numbers across all three panels.
    <em>Source:</em> data derived by the author from ICeM full-count census microdata.
  </p>
</div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function(){

  var YEARS  = [1851, 1861, 1881, 1891, 1901, 1911];
  var GEO    = "/assets/maps/Counties1851.geojson";
  var SRC    = "/assets/maps/bootmaker_counts_by_county.json?v=1";
  var SRC_FB = "/assets/maps/county_counts_by_year.json?v=1";

  var MW = 322, MH = 424;

  var PANELS = [
    { key: "old",   title: "Old artisanal tasks",   sub: "makers, cordwainers, binders, closers, cloggers", ramp: d3.schemeBlues[5],   accent: "#08519c" },
    { key: "new",   title: "New machine-era tasks", sub: "machinists, riveters, finishers, lasters…",  ramp: d3.schemeGreens[5],  accent: "#238B45" },
    { key: "total", title: "All bootmaking jobs",   sub: "old + new combined",                              ramp: d3.schemePurples[5], accent: "#5f4a9b" }
  ];

  var fmt = d3.format(",");

  // ---------------------------------------------------------------
  // County-name harmonisation to the geojson's R_CTY values
  // ---------------------------------------------------------------
  var DROP = /SHIPS|SHIPPING|MILITARY|ROYAL NAVY|AT SEA|ABROAD/;

  function normCounty(raw){
    var t = String(raw).toUpperCase().trim().replace(/\s+/g, " ");
    if (DROP.test(t)) return null;
    if (/^LONDON\b/.test(t)) return "LONDON";
    t = t.replace(/\s*\(EXTRA LONDON\)\s*/g, "");
    t = t.replace(/\s*\(WITH YORK\)\s*/g, "");
    t = t.replace(/^YORKSHIRE[, ]+(EAST|WEST|NORTH) RIDING$/, "YORKSHIRE, $1 RIDING");
    return t.trim();
  }

  // ---------------------------------------------------------------
  // Accept whichever JSON shape the pipeline emits:
  //   (a) tidy array   [{year, RegCnty, old, new}, ...]
  //   (b) by year      {"1851": {"KENT": {old, new}}}
  //   (c) by measure   {"old": {"1851": {"KENT": n}}, "new": {...}}
  // ---------------------------------------------------------------
  function pick(obj, names){
    var keys = Object.keys(obj);
    for (var i = 0; i < names.length; i++) {
      for (var j = 0; j < keys.length; j++) {
        if (keys[j].toLowerCase().replace(/[^a-z]/g, "") === names[i]) return keys[j];
      }
    }
    return null;
  }

  function blank(){
    return YEARS.map(function(){ return {}; });
  }

  function put(store, yi, county, measure, val){
    if (yi < 0 || county == null) return;
    var v = +val;
    if (!isFinite(v)) return;
    if (!store[yi][county]) store[yi][county] = { old: null, new: null };
    store[yi][county][measure] = (store[yi][county][measure] || 0) + v;
  }

  var F_YEAR   = ["year", "censusyear", "yr"];
  var F_COUNTY = ["regcnty", "county", "rcty", "cnty", "countyname"];
  var F_OLD    = ["old", "artisanal", "oldtasks", "oldjobs"];
  var F_NEW    = ["new", "mechanized", "mechanised", "newtasks", "newjobs"];

  function isRecord(o){
    return o && typeof o === "object" && !Array.isArray(o) &&
           pick(o, F_YEAR) && pick(o, F_COUNTY);
  }

  // R can export a data frame row-wise, as an object keyed by row index,
  // or column-wise. Fold the latter two back into a plain array of records.
  function coerce(raw){
    if (Array.isArray(raw) || !raw || typeof raw !== "object") return raw;

    var vals = Object.keys(raw).map(function(k){ return raw[k]; });
    if (vals.length && vals.every(isRecord)) return vals;

    var kY = pick(raw, F_YEAR), kC = pick(raw, F_COUNTY);
    if (kY && kC && Array.isArray(raw[kY]) && Array.isArray(raw[kC])) {
      var kO = pick(raw, F_OLD), kN = pick(raw, F_NEW), out = [];
      for (var i = 0; i < raw[kY].length; i++) {
        var r = {};
        r[kY] = raw[kY][i];
        r[kC] = raw[kC][i];
        if (kO) r[kO] = raw[kO][i];
        if (kN) r[kN] = raw[kN][i];
        out.push(r);
      }
      return out;
    }
    return raw;
  }

  function normalise(raw){
    var store = blank(), got = { old: false, new: false };
    if (!raw) return { store: store, got: got };
    raw = coerce(raw);

    if (Array.isArray(raw) && raw.length && typeof raw[0] === "object") {
      var s  = raw[0];
      var kY = pick(s, F_YEAR);
      var kC = pick(s, F_COUNTY);
      var kO = pick(s, F_OLD);
      var kN = pick(s, F_NEW);
      if (kY && kC) {
        raw.forEach(function(r){
          var yi = YEARS.indexOf(+r[kY]);
          var c  = normCounty(r[kC]);
          if (kO != null) { put(store, yi, c, "old", r[kO]); got.old = true; }
          if (kN != null) { put(store, yi, c, "new", r[kN]); got.new = true; }
        });
      }
      return { store: store, got: got };
    }

    if (typeof raw === "object") {
      var top = Object.keys(raw);
      var measureShaped = top.some(function(k){ return /^(old|new)$/i.test(k); });

      if (measureShaped) {
        top.forEach(function(mk){
          var m = /old/i.test(mk) ? "old" : /new/i.test(mk) ? "new" : null;
          if (!m) return;
          Object.keys(raw[mk] || {}).forEach(function(yk){
            var yi = YEARS.indexOf(+yk);
            Object.keys(raw[mk][yk] || {}).forEach(function(ck){
              if (ck === "RegCnty") return;
              put(store, yi, normCounty(ck), m, raw[mk][yk][ck]);
              got[m] = true;
            });
          });
        });
        return { store: store, got: got };
      }

      top.forEach(function(yk){
        var yi = YEARS.indexOf(+yk);
        if (yi < 0) return;
        var block = raw[yk] || {};
        Object.keys(block).forEach(function(ck){
          if (ck === "RegCnty") return;
          var c = normCounty(ck), cell = block[ck];
          if (cell && typeof cell === "object" && !Array.isArray(cell)) {
            var ko = pick(cell, ["old", "artisanal"]), kn = pick(cell, ["new", "mechanized", "mechanised"]);
            if (ko) { put(store, yi, c, "old", cell[ko]); got.old = true; }
            if (kn) { put(store, yi, c, "new", cell[kn]); got.new = true; }
          } else if (typeof cell === "number") {
            put(store, yi, c, "new", cell); got.new = true;
          }
        });
      });
    }
    return { store: store, got: got };
  }

  // fallback loader: the diagonal cross-tab / flat new-task counts
  function normaliseFallback(raw){
    var store = blank();
    Object.keys(raw || {}).forEach(function(yk){
      var yi = YEARS.indexOf(+yk);
      if (yi < 0) return;
      Object.keys(raw[yk] || {}).forEach(function(ck){
        if (ck === "RegCnty") return;
        var val = raw[yk][ck];
        if (Array.isArray(val)) val = val.find(function(v){ return typeof v === "number"; });
        put(store, yi, normCounty(ck), "new", val);
      });
    });
    return store;
  }

  // ---------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------
  Promise.all([
    d3.json(GEO),
    d3.json(SRC).catch(function(){ return null; }),
    d3.json(SRC_FB).catch(function(){ return null; })
  ]).then(function(res){
    var geo = res[0], primary = res[1], fb = res[2];
    if (!geo) return;

    var n = normalise(primary);
    var store = n.store, got = n.got;

    if (!got.new && fb) { store = normaliseFallback(fb); got.new = true; }

    // derive totals where both sides are present
    var haveOld = got.old, haveNew = got.new;
    store.forEach(function(yr){
      Object.keys(yr).forEach(function(c){
        var r = yr[c];
        r.total = haveOld && haveNew ? (r.old || 0) + (r.new || 0) : null;
      });
    });

    var AVAIL = { old: haveOld, new: haveNew, total: haveOld && haveNew };

    // status banner when the real old/new file has not landed yet
    if (!AVAIL.old) {
      d3.select("#fig2-status").attr("style",
        "background:#fff8e6;border:1px solid #f0d89a;border-radius:3px;padding:11px 16px;margin-bottom:16px;font-size:0.88em;color:#7a5c00;line-height:1.55;")
        .html("<strong>Old-task data unavailable.</strong> Only the <em>new machine-era tasks</em> panel " +
              "could be populated. The old-task and combined panels will fill in automatically once " +
              "<code>bootmaker_counts_by_county.json</code> loads.");
    }

    var projection = d3.geoMercator().fitSize([MW, MH - 12], geo);
    var path = d3.geoPath().projection(projection);
    var key = function(f){ return f.properties && f.properties.R_CTY; };

    // --- fixed colour scale per measure, anchored to its all-year maximum
    function maxOf(measure){
      var m = 0;
      store.forEach(function(yr){
        Object.keys(yr).forEach(function(c){
          var v = yr[c][measure];
          if (v != null && v > m) m = v;
        });
      });
      return m;
    }

    function niceRound(v){
      if (!(v > 0)) return 0;
      var e = Math.pow(10, Math.floor(Math.log10(v))), m = v / e;
      var s = m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10;
      return s * e;
    }

    function bandsFor(measure){
      var hi = maxOf(measure);
      var b = [hi / 16, hi / 8, hi / 4, hi / 2].map(niceRound);
      var out = [];
      b.forEach(function(v){ if (v > 0 && out.indexOf(v) < 0) out.push(v); });
      return out.sort(d3.ascending);
    }

    PANELS.forEach(function(p){
      p.bands = bandsFor(p.key);
      p.scale = d3.scaleThreshold().domain(p.bands).range(p.ramp);
    });

    // --- build the three panels
    var tip = d3.select("body").append("div")
      .style("position", "absolute").style("pointer-events", "none").style("visibility", "hidden")
      .style("background", "#fff").style("border", "1px solid #ccc").style("padding", "7px 10px")
      .style("border-radius", "5px").style("font-size", "13px").style("line-height", "1.45")
      .style("box-shadow", "0 2px 8px rgba(0,0,0,.18)").style("z-index", 9999);

    var panelSel = d3.select("#fig2-maps").selectAll("div.fig2-panel")
      .data(PANELS).join("div")
        .attr("class", "fig2-panel")
        .attr("style", "flex:1 1 300px;min-width:262px;");

    panelSel.append("div")
      .attr("style", function(d){
        return "border-top:3px solid " + d.accent + ";padding-top:7px;margin-bottom:2px;";
      })
      .html(function(d){
        return '<div style="font-weight:700;font-size:0.97em;color:' + d.accent + ';">' + d.title + '</div>' +
               '<div style="font-size:0.78em;color:#999;margin-top:1px;">' + d.sub + '</div>';
      });

    panelSel.each(function(p){
      var host = d3.select(this);

      var svg = host.append("svg")
        .attr("viewBox", [0, 0, MW, MH])
        .attr("width", "100%")
        .style("display", "block")
        .style("margin-top", "4px");

      p.paths = svg.selectAll("path").data(geo.features).join("path")
        .attr("d", path)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.4)
        .attr("fill", "#eee")
        .style("cursor", "crosshair")
        .on("mouseover", function(event, d){
          var c = key(d);
          if (!c) return;
          highlight(c);
          tip.style("visibility", "visible");
        })
        .on("mousemove", function(event, d){
          var c = key(d);
          var row = (store[yi] || {})[c];
          var v = row ? row[p.key] : null;
          tip.html('<strong>' + (c || "Unknown") + '</strong> &middot; ' + YEARS[yi] + '<br>' +
                   p.title + ': ' + (v == null ? '<span style="color:#999;">no data</span>' : fmt(v) + ' workers'))
             .style("left", (event.pageX + 14) + "px")
             .style("top", (event.pageY - 12) + "px");
        })
        .on("mouseout", function(){
          tip.style("visibility", "hidden");
          highlight(null);
        });

      // legend
      var lw = MW, lh = 40;
      var lsvg = host.append("svg").attr("viewBox", [0, 0, lw, lh]).attr("width", "100%");
      var bw = lw / p.ramp.length;
      p.ramp.forEach(function(c, i){
        lsvg.append("rect").attr("x", i * bw).attr("y", 2).attr("width", bw).attr("height", 11)
          .attr("fill", c).attr("stroke", "#fff").attr("stroke-width", 0.5);
      });
      p.bands.forEach(function(b, i){
        lsvg.append("text").attr("x", (i + 1) * bw).attr("y", 27)
          .attr("text-anchor", "middle").attr("fill", "#888").style("font-size", "10px")
          .text(d3.format(",")(b));
      });
      lsvg.append("text").attr("x", 0).attr("y", 38)
        .attr("fill", "#aaa").style("font-size", "9.5px").text("workers per county");
    });

    // --- interaction state
    var yi = 0, playing = false, timer = null;
    var slider = d3.select("#fig2-year"), label = d3.select("#fig2-year-label");

    d3.select("#fig2-ticks").selectAll("span").data(YEARS).join("span").text(String);

    function highlight(county){
      PANELS.forEach(function(p){
        p.paths
          .attr("stroke", function(d){ return key(d) === county ? "#222" : "#fff"; })
          .attr("stroke-width", function(d){ return key(d) === county ? 1.6 : 0.4; })
          .filter(function(d){ return key(d) === county; }).raise();
      });
      readout(county);
    }

    function englandTotal(measure, i){
      var s = 0, any = false;
      Object.keys(store[i] || {}).forEach(function(c){
        var v = store[i][c][measure];
        if (v != null) { s += v; any = true; }
      });
      return any ? s : null;
    }

    function readout(county){
      var host = d3.select("#fig2-readout");
      var row = county ? (store[yi] || {})[county] : null;

      function cell(p, val, denom){
        var share = (val != null && denom) ? (100 * val / denom) : null;
        return '<div style="flex:1 1 150px;">' +
          '<div style="font-size:0.72em;letter-spacing:0.07em;text-transform:uppercase;color:#999;font-weight:700;">' + p.title + '</div>' +
          '<div style="font-size:1.2em;font-weight:700;color:' + p.accent + ';margin-top:2px;">' +
            (val == null ? '<span style="color:#bbb;font-weight:400;font-size:0.8em;">no data</span>' : fmt(val)) + '</div>' +
          (share == null ? '' : '<div style="font-size:0.8em;color:#888;">' + share.toFixed(1) + '% of England</div>') +
        '</div>';
      }

      var head = county
        ? '<strong style="font-size:1.05em;">' + county + '</strong> <span style="color:#999;">in ' + YEARS[yi] + '</span>'
        : '<span style="color:#999;">Hover a county &mdash; </span><strong>England totals</strong> <span style="color:#999;">in ' + YEARS[yi] + '</span>';

      var cells = PANELS.map(function(p){
        var denom = englandTotal(p.key, yi);
        var val = county ? (row ? row[p.key] : null) : denom;
        return cell(p, val, county ? denom : null);
      }).join("");

      host.html('<div style="margin-bottom:9px;">' + head + '</div>' +
                '<div style="display:flex;gap:18px;flex-wrap:wrap;">' + cells + '</div>');
    }

    function paint(animate){
      PANELS.forEach(function(p){
        var sel = animate ? p.paths.transition().duration(340) : p.paths;
        sel.attr("fill", function(d){
          var c = key(d);
          if (!c) return "#f2f2f2";
          var row = (store[yi] || {})[c];
          var v = row ? row[p.key] : null;
          if (v == null) return "#ededed";
          return p.scale(v);
        });
      });
      label.text(YEARS[yi]);
      readout(null);
    }

    slider.on("input", function(){
      yi = +this.value;
      stop();
      paint(true);
    });

    function stop(){
      playing = false;
      if (timer) { timer.stop(); timer = null; }
      d3.select("#fig2-play").html("&#9654;&nbsp; Play")
        .style("background", "#238B45").style("border-color", "#238B45").style("color", "#fff");
    }

    function play(){
      playing = true;
      d3.select("#fig2-play").html("&#10073;&#10073;&nbsp; Pause")
        .style("background", "#fff").style("border-color", "#bbb").style("color", "#444");
      var last = 0;
      timer = d3.interval(function(){
        yi = (yi + 1) % YEARS.length;
        slider.property("value", yi);
        paint(true);
      }, 1150);
    }

    d3.select("#fig2-play").on("click", function(){
      if (playing) stop();
      else { if (yi === YEARS.length - 1) { yi = 0; slider.property("value", 0); paint(false); } play(); }
    });

    paint(false);
  });

  });
})();
</script>
