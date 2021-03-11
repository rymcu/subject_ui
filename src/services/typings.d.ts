// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageParams = {
    page?: number;
    rows?: number;
  };

  type QuestionOption = {
    optionContent?: string;
  };

  type Question = {
    id?: number;
    questionLevel?: number;
    questionType?: number;
    remark?: string;
    questionContent?: string;
    showFlag?: boolean;
    srcType?: string;
    errorFlag?: boolean;
    options?: QuestionOption[];
    answer?: string;
  };

  type QuestionInfoList = {
    total?: number;
    data?: question[];
  };

  type QuestionRsp = {
    success?: boolean;
    data?: question;
    code?: number;
    message?: String;
  };
}
