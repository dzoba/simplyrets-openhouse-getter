var React = require('react');

var RESET_STATE = 'RESET_STATE';
var resetState = function resetState() {
  return { 
    type: RESET_STATE 
  };
};

var FETCH_OPEN_HOUSES_SUCCESS = 'FETCH_OPEN_HOUSES_SUCCESS';
var fetchOpenHousesSuccess = function fetchOpenHousesSuccess(listings) {
  return {
    type: FETCH_OPEN_HOUSES_SUCCESS,
    listings: listings
  };
};

var fetchOpenHouses = function fetchOpenHouses() {
  return function(dispatch) {
    var url = 'https://api.simplyrets.com/openhouses';
    var headers = {
        'Authorization': 'Basic '+btoa('simplyrets:simplyrets'),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    fetch(url, {
      method: 'get',
      headers: headers
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var listings = response.map(function(openHouse) {
        return openHouse.listing;
      });

      return dispatch(fetchOpenHousesSuccess(listings));
    });
  };
};

exports.RESET_STATE = RESET_STATE;
exports.resetState = resetState;
exports.fetchOpenHouses = fetchOpenHouses;
exports.fetchOpenHousesSuccess = fetchOpenHousesSuccess;
exports.FETCH_OPEN_HOUSES_SUCCESS = FETCH_OPEN_HOUSES_SUCCESS;