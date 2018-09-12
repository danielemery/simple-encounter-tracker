import React, { Component } from 'react';

import { withAuthenticator } from 'aws-amplify-react';

class DM extends Component {
  render() {
    return (
      <span>Welcome, Dungeon Master</span>
    );
  }
}

export default withAuthenticator(DM);