import React from "react"
import SkierCard from "./SkierCard"
import PropTypes from "prop-types"

SkiersList.propTypes = {
    skierListData: PropTypes.array.isRequired,
    isUserLoggedin: PropTypes.bool.isRequired
}


function SkiersList({ skierListData, isUserLoggedin }) {
    return (
        <>
            {
                skierListData.length > 0 ?
                    (skierListData.map((skier, index) => {
                        return (
                            <div className="skiercards col-sm-12 col-md-4 col-lg-4 col-xl-3 mb-4" key={index}>
                                <SkierCard name={`${skier.first_name} ${skier.last_name}`}
                                    level={skier.level}
                                    resorts={skier.resort}
                                    languages={skier.languages}
                                    sport={skier.sport}
                                    email={skier.email}
                                    isUserLoggedin={isUserLoggedin}
                                />
                            </div>
                        )
                    }
                    )
                    ) :
                    (
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-12" >
                            <h1 style={{ 'textAlign': 'center' }}>No data available</h1>
                        </div>
                    )}
        </>
    )
}

export default SkiersList 