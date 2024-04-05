const DATA_SAMPLE = [
	{
		category: 'starters',
		description:
			'Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.',
		id: 'cf932d34-c0db-47b8-959b-1a48031a4c1a',
		image: 'greekSalad.jpg',
		name: 'Greek Salad',
		price: 12.99,
	},
	{
		category: 'starters',
		description:
			'Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.',
		id: '63033b4e-eb03-439e-a51e-42e90b11c797',
		image: 'bruschetta.jpg',
		name: 'Bruschetta',
		price: 7.99,
	},
	{
		category: 'mains',
		description: 'Fantastic grilled fish seasoned with salt.',
		id: 'dd9d5025-3920-4112-ac62-33a95e1ff113',
		image: 'grilledFish.jpg',
		name: 'Grilled Fish',
		price: 20,
	},
	{
		category: 'mains',
		description: 'Delicious pasta for your delight.',
		id: '0227c612-dfa4-4413-a3bf-0ee63c61562a',
		image: 'pasta.jpg',
		name: 'Pasta',
		price: 6.99,
	},
	{
		category: 'desserts',
		description: "You can't go wrong with this delicious lemon dessert!",
		id: 'e687de75-8021-45d7-9629-b8c3e05c71ff',
		image: 'lemonDessert.jpg',
		name: 'Lemon Dessert',
		price: 4.99,
	},
];

 function getSectionListData(data) {
	// console.log('data before structured', data);
	const transformedData = {};

	if (data.length === 1) {
		(transformedData[data[0].category] = []),
			transformedData[data[0].category].push({
				id: data[0].id,
				price: data[0].price,
				name: data[0].name,
				description: data[0].description,
				image : data[0].image
			});
	} else if (data.length > 1) {
		data.forEach((item) => {
			if (!transformedData[item.category]) {
				transformedData[item.category] = [];
				transformedData[item.category].push({
					id: item.id,
					price: item.price,
					name: item.name,
					description: item.description,
					image : item.image
				});
			} else {
				transformedData[item.category].push({
					id: item.id,
					price: item.price,
					name: item.name,
					description: item.description,
					image : item.image
				});
			}
		});
	}

	// console.log("transformed data" , transformedData)

	const results = Object.keys(transformedData).map((key) => {
		return {
			title: key,
			data: transformedData[key],
		};
	});
	//   console.log('data structured',results)
	return results;
}

// getSectionListData(data)

export default getSectionListData;
