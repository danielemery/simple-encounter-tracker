import React, { Component } from 'react';
import { connect } from 'react-redux';

import { partyListLoadRequested } from '../redux/modules/party';

class PartyList extends Component {
  render() {
    let { loading, parties } = this.props;

    let playerList = parties.map(p => 
      <li key={p.id}>{p.name}</li>
    );

    return (
      <div>
        <h2>Current Parties</h2>
        { loading && <div><br/>Loading...</div> }
        <ul>{playerList}</ul>
      </div>
    );
  }
  componentDidMount() {
    this.props.onPartiesRequested();
  }
}

const mapStateToProps = state => {
  return {
      parties: state.party.parties,
      loading: state.party.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPartiesRequested: () => {
      dispatch(partyListLoadRequested());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyList);