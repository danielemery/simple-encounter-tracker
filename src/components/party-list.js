import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Segment } from 'semantic-ui-react';

import { partyListLoadRequested } from '../redux/modules/party';
import PartyCards from './party-cards';

class PartyList extends Component {
  render() {
		let { loading, parties, errors } = this.props;

    return (
      <Segment basic>
        <h2>Current Parties</h2>
				{ errors.length > 0 && 
					<Message
						error
						header="Error loading parties"
						list={errors}
					/>
				}
        { loading && <div><br/>Loading...</div> }
				{ parties.length > 0 && <PartyCards parties={parties} /> }
      </Segment>
    );
  }
  componentDidMount() {
		if(!this.props.loaded && !this.props.loading) {
			this.props.onPartiesRequested();
		}
  }
}

const mapStateToProps = state => {
  return {
      parties: state.party.parties,
			loading: state.party.loading,
			loaded: state.party.loaded,
			errors: state.party.errors
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