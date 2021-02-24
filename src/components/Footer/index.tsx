import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 🐛"
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/rymcu/subject_ui',
        blankTarget: true,
      },
      {
        key: 'RYMCU',
        title: 'RYMCU',
        href: 'https://rymcu.com',
        blankTarget: true,
      },
    ]}
  />
);
