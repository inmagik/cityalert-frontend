import React, { PureComponent } from 'react'
import cx from 'classnames'

class BottomTabs extends PureComponent {
  state = {
    showMap: false,
  }

  toggleMap = () => {
    this.setState({showMap: !this.state.showMap})
  }

  render() {
    const { showMap } = this.state
    return (
      <div className="bottomtabs">
        <div
          className={cx('bottomtabs-link border-right', {'bottomtabs-link-active': !showMap})}
          onClick={this.toggleMap}
          >
          Lista
        </div>
        <div className={cx('bottomtabs-link', {'bottomtabs-link-active': showMap})}
          onClick={this.toggleMap}
          >
          Mappa
        </div>
      </div>
    )
  }
}

export default BottomTabs
