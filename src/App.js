import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense, useEffect, useState } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';

import bg from './images/bg.png';
import data from './data';
import List from './Components/List';
import Latest from './Components/Latest';

import axios from 'axios';

import './App.css';
import { useQuery } from 'react-query';

const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

const MainBg = styled.div`
	height: 300px;
	background-image: url(${bg});
	background-size: cover;
	background-position: center;
`;

function App() {
	const [goods, setGoods] = useState(data);
	const [show, setShow] = useState(true);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const getData = async () => {
		try {
			const response = await axios.get(
				`https://codingapple1.github.io/shop/data${count + 2}.json`
			);

			let copy = [...goods];
			let newGoods = copy.concat(response.data);
			setGoods(newGoods);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (count === 2) {
			setShow(false);
		}
	}, [count]);

	useEffect(() => {
		if (!localStorage.getItem('watched')) {
			localStorage.setItem('watched', JSON.stringify([]));
		}
	}, []);

	// useEffect(() => {
	// 	const getUserName = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				`https://codingapple1.github.io/userdata.json`
	// 			);

	// 			console.log(response.data);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};

	// 	getUserName();
	// }, []);

	const result = useQuery(
		['getUserName'],
		() =>
			axios
				.get(`https://codingapple1.github.io/userdata.json`)
				.then((res) => res.data),
		{ staleTime: 2000 }
	);

	return (
		<div className='App'>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand onClick={() => navigate('/')}>AAVECVOUS</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
						<Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
					</Nav>
					<Nav className='ms-auto' style={{ color: 'white' }}>
						{result.isLoading && '로딩 중...'}
						{result.error && 'ERROR'}
						{result.data && `반갑습니다 ${result.data.name} 님 !`}
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route
					path='/'
					element={
						<>
							<MainBg />
							<Container>
								<Row>
									{goods.map((good, index) => {
										return <List good={good} index={index} key={index} />;
									})}
								</Row>
							</Container>
							{show ? (
								<Button
									onClick={() => {
										setLoading(true);
										getData();
										setCount((prev) => prev + 1);
									}}>
									{loading ? '로딩 중..' : '더 보기'}
								</Button>
							) : null}
						</>
					}
				/>
				<Route
					path='/detail/:id'
					element={
						<Suspense fallback={<div>LOADING...</div>}>
							<Detail goods={goods} />
						</Suspense>
					}
				/>
				<Route
					path='/cart'
					element={
						<Suspense fallback={<div>LOADING...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route path='*' element={<div>404 ERROR</div>} />
			</Routes>

			<Latest goods={goods} />
		</div>
	);
}

export default App;
