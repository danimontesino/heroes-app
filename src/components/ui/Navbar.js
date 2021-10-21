import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {
	const { user, dispatch } = useContext(AuthContext);
	const history = useHistory();

	const handleLogout = () => {
		const action = {
			type: types.logout,
		};

		dispatch(action);

		history.replace('/login');
	};

	return (
		<nav className="navbar navbar-expand navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Heroes
				</Link>

				<div className="navbar-collapse">
					<div className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<NavLink activeClassName="active" className="nav-item nav-link" exact to="/marvel">
							Marvel
						</NavLink>

						<NavLink activeClassName="active" className="nav-item nav-link" exact to="/dc">
							DC
						</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link" exact to="/search">
							Search
						</NavLink>
					</div>

					<div className="navbar-nav">
						{!user.logged ? (
							<NavLink activeClassName="active" className="nav-item nav-link" exact to="/login">
								Login
							</NavLink>
						) : (
							<>
								<span className="nav-item nav-link text-info">{user.name}</span>
								<button className="nav-item nav-link btn" onClick={handleLogout}>
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
