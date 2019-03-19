import React, {useState, useEffect} from 'react';
import bg from '../../Assets/backround.png';
import svgBuild from './SvgElementConstructor';

function Scene(props) {

	const [mounted, setMounted] = useState(false);
	const [interactions, setInteractions] = useState(Object.assign({}, props.state));

	const updateInteractions = (objId, bool=null) => {
		let ints = interactions;
		ints[objId] =  bool === null ? !ints[objId] : bool;
		// make sure taking previous changes into account when saving
		setInteractions(prevInts => { 
			return {...prevInts, ...ints};
		});
	}
	const [scenFG, setSceneFG] = useState(null);

	// moun/unmount
	useEffect(() => {
		setMounted(true);
		if (scenFG === null) {
			// build svg from foreground data and svgBuilder hook
			setSceneFG(svgBuild(props.fg, {
				scene: props.scene,
				sceneObjects: props.sceneObjects,
				interactions: interactions,
				stateSetter: updateInteractions,
			}))
		}
		 return(() => setMounted(false))
	}, []);

	// className of object wrap
	const rx8pParentClass = "scene-object";
	// className of Object target
	const rx8pTargetClass = "scene-object-target";

	// manage svg changes on interaction
	useEffect(() => {
		if (scenFG !== null & interactions !== null) {
			let svg = Object.assign({}, scenFG);
			let newElem = [];
			scenFG.props.children.forEach((child, i) => {
				if (child.props['data-id']) {

					// test to see if tranformation is true
					let style = interactions[child.props['data-id']] ? props.sceneObjects[child.props['data-id']].interactCss : {};

					// generate new svg children after interaction 
				 	let newChildren = child.props.children.map((dirChild, i) => {

				 		let returnChild;

				 		if (dirChild.props.className.includes(rx8pTargetClass)) {
				 			console.log("clone 2")
					 		const clone = React.cloneElement(
						 		dirChild,
						 		{style: style},
						 	);
						 	returnChild = clone;
				 		} else { returnChild = dirChild };
				 		
				 		return returnChild;
				 	})

				 	// clone group wrapper and add to new svg
			 		const wrapClone = React.cloneElement(
			 			child,
			 			child.props,
			 			newChildren
			 		);
				 	newElem.push(wrapClone);
				} else newElem.push(child);
			})
			const newSvg = React.cloneElement(
				scenFG,
				{},
				newElem
			)
			console.log(newSvg)
			setSceneFG(newSvg);
		}
	}, [interactions])


	return(
		<div className="rx8p_scene" style={{background: `url(${bg}) no-repeat center center`, backgroundSize: "contain"}}>
			{scenFG}
		</div>
	);
}

export default Scene;