// Fonction de filtrage basée sur une requête approximative
function filterDataByQuery(data, query) {
	const filteredData = [];
	// Convertir la requête en minuscules pour une recherche insensible à la casse
	const queryLowerCase = query.toLowerCase();
	// Parcourir chaque élément de dataFiltered
	data.forEach((item) => {
        		// Convertir le nom de l'élément en minuscules et supprimer les espaces
			const itemNameLowerCase = item.name
            .replace(/\s/g, '')
            .toLowerCase();
        // Vérifier si le nom de l'élément contient la requête (de manière approximative)
        if (itemNameLowerCase.includes(queryLowerCase)) {
            filteredData.push(item);
        }
	});
	return filteredData;

}

// Exemple d'utilisation :
const state = {
	dataFiltered: [
		{
			data: [
				{
					description:
						"You can't go wrong with this delicious lemon dessert!",
					id: 'a611e2db-be91-4f76-bee0-db61cc427547',
					image: 'lemonDessert.jpg',
					name: 'Lemon Dessert',
					price: 4.99,
				},
			],
			title: 'desserts',
		},
	],
};

// const query = 'lemon'; // Requête de recherche

// // Filtrer les données en fonction de la requête
// const filteredItems = filterDataByQuery(state.dataFiltered, query);

// console.log(filteredItems); // Affiche les éléments filtrés correspondant à la requête

export default filterDataByQuery;
