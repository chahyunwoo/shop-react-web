import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
	name: 'cart',
	initialState: [
		{ id: 3, name: 'White and Black', count: 2 },
		{ id: 4, name: 'Grey Yordan', count: 1 },
	],
	reducers: {
		// 카트에 담긴 상품의 주문 수량 증가
		plusCount(state, action) {
			const num = state.findIndex((item) => item.id === action.payload);

			state[num].count++;
		},

		// 카트에 담긴 상품의 주문 수량 감소 (1개 이하로는 줄어들지 않음)
		minusCount(state, action) {
			const num = state.findIndex((item) => item.id === action.payload);

			if (state[num].count <= 1) {
				alert('최소 주문 수량은 1개 이상입니다.');
				return;
			} else {
				state[num].count--;
			}
		},

		// 제품 상세 페이지에서 주문하기 클릭 시에 카트에 추가 (이미 카트에 동일 상품 존재 시, 수량 1 추가)
		addCart(state, action) {
			const isExisted = state.find((item) => item.id === action.payload.id);

			if (isExisted === undefined) {
				state.push(action.payload);
			} else {
				isExisted.count++;
			}
		},

		// 카트에 담긴 상품을 삭제
		deleteCart(state, action) {
			const num = state.findIndex((item) => item.id === action.payload);

			state.splice(num, 1);
		},
	},
});

export const { plusCount, minusCount, addCart, deleteCart } = cart.actions;

export default cart;
