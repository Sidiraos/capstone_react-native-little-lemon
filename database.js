import * as SQLite from 'expo-sqlite';

import { useEffect , useRef } from 'react';

const db = SQLite.openDatabase('little_lemon');


export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menu (id integer primary key not null, uuid text, name text, price text, category text , description text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  console.log("fetching items in Sqlite DB")
  return new Promise((resolve , reject) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menu', [], (_, { rows }) => {
        const menuItems = rows._array
        resolve(menuItems);
      }, reject , resolve);
    });
  });
}

export async function saveMenuItems(menuItems) {
  return new Promise(()=>{
    db.transaction((tx) => {
      tx.executeSql(`insert into menu (uuid, name, price, category , description) values ${menuItems
         .map((item) =>
           `('${item.id}', '${item.name}', '${item.price}', '${item.category}' , '${item.description}')`)
            	.join(', ')}`)
        console.log('menu items saved in db sqlite');
    });
      
  })
 
  
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve , reject) => {
    if (!query) {
       db.transaction(tx => {
         tx.executeSql(`select * from menu where category in (${activeCategories.map(c => '?').join(', ')})`, [...activeCategories], (_, { rows }) => {
           console.log('query result' , rows._array)
           resolve(rows._array)
         } , reject , resolve)
       })
    }

    db.transaction(tx => {
      tx.executeSql(`select * from menu where title like ? and category in (${activeCategories.map(c => '?').join(', ')})`, ['%' + query + '%' , ...activeCategories], (_, { rows }) => {
        console.log('query result' , rows._array)
        resolve(rows._array)
      })
    })
   
  });
}

export const clearDb = () => {
  db.transaction(tx => {
    tx.executeSql('drop table menu')
  })
}

export function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      }
    }, dependencies);
  }