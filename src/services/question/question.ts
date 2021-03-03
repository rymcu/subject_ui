// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取题列表 GET /api/question */
export async function queryList(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    rows?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.QuestionInfoList>('/api/question/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/question */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/question', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/question */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/question', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/question */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/question', {
    method: 'DELETE',
    ...(options || {}),
  });
}
