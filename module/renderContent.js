let _list = [
  {
    code: "001",
    name: "admin",
    address: "xxx",
    id: "000"
  }
]
let fieldObj = {
  code: {
    required: true,
    type: "String"
  },
  name: {
    required: true,
    type: "String"
  },
  address: {},
}
// 生成随机id
function getUUID(tabName){
  let str=[];
  let Chars='0123456789abcdefghijklmnopqrstuvwxyz';
  for(let i=0;i<36;i++){
  str[i]=Chars.substr(Math.floor(Math.random()*16),1)
  }
  str[0]=str[8]=str[13]=str[18]=str[23]='-';
  return tabName+str.join("")
}

function renderContent(url, params) {
  switch (url) {
    case "/api/list":
      return list(params)
    case "/api/add":
      return add(params)
    case "/api/delete":
      return _delete(params)
    case "/api/update":
      return update(params)
    
    default:
      return "404";
  }
}

// 查询
function list(params){
  console.log("list",params);
  let list = _list.filter(item=>{
    let num = 0;
    for(let key in params){
      if(!params[key]){
        num++
      }else{
        if(item[key] && item[key].indexOf(params[key]) != -1){
          num++
        }
      }
    }
    if(num === Object.keys(params).length){
      return item
    }
  })
  let data = {
    status: 200,
    message: "success",
    data: list
  }
  return JSON.stringify(data);
}

// 新增
function add(params){
  let row = {}
  for(let key in fieldObj){
    if(fieldObj[key].required){
      if(!params[key]){
        let data = {
          status: 500,
          message: `${key} 字段必填`
        }
        return JSON.stringify(data);
      }
    }
    if(params[key]){
      row[key] = params[key]
    }
  }
  row.id = getUUID("id");
  _list.unshift(row)
  let data = {
    status: 200,
    message: "success"
  }
  return JSON.stringify(data);
}

// 编辑
function update(params){
  if(params && params.id){
    const _index = _list.findIndex((item) => item.id === params.id);
    _list.splice(_index, 1, params);
    let data = {
      status: 200,
      message: "success"
    }
    return JSON.stringify(data);
  }else{
    let data = {
      status: 500,
      message: "未传入id"
    }
    return JSON.stringify(data);
  }
  
}

// 删除
function _delete(params){
  if(params && params.id){
    const _index = _list.findIndex((item) => item.id === params.id);
    _list.splice(_index, 1);
    let data = {
      status: 200,
      message: "success"
    }
    return JSON.stringify(data);
  }else{
    let data = {
      status: 500,
      message: "未传入id"
    }
    return JSON.stringify(data);
  }
}

exports.renderContent = renderContent;
