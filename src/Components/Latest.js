import { useState, useEffect } from 'react';
import styled from 'styled-components';

const FixedBox = styled.div`
	position: fixed;
	top: 5rem;
	right: 0;
	width: 10%;
	background-color: #aaa;
	opacity: 0.5;
	padding: 3px;

	h2 {
		color: #111;
		margin: 10px 0;
		font-size: 20px;
		text-align: center;
	}

	h3 {
		color: white;
		font-size: 16px;
	}
`;

const CloseBtn = styled.span`
	position: absolute;
	top: 2px;
	right: 2px;
	font-weight: bold;
	cursor: pointer;
`;

function Latest({ goods }) {
	let Data = JSON.parse(localStorage.getItem('watched'));

	let latest = [];

	if (Data) {
		for (let i = 0; i < goods.length; i++) {
			for (let j = 0; j < Data.length; j++) {
				if (goods[i].id === Data[j]) {
					latest.push(goods[i]);
				}
			}
		}
	}

	return (
		<>
			{latest.length > 0 ? (
				<FixedBox>
					<h2>최근 본 상품</h2>
					{latest.map((item, index) => {
						return <h3 key={index}>{item.title}</h3>;
					})}
				</FixedBox>
			) : null}
		</>
	);
}

export default Latest;
