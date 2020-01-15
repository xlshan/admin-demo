/**
 * 定义请求函数
 *
 */

import ajax from "./ajax";
import jsonp from "jsonp";

export const reqWeather = city => {
  let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
  jsonp(
    url,
    {
      param: "callback",
      timeout: 1000
    },
    (err, data) => {
      console.log(err);
    }
  );
};

/**
 * 登录
 * @param {*} username
 * @param {*} password
 */
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

/**
 * 获取一级或某个二级分类列表
 * @param {*} parentId
 */
export const reqCategorys = parentId =>
  ajax("/manage/category/list", { parentId }, "GET");

/**
 * 添加分类
 * @param {*} parentId
 * @param {*} categoryName
 */
export const reqAddCategory = (categoryName, parentId) =>
  ajax("/manage/category/add", { categoryName, parentId }, "POST");

/**
 * 更新品类名称
 * @param {*} categoryId
 * @param {*} categoryName
 */
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");

/**
 * 删除品类名称
 * @param {*} categoryId
 */
export const reqDeleteCategory = categoryId =>
  ajax("/manage/category/delete", { categoryId }, "POST");

// 根据分类 ID 获取分类
export const reqCategory = categoryId =>
  ajax("/manage/category/info", { categoryId });

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize }, "GET");

// 根据 ID/Name 搜索产品分页列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType,
  searchName
}) =>
  ajax(
    "/manage/product/search",
    {
      pageNum,
      pageSize,
      [searchType]: searchName
    },
    "GET"
  );

// 添加/更新商品
export const reqAddOrUpdateProduct = product =>
  ajax("/manage/product/" + (product._id ? "update" : "add"), product, "post");

// 对商品进行上架/下架处理

export const reqUpdateProductStatus = (productId, status) =>
  ajax(
    "/manage/product/updateStatus",
    {
      productId,

      status
    },
    "POST"
  );

// 删除图片

export const reqDeleteImg = name =>
  ajax("/manage/img/delete", { name }, "post");
