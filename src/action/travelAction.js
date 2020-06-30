export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';
export const SET_SPOT_INFO = 'SET_SPOT_INFO';
export const NOT_FOUND = 'NOT_FOUND';
export const CLEAR_SPOT_INFO = 'CLEAR_SPOT_INFO';

export function fetchStart() {
	return {
		type: FETCH_START
	};
}

export function fetchSuccess(data) {
	return {
		type: FETCH_SUCCESS,
		data
	};
}

export function fetchFailed() {
	return {
		type: FETCH_FAILED
	};
}

export function fetchSetting(id) {

	return async function(dispatch) {
		dispatch(fetchStart());
		await fetch('./info.json', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Accept: 'application/json'
			}
		})
			.then((data) => {
				// console.log(data);
				return data.json();
			})
			.then((res) => {
				dispatch(fetchSuccess(res));
				if(id) {
					const infoIndex = res.data.map(spot=> spot.id).indexOf(parseInt(id, 10))
					if(infoIndex!== -1){
						const info = res.data[infoIndex]
						dispatch({type: SET_SPOT_INFO,info})
					}else{
						dispatch({type: NOT_FOUND})
					}
				}

			})
			.catch((err) => {
				dispatch(fetchFailed());
				console.log('err---', err);
			});
	};
}

export function clearSpotInfo(){
	return{
		type: CLEAR_SPOT_INFO
	}
}