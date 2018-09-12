import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

export default class Header extends Component {
  render() {
    return (
      <Menu stackable>
        <Menu.Item as={Link} to="/">
          Simple Encounter Tracker
        </Menu.Item>

        <Menu.Item as={Link} to="/player">
          Player
        </Menu.Item>

        <Menu.Item as={Link} to="/dm">
          Dungeon Master
        </Menu.Item>
      </Menu>
    );
  }
}
