import React, { useEffect, useCallback, useState } from 'react';
import { connect, useDispatch, useSelector, shallowEqual } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import './style/travel.scss';
import { fetchSetting } from './action/travelAction';

// 1. 分為兩個頁面
// - / - 列表頁：呈現 API response 之各個景點資訊
// - /:id - 景點資訊頁：呈現景點詳細資訊
// - 使用者直接以 URL 進入 /:id，response 列表中存在該景點則直接顯示景點資訊頁，不存在則導回列表頁
// 2. 列表頁景點使用卡片呈現，卡片資訊：一張圖片、景點名稱、景點地址，點擊卡片進入 /:id 景點詳細資訊頁。
// 3. 景點資訊頁請站在使用者的角度，盡可能呈現 API response 之資訊

const Travel = () => {
	const dispatch = useDispatch();
	const { travelListReducer } = useSelector(
		(state) => ({
			travelListReducer: state.travelListReducer
		}),
		shallowEqual
	);

	const {loading, pageCount, list}=travelListReducer;

	useEffect(
		() => {
			dispatch(fetchSetting(pageCount));
		},
		[ dispatch, pageCount ]
	);

	const renderTravelSpotCard = useCallback(
		() => {
			console.log(list);
			if (list.length !== 0) {
				return list.map((info) => {
					return <SpotCard key={info.name} info={info} />;
				});
			}
		},
		[ list ]
	);

	if(loading) return <div>LOADING ....</div>

	return (
		<main>
			<h1>旅遊資訊</h1>

			<section className="travelSpotList">
				<ul>{renderTravelSpotCard()}</ul>
			</section>
		</main>
	);
};

const SpotCard = ({ info }) => {
	let history = useHistory();
	const { name, address, id } = info;

	const toSpot = () => {
		history.push(`/${id}`);
	};
	return (
		<div className='SpotCard' onClick={() => toSpot()}>
			<h2>{name}</h2>
			<address>{address}</address>
		</div>
	);
};

export default Travel;
