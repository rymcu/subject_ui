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

/** 获取题列表 GET /api/question */
export async function getBySqId(sqId?: number) {
  return request<API.QuestionRsp>('/api/question/' + sqId, {
    method: 'GET',
  });
}

/** 新建规则 PUT /api/question */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.QuestionOption>('/api/question', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/question */
export async function editQuestion(body: API.Question,options?: { [key: string]: any }) {
  return request<API.Question>('/api/question', {
    method: 'POST',
    data: body
  });
}

/** 删除规则 DELETE /api/question */
export async function removeQuestion(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/question', {
    method: 'DELETE',
    ...(options || {}),
  });
}
