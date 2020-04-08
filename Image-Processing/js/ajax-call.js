function MakeAJAXCall(path, callback, filePath) {
  var xHTTP = new XMLHttpRequest();
  xHTTP.open("POST", path, true);
  xHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  var params = "Params=" + filePath;

  xHTTP.onload = () => {
    callback(xHTTP.responseText);
  };

  xHTTP.send(params);
}

function SetAJAXPostCall(path, callback, params) {
  var xHTTP = new XMLHttpRequest();
  var _ajaxParams = "Param=" + params;
  xHTTP.open("POST", path, true);
  xHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xHTTP.onload = () => {
    callback(xHTTP.responseText);
  };

  xHTTP.send(_ajaxParams);
}
