import fetch from 'isomorphic-fetch'

const appKey = '4821776664906186821' // replace this key with your own key!
const api = 'https://api.pinterest.com/'
const scope = 'read_public'
let accessToken = ''

function getSettings(){
  return {
    headers: {
      'Authorization': `BEARER ${accessToken}`
    },
    method: 'GET',
    cache: 'default'
  }
}

function requestAPI(url, decription){
  return new Promise(
    function(resolve, reject){
      fetch(url, getSettings())
      .then(function(response){
        return response.json()
      })
      .then(function(json){
        resolve(json.data);
      })
      .catch(function(error) {
        reject(decription, error)
      })
    }
  )
}

function login(){
  let state = `state_${new Date().getTime()}`
  let url = `${api}oauth/?client_id=${appKey}&redirect_type=js&redirect_uri=${window.location.href}&response_type=token&scope=${scope}&state=${state}`
  let popup
  return new Promise(
    function(resolve, reject){
      window.addEventListener('message', function(e){
        if(e.data.access_token && e.data.state === state){
          accessToken = e.data.access_token
          document.cookie = `ps_${appKey}="accessToken=${accessToken}&scope=${scope}";path=/`
          resolve()
        }else{
          reject('error')
        }
        popup.close()
      })
      popup = window.open(url, 'login', 'width=625; height=470');
    }
  )
}

function getBoards() {
  let url = `${api}v1/me/boards/`
  return requestAPI(url, 'getBoards');
}

function getPins(boardId) {
  let url = `${api}v1/boards/${boardId}/pins/?fields=image,url`
  return requestAPI(url, 'getPins');
}

function init(){
  let cookie = document.cookie;
  if(cookie.indexOf(`ps_${appKey}`) !== -1){
    accessToken = cookie.substring(cookie.indexOf('accessToken=') + 12, cookie.indexOf('&scope')); // quick and dirty
  }
  return {
    accessToken,
    login,
    getBoards,
    getPins
  }
}

export default init()
