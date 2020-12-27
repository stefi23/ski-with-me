import React, {useEffect,useState} from "react"
import SkierCard from "./SkierCard"
import axios from "axios";

function SkiersList(){
    const [ skierList, setSkierList] = useState(['HELLO'])

    const getDatafromDB = async () => {
    try {
        const resp = await axios.get('/everything');
        console.log("response:", resp.data);
        setSkierList(resp.data)
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};


    useEffect(()=>{
        getDatafromDB();
    }, [])

//     useEffect(() => {
//      axios("/everything", {
//       method: "GET",
//     })
//       .then((result) =>{
//         setSkierList(result.data)
//         console.log(result.data)
//       }
//       )
//       .catch((error) => console.log(error));
//   }, []);
 
    return(
        <>
        
        {skierList.map((skier, index) => {
        return (
        <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
            <SkierCard  name={`${skier.first_name} ${skier.last_name}`} 
                        level={skier.level}
                        resorts={skier.resorts}
                        languages={skier.languages}
                        sport={skier.sport}
                        key={index}/> 
            </div>
        )})}
       

        {/* <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div>
   <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div>
       <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div>
       <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div>
       <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div>
       <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div>
       <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div>
       <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div><div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
       <SkierCard />
       </div> */}
       </>
    )
}

export default SkiersList 