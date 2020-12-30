import React from "react"
import SkierCard from "./SkierCard"


function SkiersList(props) {
    return (
        <>
            {

                props.skierListData.map((skier, index) => {
                    return (
                        <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3" key={index}>
                            <SkierCard name={`${skier.first_name} ${skier.last_name}`}
                                level={skier.level}
                                resorts={skier.resorts}
                                languages={skier.languages}
                                sport={skier.sport}
                                email={skier.email}
                                isUserLoggedin={props.isUserLoggedin}
                            />
                        </div>
                    )
                })
            }

        </>
    )
}

export default SkiersList 