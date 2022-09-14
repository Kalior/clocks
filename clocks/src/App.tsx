import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomeView} from "./Home";
import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";
import ios_clock from "./assets/ios_clock.svg"


const ClockRoutes = () => (
    <Router>
        <Routes>
            <Route path='/' element={<HomeView/>}/>
            <Route path='/:clockId' element={<HomeView/>}/>
        </Routes>
    </Router>
)

function App() {
    return <AllContent>
        <Clock>

            <HourHand/>

            <MinuteHand/>

            <SecondHand/>
        </Clock>
        <TopBar>
            <p>My collection of</p>
            <h2>Stupid Clocks</h2>
            <p> that either don't tell time or do so in a senseless way</p>
            <TopLine/>
        </TopBar>
        <Content>
            <ClockRoutes/>
        </Content>
        <Footer>
            <BottomLine/>
            <p>
                Created by <b>Joel Gustafsson</b> | <a href='https://joelgustafsson.com'>My webpage</a>
                <br/>
                If you've got an idea for an interesting or stupid clock, please submit an issue or pull request on <a
                href='https://github.com/kalior/clocks/'>github</a>!
            </p>
        </Footer>
    </AllContent>
}

const backgroundPositionAnimation = keyframes`
  0% {
    background-position: -24vw -10vh;
  }
  20% {
    background-position: -12vw -12vh;
  }
  40% {
    background-position: -20vw 1vh;
  }
  60% {
    background-position: -12vw -4vh;
  }
  100% {
    background-position: -24vw -10vh;
  }
`;

const AllContent = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  --ring-color: rgba(54, 28, 64, 0.9);
  //background-image: radial-gradient(circle, var(--ring-color) 0%, #fff0 10%, #fff0 50%, var(--ring-color) 100%);
  //background-image: radial-gradient(circle, var(--ring-color) 1%,#fff0 1%, #fff0 30%, var(--ring-color) 30%, var(--ring-color) 35%, #fff0 35%);
  //background-image: radial-gradient(circle, var(--ring-color) 0%, #fff0 10%);
    //animation: ${backgroundPositionAnimation} 60s ease-in infinite;
`;


const TopBar = styled.div`
  color: #213547;
  padding: 2.4rem;
  font-size: 1.4rem;

  h2 {
    padding-right: 0.02rem;
    padding-left: 0.16rem;
    display: inline;
  }

  p {
    display: inline;
  }
`;

const TopLine = styled.hr`
  border: 0;
  height: 1px;
  background: #333;
  margin-top: -3px;
`;

const BottomLine = styled.hr`
  border: 0;
  height: 1px;
  background: #333;
  margin-top: 0px;
`;

const Content = styled.div`
  max-width: 1280px;

  padding: 2rem;
  text-align: left;

  min-width: 320px;
  min-height: fit-content;
`;

const Footer = styled.div`
  color: #213547;
  padding: 0 2.4rem 0.8rem;
  margin: auto 0 0;
  font-size: 14px;

  a {
    color: #3c617f;
    text-decoration: none;

    :hover {
      color: #C6572F;
    }
  }
`;

const Clock = styled.div`
  height: 60vh;
  position: absolute;
  width: 60rem;
  margin-top: 20vh;
  margin-left: 10vw;
  

  :after {
    background: var(--ring-color);
    border-radius: 50%;
    content: "";
    position: absolute;
    left: 50%;
    top: 21rem;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 2rem;
    z-index: 0;
  }
`;

const RotateAnimation = keyframes`
  100% {transform: rotateZ(360deg);}
`;


const HourHand = styled.div`
  background: var(--ring-color);
  height: 30rem;
  left: 50%;
  position: absolute;
  top: -9rem;
  transform-origin: 50% 100%;
  width: 0.4rem;
  animation: ${RotateAnimation} 4s infinite cubic-bezier(.68,-0.55,.27,1.55);
`;

const MinuteHand = styled.div`
  background: var(--ring-color);
  height: 40rem;
  left: 50%;
  position: absolute;
  top: -19.5rem;
  transform-origin: 50% 100%;
  width: 0.2rem;
  animation: ${RotateAnimation} 360s infinite steps(60);
`;

const SecondHand = styled.div`
  background: var(--ring-color);
  height: 45rem;
  left: 50%;
  position: absolute;
  top: -15.5rem;
  transform-origin: 50% 80%;
  width: 0.1rem;
  z-index: 0;
  animation: ${RotateAnimation} 6s infinite steps(60);
`;


export default App
