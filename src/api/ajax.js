import axios from 'axios'
import {message} from 'antd'
/***
 * 优化1：统一返回请求错误信息  
 *    做法：return new Promise
 * 优化2：异步请求直接获取res.data
 */

export default function ajax(url, data={}, method='GET'){
    let promise
    return new Promise(function(resolve,reject){
        if(method==='GET'){
            promise = axios.get(url, {params:data}, 'GET')
        } else {
            promise = axios.post(url, data,'POST')
        }

        promise.then(function(res){
            resolve(res.data)
        }).catch(function(error){
            message.error(error.message)
        })
    })
    
}