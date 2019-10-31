import React from 'react';

export default function PageWrapper({idIng, children}) {
	const wrapperOpacity = idIng * 0.2;

	return (
		<div style={{
			height: '100%',
			width: '100%',
			minHeight: '100vh',
			minWidth: '100vw',
			backgroundColor: `rgba((0,255,25,${wrapperOpacity}))`
		}}>
			<div className="PageWrapper">
				{children}
			</div>
		</div>
	)
}