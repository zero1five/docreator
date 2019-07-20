import React from 'react'
import { Button, Result } from 'antd'

const NoFoundPage = props => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起, 此页面未找到."
      extra={
        <Button type="primary" onClick={() => props.history.push('/')}>
          Back Home
        </Button>
      }
    ></Result>
  )
}

export default NoFoundPage
