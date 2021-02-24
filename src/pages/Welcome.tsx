import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'RY题库SUBJECT已经发布。',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="SUBJECT题库" />{' '}
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
