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

	const min = 1;
	const max = 30;

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
			axios.get(`http://numbersapi.com/${numParam}/trivia?fragment`)
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
		<PageWrapper idIng={idIng}>
		<div className="number-box">
			<a href="/?iid=">
				Input the number!: <input type="text" size="2" id="number"></input><br></br>
				<button onClick={Math.random()}>enter</button>
			</a>
			<h2>The number is: </h2>
		</div>
		<div className="drink-info">
			<h1>You drank {drink.data ? drink.data.ingredients[0].strIngredient : ''}!</h1>
			<h2>ABV: {drink.data ? drink.data.ingredients[0].strABV : ''}</h2>
			<p className="n-fact">{numFact.data ? numFact.data : ''}</p>
			<p className="d-desc">{drink.data ? drink.data.ingredients[0].strDescription : ''}</p>
		</div>
		<div className="anotha-one">
			<h3>grab another drink?</h3>
		</PageWrapper>
	)
}
