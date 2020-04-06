const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  console.log('query email', email)
  const values = [email];
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.email = $1;
  `, values)
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      } else {
        console.log(res.rows)
        return res.rows;
      }
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const values = [id];
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.id = $1;
  `, values)
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      } else {
        return res.rows;
      }
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  const values = [user.name, user.password, user.email];
  return pool.query(`
  INSERT INTO users(name, password, email)
  VALUES($1, $2, $3);
  `, values)
    .then(res => {
      console.log('Added to db!');
      return;
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, 10];
  return pool.query(`
  SELECT *
  FROM users
  JOIN reservations ON users.id = $1
  LIMIT $2;
  `)
    .then(res => {
      return res.rows;
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const values = [];
  let queryString = `
  SELECT * properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN propertiy_reviews ON properties.id = property_id
  `;

  if (options.city || options.owner_id || options.minimum_price_per_night, options.maximum_price_per_night, minimum_rating) {
    queryString += ' WHERE ';

    if (options.city) {
      values.push(`%${options.city}%`);
      queryString += `city LIKE $${values.length} AND `
    }
    
    if (options.ownder_id) {
      values.push(`%${options.ownder_id}%`);
      queryString += `ownder_id LIKE $${values.length} AND `
    }
  
    if (options.minimum_price_per_night) {
      values.push(`%${options.minimum_price_per_night}%`);
      queryString += `minimum_price_per_night LIKE $${values.length} AND `
    }
  
    if (options.maximum_price_per_night) {
      values.push(`%${options.maximum_price_per_night}%`);
      queryString += `maximum_price_per_night LIKE $${values.length} AND `
    }
  
    if (options.minimum_rating) {
      values.push(`%${options.minimum_rating}%`);
      queryString += `minimum_rating LIKE $${values.length} AND `
    }

    queryString += `1 = 1 LIMIT ${limit};`
  } else {
    queryString += ` LIMIT ${limit};`
  }

  return pool.query(queryString, values)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
