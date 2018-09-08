import React, { Component } from 'react'
import hoistStatics from 'hoist-non-react-statics'

// Make a component height 100%
// add class to root and body
export default function withFullPage(fullPageClass = 'full-page') {
  return function (WrappedComponent) {
    class WithFullPage extends Component {
      componentDidMount() {
        document.documentElement.classList.add(fullPageClass)
        document.body.classList.add(fullPageClass)
        document.getElementById('root').classList.add(fullPageClass)
      }

      componentWillUnmount() {
        document.documentElement.classList.remove(fullPageClass)
        document.body.classList.remove(fullPageClass)
        document.getElementById('root').classList.remove(fullPageClass)
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    const name = WrappedComponent.displayName || WrappedComponent.name
    const EnhancedComponent = hoistStatics(WithFullPage, WrappedComponent)
    EnhancedComponent.displayName = `withFullPage(${name})`
    return EnhancedComponent
  }
}
