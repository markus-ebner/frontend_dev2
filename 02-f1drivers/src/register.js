/**
 * Created by markusebner on 20.03.17.
 */
import Handlebars from 'hbsfy/runtime';
import * as helpers from './helpers';
import driverPartial from './templates/driver.partial.hbs';
import constructorPartial from './templates/constructors.partial.hbs';
import driverTableHeadPartial from './templates/drivertablehead.partial.hbs';

export function registerPartials() {
  Handlebars.registerPartial('driverPartial', driverPartial);
  Handlebars.registerPartial('constructorPartial', constructorPartial);
  Handlebars.registerPartial('driverTableHeadPartial', driverTableHeadPartial);
}

export function registerHelpers() {
  Handlebars.registerHelper('add', helpers.addHelper);
  Handlebars.registerHelper('date', helpers.dateHelper);
  Handlebars.registerHelper('time', helpers.timeHelper);
}
