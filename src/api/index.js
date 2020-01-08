/**
 * 定义请求函数
 *
 */

import ajax from "./ajax";
import jsonp from 'jsonp'


/**
 * 登录
 * @param {*} username
 * @param {*} password
 */
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

/**
 * 添加用户
 * @param {*} username
 * @param {*} password
 */
export const reqAddUser = user => ajax("/addUSER", user, "POST");

export const reqWeather = (city) => {
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{
        param: 'callback',
        timeout: 1000
        },(err,data)=>{
        console.log(2)
       console.log(err)
       console.log(data)
    })
}


