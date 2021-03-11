import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
} from '@ant-design/pro-form';
import { isNull, isNil } from 'lodash';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.Question>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.Question>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
        initial: 0

      }}

      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={850}
            bodyStyle={{ padding: '10px' }}
            destroyOnClose
            title={'编辑试题：' + props.values.id}
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              Modal.destroyAll();
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={props.values}
        title={'编辑试题'}
      >
        <ProFormText
          name="id"
          label="id"
          hidden
        />
        <ProFormTextArea
          width="xl"
          name="questionContent"
          label="试题内容"
          placeholder="请输入试题内容"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormTextArea
          width="xl"
          name="answer"
          label="请输入答案"
          placeholder="请输入答案"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormGroup>
          <ProFormText
            width="md"
            name="remark"
            label="试题备注"
            required
            placeholder="请输入备注"

          />
          <ProFormCheckbox
            name="showFlag"
            label="是否展示"
          />
          <ProFormCheckbox
            name="errorFlag"
            label="是否有误"
          />
          <ProFormDigit label="难度级别" name="questionLevel" min={0} max={10} rules={[
            {
              required: true,
            },

          ]} />
          <ProFormSelect
            width="md"
            options={[
              { label: '未知', value: 0 },
              { label: '单选', value: 1 },
              { label: '多选', value: 2 },
              { label: '判断', value: 3 },
              { label: '填空', value: 4 },
              { label: '问答', value: 5 },
            ]}
            name="questionType"
            label="试题类型"
            rules={[
              {
                required: true,
              },
            ]}
          />
        </ProFormGroup>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={props.values}
        title={'编辑选项'}
      >
        <ProFormList
          name="options"
          creatorButtonProps={{
            position: 'bottom'
          }}
          rules={[
            {
              validator: async (_, value) => {
                if (value && value.length > 0) {
                  let optionFlag = true;
                  value.map((item: API.QuestionOption) => {
                    if (isNull(item.optionContent) && isNil(item.answerFlag)) {
                      optionFlag = false;
                    }
                  })
                  return optionFlag;
                }
                throw new Error('至少要有一项！');
              },
            },
          ]}
        >
            <ProFormTextArea
              name="optionContent"
              label="选项内容"
              width='xl'
              placeholder="请输入选项内容"
            />
        </ProFormList>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;


