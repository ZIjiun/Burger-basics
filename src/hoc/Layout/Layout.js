import React, { Component } from 'react';

import Aux from '../Auxiliary/auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// eslint-disable-next-line react/require-render-return
class Layout extends Component {
    state = {
        showSideDrawer: true
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        // 因為 setState 是異步的，所以裡面的 state 可能不是預期的結果
        // this.setState({showSideDrawer: !this.state.showSideDrawer}
        this.setState((prevState) => {
            return {showSideDrawer: ! prevState.showSideDrawer};
        })
    };

    render() {
      return (
          <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer
                open={this.state.showSideDrawer}
                closed={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
               {this.props.children}
            </main>
          </Aux>
      )
    }
}

export default Layout;