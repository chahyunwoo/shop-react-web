import { useEffect, useState } from 'react';

function TabContent({ tab }) {
	const [fade, setFade] = useState('');

	useEffect(() => {
		let timer = setTimeout(() => {
			setFade('end');
		}, 10);

		return () => {
			clearTimeout(timer);
			setFade('');
		};
	}, [tab]);

	return (
		<div className={`start ${fade}`}>
			{[<div>내용 0</div>, <div>내용 1</div>, <div>내용 2</div>][tab]}
		</div>
	);
}

export default TabContent;
