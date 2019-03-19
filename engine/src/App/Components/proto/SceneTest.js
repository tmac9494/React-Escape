import React, {useState, useEffect} from 'react';
import bg from '../../Assets/backround.png';
import svgBuild from './SvgElementConstructor';

function Scene(props) {

	const [interactions, setInteractions] = useState(props.state);

	const updateInteractions = (objId) => {
		console.log(objId)
		let ints = Object.assign({}, interactions);
		console.log(ints)
		ints[objId] = !ints[objId];
		setInteractions(ints);
	}
	const [objects, setObjects] = useState(svgBuild(props.fg, {
		scene: props.scene,
		sceneObjects: props.sceneObjects,
		interactions: interactions,
		stateSetter: updateInteractions,
	}))

	console.log(props.fg)
	// const foregr = svgBuild(props.fg, {
	// 	scene: props.scene,
	// 	interactions: interactions,
	// 	stateSetter: updateInteractions,
	// });
	// console.log(foregr.props.children)



	useEffect(() => {
		// let newInts = {};]
		// return();
		let svg = Object.assign({}, objects);
		console.log(svg)
		let newElem = [];
		let newSvg = false;
		console.log(svg)
		objects.props.children.forEach(elem => {
			console.log(elem)
			if (Array.isArray(elem)) {elem.forEach(elem => {
			if (interactions[elem.props['data-id']]) {
			 	let style = props.sceneObjects[elem.props['data-id']].interactCss;
			 	newElem.push(React.cloneElement(
			 		elem,
			 		style,
			 		elem.props.children
			 	));
			}
			})}
		})
		newSvg = React.cloneElement(
			svg,
			svg.props.style,
			[svg.props.children, ...newElem]
		)
		setObjects(newSvg);
	}, [interactions])

	return(
		<div className="rx8p_scene" style={{background: `url(${bg}) no-repeat center center`, backgroundSize: "contain"}}>
			{objects}
		</div>
	);
}

export default Scene;