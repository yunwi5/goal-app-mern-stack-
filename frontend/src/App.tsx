import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App () {
	return (
		<Provider store={store}>
			<div className='container'>
				<Header />
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</div>
			<ToastContainer />
		</Provider>
	);
}

export default App;
