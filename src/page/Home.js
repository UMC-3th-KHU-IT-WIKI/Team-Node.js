import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import question from '../asset/img/question.png'

function Home() {
    return(
        <Wrapper>
            <div>
            <Link to="/Test">
                <Img src={question} />
                <Button>
                    MBTI 유형 검사하기
                    {/*<button type="button">MBTI 유형 검사하기</button>*/}
                </Button>
            </Link>
        </div>
        </Wrapper>
        
    );
}

const Img = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width : 180px;
    height : 150px;
`;

const Wrapper = styled.div`
	background-color: #F5D042;
	height: 100vh;//전체다
	width : 100%;
    display:flex;
    justify-content:center;//밑에 감싸준 요소 좌우 가운데
    align-items:center;//상하 가운데
`;

const Button = styled.button`
    display:inline-block;
    justify-content:center;
    align-items: center;//text-align :center일 경우 위에만
    position:relative;//부모 요소와 정렬
    outline: none;
    border: none;//안예뻐서 모두 삭제
    border-radius: 100px;
    color: #F5D042; //폰트컬러
    font-weight: bold;
    cursor: pointer;//위에 올리면 마우스 포인터 모양
    height: 10rem;
    width: 50rem;
    font-size: 2rem;
    background-color:#0A174E;
    font-family:ongle;
`;

export default Home;