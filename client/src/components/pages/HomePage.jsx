import { useState } from 'react'
import axios from 'axios'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import Title from '../PageTitle'
import Info from '../Info'

export default function HomePage(){

	const [uploading, setUploading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)
	const navigate = useNavigate()
	
	const onInputChange = e => {
		setUploading(true)
		
		const data = new FormData()
		data.append('file', e.target.files[0])

		axios.post('/movies/upload', data, { headers: {'auth-token': sessionStorage.getItem('venturing-token')} })
		.then(resp => {
			setSuccess(resp.data.message)
			setError(resp.data.error)
			setUploading(false)
			if( !resp.data.error ) setTimeout(() => navigate('/movies'), 1000)
		})
		.catch(err => {
			console.log('Error:', err)
			setUploading(false)
		})
	}


	const Toast = props => {
		setTimeout(() => setSuccess(false), 2000)
		
		return createPortal((<div className={`text-sm text-center p-4 right-2 bottom-2 fixed rounded-xl z-30 ${ error ? 'bg-red-700 text-white' : 'bg-green-500'}`}>
			{ error ? 
				(<svg className="w-6 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path>
				</svg>) : 
			
				(<svg className="w-6 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
				</svg>)}

			<div className="">{ props.message }</div>
		</div>), document.getElementById('portal'))
	}




	return (<div className="grid gap-y-16 justify-center">
		<Title content="Sube tu CSV" />

		<div className="text-center space-y-2">
			<form encType="multipart/form-data">
				<div className="flex w-full items-center justify-center">
					<label 
						className={`bg-slate-900 border border-slate-700 text-slate-400 text-sm w-3/4 flex flex-col items-center 
												px-4 py-6 rounded-lg tracking-wide 
												transition-all select-none hover:text-slate-300
												${ uploading ? 'pointer-events-none' : 'cursor-pointer'}`}>

						{ !uploading ? 

							(<>
								<svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
								</svg>
								<span className="mt-2 text-xs leading-normal">Haz click para subir un CSV</span>
							</>) : 

							(<div className="space-y-2">
								<div className="border-2 border-slate-700 border-t-sky-500 w-7 h-7 mx-auto rounded-full animate-spin"></div>
								<div className="text-xs animate-pulse">Subiendo archivo</div>
							</div>) }
						
						<input type="file" accept=".csv" className="hidden" onChange={ onInputChange } />
					</label>
				</div>
			</form>

			<div className="text-slate-500 text-xs font-medium leading-none">...y si, solo acepto CSV</div>
		</div>

		<Info>
			Pantalla para subida de archivos CSV con el formato propuesto
		</Info>

		{ success ? <Toast message={success} /> : null }
	</div>)
}