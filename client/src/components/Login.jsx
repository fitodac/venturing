import { useState } from 'react'
import axios from 'axios'


export default function Login({ setToken }){

	const { VITE_USERNAME, VITE_PASSWORD } = import.meta.env
	const [form, setForm] = useState({
		username: VITE_USERNAME,
		password: VITE_PASSWORD
	})
	const [sending, setSending] = useState(false)

	const handleChange = e => {
		const {name, value} = e.target
		const data = {...form}
		data[name] = value
		setForm(data)
	}

	const login = e => {
		e.preventDefault()
		setSending(true)

		axios.post('/auth', form)
		.then(res => {
			if( res.data.access_token ) sessionStorage.setItem('venturing-token', res.data.access_token)
			setToken(res.data.access_token)
			setSending(false)
		})
		.catch(err => {
			console.log('Error: ', err)
			setSending(false)
		})
	}

	return (<div className="grid place-content-center pt-32">
		<div className="w-72">
			<div className="bg-slate-700 px-6 pt-4 pb-8 relative rounded-xl shadow-2xl">
				<svg 
					className="fill-slate-500 w-8"
					xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 24 24">
					<path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z"></path>
				</svg>

				<form 
					onSubmit={login} 
					className={`space-y-3 mt-3 ${ sending ? 'opacity-10 pointer-events-none' : ''}`}>
					<div className="grid gap-y-1">
						<label htmlFor="username" className="text-xs">Usuario</label>
						<input 
							type="text" 
							id="username"
							name="username"
							value={form.username}
							onChange={handleChange}
							autoComplete="off"
							className="bg-slate-900 border border-slate-900 w-full px-4 py-2 rounded-lg focus:outline-0" />
					</div>

					<div className="grid gap-y-1">
						<label htmlFor="password" className="text-xs">Contraseña</label>
						<input 
							type="password" 
							id="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							autoComplete="off"
							className="bg-slate-900 border border-slate-900 w-full px-4 py-2 rounded-lg focus:outline-0" />
					</div>

					<div className="pt-3">
						<button className="bg-slate-800 text-sm w-full px-6 py-3 rounded-lg select-none transition-all hover:bg-sky-600">Entrar</button>
					</div>
				</form>

				{ sending ? 
					(<div className="inset-x-0 top-1/2 absolute flex justify-center">
						<div className="border-2 border-slate-700 border-t-sky-500 w-7 h-7 rounded-full animate-spin"></div>
					</div>) : 
					null }
				
			</div>

			<div className="text-slate-400 text-xs text-center mt-6">
				La seguridad de nuestras aplicaciones es la prioridad... naa, mentira, las credenciales son: 
				<div className="text-sm"><strong>user</strong> / <strong>1234</strong></div>
			</div>
		</div>
	</div>)
}