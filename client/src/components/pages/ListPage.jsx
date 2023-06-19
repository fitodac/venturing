import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Title from '../PageTitle'
import Info from '../Info'
import Loader from '../Loader'

export default function ListPage(){

	const [movies, setMovies] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get()
		.then(res => {
			setMovies(res.data)
			setLoading(false)
		})
		.catch(err => console.log('Error: ', err))
	}, [])

	return (<div className="space-y-16">
		<Title content="Lista de películas" />

		<Loader loading={loading}>
			{ !movies ? 
			(<div className="text-red-600 text-sm max-w-xl mx-auto select-none">
				Lo sentimos pero aún no existen películas en nuestra base de datos
			</div>) :
			(<div>
				<div className="border-b border-slate-700 text-xs leading-tight font-bold text-slate-500 grid grid-cols-12 px-3 py-1 mb-3 gap-4 select-none">
					<div className="col-span-1">#</div>
					<div className="col-span-4">Título</div>
					<div className="col-span-6">Descripción</div>
					<div className="col-span-1 text-right">Año</div>
				</div>

				<div className="space-y-1.5">
					{ movies.map(e => (
						<Link 
							key={e.id} 
							className="grid grid-cols-12 px-3 py-1 gap-4 rounded-lg transition-all hover:bg-sky-600" 
							to={`/edit/${e.id}`}>
							<div className="col-span-1">{ e.id }</div>
							<div className="col-span-4 truncate">{ e.title }</div>
							<div className="col-span-6 truncate">{ e.description }</div>
							<div className="col-span-1 text-right">{ e.year }</div>
						</Link>
					))}
				</div>
			</div>)}
		</Loader>

		<Info>
			Pantalla de listado de películas, con buscador y paginador
		</Info>
	</div>)
}