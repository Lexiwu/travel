import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

const TravelSpot = () => {
	let { id } = useParams();

	useEffect(
		() => {
			console.log('id---', id);
		},
		[ id ]
	);
	return <div>HELLO</div>;
};

export default TravelSpot;
