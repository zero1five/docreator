import React, { PureComponent } from 'react'
import { Table } from 'antd'

import './index.less'

const columns = [
  {
    title: '属性',
    key: 'attr',
    dataIndex: 'attr',
    // className: 'api-attr',
    render: (text, record, index) => <span className="api-attr">{text}</span>
  },
  {
    title: '说明',
    key: 'desc',
    dataIndex: 'desc'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
    // className: 'api-type',
    render: (text, record, index) => <span className="api-type">{text}</span>
  },
  {
    title: '默认值',
    key: 'defaults',
    dataIndex: 'defaults',
    className: 'api-defaults',
    render: (text, record, index) => <code>{text}</code>
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
      <Table
        columns={columns}
        dataSource={data.map(x => {
          for (let key in x) {
            if (!x[key]) x[key] = ''
          }
          return x
        })}
        className="api-container"
        rowKey="attr"
        pagination={false}
      />
    )
  }
}
