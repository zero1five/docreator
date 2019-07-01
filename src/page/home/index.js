import React from 'react'
import { connect } from '../../miniDva'

const RluyComponent = props => {
  return (
    <div>
      {props.count} <hr />
      It's Ok?
    </div>
  )
}

const mapState = state => {
  return {
    ...state.home
  }
}

export default connect(mapState)(RluyComponent)
