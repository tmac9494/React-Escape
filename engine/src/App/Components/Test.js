import React, {useState, useEffect, useRef} from 'react';
import bg from '../Assets/backround.png';



function Test(props) {
	const ratio = 1.777777777;

	const [gwHeight, setGwHeight] = useState(window.innerHeight);
	const [gwWidth, setGwWidth] = useState(window.innerHeight * ratio);
	const [style, setStyle] = useState({});

	const [hover1, setHover1] = useState(false);

	const winwidth = window.innerWidth;
	const winHeight = window.innerHeight;


	const door = useRef();

	useEffect(() => {
		let newStyle;
		// console.log(door.current.getBoundingClientRect().width)
		if (hover1) {
			newStyle ={
				transition: ".32s",
				fill:"#FF2EEA",
				transform:`translateX(${
					hover1 ? door.current.getBoundingClientRect().width + "px" : 0
				})`,
			}
		} else {
			newStyle = {fill: "#FF2EEA"}
		}
		console.log(newStyle)
		setStyle(newStyle)
	}, [hover1])

	return(
		<div id="test" style={{background: "#25262c",display:"block",minHeight: "100vh"}}>

			<div id="game_window" style={{height: gwHeight, width: gwWidth, display:"block", margin:"0 auto", background: `url(${bg}) no-repeat center center`, backgroundSize: "contain"}}>

				<svg version="1.1" id="Layer_1" x="0px" y="0px"
					 viewBox="0 0 1920 1080" style={{enableBackground:"new 0 0 1920 1080"}}>
				<g className="hover-handler">
					<rect ref={door} className={"hover-target" + (hover1 ? " active" : "")} x="289" y="754" width="182" height="326" style={style}/>
					<rect ref={door}  onMouseOver={() => setHover1(true)} onMouseOut={() => setHover1(false)} x="289" y="754" width="182" height="326" style={{fill:"rgba(0,0,0,0)"}}/>
				</g>
				</svg>

			</div>

		</div>
	)
}

export default Test;