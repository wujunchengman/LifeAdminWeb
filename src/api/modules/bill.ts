import http from "@/api";
import { ResPage } from "@/api/interface/index";
import { Bill } from "@/api/config/servicePort";
// 获取产品列表
export const getBillList = (params: any) => {
  return http.post<ResPage<any>>(Bill + `/List`, params);
};

// 添加产品型号
export const addBill = (params: any) => {
  return http.post(Bill + "/Add", params);
};

export const editBill = (params: any) => {
  return http.post(Bill + "/Edit", params);
};

export const deleteBill = (params: string) => {
  return http.delete(Bill + "/Delete/" + params);
};
