import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TitleLink = styled(Link)`
	text-decoration: none;
	color: #222;
`;

function List({ good, index }) {
	return (
		<>
			<Col sm={4}>
				<img
					src={`https://codingapple1.github.io/shop/shoes${index + 1}.jpg`}
					alt='image'
					width='80%'
				/>
				<h4>
					<TitleLink to={`/detail/${index}`}>{good.title}</TitleLink>
				</h4>
				<p>{good.content}</p>
				<p>{good.price}</p>
			</Col>
		</>
	);
}

export default List;
