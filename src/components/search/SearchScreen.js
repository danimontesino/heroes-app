import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import queryString from 'query-string';
import { getHeroeByName } from '../../selectors/getHeroeByName';

export const SearchScreen = ({ history }) => {
	const location = useLocation();
	const { q = '' } = queryString.parse(location.search);

	const [form, handleInputChange] = useForm({ search: q });
	const { search } = form;

	const heroesFilter = useMemo(() => getHeroeByName(q), [q]);

	const handleSubmit = e => {
		e.preventDefault();

		history.push(`?q=${search}`);
	};

	return (
		<div>
			<h1>Search</h1>
			<div className="row">
				<div className="col-5">
					<h4>Search Form</h4>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							className="form-control"
							placeholder="Find your hero"
							name="search"
							onChange={handleInputChange}
							value={search}
						/>
						<button type="submit" className="btn m-1 d-block w-100 btn-outline-primary">
							Search...
						</button>
					</form>
				</div>
				<div className="col-7">
					<h4>Results</h4>
					{!q && <div className="alert alert-info">Search a hero</div>}

					{q && heroesFilter.length <= 0 && <div className="alert alert-warning">Not found</div>}

					{heroesFilter.map(hero => (
						<HeroCard key={hero.id} {...hero} />
					))}
				</div>
			</div>
		</div>
	);
};
