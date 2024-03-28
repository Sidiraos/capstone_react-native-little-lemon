import { useEffect } from "react";
import { getObjectData } from "../context/asyncStorageData";
import { useSelector , shallowEqual} from 'react-redux';
import _ from 'lodash';


export default useCheckProfilInfoState = (setNoChanged) => {
    const profilInfoState = useSelector(state => state.profilInfo , shallowEqual);
    useEffect(() => {
		console.log("use effect is changing state");
		const fetchingStorage = async ()=>{
			console.log("fetching storage");
			const profilInfo = await getObjectData('profilInfo');
			if (profilInfo){
				const isEqual = _.isEqual(profilInfoState , profilInfo);
				if(!isEqual){
					setNoChanged(false);
				} else {
					setNoChanged(true);
				}
			}
		}
		fetchingStorage();
	} , [profilInfoState]);
}