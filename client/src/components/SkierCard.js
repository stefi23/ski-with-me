import React, {useEffect} from "react"
import styled, {css} from 'styled-components'
import axios from "axios";

    const SkierCardDiv = styled.div`
        background: #fcfdff;
        padding : 30px 15px;
        border-radius: 10px;
        boxShadow: 0px 4px 8px 0px hsla(0, 0%, 0%, 0.2);
    `
    const Title = styled.h1`
        color: #6989af;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align : center;
`;

    const LightText = styled.p`
        text-align : center;
        font-size: 14px;
        color: hsl(214, 7%, 47%);
    `

    const StyledP = styled.p`
        font-size: 14px;
        color: #001c00;
    `

    const TextCenter = styled.h1`
        text-align:center;
    `

function SkierCard(){

    return(
        <SkierCardDiv>
         
            <TextCenter>⛷️</TextCenter>
            <Title>Stefi Rosca</Title>
            <LightText>- pro -</LightText>
            <StyledP>🏔️ &nbsp;Andorra, La Molina</StyledP>
            <StyledP>🗣️ &nbsp;English, Spanish, German, Romanian</StyledP>
          
        </SkierCardDiv>
    )
}

export default SkierCard


      





//     return(
//         <SkierCardDiv>
   
//             <h1 style={ {"textAlign" : "center"}}>⛷️</h1>
//             <p style={title}>Stefi Rosca</p>
//             <p style ={lightText}> - pro - </p>
//             <p style={pText}>🏔️ &nbsp;Andorra, La Molina</p>
//             <p style={pText}>🗣️ &nbsp;English, Spanish, German, Romanian</p>
    
//         </SkierCardDiv>
//     )
// }

// export default SkierCard