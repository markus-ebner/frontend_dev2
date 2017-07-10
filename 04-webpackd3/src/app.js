import appCss from './app.css';

import $ from 'jquery';
import router from './router';
import notFoundTpl from './templates/not-found.hbs';
import chartTpl from './templates/chart.hbs';
import api from './ergast';
import Datamap from 'datamaps';
import { lookup } from 'country-data';
import * as topojson from 'topojson';
import * as d3 from "d3";
import json from './world.json';

const $app = $('#app');

function chart() {
  api.courses.get()
    .then(courses => courses.map(course => {
      course.code = lookup.countries({name: course.Circuit.Location.country})[0];
      return course;
    }))
    .then(renderChart);
}
function chartd3() {
    api.courses.get()
        .then(courses => courses.map(course => {
            course.code = lookup.countries({name: course.Circuit.Location.country})[0];
            return course;
        }))
        .then(renderChartd3);
}

function renderChart(data) {
  $app.html(chartTpl());
  const map = new Datamap({
    element: document.getElementById("container"),
    fills: {
      defaultFill: '#c7eb9d',
      hasData: '#699bff'
    },
    data: data.filter(d => d && d.code && d.code.alpha3).reduce((acc, d) => {
      acc[d.code.alpha3] = {
        fillKey: d ? 'hasData' : 'defaultFill',
        data: d
      };
      return acc;
    }, {}),
    geographyConfig: {
      popupTemplate: function(geo, data) {
        return `<div class="hoverinfo">
          <div>Racename: ${data.data.raceName}</div>
          <div>Circuitname: ${data.data.Circuit.circuitName}</div>
          <div>Locality: ${data.data.Circuit.Location.locality}</div>
        </div>`;
      }
    },
  });
  return Promise.resolve();
}

function renderChartd3(courses) {
    $app.html(chartTpl());
    const width = 960,
        height = 500;

    const projection = d3.geoMercator()
        .center([0, 0])
        .scale(150)
        .rotate([0,0]);

    const svg = d3.select("#container").append("svg")
        .attr("width", width)
        .attr("height", height);

    const path = d3.geoPath()
        .projection(projection);

    const g = svg.append("g");
    d3.json(json, function(error, topology) {
        g.selectAll("path")
            .data(topojson.feature(json, json.objects.countries).features)
            .enter()
            .append("path")
            .attr("d", path);

        g.selectAll("circle")
            .data(courses)
            .enter()
            .append("a")
            .attr("a:href", function(d) {
                return d.Circuit.url;
            })
            .append("circle")
            .attr("cx", function(d) {
                console.log(d.Circuit.Location.long);
                return projection([d.Circuit.Location.long, d.Circuit.Location.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([d.Circuit.Location.long, d.Circuit.Location.lat])[1];
            })
            .attr("r", 5)
            .style("fill", "blue")
            .append("svg:title")
            .text(function(d) { return d.raceName; });
        });

    svg.call(d3.zoom().on("zoom",function() {
            g.attr("transform", d3.event.transform);
            g.selectAll("circle").attr("d", path.projection(projection));
            g.selectAll("path").attr("d", path.projection(projection));
        }));

    return Promise.resolve();
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/d3', chartd3);
router('*', chart);
router();
