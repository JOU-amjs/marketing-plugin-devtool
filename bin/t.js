/*
 * @Date: 2020-07-18 08:40:58
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-18 10:43:54
 */ 
const javaRequest = require('../common/java-request');
const { paths } = require('../config');
const { createReadStream } = require('fs');

(async () => {
  // var config = {
  //   method: 'post',
  //   url: 'http://localhost:8080//marketing/programs/upload',
  //   headers: { 
  //     'Content-Type': 'multipart/form-data', 
  //     ...data.getHeaders()
  //   },
  //   data : data
  // };

  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  
  
  try {
    let resData = await javaRequest.post('/open/program/upload', {
      type: '3',
      zipFile: createReadStream(paths.compiledZipFile)
    }, { type: 'formData' });
    console.log('data', resData);
  } catch (error) {
    console.log('reason', error)
  }
})();