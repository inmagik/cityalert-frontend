import React, { PureComponent } from 'react'
import cx from 'classnames'

class BottomTabs extends PureComponent {

  render() {
    const { toggleTab, currentTab } = this.props

    return (
      <div className="bottomtabs">
        <div
          className={cx('bottomtabs-link border-right pointer', {'bottomtabs-link-active': currentTab === 'list'})}
          onClick={toggleTab('list')}
          >
          <i className="fa fa-list"></i> Lista
        </div>
        <div className={cx('bottomtabs-link pointer', {'bottomtabs-link-active': currentTab === 'map'})}
          onClick={toggleTab('map')}
          >
          <i className="fa fa-map"></i> Mappa
        </div>
      </div>
    )
  }
}

export default BottomTabs
