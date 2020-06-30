import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSetting, clearSpotInfo } from './action/travelAction';
import './style/travel.scss';
import View from './static/image/view.jpg';

const TravelSpot = () => {
	const { id } = useParams();
	const history = useHistory();
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

			return () => {
				dispatch(clearSpotInfo());
			};
		},
		[ dispatch, id ]
	);

	useEffect(
		() => {
			console.log('id---', id);
		},
		[ id ]
	);

	const backToList = useCallback(
		() => {
			history.push('/');
		},
		[ history ]
	);

	if (notFound) return <div>NOT FOUND</div>;
	if (loading) return <div>LOADING ....</div>;
	return (
		<div className="TravelSpot">
			<p>
				<span onClick={() => backToList()}>回列表</span>
			</p>
			<div className="TravelSpotInfo">
				<h1>{spotInfo.name}</h1>
				<figure>
					<img src={View} alt="" />
				</figure>
				<div className="infoRow">
					<div className="infoRow__title">地址：</div>
					<div className="infoRow__info">
						<address>{spotInfo.address}</address>
					</div>
				</div>
				<div className="infoRow">
					<div className="infoRow__title">官網：</div>
					<div className="infoRow__info">
						<a href={spotInfo.official_site} rel="noopener noreferrer" target="_blank">
							{spotInfo.official_site}
						</a>
					</div>
				</div>

				<div className="infoRow">
					<div className="infoRow__title">FaceBook：</div>
					<div className="infoRow__info">
						<a href={spotInfo.facebook} rel="noopener noreferrer" target="_blank">
							{spotInfo.facebook}
						</a>
					</div>
				</div>
				<div className="infoRow">
					<div className="infoRow__title">詳細資訊：</div>
					<div className="infoRow__info">
						<a href={spotInfo.url} rel="noopener noreferrer" target="_blank">
							{spotInfo.url}
						</a>
					</div>
				</div>

				<div className="openTime">{spotInfo.open_time}</div>
				<div className="introduction">{spotInfo.introduction}</div>
			</div>
		</div>
	);
};

export default TravelSpot;
