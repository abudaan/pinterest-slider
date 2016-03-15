//import fetch from 'isomorphic-fetch'
//import ajax from './ajax'

const PDK = window.PDK
const appKey = '4821776664906186821' // replace this key with your own key!
let accessToken = ''
const stub = 'https://api.pinterest.com/v1/'

const headers = new Headers();
//headers.append('Content-Type', 'application/json');
//headers.append('Access-Control-Allow-Origin', 'https://abumarkub:8000/rest/');
//headers.append('Access-Control-Allow-Headers', 'Authorization')
//headers.append('Access-Control-Allow-Methods', 'DELETE, HEAD, GET');
//headers.append('Access-Control-Allow-Origin', '*');
headers.append('Authorization', 'BEARER ARzW0E37MvKlUKDhGIR1brqagvMKFDuxKnxcMkJC6nlHvOArkQAAAAA');
//headers.append('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT');
//headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Content-Range, Content-Disposition, Content-Description');
//headers.append('Access-Control-Max-Age', '1728000');

const settings = {
  headers,
  method: 'GET',
  //mode: 'no-cors',
  cache: 'default'
}

function login(){
  return new Promise(function (resolve, reject){
    PDK.login({scope: 'read_public'}, function(response){
      if (!response || response.error) {
        reject(response)
      } else {
        resolve(response.data)
      }
    })
  })
}


function sendAuthorization(url){
  console.log('sendAuthorization')
  let h = new Headers()
  h.append('Access-Control-Allow-Headers', 'Authorization')
  h.append('Access-Control-Allow-Methods', 'DELETE, HEAD, GET');
  h.append('Access-Control-Allow-Origin', '*');

  return fetch(url, {
    headers,
    method: 'OPTIONS'
  })
}


function getBoards() {
  let url = `${stub}me/boards/`


  //let url = 'http://abumarkub.net/web-ar2/settings1.json'
  //let url = 'settings1.json'

  // return ajax({
  //   url: u
  // })

  let p = new Promise(
    function (resolve, reject){
      sendAuthorization(url)
      .then(
        fetch(url, settings)
        .then(function(response){
          return response.json()
        })
        .then(function(json){
          resolve(json.data)
        })
        .catch(function(error) {
          console.log('Request failed', error)
        })
      )
    }
  )

  // let p = new Promise(
  //   function (resolve, reject){
  //     fetch(url, settings)
  //     .then(function(response){
  //       console.log(response)
  //       return response.text()
  //     })
  //     .then(function(text){
  //       console.log('Request successful', text);
  //     })
  //     .catch(function(error) {
  //       console.log('Request failed', error)
  //     })
  //   }
  // )

  return p;

//  return new Promise(function(resolve, reject){})

}

function getPins(boardId) {
  return new Promise(function(resolve, reject){
    PDK.request(`/boards/${boardId}/pins/`, {fields: 'image, url'}, function (response) {
      if (!response || response.error) {
        reject(response)
      } else {
        resolve(response.data)
      }
    })
  })
}

function getAccessToken(){
  //let session = PDK.getSession() || {accessToken: ''}
  return accessToken
}

function init(){
  let cookie = document.cookie;
  if(cookie.indexOf(`ps_${appKey}`) !== -1){
    accessToken = cookie.substring(cookie.indexOf('accessToken=') + 12, cookie.indexOf('&scope'));
  }
  return {
    accessToken,
    login,
    getAccessToken,
    getBoards,
    getPins
  }
}


export default init()
