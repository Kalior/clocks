import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomeView} from "./Home";
import styled from "@emotion/styled";


const ClockRoutes = () => (
    <Router>
        <Routes>
            <Route path='/' element={<HomeView/>}/>
            <Route path='/:clockId' element={<HomeView/>}/>
        </Routes>
    </Router>
)

function App() {
    return <>
        <TopBar>
            <p>My collection of</p>
            <h2>Stupid Clocks</h2>
            <p> that either don't tell time, or do so in a senseless way</p>
            <hr/>
        </TopBar>
        <Content>
            <ClockRoutes/>
        </Content>
        <Footer>
            <hr style={{marginTop:"0px"}}/>
            <p>
                Created by <b>Joel Gustafsson</b> | <a href='https://joelgustafsson.com'>My webpage</a>
                <br/>
                If you've got an idea for an interesting or stupid clock, please submit an issue or pull request on <a href='https://github.com/kalior/clocks/'>github</a>!
            </p>
        </Footer>
    </>
}

const TopBar = styled.div`
  color: #213547;
  background-color: #fff;
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

const Content = styled.div`
  max-width: 1280px;
  
  padding: 2rem;
  text-align: center;

  min-width: 320px;
  min-height: fit-content;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  color: #213547;
  padding: 0 2.4rem 0.8rem;
  margin: 0;
  font-size: 14px;

  a {
    color: #3c617f;
    text-decoration: none;

    :hover {
      color: #C6572F;
    }
  }
`;


export default App
