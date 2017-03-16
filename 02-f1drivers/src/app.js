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
  fetch(config.url + `/constructors.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      $app.html(constructorsTpl(json.MRData.ConstructorTable));
    });
}

function drivers() {
  fetch(config.url + `/drivers.json`)
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

function driver() {

}
function constructor() {

}

router('/', index);
router('/drivers', drivers);
router('/drivers/:id', driver);
router('/constructors', constructors);
router('/constructors/:id', constructor);
router('*', notFound);
router();
