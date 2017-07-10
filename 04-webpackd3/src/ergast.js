import config from './config';

const url = config.api.url;

const api = {
  drivers: {
    get: ({ id = '', limit = 30, offset = 0 }) => {
      return fetch(`${url}/drivers${id !== '' ? '/' + id + '.json' : '.json?limit=' + limit + '&offset=' + offset }`)
        .then(res => res.json())
        .then(extractDriverData)
        .catch(console.log);
    },
    constructors: ({ id, limit = 30, offset = 0 }) => {
      return fetch(`${url}/drivers/${id}/constructors.json?limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(extractConstructorData);
    },
    lastConstructor: (id) => {
      return fetch(`${url}/drivers/${id}/constructors.json?limit=1`)
        .then(res => res.json())
        .then(extractConstructors)
        .then(constructors => {
          return constructors.length > 0 ? constructors[0] : { name: 'none' }
        })
        .catch(console.log);
    }
  },
  constructors: {
    get: ({ id = '', limit = 30, offset = 0 }) => {
      return fetch(`${url}/constructors${id ? '/' + id + '.json' : '.json?limit=' + limit + '&offset=' + offset }`)
        .then(res => res.json())
        .then(extractConstructorData)
        .catch(console.log);
    },
    drivers: ({ id, limit = null, offset = null }) => {
      return fetch(`${url}/constructors/${id}/drivers.json?${limit ? 'limit=' + limit: ''}&${offset ? 'offset=' + offset : ''}`)
        .then(res => res.json())
        .then(extractDriverData)
        .catch(console.log);
    }
  },
  courses: {
    get: () => {
        return fetch(`${url}/current.json`)
           // .then(console.log)
          .then(data => data.json())
          .then(extractCourses)
          .catch(console.log);
    }
  }
};

const extractConstructors = data => data.MRData.ConstructorTable.Constructors;
const extractDrivers = data => data.MRData.DriverTable.Drivers;
const extractOffset = data => data.MRData.offset;
const extractLimit = data => data.MRData.limit;
const extractTotal = data => data.MRData.total;
const extractCourses = data => data.MRData.RaceTable.Races;


const extractDriverData = data => { return { limit: extractLimit(data), offset: extractOffset(data), total: extractTotal(data), drivers: extractDrivers(data) } };
const extractConstructorData = data => { return { limit: extractLimit(data), offset: extractOffset(data), total: extractTotal(data), constructors: extractConstructors(data) } };

export default Object.freeze(api);
