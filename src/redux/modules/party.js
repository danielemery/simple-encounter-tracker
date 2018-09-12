import  { API, graphqlOperation } from "aws-amplify";
import { from, Observable } from "rxjs";

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

export const partyListLoadFailed = (errors) => {
	return {
		type: PARTY_LIST_LOAD_FAILED,
		errors
	}
}

const reducer = (state = {
	parties: [],
	loading: false,
	loaded: false,
	errors: []
}, action) => {
	switch(action.type) {
		case PARTY_LIST_LOAD_REQUESTED:
			return {
				...state,
				loading: true,
				loaded: false,
				errors: []
			}
			case PARTY_LIST_LOAD_SUCCEEDED:
				return {
					...state,
					loading: false,
					loaded: true,
					parties: action.parties,
					errors: []
				}
			case PARTY_LIST_LOAD_FAILED:
				return {
					...state,
					loading: false,
					loaded: false,
					parties: [],
					errors: action.errors
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
											id,
											playerName,
											characterName,
										}
									}
								}
							}	
						}`

					return from(API.graphql(graphqlOperation(ListParties))).map(response => 
						partyListLoadSucceeded(response.data.listPartys.items)).catch(err => Observable.create(obs => {
							obs.next(partyListLoadFailed(err.errors.map(m => m.message)));
							obs.complete();
						}));
			});

export default reducer;