import React from 'react'
import { connect } from '../../miniDva'

const RluyComponent = props => {
  return (
    <div>
      {props.count}
      It's Ok?
    </div>
  )
}

const mapState = state => {
  return {
    ...state.admin
  }
}

export default connect(mapState)(RluyComponent)
