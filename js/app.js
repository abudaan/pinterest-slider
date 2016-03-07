import 'babel-polyfill';
//import fetch from 'isomorphic-fetch';
//import $ from 'jquery';
//window.jQuery = $;
//import 'bootstrap'
//window.jQuery = require('jquery');
//require('bootstrap');

//import CustomMenu from './components/custom-dropdown.react';
import React from 'react';
import ReactDOM from 'react-dom';
//import {Button, ButtonToolbar, Dropdown, MenuItem} from 'react-bootstrap';
import App from './components/app.react';
import {Provider} from 'react-redux';
import configureStore from './stores/configure_store';


//document.addEventListener('DOMContentLoaded', function() {

window.onload = function(){

  PDK.init({appId: '4821776664906186821', cookie: true});

  let store = configureStore();

  ReactDOM.render(
    <Provider store={store}>
       <App />
     </Provider>,
    document.getElementById('app')
  );


  // ReactDOM.render(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>,
  //   document.getElementById('app')
  // );

  // const buttons = (
  //   <ButtonToolbar>
  //     <Button>Default</Button>
  //   </ButtonToolbar>
  // );

  // ReactDOM.render(buttons, document.getElementById('app'));


/*
  //PDK.init({appId: '4821776664906186821', cookie: true});
  PDK.login({scope : 'read_public'}, function(e){

    var pins = [];
    PDK.me('boards', {fields: 'id,name,image[small]'}, function (response) { // Make sure to change the board_id
      if (!response || response.error) {
        alert('Error occurred');
      } else {
        pins = pins.concat(response.data);
        console.log(response.data);
        if (response.hasNext) {
          response.next(); // this will recursively go to this same callback
        }
      }
    });

  });
*/

/*
  https://api.pinterest.com/oauth/?response_type=code&redirect_uri=https://abumarkub:8000&client_id=4821776664906186821&scope=read_public&state=768uyFys


  https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=4821776664906186821&client_secret=8944d3fdaea423c3de134f09c1737b30ad993f3362f9c25f3b0907f39588fb33&code=a45af927840bbf0d
*/
/*
  function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    let params = {};
    let tokens;
    let re = /[?&]?([^=]+)=([^&]*)/g;

    while((tokens = re.exec(qs)) !== null){
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }

  let query = getQueryParams(document.location.search);
  console.log(query);

  let clientId = '4821776664906186821';
  let clientSecret = '8944d3fdaea423c3de134f09c1737b30ad993f3362f9c25f3b0907f39588fb33';
  let url = `https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${query.code}`;

  console.log(url);
*/
  // fetch(url).then(
  //   function resolve(data){
  //     console.log(data);
  //   },
  //   function reject(e){
  //     console.error(e);
  //   }
  // );

  // const buttons = (
  //   <ButtonToolbar>
  //     <Button>Default</Button>
  //   </ButtonToolbar>
  // );

  // ReactDOM.render(buttons, document.getElementById('app'));


  // let preventDefault = e => e.preventDefault();
  // let dropdownExample = (
  //   <Dropdown id="dropdown-custom-menu">
  //     <a href="#" bsRole="toggle" onClick={preventDefault}>
  //       custom Toggle
  //     </a>
  //     <CustomMenu bsRole="menu">
  //       <MenuItem eventKey="1">Red</MenuItem>
  //       <MenuItem eventKey="2">Blue</MenuItem>
  //       <MenuItem eventKey="3" active>Orange</MenuItem>
  //       <MenuItem eventKey="1">Red-Orange</MenuItem>
  //     </CustomMenu>
  //   </Dropdown>
  // );
  // ReactDOM.render(dropdownExample, document.getElementById('app'));
};
