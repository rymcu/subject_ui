import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormList, ProFormSelect } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { queryList, addRule, updateRule, removeRule } from '@/services/question/question';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { MehTwoTone, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.question) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
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
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.question[]) => {
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

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.question>();
  const [selectedRowsState, setSelectedRows] = useState<API.question[]>([]);

  /** 国际化配置 */
  const intl = useIntl();
  // 展开行  可控
  //  const [expKeys, setExpKeys] = React.useState(columns && columns.map(i => i.id));
  const columns: ProColumns<API.question>[] = [
    {
      title: <FormattedMessage id="pages.questionInfo.id" defaultMessage="试题编号" />,
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
      title: <FormattedMessage id="pages.questionInfo.questionType" defaultMessage="试题类型" />,
      dataIndex: 'questionType',
      valueEnum: {
        0: {
          text: <FormattedMessage id="1" defaultMessage="未知" />,
          status: 'Processing',
        },
        1: {
          text: <FormattedMessage id="1" defaultMessage="选择题" />,
          status: 'Processing',
        },
        2: {
          text: <FormattedMessage id="1" defaultMessage="多选题" />,
          status: 'Processing',
        },
        3: {
          text: <FormattedMessage id="1" defaultMessage="判断题" />,
          status: 'Processing',
        },
      },
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.questionInfo.questionLevel" defaultMessage="难度等级" />,
      dataIndex: 'questionLevel',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) =>
        `${val}${intl.formatMessage({
          id: 'pages.questionInfo.lv',
          defaultMessage: ' 级 ',
        })}`,
    },
    {
      title: <FormattedMessage id="pages.questionInfo.remark" defaultMessage="备注" />,
      dataIndex: 'remark',
      hideInForm: true,
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleUpdatedAt" defaultMessage="来源" />,
      sorter: true,
      dataIndex: 'srcType',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleUpdatedAt" defaultMessage="展示状态" />,
      sorter: true,
      dataIndex: 'showFlag',
      valueEnum: {
        true: {
          text: <FormattedMessage id="1" defaultMessage="展示" />,
          status: 'Processing',
        },
        false: {
          text: <FormattedMessage id="1" defaultMessage="隐藏" />,
          status: 'Error',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleUpdatedAt" defaultMessage="题目状态" />,
      sorter: true,
      dataIndex: 'errorFlag',
      valueEnum: {
        true: {
          text: <FormattedMessage id="1" defaultMessage="有误" />,
          status: 'Error',
        },
        false: {
          text: <FormattedMessage id="1" defaultMessage="无误" />,
          status: 'Processing',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage
            id="pages.searchTable.config"
            defaultMessage={record.errorFlag ? '无误' : '有误'}
          />
        </a>,
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage
            id="pages.searchTable.config"
            defaultMessage={record.errorFlag ? '展示' : '隐藏'}
          />
        </a>,
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="编辑" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.question, API.PageParams>
        headerTitle={intl.formatMessage({
          id: '1',
          defaultMessage: '查询试题',
        })}
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
        expandRowByClick={true}
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
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="1" defaultMessage="添加试题" />
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="道试题" />
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
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量展示" />
          </Button>
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量隐藏" />
          </Button>
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量有误" />
          </Button>
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量无误" />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: '1',
          defaultMessage: '添加试题',
        })}
        width="1000px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.question);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormList
          name="users"
          initialValue={[
            {
              useMode: 'chapter',
            },
          ]}
          creatorButtonProps={{
            position: 'top',
            creatorButtonText: '在建一行',
          }}
          creatorRecord={{
            useMode: 'none',
          }}
        >
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '盖章后生效',
              },
              {
                value: 'none',
                label: '不生效',
              },
            ]}
            width="md"
            name="useMode"
            label="合同约定生效方式"
          />
        </ProFormList>
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
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
          <ProDescriptions<API.question>
            column={1}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.question>[]}
          />
        )}
        <div>试题内容</div>
        <div>{currentRow?.questionContent}</div>
        <div>选项</div>
        {currentRow?.options?.map((item) => {
          return (
            <div>
              <Checkbox checked={item.answerFlag}>{item.optionName}、</Checkbox>&nbsp;
              {item.optionContent}
              {item.answerFlag} <br />
            </div>
          );
        })}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
