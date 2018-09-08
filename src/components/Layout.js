import React, { PureComponent } from 'react'
import Navbar from './Navbar'

class Layout extends PureComponent {
  render() {
    const { children, className } = this.props
    return (
      <div className={className}>
        <Navbar />
        {children}
      </div>
    )
  }
}

export default Layout
