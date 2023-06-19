import React from 'react'

function Title(props){

	const { content } = props

	return(
		<h1 className="text-2xl font-semibold text-center select-none pointer-events-none">{ content }</h1>
	)
}

export default React.memo(Title)