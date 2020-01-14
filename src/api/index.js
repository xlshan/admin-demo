/**
 * 定义请求函数
 *
 */

import ajax from "./ajax";
import jsonp from 'jsonp'

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

/**
 * 登录
 * @param {*} username
 * @param {*} password
 */
export const reqLogin = (username, password) => ajax("/login", { username, password }, "POST");

  /**
 * 获取一级或某个二级分类列表
 * @param {*} parentId
 */
export const reqCategorys = (parentId) => ajax("/manage/category/list", {parentId},'GET');


/**
 * 添加分类
 * @param {*} parentId
 * @param {*} categoryName
 */
export const reqAddCategory = (categoryName,parentId ) => ajax("/manage/category/add", {categoryName,parentId }, "POST");


/**
 * 更新品类名称
 * @param {*} parentId
 * @param {*} categoryName
 */
export const reqUpdateCategory = (parentId, categoryName) => ajax("/manage/category/update", {parentId, categoryName}, "POST");








