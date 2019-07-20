import React, { PureComponent } from 'react'
import { Table } from 'antd'

import './index.less'

const columns = [
  {
    title: '属性',
    key: 'attribute',
    dataIndex: 'attr'
  },
  {
    title: '说明',
    key: 'description',
    dataIndex: 'desc'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
    className: 'api-title'
  },
  {
    title: '默认值',
    key: 'defaults',
    dataIndex: 'defaults',
    className: 'api-defaults'
  },
  {
    title: '版本',
    key: 'version',
    dataIndex: 'version'
  }
]

export default class APITable extends PureComponent {
  static defaultProps = {
    columns,
    data: []
  }

  render() {
    const { columns, data } = this.props
    return (
      <Table columns={columns} dataSource={data} className="api-container" />
    )
  }
}
