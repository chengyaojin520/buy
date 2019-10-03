import Mockjs from 'mockjs'

const api = {
  fetch_photo_suolvtu: function (page = 1, pageSize = 10) {
    let data = {
      list: [],
      total: Mockjs.Random.integer(20, 1000) * page,
    };
    for (let i = 0; i < pageSize; i++) {
      let item = {
        url:  Mockjs.Random.image('200x100'),
      }
      data.list.push(item);
    }
    return this.returnJson(true, 1, '成功', data);
  },


  fetch_photo_fenlei: function (page = 1, pageSize = 10) {
    let data = {
      list: [],
      total: Mockjs.Random.integer(20, 1000) * page,
    };
    for (let i = 0; i < pageSize; i++) {
      let item = {
        id: Mockjs.Random.integer(1, 10000),
        title: Mockjs.Random.ctitle(2),
        status: 1,
      }
      data.list.push(item);
    }
    return this.returnJson(true, 1, '成功', data);
  },

  fetchAccountList: function (page = 1, pageSize = 10) {
    let data = {
      list: [],
      total: Mockjs.Random.integer(20, 1000) * page,
    };
    for (let i = 0; i < pageSize; i++) {
      let item = {
        id: Mockjs.Random.integer(1, 10000),
        account: Mockjs.Random.word(1, 3),
        nickname: Mockjs.Random.cname(),
        email: Mockjs.Random.email(),
        operatorid: Mockjs.Random.range(),
        operator: Mockjs.Random.cname(),
        createtime: Mockjs.Random.date() + ' ' + Mockjs.Random.time(),
        updatetime: Mockjs.Random.date() + ' ' + Mockjs.Random.time(),
        status: 1,
      }
      data.list.push(item);
    }
    return this.returnJson(true, 1, '成功', data);
  },
  fetchStatisticsCodeList: function (page = 1, pageSize = 10) {
    let data = {
      list: [],
      total: Mockjs.Random.integer(20, 1000) * page,
    };
    for (let i = 0; i < pageSize; i++) {
      let item = {
        id: Mockjs.Random.integer(1, 10000),
        platform: Mockjs.Random.integer(1, 3),
        statisticsplatform: Mockjs.Random.integer(1, 3),
        domain: Mockjs.Random.csentence(5, 30),
        code: Mockjs.Random.csentence(5, 30),
        operatorid: Mockjs.Random.range(),
        operator: Mockjs.Random.cname(),
        createtime: Mockjs.Random.date() + ' ' + Mockjs.Random.time(),
        updatetime: Mockjs.Random.date() + ' ' + Mockjs.Random.time(),
        status: 1,
      }
      data.list.push(item);
    }
    return this.returnJson(true, 1, '成功', data);
  },

  returnJson: function (status, code, message, data = { list: [], total: 0 }) {
    return {
      status: status,
      code: code,
      message: message,
      data: data
    };
  }
}

export default api

// 使用 Mock
//var Mock = require('mockjs')
//var data = Mock.mock({
//  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//  'list|1-10': [{
//      // 属性 id 是一个自增数，起始值为 1，每次增 1
//      'id|+1': 1
//  }]
//})
//// 输出结果
//console.log(JSON.stringify(data, null, 4))