import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import TabContent from '../Components/TabContent';

import { addCart } from '../store/cartSlice';

function Detail({ goods }) {
	let { id } = useParams();
	id = parseInt(id);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [show, setShow] = useState(true);
	const [fade, setFade] = useState('');
	const [tab, setTab] = useState(0);

	const goodsId = goods.find((good) => {
		return good.id === id;
	});

	useEffect(() => {
		setFade('end');

		let timer = setTimeout(() => {
			setShow(false);
		}, 2000);

		return () => {
			setFade('');
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		let Data = localStorage.getItem('watched');
		Data = JSON.parse(Data);
		Data.push(goodsId.id);
		Data = new Set(Data);
		Data = Array.from(Data);

		localStorage.setItem('watched', JSON.stringify(Data));
	}, []);

	return (
		<Container className={`start ${fade}`}>
			{show ? (
				<div className='alert alert-warning'>2초 이내 구매 시 할인</div>
			) : null}
			<Row>
				<Col sm>
					<img
						src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
						width='100%'
					/>
				</Col>
				<Col sm>
					<h4 className='pt-5'>{goodsId.title}</h4>
					<p>{goodsId.content}</p>
					<p>{goodsId.price} 원</p>
					<Button
						variant='outline-danger'
						onClick={() => {
							dispatch(
								addCart({ id: goodsId.id, name: goodsId.title, count: 1 })
							);
							navigate('/cart');
						}}>
						주문하기
					</Button>
				</Col>
			</Row>

			<Nav variant='tabs' defaultActiveKey='link0'>
				<Nav.Item>
					<Nav.Link eventKey='link0' onClick={() => setTab(0)}>
						버튼0
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='link1' onClick={() => setTab(1)}>
						버튼1
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey='link2' onClick={() => setTab(2)}>
						버튼2
					</Nav.Link>
				</Nav.Item>
			</Nav>

			<TabContent tab={tab} />
		</Container>
	);
}

export default Detail;
