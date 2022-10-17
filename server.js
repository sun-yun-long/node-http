const http = require("http");
const url = require("url");
const querystring = require('querystring')
const { renderContent } = require("./module/renderContent")
const { renderStatus } = require("./module/renderStatus");
http.createServer(function (req, res) {
  const rdata = url.parse(req.url, true);
  const myUrl = rdata.pathname
  if (myUrl === "/favicon.ico") {
    // 读取本地图标
    return;
  }

  // 发送 HTTP 头部 
  // HTTP 状态值: 200 : OK
  // 内容类型: application/json;charset=UTF-8
  res.writeHead(renderStatus(myUrl), { 'Content-Type': 'application/json;charset=UTF-8' });

  let params = null;//定义一个post变量，用于暂存请求体信息
  if (req.method == "POST") {
    //post方式接收参数
    params = ""
    req.on('data', function (chunk) {//通过req的data时间监听函数，每当接收到请求体数据，就会存储到params变量中
      params += chunk;
    });
    req.on('end', function () {//在end事件触发后，通过querystring.parse将params解析为真正的post格式，然后向客户端返回
      params = querystring.parse(params);
      res.end(renderContent(myUrl, params));
    });
  }
  if(req.method == "GET"){
    params = rdata.query
    res.end(renderContent(myUrl, params));
  }
  
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');