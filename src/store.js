import React, { Component, PureComponent } from 'react'
import produce from 'immer'
import equal from 'fast-deep-equal'

// new Store | dispatch | @connect

const noop = store => store

let store = {}

function createSubscribe() {
  const listener = []
  return {
    listen: updator => listener.push(updator),
    unListen: l => listener.splice(listener.indexOf(l), 1),
    update: updator => {
      for (let i = 0; i < listener.length; i++) {
        listener[i](updator)
      }
      if (listener.length === 0) {
        if (typeof updator === 'function') {
          const newState = produce(store, draft => {
            updator(draft)
          })
          if (!equal(newState, store)) {
            store = newState
          }
          return
        }
      }
    }
  }
}
const { listen, unListen, update } = createSubscribe()

export const initStore = _store => (store = _store)

export const connect = (selector = noop) => WrappedComponent => {
  if (!typeof WrappedComponent === 'function') {
    console.error(
      `Error: Current used wrappedComponent is not a function, or maybe error calling connect.`
    )
  }

  return class Wrapper extends Component {
    state = store

    componentWillUnmount() {
      unListen(this.reRender)
    }

    componentDidMount() {
      listen(this.reRender)
    }

    reRender = updator => {
      const newState = produce(this.state, draft => {
        updator(draft)
      })
      if (!equal(newState, this.state)) {
        this.setState(newState)
        store = newState
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...selector(this.state)}
          dispatch={update}
        />
      )
    }
  }
}
