import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

const apiKey ='1';
var num = 1;

export default function Home(props) {
	var [drink, setDrink] = useState({});
	var [drinkType, setDrinkType] = useState('');
	var [numFact, setNumFact] = useState({});
	var [idIng, setIdIng] = useState('');


	var abv = drink.data ? drink.data.ingredients[0].strABV : '';

	console.log(abv);

	useEffect(() => {
		let getDrinkType = drink.data ? drink.data.ingredients[0].strType : '';
		let getIdNum = drink.data ? drink.data.ingredients[0].idIngredient : '';
		setDrinkType(getDrinkType);
		setIdIng(getIdNum);
	}, []);

	useEffect(() => {
		const urlParams = new URLSearchParams(props.location.search);
		var drinkParam = urlParams.get('iid') ? urlParams.get('iid') : '1';

		queryDrinkAPI(`${drinkParam}`);
		console.log('drink test', queryDrinkAPI(num));


		console.log(props);

		function queryDrinkAPI(drinkParam) {
			axios.get(`https://www.thecocktaildb.com/api/json/v1/${apiKey}/lookup.php?iid=${drinkParam}`)
			.then(function(response) {
				setDrink(response);
				console.log('drink response', response)
				return response;
			})
			.catch(function(error) {
				console.log('error',error)
				return error;
			});
		}

	}, []);

	useEffect(() => {
		const urlParams2 = new URLSearchParams(props.location.search);
		var numParam = urlParams2.get('number') ? urlParams2.get('number') : '1';

		queryNumbersAPI(`${numParam}`);
		console.log('numbers test', queryNumbersAPI(numParam));

		console.log(props);

		function queryNumbersAPI(numParam) {
			axios.get(`http://numbersapi.com/40/trivia?fragment`)
			.then(function(response) {
				console.log('numbers response',response)
				setNumFact(response);
				return response;
			})
			.catch(function(error) {
				console.log('error', error);
				return error;
			});
		}
	}, []);

	return (
		<PageWrapper>
		<div className="drink-info">
			<h1>You drank {drink.data ? drink.data.ingredients[0].strIngredient : ''}!</h1>
			<div className="abv-info">
				<h2>ABV: <input type="text" size="2" id="number"></input></h2>
				<button className="number">enter</button>
			</div>
			<p className="n-fact">{numFact.data ? numFact.data : ''}</p>
			<p className="d-desc">{drink.data ? drink.data.ingredients[0].strDescription : ''}</p>
		</div>
		<div className="anotha-one">
			<a href="?iid=2">g</a>
			<a href="?iid=3">r</a>
			<a href="?iid=4">a</a>
			<a href="?iid=5">b</a>
			<a href="?iid=6"> </a>
			<a href="?iid=7">a</a>
			<a href="?iid=8">n</a>
			<a href="?iid=9">o</a>
			<a href="?iid=10">t</a>
			<a href="?iid=11">h</a>
			<a href="?iid=12">a</a>
			<a href="?iid=13"> </a>
			<a href="?iid=14">d</a>
			<a href="?iid=15">r</a>
			<a href="?iid=16">i</a>
			<a href="?iid=17">n</a>
			<a href="?iid=18">k</a>
			<a href="?iid=19">?</a>
		</div>
		</PageWrapper>
	);
};
