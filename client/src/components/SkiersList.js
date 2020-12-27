import React, {useEffect,useState} from "react"
import SkierCard from "./SkierCard"
import axios from "axios";

function SkiersList(){
    const [ skierList, setSkierList] = useState([])

    const getDatafromDB = async () => {
    try {
        const resp = await axios.get('/everything');
        setSkierList(resp.data)
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

    useEffect(()=>{
        getDatafromDB();
    }, []) 
    return(
        <>
        
        {skierList.map((skier, index) => {
        return (
        <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3" key={index}>
            <SkierCard  name={`${skier.first_name} ${skier.last_name}`} 
                        level={skier.level}
                        resorts={skier.resorts}
                        languages={skier.languages}
                        sport={skier.sport}
                        /> 
            </div>
        )})}
       </>
    )
}

export default SkiersList 