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

/** 获取题 GET /api/question */
export async function getBySqId(sqId?: number) {
  return request<API.QuestionRsp>('/api/question/' + sqId, {
    method: 'GET',
  });
}

/** 编辑试题or添加试题 POST /api/question */
export async function editQuestion(sqId:number,body: API.Question,options?: { [key: string]: any }) {
  return request<API.QuestionRsp>('/api/question/'+sqId, {
    method: 'POST',
    data: body
  });
}

/** 隐藏 hide /api/question/hide */
export async function hideQuestion(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/question/hide', {
    method: 'DELETE',
    ...(options || {}),
  });
}
