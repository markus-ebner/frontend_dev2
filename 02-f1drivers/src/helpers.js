/**
 * Created by markusebner on 20.03.17.
 */
import Handlebars from 'hbsfy/runtime';
import fecha from 'fecha';

export function addHelper(value, add) {
  return Number(value) + Number(add);
}

//for Pagination
export function timeHelper(n, block) {
  let loops = '';
  for(let i =0; i<n; i++) {
    loops += block.fn;
  }
  return loops;
}

export function dateHelper(val) {
  return new Handlebars.SafeString(fecha.format(new Date(Handlebars.Utils.escapeExpression(val)), 'DD.MM.YYYY'));
}
