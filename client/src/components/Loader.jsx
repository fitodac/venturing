export default function Loader(props){

	const { loading } = props.loading ?? true

	return (
		<>
			{ props.loading ? 
				(<div className="py-10 flex justify-center">
					<div className="border-2 border-slate-700 border-t-sky-500 w-7 h-7 rounded-full animate-spin"></div>
				</div>) : 
				props.children}
		</>
	)
}