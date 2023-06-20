import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'

import HomePage from './components/pages/HomePage'
import ListPage from './components/pages/ListPage'
import FormPage from './components/pages/FormPage'

import Login from './components/Login'
import Brand from './assets/brand.svg'

const nav_link_class = 'transition-all hover:text-sky-400'

// sessionStorage.removeItem('venturing-token')

function App() {
	const [token, setToken] = useState(sessionStorage.getItem('venturing-token'))

  return (
		<BrowserRouter>
			<main className="bg-slate-800 min-h-screen">
				{ token ? 
					(<div className="bg-slate-900 px-6 2xl:px-0">
						<nav className="text-slate-300 text-center max-w-4xl py-5 mx-auto flex justify-center items-center gap-x-8 select-none">
							<Link to="/" className="transition-all hover:scale-105">
								<img 
									src={Brand} 
									alt="Venturing software and ideas" 
									className="h-10 mr-10" />
							</Link>

							<NavLink 
								to="/" 
								className={({isActive}) => isActive ? `${nav_link_class} text-sky-500` : `${nav_link_class}`}>
								Inicio
							</NavLink>
							
							<NavLink 
								to="/movies" 
								className={({isActive}) => isActive ? `${nav_link_class} text-sky-500` : `${nav_link_class}`}>
								Películas
							</NavLink>
							
							<NavLink 
								to="/new" 
								className="bg-slate-800 px-6 py-2 ml-10 transition-all rounded-lg hover:bg-sky-400 hover:text-slate-900">Nueva peli</NavLink>
						</nav>
					</div>) : null}


				<div className="text-slate-300 max-w-2xl min-h-screen pt-10 mx-auto">
					<Routes>
						<Route path="/" element={token ? <HomePage/> : <Login setToken={t => setToken(t)} />} exact />
						<Route path="/movies" element={token ? <ListPage/> : <Login setToken={t => setToken(t)} />} />
						<Route path="/new" element={token ? <FormPage/> : <Login setToken={t => setToken(t)} />} />
						<Route path="/edit/:id" element={token ? <FormPage/> : <Login setToken={t => setToken(t)} />} />
					</Routes>
				</div>
			</main>
		</BrowserRouter>
  )
}

export default App