/**登录页面的表单显示类型*/
export enum login_Type {
  login,
  register,
  resetPassword,
}
/**登录状态*/
export enum login_Status {
  notLogin,
  login,
}

/**正确情况下的返回值*/
export interface success_Response {
  code: number;
  message: string;
  data?: any;
}
/**
 * 注册api的返回类型
 */
export interface registerRes extends success_Response {
  code: number;
  message: string;
}
export type registerApi = (data: registerAndLoginForm) => Promise<registerRes>;

export interface loginRes extends success_Response {
  code: number;
  message: string;
  data: {
    token: string;
  };
}
export type loginApi = (data: registerAndLoginForm) => Promise<loginRes>;

/**首页api的返回值*/
export interface index_Info extends success_Response {
  data: [
    {
      id: number;
      name: string;
      emissionLoad: string;
      location: {
        type: string;
        coordinates: [number, number];
      };
      dataList: [
        {
          emissionLoad: string;
          carbonEquivalent: string;
          startTime: string;
        }
      ];
    }
  ];
}
export type indexInfoApi = () => Promise<index_Info>;

/**园区列表API的返回值*/
export interface allPark_Info extends success_Response {
  data:[
    {id:number,
    name:string,}
  ]
}
export type allparkApi = () => Promise<allPark_Info>;

/**园区碳足迹的消息*/
export interface park_Info extends success_Response {
  data: {
    id: number;
    name: string;
    area: string;
    num: number;
    address: string;
    emissionLoad: string;
    region: string;
    type: string;
    reduce: string;
  };
}
export type parkInfoApi = (parkid: number) => Promise<park_Info>;
/**园区碳足迹统计类别的消息*/
export interface park_Statistics extends success_Response {
  data: Array<{
    id: number;
    name: string;
    emissionLoad: string;
    carbonEquivalent: string;
    startTime: string;
  }>;
}
export type park_StatisticsApi = (parkid: number) => Promise<park_Statistics>;

/**园区碳足迹的Echarts表格返回的信息*/
export interface park_Table extends success_Response {
  data: Array<{
    emissionLoad: string;
    carbonEquivalent: string;
    startTime: string;
  }>;
}
export type park_TableApi = (
  parkid: number,
  timeType: 0 | 1 | 2
) => Promise<park_Table>;

/**园区碳足迹 ———— 二级页面 ———— 默认页面返回数据类型*/
export interface park_Activity extends success_Response {
  data: {
    emissionLoad: string;
  };
}
export type park_ActivityApi = (
  parkid: number,
  typeId: string
) => Promise<park_Activity>;

/**园区碳足迹——二级页面——详细eCharts折线图数据*/
export interface park_Activity_eCharts extends park_Table {}
export type park_Activity_eChartsApi = (
  id: number,
  activityId: string,
  type: number
) => Promise<park_Activity_eCharts>;

/**园区碳足迹 —— 二级页面 —— 每日基础活动*/
export interface park_Activity_Daily extends park_Statistics {}
export type park_Activity_DailyApi = (
  id: number,
  activityId: string
) => Promise<park_Activity_Daily>;

/**园区碳足迹 —— 二级页面 —— 每日基础活动  —— 详细信息*/
export interface park_Activity_Detail extends success_Response {
  data: {
    num: number;
    data: [
      {
        equipmentNo: string;
        name: string;
        serveName: string;
        behavior: string;
        gasType: string;
        carbonEquivalent: string;
        emissionLoad: string;
        address: string;
        serveAddress: string;
      }
    ];
  };
}
export type park_Activity_DetailApi = (
  id: number,
  activityId: number,
  pageIndex?: number,
  pageSize?: number
) => Promise<park_Activity_Detail>;

/** 企业碳足迹 一级路由 企业列表*/
export interface company_List extends success_Response {
  data: {
    num: number;
    data: [
      {
        name: string;
        address: string;
        type: string;
        emissionLoad: string;
        id: number;
        startTime: string;
      }
    ];
  };
}
export type company_List_Api = (
  id: number,
  pageIndex?: number,
  pageSize?: number
) => Promise<company_List>;

/**企业碳足迹 二级路由 详情*/
export interface company_Info extends success_Response {
  data: {
    create_time: string;
    id: number;
    name: string;
    address: string;
    type: string;
    emissionLoad: string;
    reduce: string;
  };
}
export type companyInfoApi = (id: number) => Promise<company_Info>;

/**企业碳足迹 二级路由 详情 —— eCharts折线图*/
export interface company_eCharts extends park_Table {}
export type company_eChartsApi = (
  id: number,
  type: number
) => Promise<company_eCharts>;

/**企业碳足迹 二级路由 日基础活动*/
export interface company_Activity extends park_Statistics {}
export type company_ActivityApi = (id: number) => Promise<company_Activity>;

/**企业活动碳足迹 三级路由 —— 详细信息*/
export interface company_Activity_Detail extends success_Response {
  data: {
    id: number;
    emissionLoad: string;
    activityName: string;
    reduce: number;
    name: string;
  };
}
export type company_Activity_DetailApi = (
  id: number,
  activityId: string | number
) => Promise<company_Activity_Detail>;

/** 企业活动碳足迹 三级路由 eCharts 折线图数据 */
export interface company_Activity_eCharts extends park_Table {}
export type companyDetails_eChartsApi = (
  id: number,
  activityId: string | number,
  type: number
) => Promise<company_Activity_eCharts>;

/** 企业活动碳足迹 三级路由 公司每日基础数据 */
export interface company_Activity_Daily extends park_Statistics {}
export type companyDetails_DayDataApi = (
  id: number,
  activityId: string | number
) => Promise<company_Activity_Daily>;

/**登录页面的表单显示类型*/
type detailsTableTitle = {
  title: string;
  subtitle: string;
};
/**
 * 设备详情的table类型
 * @param deviceID 设备ID
 * @param enterpriseID 企业ID
 * @param serviceenterpriseID 服务对象企业ID
 * @param behavior 服务对象企业ID
 * @param startAndEndTime 开始和结束时间
 * @param exhaustGas 排放气体
 * @param emissions 排放量
 * @param carbonEmissions 排放碳当量
 * */
export interface detailsTable {
  key: string;
  deviceID: detailsTableTitle;
  enterpriseID: detailsTableTitle;
  serviceenterpriseID: detailsTableTitle;
  behavior: string;
  startAndEndTime: string;
  exhaustGas: string;
  emissions: number | string;
  carbonEmissions: number | string;
}

/**
 * 设备概览的table类型
 * @param enterpriseID 企业ID
 * @param enterpriseType 企业类类型
 * @param statisticsTime 统计时间
 * @param emissions 碳排放量
 * */
export interface overviewData {
  key: string;
  enterpriseID: detailsTableTitle;
  enterpriseType: string;
  statisticsTime: string;
  emissions: number | string;
}
/**
 * 登录和注册的表单类型
 */
export type registerAndLoginForm = {
  account: string;
  password: string;
};

export type registerAndLoginFormType = {};
