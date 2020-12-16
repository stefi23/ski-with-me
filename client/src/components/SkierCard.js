import React from "react"

function SkierCard(){

    const skierCard = {
        "border-radius": "10px",
        "padding" : "30px 15px",
        "boxShadow": "0px 4px 8px 0px hsla(0, 0%, 0%, 0.2)",
        "backgroundColor": "#fcfdff"
      
        
    }

    const title = {
        "color": "#6989af",
        "fontSize": "20px",
        "fontWeight": "bold",
        "margin-bottom":"5px",
        "textAlign" : "center"
    }

    const lightText = {
        "fontSize": "14px",
        "color": "hsl(214, 7%, 47%",
        "textAlign" : "center"
    }

    const pText = {
        "fontSize": "14px",
        "color": "#001c00"

    }

    return(
        <div style={skierCard}>
            <h1 style={ {"textAlign" : "center"}}>⛷️</h1>
            <p style={title}>Stefi Rosca</p>
            <p style ={lightText}> - pro - </p>
            <p style={pText}>🏔️ &nbsp;Andorra, La Molina</p>
            <p style={pText}>🗣️ &nbsp;English, Spanish, German, Romanian</p>
        </div>
    )
}

export default SkierCard