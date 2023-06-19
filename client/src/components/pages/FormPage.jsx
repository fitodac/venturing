import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

import Title from '../PageTitle'
import Info from '../Info'
import Loader from '../Loader'

const errors_class = 'text-red-600 text-xs leading-tight'

const years = []
for(let i = 1960; i < 2025; i++) years.push(i)

export default function FormPage(){

	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState({})
	const [success, setSuccess] = useState(null)
	const [countdown, setCountdown] = useState(3)
	const [confirmation, setConfirmation] = useState(false)
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if( id ){
			axios.get(`/${id}`)
			.then(resp => {
				setData(resp.data[0])
				setLoading(false)
			})
			.catch(err => console.log('Error:', err))
		}else{
			setData({title: '', description: '', year: new Date().getFullYear()})
			setLoading(false)
		}		
	}, [id])


	const redirect = () => {
		let timer = countdown
		
		const clock = () => {
			if( timer === 1 ){
				clearInterval(interval)
				navigate('/movies')
			}else{
				timer = timer -1
				setCountdown(timer)
			}
		}
		
		const interval = setInterval(clock, 800)
	}


	const handleChange = e => {
		const { name, value } = e.target

		if( errors[name] ){
			const errs = {...errors}
			delete errs[name]
			setErrors(errs)
		}

		const temp = {...data}
		temp[name] = value
		setData(temp)
	}

	const handleSubmit = e => {
		e.preventDefault()

		setLoading(true)

		if( id ){
			axios.put(`/${id}`, data)
			.then(resp => {
				if( resp.data.errors ){
					setErrors(resp.data.errors)
				}else{
					setSuccess(resp.data.message)
					redirect()
				}

				setLoading(false)
			})
			.catch(err => {
				console.log('Error:', err)
				setLoading(false)
			})
		}else{
			axios.post('/', data)
			.then(resp => {
				if( resp.data.errors ){
					setErrors(resp.data.errors)
				}else{
					setSuccess(resp.data.message)
					redirect()
				}
				setLoading(false)
			})
			.catch(err => {
				console.log('Error:', err)
				setLoading(false)
			})
		}
	}


	const deleteMovie = e => {
		e.preventDefault()
		if( !id ) return

		setLoading(true)
		setConfirmation(false)
	
		axios.delete(`/${id}`)
		.then(resp => {
			if( resp.data.errors ){
				setErrors(resp.data.errors)
			}else{
				setSuccess(resp.data.message)
				redirect()
			}
			setLoading(false)
		})
		.catch(err => {
			console.log('Error:', err)
			setLoading(false)
		})
	}


	return (<div className="grid gap-y-16 justify-center">
		<Title content="Nueva película" />

		<Loader loading={loading}>
			{ !success ? (
				<>
					<form onSubmit={ handleSubmit }>

							<div className="space-y-4">
								<div className="space-y-1">
									<label htmlFor="title">Título</label>
									<input 
										type="text"
										id="title"
										name="title"
										className={`border border-slate-900 w-full px-4 py-2 rounded-lg focus:outline-0 ${ errors.title ? 'bg-red-900 bg-opacity-30' : 'bg-slate-900'}`}
										value={data.title}
										onChange={handleChange} />
									{ errors.title ? (<div className={errors_class}>{ errors.title }</div>) : null }
								</div>

								<div className="space-y-1">
									<label htmlFor="description">Descripción</label>
									<textarea 
										id="description"
										name="description"
										className={`border border-slate-900 w-full px-4 py-2 rounded-lg resize-none focus:outline-0 ${ errors.description ? 'bg-red-900 bg-opacity-30' : 'bg-slate-900'}`}
										rows="4"
										value={data.description}
										onChange={handleChange} />
									{ errors.description ? (<div className={errors_class}>{ errors.description }</div>) : null }
								</div>

								<div className="space-y-1">
									<label htmlFor="year">Año</label>
									<select 
										id="year"
										name="year" 
										className="bg-slate-900 border border-slate-900 w-full px-4 py-2 rounded-lg resize-none focus:outline-0"
										value={data.year}
										onChange={handleChange}>
										{ years.map(e => <option key={`year${e}`} value={e}>{ e }</option>)}
									</select>
								</div>

								<div className="pt-3 flex justify-end gap-2">
									{ id ? (<Link to="/movies" className="bg-slate-800 text-sm px-8 py-2 rounded-md select-none transition-all hover:bg-slate-700">Cancelar</Link>) : null}
									
									<button className="bg-sky-500 text-slate-800 text-sm px-8 py-2 rounded-md select-none transition-all hover:bg-sky-700">
										{ id ? 'Guardar' : 'Crear película'}
									</button>
								</div>
							</div>

					</form>

					{ id ? 
						(<div className="">
							<button 
								className="bg-red-900 bg-opacity-30 text-red-700 text-sm w-full px-6 py-2 rounded-lg select-none transition-all 
														hover:bg-opacity-100 hover:text-red-100"
								onClick={ () => setConfirmation(true) }>Eliminar esta película</button>
						</div>) : null }
					
					{ confirmation ? 
						(<div className="bg-black bg-opacity-80 inset-0 fixed grid place-content-center">
							<div className="bg-slate-700 text-sm p-8 rounded-lg shadow-2xl">
								<div>¿Estás seguro de querer eliminar esta película?</div>
								<form onSubmit={ deleteMovie } className="mt-4 flex justify-center gap-x-4">
									<button 
										type="button" 
										className="bg-slate-800 px-6 py-2 rounded-lg select-none transition-all hover:bg-slate-900"
										onClick={ () => setConfirmation(false) }>
										Cancelar
									</button>
									
									<button 
										className="bg-red-900 text-sm px-6 py-2 rounded-lg select-none transition-all hover:bg-red-800">Si, eliminar</button>
								</form>
							</div>
						</div>) : null }
				</>
			) : 
			
			(<div className="text-green-500 text-center py-20 select-none">
				<svg className="w-10 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
				</svg>
				<div className="">{success}</div>
				<div className="text-xs text-slate-400 mt-6">Serás redirigid@ en {countdown} segundos</div>
			</div>)}
			
		</Loader>

		<Info>Pantalla para agregar o editar el registro de una película</Info>
	</div>)
}