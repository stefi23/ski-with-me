import React from "react"
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


function SkierCard(props) {

    return (
        <SkierCardDiv>
            <TextCenter>{props.sport === "ski" ? (<span role="img" aria-label="skier emoji">⛷️</span>) : (props.sport === "snowboard") ? (<span role="img" aria-label="snowboader emoji">🏂</span>)  : (<span role="img" aria-label="skier/snowboarder emoji">⛷️/🏂</span>)}</TextCenter>
            <Title>{props.name}</Title>
            <LightText>- {props.level} -</LightText>
            <StyledP><span role="img" aria-label="speaking head emoji">🗣️</span> &nbsp;
                {props.languages ? (
                    props.languages.split(",").map((language, index) => {
                        const lastElement = props.languages.split(',').length - 1
                        return (
                            <span key={index}>{language}{
                                index === lastElement ? null : ", "}</span>
                        )
                    })) : "No resort added"}
            </StyledP>
            <StyledP><span role="img" aria-label="mountain emoji">🏔️</span> &nbsp;
                {props.resorts ? (
                    props.resorts.split(",").map((resort, index) => {
                        const lastElement = props.resorts.split(',').length - 1
                        return (
                            <span key={index}>{resort}{
                                index === lastElement ? null : ", "}</span>
                        )
                    })) : "No resort added"}
            </StyledP>
            {props.isUserLoggedin ?
                (<StyledP><span role="img" aria-label="waving hand emoji">👋 </span>&nbsp;{props.email}</StyledP>) :
                (<><LinkLogin href="/login" ><span role="img" aria-label="waving hand emoji">👋 </span>Contact info</LinkLogin></>)

            }
        </SkierCardDiv>
    )
}

export default SkierCard

