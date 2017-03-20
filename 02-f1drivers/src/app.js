import $ from 'jquery';
import config from './config';
import router from './router';
import homeTpl from './templates/home.hbs';
import driverTpl from './templates/driver.hbs';
import driversTpl from './templates/drivers.hbs';
import constructorTpl from './templates/constructor.hbs';
import constructorsTpl from './templates/constructors.hbs';
import notFoundTpl from './templates/not-found.hbs';


const $app = $('#app');


function index() {
  $app.html(homeTpl());
}

function constructors() {
  fetch(config.url + `/constructors.json?limit=500`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      $app.html(constructorsTpl(json.MRData.ConstructorTable));
    });
}

function drivers() {
  fetch(config.url + `/drivers.json?limit=500`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      $app.html(driversTpl(json.MRData.DriverTable));
    });
}

function notFound() {
  $app.html(notFoundTpl());
}

function driver(context) {
  fetch(config.url + `/drivers/${context.params.id}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(driverData) {
      return GetConstByDriv(context.params.id)
        .then(function(constructorsData) {
          return {
            driver: driverData.MRData.DriverTable.Drivers[0],
            constructors: constructorsData.MRData.ConstructorTable.Constructors
          };
        });
    })
    .then(function(data) {
      console.log(data);
      $app.html(driverTpl(data));
    });
}

function GetConstByDriv(driverId) {
  return fetch(config.url + `/drivers/${driverId}/constructors.json`)
    .then(function(response) {
      return response.json();
    })
}

function constructor(context) {
  fetch(config.url + `/constructors/${context.params.id}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(constructorsData) {
      return GetDriveByConst(context.params.id)
        .then(function(driversData) {
          return {
            drivers: driversData.MRData.DriverTable.Drivers,
            constructor: constructorsData.MRData.ConstructorTable.Constructors[0]
          };
        })
    })
    .then(function(data) {
      console.log(data);
      $app.html(constructorTpl(data));
    });
}
function GetDriveByConst(constructorId) {
  return fetch(config.url + `/constructors/${constructorId}/drivers.json`)
    .then(function(response) {
      return response.json();
    })
}

router('/', index);
router('/drivers', drivers);
router('/drivers/:id', driver);
router('/constructors', constructors);
router('/constructors/:id', constructor);
router('*', notFound);
router();
