import React from 'react';
import { Card, List } from 'semantic-ui-react';

const PartyCards = (props) => {
	let cards = props.parties.map(party => {
		let { name, id, players } = party;
		return (
			<Card key={id}>
				<Card.Content>
					<Card.Header>{name}</Card.Header>
					<Card.Description>
						<List divided relaxed>
						{players.items.map(player => (
							<List.Item key={player.id}>
								<List.Content>
									<List.Header>{player.name}</List.Header>
									<List.Description>Human Name</List.Description>
								</List.Content>
							</List.Item>
						))}
						</List>
					</Card.Description>
				</Card.Content>
			</Card>
			);
		});

		return (
			<Card.Group>
				{cards}
			</Card.Group>
		)
	};

export default PartyCards;