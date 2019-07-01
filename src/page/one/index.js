import React from 'react'
import { connect } from '../../miniDva'

const RluyComponent = props => {
  return (
    <div>
      {props.count + 5} <hr />
      It's not Ok
    </div>
  )
}

const mapState = state => {
  return {
    ...state.home
  }
}

export default connect(mapState)(RluyComponent)
