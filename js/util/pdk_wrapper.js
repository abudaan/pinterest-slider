const PDK = window.PDK;

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


function getBoards() {
  return new Promise(function(resolve, reject){
    PDK.me('boards', function (response) {
      if (!response || response.error) {
        reject(response)
      } else {
        resolve(response.data)
      }
    })
  })
}

function getPins(boardId) {
  return new Promise(function(resolve, reject){
    PDK.request(`/boards/${boardId}/pins/`, {fields: 'image'}, function (response) {
      if (!response || response.error) {
        reject(response)
      } else {
        resolve(response.data)
      }
    })
  })
}

function getAccessToken(){
  let session = PDK.getSession() || {accessToken: false}
  return session.accessToken
}

function init(){
  PDK.init({appId: '4821776664906186821', cookie: true})
  return {
    accessToken: getAccessToken(),
    login,
    getAccessToken,
    getBoards,
    getPins
  }
}


export default init()
