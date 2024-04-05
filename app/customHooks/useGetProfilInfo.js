import { useEffect } from "react";
import { getObjectData , storeObjectData } from "../context/asyncStorageData";
import {useSelector , useDispatch , shallowEqual} from 'react-redux';
import { updateStateFromAsync } from "../redux/slices/profilInfoSlice";


export default useGetProfilInfo = () => {
    const profilInfoState = useSelector(state => state.profilInfo , shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchingProfilInfo = async () => {
            const profilInfo = await getObjectData('profilInfo');
            if(profilInfo){
                console.log("profil info found , we update state from async storage")
                // console.log("profil info in async is" , profilInfo)
                dispatch(updateStateFromAsync(profilInfo))
            }else {
                console.log("no profil info found , we save initial state in async storage")
                storeObjectData('profilInfo', profilInfoState);
            }
        }
        fetchingProfilInfo()
    } , [])
    
}