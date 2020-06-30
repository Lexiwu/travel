import { FETCH_START, FETCH_SUCCESS, FETCH_FAILED } from '../action/travelAction';

const travelListInit = {
	list: [],
	total: 0,
	loading: false,
    error: false,
    pageCount: 1
};

const travelSpotInit={

}

export function travelListReducer(state = travelListInit, action) {
	switch (action.type) {
		case FETCH_START:
			return Object.assign({}, state, {
				...state,
				loading: true
			});
		case FETCH_SUCCESS:
			return Object.assign({}, state, {
				...state,
                list: action.data.data,
                total: action.data.total,
				loading: false
			});
		case FETCH_FAILED:
			return Object.assign({}, state, {
				...state,
				error: true,
				loading: false
			});
		default:
			return state;
	}
}
