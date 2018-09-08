import React, { PureComponent } from 'react'
import cx from 'classnames'

class BottomTabs extends PureComponent {

  render() {
    const { toggleTab, currentTab } = this.props

    return (
      <div className="bottomtabs">
        <div
          className={cx('bottomtabs-link border-right', {'bottomtabs-link-active': currentTab === 'list'})}
          onClick={toggleTab('list')}
          >
          Lista
        </div>
        <div className={cx('bottomtabs-link', {'bottomtabs-link-active': currentTab === 'map'})}
          onClick={toggleTab('map')}
          >
          Mappa
        </div>
      </div>
    )
  }
}

export default BottomTabs
