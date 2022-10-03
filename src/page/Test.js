import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Data } from '../data/questiondata';
import styled from 'styled-components';
import './Test.css'

const Wrapper = styled.div`
background-color: #F5D042;
height: 100vh;//전체다
width : 100%;
display:flex;
justify-content:center;//밑에 감싸준 요소 좌우 가운데
align-items:center;
flex-direction:column;
`;
const Qbox = styled.div`
  font-size:2rem;
  font-family:ongle;
  color:#0A174E;
  font-weight:bold;
  margin-bottom:20px;
`;
const Number = styled.h4`
  font-size:0.8rem;
  margin-bottom:100px;
  font-weight:bold;
  margin-bottom:50px;
`

function Test() {
  const [idx,setIdx] = useState(0); //문제질문 idx 넘겨주는 용도
  const endPoint = 12; //질문의 갯수
  const navigate = useNavigate();
  const [e,setE] = useState(0);
  const [i,setI] = useState(0);
  const [n,setN] = useState(0);
  const [s,setS] = useState(0);
  const [f,setF] = useState(0);
  const [t,setT] = useState(0);
  const [j,setJ] = useState(0);
  const [p,setP] = useState(0);
  let mbti = ""; //mbti 결과를 도출할 변수 


  const Button = ({answer , score}) => {
    //버튼을 클릭했을때 실행되는 함수

    const goNext = () => {
      console.log({answer});
      console.log(idx)
      if(endPoint !== idx + 1){
        setIdx(idx+1);
      }
      else{ 
        //mbti도출
        e>i ? mbti+= 'E' : mbti+= 'I';
        s>n ? mbti+= 'S' : mbti+= 'N';
        f>t ? mbti+= 'F' : mbti+= 'T';
        j>p ? mbti+= 'J' : mbti+= 'P';
        console.log("mbti는?",mbti)
        //결과 페이지 이동
        const title = mbti;
        navigate('/result',{
          state : {
            mbti:title,
          },
        });
      }
  }

    const sumScore = () => {
      console.log({score});
      console.log(s);
      switch(score){
        case 'E':
          setE(e+1);
          break;
        case 'I':
          setI(i+1);
          break;
        case 'N':
          setN(n+1);
          break;
        case 'S':
          setS(s+1);
          break;
        case 'T':
          setT(t+1);
          break;
        case 'F':
          setF(f+1);
          break;
        case 'J':
          setJ(j+1);
          break;
        case 'P':
          setP(p+1);
          break;
        default:
          mbti="mbti를 알아보아요!"   
      }
    }

    return(
      <>
        <button className="button" 
        onClick={()=>{
          goNext()
          sumScore()
          }
        }>
        {answer}
        </button>
      </>
    );
  }

  return(
      <Wrapper>
          <Number>{idx+1}/12</Number>
          <Qbox>Q. {Data[idx].q}</Qbox>
          <Button answer={Data[idx].a[0].answer} score={Data[idx].a[0].type} />
          <Button answer={Data[idx].a[1].answer} score={Data[idx].a[1].type} />
      </Wrapper>
  );
};



export default Test