function destructuredData(data) {
	const result = [];

	// Parcourir chaque section dans les données transformées
	data.forEach((section) => {
		const category = section.title;
		const sectionData = section.data.map((item) => {
			return {
				category: category,
				description: item.description,
				id: item.id,
				image: item.image,
				name: item.name,
				price: item.price,
			};
		});

		// Ajouter les données de la section à résultat
		result.push(...sectionData);
	});

	return result;
}

export default destructuredData;
