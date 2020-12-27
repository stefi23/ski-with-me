import React, {useEffect} from "react"
import styled from 'styled-components'


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
    const LinkLogin = styled.a`
        text-align : center;
        display:block;
        color: #6989af;
        font-weight:bold;
    
    `

function SkierCard(props){

    return(
        <SkierCardDiv>
            <TextCenter>{props.sport === "ski" ? '⛷️' : '🏂'}</TextCenter>
            <Title>{props.name}</Title>
            <LightText>- {props.level} -</LightText>
            <StyledP>🏔️ &nbsp;{props.resorts}</StyledP>
            <StyledP>🗣️ &nbsp;{props.languages}</StyledP>  
    
           {props.isUserLoggedin  ? 
                    ( <StyledP>👋 &nbsp;{props.email}</StyledP> ) :
                    (<><LinkLogin href="/login" >👋 Contact info</LinkLogin></>) 

            }
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