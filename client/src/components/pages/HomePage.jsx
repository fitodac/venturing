import { useState } from 'react'
import axios from 'axios'
// import { Link } from "react-router-dom";

import Title from '../PageTitle'
import Info from '../Info'

export default function HomePage(){

	const [file, setFile] = useState('')
	const [file_info, setFileInfo] = useState('')
	
	const onInputChange = e => {
		console.log(e.target.value)
		// setFile(e)
	}

	return (<div className="grid gap-y-16 justify-center">
		<Title content="Sube tu CSV" />

		<div className="text-center space-y-2">
			<form encType="multipart/form-data">
				<div className="flex w-full items-center justify-center">
					<label 
						className="bg-slate-900 border border-slate-700 text-slate-400 text-sm w-3/4 flex flex-col items-center 
												px-4 py-6 rounded-lg tracking-wide cursor-pointer 
												transition-all select-none hover:text-slate-300">
							<svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
							</svg>
							<span className="mt-2 text-base leading-normal">Sube tu CSV</span>
							<input type="file" accept=".csv" className="hidden" value={ file } onChange={ onInputChange } />
					</label>
				</div>
			</form>

			<div className="text-slate-500 text-xs font-medium leading-none">Solo se aceptan archivos CSV</div>
		</div>

		<Info>
			Pantalla para subida de archivos CSV con el formato propuesto
		</Info>
	</div>)
}