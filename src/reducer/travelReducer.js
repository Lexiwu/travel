import { FETCH_START, FETCH_SUCCESS, FETCH_FAILED, SET_SPOT_INFO, NOT_FOUND, CLEAR_SPOT_INFO } from '../action/travelAction';

const travelListInit = {
	list: [],
	total: 0,
	loading: false,
    error: false,
	pageCount: 1,
	spotId: null
};

const travelSpotInit={
	spotInfo:{},
	notFound: false,
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

export function travelSpotReducer(state=travelSpotInit, action){
	switch(action.type){
		case SET_SPOT_INFO:
			return Object.assign({}, state,{
				...state,
				spotInfo: action.info
			})
		case NOT_FOUND:
			return Object.assign({}, state, {
				...state,
				notFound: true
			})
		case CLEAR_SPOT_INFO:
			return Object.assign({}, state,{
				spotInfo:{},
				notFound: false
			})
		default:
			return state;
	}
}
