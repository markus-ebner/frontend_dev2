/**
 * Created by markusebner on 20.03.17.
 */
import config from './config';
import plur from 'pluralize';

export default {
  etchi(resource, id, opts) {
    let {limit = 10, offset = 0} = opts;
    let response;

    if(typeof id === 'string') {
      response = fetch(config.url + `${resource}/${id}.json?limit=${limit}&offset=${offset}`)
    } else {
      response = fetch(config.url + `${resource}.json?limit=${limit}&offset=${offset}`)
    }

    return response
      .then(data => data.json())
      .then(data => {
        return resPath(resource, data);
      });
  }
}


function resPath(resource, data) {
  let table = plur.singular(resource);
  table = table.charAt(0).toUpperCase() + table.slice(1) + "Table";
  resource = resource.charAt(0).toUpperCase() + resource.slice(1);

  //console.log("table: " + table);
  //console.log("res: " + resource);

  return data.MRData[table][resource];
}

