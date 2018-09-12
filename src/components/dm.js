import React, { Component } from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import PartyList from './party-list';

class DM extends Component {
  render() {
    return (
    <div className='container-fluid p-md-3'>
      <h1>Dungeon Master</h1>
      <PartyList />
    </div>
    );
  }
}

export default withAuthenticator(DM);