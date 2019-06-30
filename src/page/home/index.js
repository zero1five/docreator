import React from 'react'

const RluyComponent = props => {
  return <div>{props.count}</div>
}

const mapState = state => {
  return {
    ...state.admin
  }
}

export default connect(mapState)(RluyComponent)
