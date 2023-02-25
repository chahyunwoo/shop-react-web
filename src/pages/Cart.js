import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { plusCount, minusCount, deleteCart } from '../store/cartSlice';

function LoopFunc() {
	return;
}

function Cart() {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	const result = LoopFunc();

	return (
		<>
			<h6>{state.user.name}의 장바구니</h6>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>수량 변경</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{state.cart.map((item, index) => {
						return (
							<tr key={index}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.count}</td>
								<td>
									<button
										onClick={() => {
											dispatch(plusCount(state.cart[index].id));
										}}>
										+
									</button>
									<button
										onClick={() => {
											dispatch(minusCount(state.cart[index].id));
										}}>
										-
									</button>
								</td>
								<td>
									<button
										onClick={() => {
											dispatch(deleteCart(state.cart[index].id));
											console.log(state.cart[index].id);
										}}>
										삭제
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
}

export default Cart;
