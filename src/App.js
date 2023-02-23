import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';

import bg from './images/bg.png';
import data from './data';
import List from './Components/List';
import Detail from './pages/Detail';
import Cart from './pages/Cart';

import axios from 'axios';

import './App.css';

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

	return (
		<div className='App'>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand onClick={() => navigate('/')}>AAVECVOUS</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
						<Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
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
				<Route path='/detail/:id' element={<Detail goods={goods} />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='*' element={<div>404 ERROR</div>} />
			</Routes>
		</div>
	);
}

export default App;
