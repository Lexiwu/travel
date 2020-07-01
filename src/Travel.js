import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style/travel.scss';
import { fetchSetting, loadMore } from './action/travelAction';

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
	const { loading, list, total, error, displayList, originList } = travelListReducer;

	useEffect(
		() => {
			if (originList.length === 0) {
				dispatch(fetchSetting());
			}
		},
		[ dispatch, originList ]
	);

	const more = useCallback(
		() => {
			dispatch(loadMore());
		},
		[ dispatch ]
	);

	const renderLoadMore = useCallback(
		() => {
			if (list.length !== 0) {
				return <button onClick={() => more()}>LOAD MORE</button>;
			}
		},
		[ list.length, more ]
	);

	const renderTravelSpotCard = useCallback(
		() => {
			console.log('displayList----', displayList);
			return displayList.map((info) => {
				return <SpotCard key={info.name} info={info} />;
			});
		},
		[ displayList ]
	);

	const goTop =()=>{
		window.scrollTo({top: 0, behavior: "smooth" })
	}

	if (loading)
		return (
			<div className="warningTemplate">
				<span>LOADING ...</span>
			</div>
		);
	if (error)
		return (
			<div className="warningTemplate">
				<span>請稍後再試</span>
			</div>
		);
	return (
		<main>
			<section className="travelSpotList">
				<h1>
					景點列表
					<span>共{total}筆</span>
				</h1>

				<ul>{renderTravelSpotCard()}</ul>

				{renderLoadMore()}
			</section>

			<button className="goTop" onClick={()=> goTop()}/>
		</main>
	);
};

const SpotCard = ({ info }) => {
	let history = useHistory();
	const { name, address, id, ticket, category, distric } = info;

	const toSpot = () => {
		history.push(`/${id}`);
	};

	const renderCategory = () => {
		if (category.length !== 0) {
			return (
				<div className="category">
					<ul>
						{category.map((item) => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		}
	};

	const renderDistric =() =>{
		if(distric){
			return(
				<div className="distric">{distric}</div>
			)
		}
	}

	const renderTicket= ()=>{
		if(ticket){
			return<span>Free</span>
		}
	}

	return (
		<div className="SpotCard" onClick={() => toSpot()}>
			<div className="SpotCard__img" />
			<div className="SpotCard__info">
				{renderDistric()}
				<h2>
					{name}
					{renderTicket()}
				</h2>
				<address>{address}</address>
				{renderCategory()}
			</div>


		</div>
	);
};

export default Travel;
