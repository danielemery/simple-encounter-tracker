import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { withAuthenticator } from 'aws-amplify-react';

import PartyList from './party-list';

class DM extends Component {
  render() {
    return (
    <Segment basic>
      <h1>Dungeon Master</h1>
      <PartyList />
    </Segment>
    );
  }
}

export default withAuthenticator(DM);