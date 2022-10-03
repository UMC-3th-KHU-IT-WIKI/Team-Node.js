import React from "react";
import { useLocation } from "react-router-dom";
import { ResultData } from "../data/resultdata";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
background-color: #F5D042;
height: 100vh;//전체다
width : 100%;
display:flex;
justify-content:center;//밑에 감싸준 요소 좌우 가운데
align-items:center;
flex-direction:column;
`;

const H1 = styled.h1`
    color:#0A174E;
    font-family:ongle;
    font-weight:bold;
    font-size:2.2rem;
`
const H2 = styled.h3`
    color:#0A174E;
`

const P = styled.p`
    color:#0A174E;
    font-family:ongle;
    font-weight:bold;
    font-size:1.3rem;
    white-space: pre-wrap;//개행을 읽음
    width:70%;
    line-height:150%;
`

const Button = styled.button`
    background-color: #0A174E;
    outline: none;
    border: none;
    margin:10px;
    border-radius: 30px;
    width: 20%;
    height: 8%;
    font-size: 20px;
    font-family:ongle;
    cursor: pointer;
    color:#F5D042;
`

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const {mbti} = location.state;
    console.log(mbti);
    const mbtiArr = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
    const idx = mbtiArr.indexOf(mbti); //result의 idx를 찾기위함
    console.log(idx);
    
    return(
        <>
        <Wrapper>
            <H1>너와 어울리는 창캐미는?</H1>
            <img src={ResultData[idx].img} width={320} height={300} alt={mbti}></img>
            <H2>{ResultData[idx].title}</H2>
            <P>{ResultData[idx].desc}</P>
            <Button onClick={() => navigate('/')}>테스트다시하기</Button>
        </Wrapper>  
        </>
    );
}

export default Result;