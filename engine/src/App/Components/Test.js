import React, {useState, useEffect, useRef} from 'react';
import bg from '../Assets/backround.png';
import SvgChild from './proto/SvgElementConstructor';



function Test(props) {
	const ratio = 1.777777777;

	const [gwHeight, setGwHeight] = useState(window.innerHeight);
	const [gwWidth, setGwWidth] = useState(window.innerHeight * ratio);
	const [style, setStyle] = useState({
		door: {},
		window: {},
		cabinetLeft: {},
		cabinetRight: {}
	});
	const [animations, setAnimations] = useState({
		door: [],
		window: [],
		cabinetLeft: [],
		cabinetRight: []
	})

	const [doorHover, setDoorHover] = useState(false);
	const [windowClick, setWindowClick] = useState(false);
	const [cabinetClick, setCabinetClick] = useState({
		left: false,
		right: false
	})

	const winwidth = window.innerWidth;
	const winHeight = window.innerHeight;


	const door = useRef();
	const defaults = {
		transition: ".32s",
		fill:"#FF2EEA",
		display: "block",
		// transformOrigin: "center center"
	}


	useEffect(() => {
		let newStyle = {
			door: {},
			window: {},
			cabinetLeft: {},
			cabinetRight: {}
		};
		let transforms = {
			door: [],
			window: [],
			cabinetLeft: [],
			cabinetRight: []
		};

		let anims = Object.assign({}, animations);
		// door hover
		if (doorHover) {
				// transforms.door.push(`translateX(${doorHover ? Math.ceil(door.current.getBoundingClientRect().width) + "px" : 0})`);
			anims.door.push("translate(182, 0)");
		} else anims.door = anims.door.filter(ans => !ans.includes("translate"));
		// window click
		if (windowClick) {
			newStyle.window.display = "none";
		} else newStyle.window.display = "block";
		// cabinet clicks
		if (cabinetClick.left) {
			// newStyle.cabinetLeft.transformOrigin = "left center";
			newStyle.cabinetLeft.perspective = "500px";
			// transforms.cabinetLeft.push("rotate3d(0, 1, 0, 40deg)")
		// } else transforms.cabinetLeft = transforms.cabinetLeft.filter(anims => !anims.includes("rotate"));
			transforms.cabinetLeft.push("rotate3d(0, 1, 0, -40deg)")
			// if (!anims.cabinetLeft.includes("rotate(45, 66, 66)")) anims.cabinetLeft.push("rotate(45, 66, 66)")
			// else anims.cabinetLeft.push("rotate(0, 66, 66)")
		} else {
			// anims.cabinetLeft = anims.cabinetLeft.filter(ans => !ans.includes("rotate"));
			// anims.cabinetLeft.push("rotate(0, -66, -66)");
			transforms.cabinetLeft = transforms.cabinetLeft.filter(anims => !anims.includes("rotate"));
		}

		if (cabinetClick.right) {
			// newStyle.cabinetRight.transformOrigin = "right center";
			newStyle.cabinetRight.perspective = "500px";
			// newStyle.cabinetRight.float = "right"
			transforms.cabinetRight.push("rotate3d(0, -1, 0, 40deg)")
			// if (!anims.cabinetRight.includes("rotate(-45, 66, 66)")) anims.cabinetRight.push("rotate(-45, 66, 66)")
			// else anims.cabinetRight.push("rotate(0, 66, 66)")
		} else {
			// anims.cabinetRight = anims.cabinetRight.filter(ans => !ans.includes("rotate"));
			// anims.cabinetRight.push("rotate(0, -66, -66)");
			transforms.cabinetRight = transforms.cabinetRight.filter(anims => !anims.includes("rotate"));
		}

		setAnimations(anims);
		Object.keys(newStyle).forEach(target => { 
			let svgTarget = target;
			// console.log(transforms[svgTarget])
			newStyle[svgTarget] = Object.assign({}, defaults, newStyle[svgTarget]);
			newStyle[svgTarget].transform = transforms[svgTarget].join(" ");
			console.log(newStyle[svgTarget])
			// console.log(svgTarget)
		})
		setStyle(newStyle);
		console.log(anims)
	}, [doorHover, windowClick, cabinetClick])

	return(
		<div id="test" style={{background: "#25262c",display:"block",minHeight: "100vh"}}>

			<div id="game_window" style={{height: gwHeight, width: gwWidth, display:"block", margin:"0 auto", background: `url(${bg}) no-repeat center center`, backgroundSize: "contain"}}>

				<svg version="1.1" id="Layer_1" x="0px" y="0px"
					 viewBox="0 0 1920 1080" style={{enableBackground:"new 0 0 1920 1080"}}>
					<g className="scene-object window">
						<rect className="scene-object-target" x="848" y="372.6" width="245" height="189.4" style={style.window} />
						<rect onClick={() => setWindowClick(!windowClick)} className="scene-object-frame"x="848" y="372.6" width="245" height="189.4" />
					</g>
					<g className="scene-object door">
						<rect ref={door} className="scene-object-target" x="289" y="754" width="182" height="326" style={style.door} transform={animations.door.join(" ")}/>
						<rect className="scene-object-frame" onMouseOver={() => setDoorHover(true)} onMouseOut={() => setDoorHover(false)}  x="289" y="754" width="182" height="326"/>
					</g>
					<g className="scene-object cab-left">
						<rect className="scene-object-target orig-l-b" x="938" y="824" width="212" height="212" style={style.cabinetLeft} transform={animations.cabinetLeft.join(" ")}/>
						<rect onClick={() => setCabinetClick({right: cabinetClick.right, left: !cabinetClick.left})} className="scene-object-frame" x="938" y="824" width="212" height="212"/>
					</g>
					<g className="scene-object cab-right">
						<rect className="scene-object-target orig-r-b" x="1152" y="824" width="212" height="212" style={style.cabinetRight} transform={animations.cabinetRight.join(" ")}/>
						<rect onClick={() => setCabinetClick({right: !cabinetClick.right, left: cabinetClick.left})} className="scene-object-frame" x="1152" y="824" width="212" height="212"/>
					</g>
				</svg>

			</div>

		</div>
	)
}

export default Test;