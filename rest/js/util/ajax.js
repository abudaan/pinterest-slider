export default function ajax(config){
  let
  request = new XMLHttpRequest(),
  method = config.method === undefined ? 'GET' : config.method;

  function executor(resolve, reject){

  reject = reject || function(){};
  resolve = resolve || function(){};

  request.onload = function(){
    if(request.status !== 200){
    reject(request.status);
    return;
    }

    if(config.responseType === 'json'){
    fileSize = request.response.length;
    resolve(JSON.parse(request.response), fileSize);
    request = null;
    }else{
    resolve(request.response);
    request = null;
    }
  };

  request.onerror = function(e){
    reject(e);
  };

  request.open(method, config.url, true);

  if(config.overrideMimeType){
    request.overrideMimeType(config.overrideMimeType);
  }

  if(config.responseType){
    if(config.responseType === 'json'){
      request.responseType = 'text';
    }else{
      request.responseType = config.responseType;
    }
  }

  if(method === 'POST') {
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  request.setRequestHeader('Access-Control-Allow-Origin', '*');

  if(config.data){
    request.send(config.data);
  }else{
    request.send();
  }
  }

  return new Promise(executor);
}
