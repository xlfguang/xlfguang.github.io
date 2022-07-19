import request from "./request";
import {
  registerAndLoginForm,
  registerApi,
  loginApi,
  indexInfoApi,
  parkInfoApi,
  park_StatisticsApi,
  park_TableApi,
  park_ActivityApi,
  park_Activity_eChartsApi,
  park_Activity_DailyApi,
  park_Activity_DetailApi,
  companyInfoApi,
  company_List_Api,
  company_eChartsApi,
  company_ActivityApi,
  company_Activity_DetailApi,
  companyDetails_eChartsApi,
  companyDetails_DayDataApi,
  allparkApi,
} from "../types/types";

/-------------------------------登录页所需API-------------------------------------------/;
/**注册地址*/
export const REGISTERED_ADDRESS = "api/users/register";
/**注册API*/
export const REGISTER_API: registerApi = function (data: registerAndLoginForm) {
  return request(REGISTERED_ADDRESS, data);
};

/**登录地址*/
export const LOGIN_ADDRESS = "api/users/login";
/**登录API*/
export const LOGIN_API: loginApi = function (data: registerAndLoginForm) {
  return request(LOGIN_ADDRESS, data);
};

/------------------------------------首页所需信息----------------------------------------------/;
/**首页的信息*/
export const GET_INDEX_INFO = "api/carbon/index";
/**获取首页消息的接口*/
export const GET_INDEX_INFO_API: indexInfoApi = function () {
  return request(GET_INDEX_INFO, {}, { method: "get", hint: false });
};


/**园区列表*/
export const GET_PARK_LIST = "api/zones/all"; 
/**获取园区列表的接口*/
export const GET_ALL_PARK_LIST_API:allparkApi = function () {
  return request(GET_PARK_LIST, {}, { method: "get", hint: false });
};
 


/---------------------------------园区碳足迹——第一级路由所需API------------------------------/;
/**园区碳足迹——第一级路由——园区信息——接口地址*/
export const GET_PARK_CARBON_INFO = "api/zones/info";
/**获取园区碳足迹的园区信息
 * @param parkid 园区id
 */
export const GET_PARK_CARBON_INFO_API: parkInfoApi = function (parkid: number) {
  return request(
    `${GET_PARK_CARBON_INFO}/${parkid}`,
    {},
    { method: "get", hint: false }
  );
};

/**园区碳足迹——第一级路由——Echarts所需要的信息——接口地址*/
export const GET_PARK_TABLE_INFO = "api/zones/carbonFootprint";
/**获取园区碳足迹——第一级路由——Echarts所需要的信息
 * @param parkid 园区id
 * @param timeType 需要的数据范围 0:本周 1:本月 2:本年
 */
export const GET_PARK_TABLE_INFO_API: park_TableApi = function (
  parkid: number,
  timeType: 0 | 1 | 2
) {
  return request(
    `${GET_PARK_TABLE_INFO}/${parkid}?type=${timeType}`,
    {},
    {
      method: "get",
      hint: false,
    }
  );
};

/**园区碳足迹——第一级路由——类别统计——接口地址(用来渲染miniCard的数据)*/
export const GET_PARK_STATISTICS = "api/zones/carbonActivitys";
/**获取园区碳足迹按类别统计*/
export const GET_PARK_STATISTICS_API: park_StatisticsApi = function (
  parkid: number
) {
  return request(
    `${GET_PARK_STATISTICS}/${parkid}`,
    {},
    { method: "get", hint: false }
  );
};

/-----------------------------园区碳足迹 二级页面所需API----------------------------------/;

/**园区碳足迹 ———— 二级页面 ———— 默认页面*/
export const GET_PARK_ACTIVITY_INFO = "api/zones/carbonActivitys/info";
/**获取园区碳足迹 ———— 二级页面———— 类别统计进入后的详情信息
 * @param parkid 园区id
 * @param typeId 类别统计的ID
 */
export const GET_PARK_ACTIVITY_INFO_API: park_ActivityApi = function (
  parkid: number,
  typeId: string
) {
  return request(
    `${GET_PARK_ACTIVITY_INFO}/${parkid}?activityId=${typeId}`,
    {},
    { method: "get", hint: false }
  );
};

/**园区碳足迹——二级页面——详细eCharts折线图数据*/
export const GET_PARK_ACTIVITY_ECHARTS_DATA =
  "api/zones/carbonActivitys/footsprint";
/**获取园区碳足迹——二级页面——详细eCharts折线图数据
 * @param parkid 园区id
 * @param typeId 类别统计的ID
 * @param timeType 需要的数据范围 0:本周 1:本月 2:本年
 */
export const GET_PARK_ACTIVITY_ECHARTS_DATA_API: park_Activity_eChartsApi =
  function (parkid: number, typeId: string, type: number) {
    return request(
      `${GET_PARK_ACTIVITY_ECHARTS_DATA}/${parkid}?activityId=${typeId}&type=${type}`,
      {},
      { method: "get", hint: false }
    );
  };
/**园区碳足迹 —— 二级页面 —— 每日基础活动列表*/
export const GET_PARK_ACTIVITY_DAY_BASE = "api/zones/carbonActivitys/dayData";
/**获取园区碳足迹 —— 二级页面 —— 每日基础活动(minicard所需的数据)
 * @param parkid 园区id
 * @param typeId 类别统计的ID
 */
export const GET_PARK_ACTIVITY_DAY_BASE_API: park_Activity_DailyApi = function (
  parkid: number,
  typeId: string
) {
  return request(
    `${GET_PARK_ACTIVITY_DAY_BASE}/${parkid}?activityId=${typeId}`,
    {},
    { method: "get", hint: false }
  );
};

/**园区碳足迹 —— 二级页面 —— 每日基础活动  —— 详细信息*/
export const GET_PARK_ACTIVITY_DAY_BASE_DETAIL =
  "api/zones/carbonActivitys/data";
/**获取园区碳足迹 —— 二级页面 —— 每日基础活动  —— 详细信息
 * @param parkid 园区id
 * @param typeId 类别统计的ID
 * @param pageIndex 需要的数据范围
 * @param pageSize 需要的数据范围
 */
export const GET_PARK_ACTIVITY_DAY_BASE_DETAIL_API: park_Activity_DetailApi =
  function (
    parkid: number,
    typeId: number,
    pageIndex: number = 1,
    pageSize: number = 10
  ) {
    return request(
      `${GET_PARK_ACTIVITY_DAY_BASE_DETAIL}/${parkid}?activityId=${typeId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {},
      { method: "get", hint: false }
    );
  };

/————————————————————————————————企业碳足迹 一级路由 所需API————————————————————————————————————————/;

/**企业碳足迹 一级路由 企业列表*/
export const GET_ENTERPRISE_CARBON_LIST = "api/company/overview";
/**获取企业碳足迹 一级路由 企业列表*/
export const GET_ENTERPRISE_CARBON_LIST_API: company_List_Api = function (
  id: number,
  pageIndex: Number = 1,
  pageSize: Number = 10
) {
  return request(
    `${GET_ENTERPRISE_CARBON_LIST}/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {},
    { method: "get", hint: false }
  );
};

/**企业碳足迹 二级路由 详情*/
export const GET_ENTERPRISE_CARBON_INFO = "api/company/info";
/**获取企业碳足迹 二级路由 详情*/
export const GET_ENTERPRISE_CARBON_INFO_API: companyInfoApi = function (
  id: number
) {
  return request(
    `${GET_ENTERPRISE_CARBON_INFO}/${id}`,
    {},
    { method: "get", hint: false }
  );
};
/** 企业碳足迹 二级路由 eCharts 折线图数据 */
export const GET_ENTERPRISE_CARBON_ECHARTS_DATA = "api/company/carbonFootprint";
/** 获取企业碳足迹 二级路由 eCharts 折线图数据 */
export const GET_ENTERPRISE_CARBON_ECHARTS_DATA_API: company_eChartsApi =
  function (id: number, type: number) {
    return request(
      `${GET_ENTERPRISE_CARBON_ECHARTS_DATA}/${id}?type=${type}`,
      {},
      { method: "get", hint: false }
    );
  };

/** 企业碳足迹 二级路由 每日基础活动 */
export const GET_ENTERPRISE_CARBON_DAY_BASE = "api/company/carbonActivitys";
/** 获取企业碳足迹 二级路由 每日基础活动 */
export const GET_ENTERPRISE_CARBON_DAY_BASE_API: company_ActivityApi =
  function (id: number) {
    return request(
      `${GET_ENTERPRISE_CARBON_DAY_BASE}/${id}`,
      {},
      { method: "get", hint: false }
    );
  };

/** 企业活动碳足迹 三级路由 —— 详细信息 */
export const GET_ENTERPRISE_CARBON_DAY_BASE_DETAIL =
  "api/company/carbonActivitys/info";
/** 获取企业活动碳足迹 三级路由 —— 详细信息 */
export const GET_ENTERPRISE_CARBON_DAY_BASE_DETAIL_API: company_Activity_DetailApi =
  function (id, activityId) {
    return request(
      `${GET_ENTERPRISE_CARBON_DAY_BASE_DETAIL}/${id}?activityId=${activityId}`,
      {},
      { method: "get", hint: false }
    );
  };

/** 企业活动碳足迹 三级路由 eCharts 折线图数据 */
export const GET_ENTERPRISE_CARBON_ECHARTS_DATA_DETAIL =
  "api/company/carbonActivitys/footsprint";
/** 获取企业活动碳足迹 三级路由 eCharts 折线图数据 */
export const GET_ENTERPRISE_CARBON_ECHARTS_DATA_DETAIL_API: companyDetails_eChartsApi =
  function (id, activityId, type) {
    return request(
      `${GET_ENTERPRISE_CARBON_ECHARTS_DATA_DETAIL}/${id}?activityId=${activityId}&type=${type}`,
      {},
      { method: "get", hint: false }
    );
  };

/** 企业活动碳足迹 三级路由 公司每日基础数据*/
export const GET_CARBON_DAY_BASE_DETAIL = "api/company/carbonActivitys/dayData";
/** 获取企业活动碳足迹 三级路由 公司每日基础数据*/
export const GET_CARBON_DAY_BASE_DETAIL_API: companyDetails_DayDataApi =
  function (id, activityId) {
    return request(
      `${GET_CARBON_DAY_BASE_DETAIL}/${id}?activityId=${activityId}`,
      {},
      { method: "get", hint: false }
    );
  };
