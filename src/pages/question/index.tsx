import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormCheckbox, ProFormDigit, ProFormGroup, ProFormList, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { editQuestion, queryList } from '@/services/question/question';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { MehTwoTone, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import { removeRule } from '@/services/ant-design-pro/rule';
import { isNil, isNull } from 'lodash';
import UpdateForm from './components/UpdateForm';
/**
 * 添加节点
 *
 * @param fields
 */
const handleEdit = async (fields: API.Question) => {
  const hide = message.loading('正在添加');
  try {
    editQuestion({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Question[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const QuestionPannelList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handlCreateModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Question>();
  const [currentQuestion, setCurrentQuestion] = useState<API.Question>();
  const [selectedRowsState, setSelectedRows] = useState<API.Question[]>([]);
  const columns: ProColumns<API.Question>[] = [
    {
      title: "试题编号",
      dataIndex: 'id',
      tip: '试题编号是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "试题类型",
      dataIndex: 'questionType',
      valueEnum: {
        0: {
          text: "未知",
          status: 'Processing',
        },
        1: {
          text: "单选题",
          status: 'Processing',
        },
        2: {
          text: "多选题",
          status: 'Processing',
        },
        3: {
          text: "判断题",
          status: 'Processing',
        },
        4: {
          text: "填空题",
          status: 'Processing',
        },
        5: {
          text: "问答题",
          status: 'Processing',
        },
      },
      sorter: true,
    },
    {
      title: "难度等级",
      dataIndex: 'questionLevel',
      sorter: true,
      hideInForm: true,
      valueType: 'text',
    },
    {
      title: "备注",
      dataIndex: 'remark',
      hideInForm: true,
      valueType: 'textarea',
    },
    {
      title: "来源",
      sorter: true,
      dataIndex: 'srcType',
      valueType: 'textarea',
    },
    {
      title: "展示状态",
      sorter: true,
      dataIndex: 'showFlag',
      valueEnum: {
        true: {
          text: "展示",
          status: 'Processing',
        },
        false: {
          text: "隐藏",
          status: 'Error',
        },
      },
    },
    {
      title: "题目状态",
      sorter: true,
      dataIndex: 'errorFlag',
      valueEnum: {
        true: {
          text: "有误",
          status: 'Error',
        },
        false: {
          text: "无误",
          status: 'Processing',
        },
      },
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record, index) => [
        <a
          key={index}
          onClick={() => {
            setCurrentRow(record);
          }}
        >
          {record.errorFlag ? '无误' : '有误'}
        </a>,
        <a
          key={index}
          onClick={() => {
            setCurrentRow(record);
          }}
        >
          {record.errorFlag ? '展示' : '隐藏'}

        </a>,
        <a
          key={index}
          onClick={() => {
            setCurrentRow(record)
            handleUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.Question, API.PageParams>
        headerTitle='查询试题'
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        request={queryList}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div className={styles.question_content}>
              <MehTwoTone />
              &nbsp;&nbsp;{record.questionContent}
            </div>
          ),
        }}
        defaultExpandAllRows={true}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handlCreateModalVisible(true);
            }}
          >
            <PlusOutlined />添加试题
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              道试题
              &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量展示
          </Button>
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量隐藏
          </Button>
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量有误
          </Button>
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量无误
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title='添加试题'
        width="1000px"
        visible={createModalVisible}
        onVisibleChange={handlCreateModalVisible}
        onFinish={async (value) => {
          const success = await handleEdit(value as API.Question);
          if (success) {
            (false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormTextArea
          width="lg"
          name="questionContent"
          label="试题内容"
          placeholder="请输入试题内容"
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
        <ProFormList
          name="options"
          label="选项列表"
          creatorButtonProps={{
            position: "top"
          }}
          initialValue={[]}
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
          <ProFormGroup >
            <ProFormText
              name="optionContent"
              placeholder="请输入选项内容"
              width="lg"
            />
            <ProFormSelect
              name="answerFlag"
              width="sm"
              options={[
                {
                  value: 1,
                  label: '是',
                },
                {
                  value: 0,
                  label: '否',
                },
              ]}
              placeholder="请选择答案标志"
            />
          </ProFormGroup>
        </ProFormList>
      </ModalForm>

      
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleEdit(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
      >
        {currentRow?.id && (
          <ProDescriptions<API.Question>
            column={1}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.Question>[]}
          />
        )}
        <div>试题内容</div>
        <div>{currentRow?.questionContent}</div>
        <br />
        {currentRow?.options?.map((item) => {
          return (
            <div>
              <Checkbox checked={item.answerFlag == true}>{item.optionName}、</Checkbox>&nbsp;
              {item.optionContent}
            </div>
          );
        })}
      </Drawer>
    </PageContainer>
  );
};

export default QuestionPannelList;

