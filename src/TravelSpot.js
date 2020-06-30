import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSetting, clearSpotInfo } from './action/travelAction';
const TravelSpot = () => {
	const { id } = useParams();
	const history=useHistory();
	const dispatch = useDispatch();

	const { travelListReducer, travelSpotReducer } = useSelector(
		(state) => ({
			travelListReducer: state.travelListReducer,
			travelSpotReducer: state.travelSpotReducer
		}),
		shallowEqual
	);
	const { loading } = travelListReducer;
	const { notFound, spotInfo } = travelSpotReducer;

	useEffect(
		() => {
			dispatch(fetchSetting(id));

			return()=>{
				dispatch(clearSpotInfo())
			}
		},
		[ dispatch, id ]
	);

	useEffect(
		() => {
			console.log('id---', id);
		},
		[ id ]
	);

	const backToList=useCallback(()=>{
		history.push('/');
	}, [history])

	if (notFound) return <div>NOT FOUND</div>;
	if(loading) return <div>LOADING ....</div>
	return (
		<div>
			<p>
				<span onClick={()=> backToList()}>回列表</span>
			</p>
			<h1>{spotInfo.name}</h1>

			<address>{spotInfo.address}</address>
			<p>
				<a href={spotInfo.official_site} rel="noopener noreferrer" target="_blank">
					{spotInfo.official_site}
				</a>
			</p>
			<p>
				<a href={spotInfo.facebook} rel="noopener noreferrer" target="_blank">
					{spotInfo.facebook}
				</a>
			</p>
			<p>
				<a href={spotInfo.url} rel="noopener noreferrer" target="_blank">
					{spotInfo.url}
				</a>
			</p>

			<div>{spotInfo.open_time}</div>
			<div>{spotInfo.introduction}</div>
		</div>
	);
};

export default TravelSpot;
