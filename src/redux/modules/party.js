import  { API, graphqlOperation } from "aws-amplify";
import { from } from "rxjs";

const PARTY_LIST_LOAD_REQUESTED = 'PARTY_LIST_REQUEST';
const PARTY_LIST_LOAD_SUCCEEDED = 'PARTY_LIST_LOAD_SUCCEEDED';
const PARTY_LIST_LOAD_FAILED = 'PARTY_LIST_LOAD_FAILED';

export const partyListLoadRequested = () => {
	return {
		type: PARTY_LIST_LOAD_REQUESTED
	}
};

export const partyListLoadSucceeded = (parties) => {
	return {
		type: PARTY_LIST_LOAD_SUCCEEDED,
		parties
	};
}

const reducer = (state = {
	parties: [],
	loading: false,
	loaded: false
}, action) => {
	switch(action.type) {
		case PARTY_LIST_LOAD_REQUESTED:
			return {
				...state,
				loading: true,
				loaded: false
			}
			case PARTY_LIST_LOAD_SUCCEEDED:
				return {
					...state,
					loading: false,
					loaded: true,
					parties: action.parties
				}
			default: 
				return state;
		}
};

export const partyEpic = action$ =>
	action$.ofType(PARTY_LIST_LOAD_REQUESTED)
		.delay(1000)
			.mergeMap(action => {
				const ListParties = `
					query {
							listPartys {
								items {
									name,
									id,
									players {
										items {
											name,
											id
										}
									}
								}
							}	
						}`

					return from(API.graphql(graphqlOperation(ListParties))).map(response => {
						return partyListLoadSucceeded(response.data.listPartys.items);
					});
			});

export default reducer;