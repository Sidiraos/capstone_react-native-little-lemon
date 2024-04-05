import { useEffect } from 'react';
import { createTable, getMenuItems, saveMenuItems } from '../../database';
import {
	getStructuredData,
	fetchingMenuData,
	onFulfilled,
	setFilteredData
} from '../redux/slices/foodMenuSlice';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useUpdateEffect, filterByQueryAndCategories } from '../../database';
import getSectionListData from '../../utils/structuredData';
import { Alert } from 'react-native';

export const useLoadSaveDataFromDB = () => {
	const dispatch = useDispatch();
	const { data } = useSelector((state) => state.menu, shallowEqual);
	// console.log(data)
	useEffect(() => {
		(async () => {
			try {
				await createTable();
				let menuItems = await getMenuItems();
				console.log('getMenu items from custom hook', menuItems);

				if (!menuItems.length) {
					console.log('fetching data to store in db');
					dispatch(
						fetchingMenuData(
							'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
						)
					);
					console.log('data storing in db');
					saveMenuItems(data);
				} else {
					dispatch(onFulfilled(menuItems));
				}
			} catch (e) {
				// Handle error
				console.log(e.message);
				Alert.alert(e.message);
			}
		})();
	}, []);
};

export const useFilteringData = () => {
	const { categoriesList, query , dataStructured , data } = useSelector(
		(state) => state.menu,
		shallowEqual
	);
	const dispatch = useDispatch();
  // console.log("data structured in useFiltering data" , dataStructured)
	let selectedCategories = categoriesList
		.filter((item) => item.selected === true)
		.map((item) => item.title);
	if (selectedCategories.length === 0)
		selectedCategories = categoriesList.map((item) => item.title);
	console.log('selected categories', selectedCategories);

  const dataOrdored = dataStructured;
  
	useUpdateEffect(() => {
    const getDataFiltered = async ()=> {
      const dataFiltered =  await filteringData(query , selectedCategories , dataOrdored)
	  dispatch(getDataFiltered(dataFiltered))
	  console.log("data filtré" , dataFiltered)
    }

	// getDataFiltered()

	}, [categoriesList]);
};

export const filteringData = async (query , selectedCategories , dataOrdored)=> {
  try {
	await createTable()
    const menuItems = await getMenuItemsFromSQLite();
    // console.log("menu items in filtering data" , menuItems)
    if(menuItems.length) {
      filteredItemsFromSQLite(query , selectedCategories)
      return false
    }else {
      const dataFiltered =  filteredItemsFromState(query , selectedCategories , dataOrdored)
      return dataFiltered
    }
  } catch (err) {
    console.log(err.message)
    Alert.alert(err.message , "in filteringData function")
  }
 
}

const filteredItemsFromState = (query , selectedCategories , dataOrdored)=>{
//   console.log("dataStructured in filteredItemsFromState" , dataOrdored)
  const filteredData = dataOrdored.filter(item => {
    return selectedCategories.some(category => category === item.title)
  })

  return filteredData;
}

const getMenuItemsFromSQLite = async ()=>{
  try {
    let menuItems = await getMenuItems();
    return menuItems

  } catch (error){
      console.log(error.message)
      Alert.alert(error.message)
  }
}

const filteredItemsFromSQLite = async (query , selectedCategories) => {
	try {
		// console.log('try bloc in filtered async function');
		const menuItems = await filterByQueryAndCategories(
			query,
			selectedCategories
		);
		console.log('menuItems filtered in sqlite', menuItems);
		// dispatch(getStructuredData(menuItems));
	} catch (e) {
		console.log(e.message);
		Alert.alert(e.message);
	}
};
