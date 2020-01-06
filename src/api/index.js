/**
 * 定义请求函数
 * 
 */


 import ajax from './ajax'
/**
 * 登录
 * @param {*} username 
 * @param {*} password 
 */
 export const reqLogin = (username,password) => ajax('/login', {username,password}, 'POST')

/**
 * 添加用户
 * @param {*} username 
 * @param {*} password 
 */
export const reqAddUser = (user) => ajax('/addUSER', user, 'POST')