import React from "react"
import styled from 'styled-components'
import PropTypes from "prop-types"

SkierCard.propTypes = {
    sport: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    resorts: PropTypes.string.isRequired,

}


const SkierCardDiv = styled.div`
        background: #fcfdff;
        padding : 30px 15px;
        border-radius: 10px;
        boxShadow: 0px 4px 8px 0px hsla(0, 0%, 0%, 0.2);
        height: 100%;
        max-height: 450px;
        display:grid;

        @media(min-width: 768px) {
            grid-template-rows: 65px 65px;
        }

        @media(min-width: 992px) {
            grid-template-rows: 45px 50px;
        }
        
    `
const Title = styled.h1`
        color: #649CCC;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 5px;
        justify-self:center;
        align-self:center;
        text-align:center;
`;

const LightText = styled.p`
        font-size: 14px;
        color: hsl(214, 7%, 47%);
        justify-self:center;
        align-self:baseline;
    `

const StyledP = styled.p`
        font-size: 14px;
        color: #443850;
        justify-self:start;
        align-self:first-baseline;

        @media(min-width: 768px) {
            justify-self:start;
           
        }    
    `

const TextCenter = styled.h1`
        grid-auto-rows: 170px;
        justify-self:center;
        align-self:center;
    `
const LinkLogin = styled.a`
        text-align : center;
        display:block;
        color: #649CCC;
        font-weight:bold;
    `

 const Contact = styled.div`
        margin-top:10px;
        align-self:  end;
 `   


function SkierCard(props) {

    return (
        <SkierCardDiv>
            <TextCenter>{props.sport === "ski" ? (<span role="img" aria-label="skier emoji">⛷️</span>) : (props.sport === "snowboard") ? (<span role="img" aria-label="snowboader emoji">🏂</span>) : (<span role="img" aria-label="skier/snowboarder emoji">⛷️/🏂</span>)}</TextCenter>
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
            <Contact>

            {props.isUserLoggedin ?
           
                (<StyledP><span role="img" aria-label="waving hand emoji">👋 </span>&nbsp;{props.email}</StyledP>) :
                (<><LinkLogin href="/login" ><span role="img" aria-label="waving hand emoji">👋 </span>Contact info</LinkLogin></>)

            }
            </Contact>
       
        </SkierCardDiv>
    )
}

export default SkierCard

