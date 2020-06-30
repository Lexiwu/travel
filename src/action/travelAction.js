export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';
export const SET_SPOT_INFO = 'SET_SPOT_INFO';
export const NOT_FOUND = 'NOT_FOUND';
export const CLEAR_SPOT_INFO = 'CLEAR_SPOT_INFO';
export const LOAD_MORE='LOAD_MORE';

export function fetchStart() {
	return {
		type: FETCH_START
	};
}
export function fetchSuccess(data, originList, list, displayList) {
	return {
		type: FETCH_SUCCESS,
		total: data.total,
		originList,
		list,
		displayList
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
				const originList =JSON.parse(JSON.stringify(res.data));
				const list= res.data;
				const displayList = list.splice(0, 30)
				dispatch(fetchSuccess(res, originList, list, displayList));

				if(id) {
					const infoIndex = originList.map(spot=> spot.id).indexOf(parseInt(id, 10))
					if(infoIndex!== -1){
						const info = originList[infoIndex]
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

export function loadMore(){
	return (dispatch, getState)=>{
		const {list, displayList} = getState().travelListReducer;
		const moreList = list.splice(0, 30)
		
		dispatch({
			type: LOAD_MORE,
			displayList: displayList.concat(moreList),
			list
		})
	}
}

export function clearSpotInfo(){
	return{
		type: CLEAR_SPOT_INFO
	}
}