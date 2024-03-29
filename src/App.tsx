import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomeView} from "./Home";
import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";
import {useCallback, useEffect, useState} from "react";

const ClockRoutes = () => (
    <Router>
        <Routes>
            <Route path='/' element={<HomeView/>}/>
            <Route path='/:clockId' element={<HomeView/>}/>
        </Routes>
    </Router>
)


const App = () => {
    const [onContent, setOnContent] = useState(false);
    const [y, setY] = useState(window.scrollY);
    const [color, setColor] = useState("rgba(211, 236, 206, 0.43)")

    const colors = [
        [236, 236, 236],
        [182, 237, 171],
        [48, 197, 189],
        [215, 161, 109],
        [238, 201, 131],
        [95, 182, 217],
        [157, 182, 110],
        [255, 215, 241],
        [153, 179, 145],
        [214, 255, 242]
    ];


    const lerp = (v0: number, v1: number, t: number) => {
        return (1 - t) * v0 + t * v1;
    }

    const handleNavigation = useCallback(
        (e: Event) => {
            const window = e.currentTarget as Window;
            const y = window.scrollY

            setOnContent(y > 460);

            const scrollYLimit = Math.max(document.body.scrollHeight, document.body.offsetHeight,
                document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

            const scrollPerColor = scrollYLimit / colors.length

            const color_position = y + (window.screen.height / 2)

            const color_i = Math.floor(color_position / scrollPerColor) % colors.length
            const color_next_i = (color_i + 1) % colors.length

            const interpolation_alpha = (color_position % scrollPerColor) / scrollPerColor

            const red = lerp(colors[color_i][0], colors[color_next_i][0], interpolation_alpha)
            const green = lerp(colors[color_i][1], colors[color_next_i][1], interpolation_alpha)
            const blue = lerp(colors[color_i][2], colors[color_next_i][2], interpolation_alpha)

            setColor(`rgba(${red}, ${green}, ${blue}, 0.43)`)
        }, [y]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    const rotatingClock = <Clock withShadow={onContent}>
        <HourHand withShadow={onContent}/>
        <MinuteHand withShadow={onContent}/>
        <SecondHand withShadow={onContent}/>
    </Clock>

    return <AllContent color={color}>

        {rotatingClock}
        <TopBar withShadow={onContent}>
            <p>My collection of</p>
            <h2>Stupid Clocks</h2>
            <p> that either don't tell time or do so in a senseless way</p>
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

interface AllContentProps {
    color: string;
}

const AllContent = styled.div<AllContentProps>`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  background-image: linear-gradient(90deg, ${props => props.color ? props.color : "rgba(153, 217, 163, 0.43)"} 20%, #fff0 100%);
`;

interface ShadowProps {
    withShadow: boolean;
}

const TopBar = styled.div<ShadowProps>`
  padding: 2.4rem;
  position: sticky;
  top: 14rem;
  margin-left: 6rem;
  z-index: 0;

  ${props => props.withShadow ? "text-shadow: -1px 0 5px #213547;" : ""}
  color: ${props => props.withShadow ? "transparent" : "#213547"};

  ${props => props.withShadow ? "transform: scale(0.98);" : ""}

  transition: all 2s;


  @media (max-width: 768px) {
    margin-left: 1rem;
  }

  h2 {
    font-size: 10rem;
    line-height: 8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 400;
    font-family: Montserrat, serif;

    @media (max-width: 768px) {
      font-size: 5rem;
      line-height: 4rem;
    }
  }

  p {
    margin: 1rem 0;
    font-size: 2.4rem;
    font-weight: 100;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
`;

const BottomLine = styled.hr`
  border: 0;
  height: 1px;
  background: #333;
  margin-top: 0;
`;

const Content = styled.div`
  max-width: 1280px;

  padding: 2rem;
  text-align: left;

  min-width: 320px;
  min-height: fit-content;

  margin-top: 30vh;
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

const Clock = styled.div<ShadowProps>`
  position: fixed;
  top: 14rem;
  left: 56rem;
  height: 20rem;
  width: 20rem;
  z-index: 1;

  @media (max-width: 1487px) {
    top: 22rem;
    left: 15.5rem;
  }

  @media (max-width: 768px) {
    top: 16rem;
    left: 2rem;
    transform: scale(0.4);
  }


  :after {
    background: var(--ring-color);
    border-radius: 50%;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1rem;
    height: 1rem;
    z-index: 0;

    ${props => props.withShadow ? "box-shadow: -1px 0 3px #ac4d4d78; background: rgba(168, 77, 103, 0.54);" : ""};
    transition: all 500ms;
  }
`;

const RotateAnimation = keyframes`
  100% {
    transform: rotateZ(360deg);
  }
`;


const HourHand = styled.div<ShadowProps>`
  background: var(--ring-color);
  height: 5rem;
  position: absolute;
  left: 50%;
  top: 5rem;
  transform-origin: 50% 100%;
  width: 0.3rem;
  animation: ${RotateAnimation} 40s infinite cubic-bezier(.68, -0.55, .27, 1.55);

  ${props => props.withShadow ? "box-shadow: -1px 0 3px #ac4d4d78; background: rgba(168, 77, 103, 0.54);" : ""};
  transition: all 500ms;
`;

const MinuteHand = styled.div<ShadowProps>`
  background: var(--ring-color);
  height: 8rem;
  position: absolute;
  left: 50%;
  top: 2rem;
  transform-origin: 50% 100%;
  width: 0.2rem;
  animation: ${RotateAnimation} 100s infinite steps(6);

  ${props => props.withShadow ? "box-shadow: -1px 0 3px #ac4d4d78;  background: rgba(168, 77, 103, 0.54);" : ""};
  transition: all 500ms;
`;

const SecondHand = styled.div<ShadowProps>`
  background: var(--ring-color);
  height: 10rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform-origin: 50% 100%;
  width: 0.1rem;
  z-index: 0;
  animation: ${RotateAnimation} 60s infinite steps(60);

  ${props => props.withShadow ? "box-shadow: -1px 0 3px #ac4d4d78;  background: rgba(168, 77, 103, 0.54);" : ""};
  transition: all 500ms;
`;


export default App
