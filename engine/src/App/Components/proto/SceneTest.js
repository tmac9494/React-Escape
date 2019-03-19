import React, {useState, useEffect} from 'react';
import bg from '../../Assets/backround.png';
import svgBuild from './SvgElementConstructor';

function Scene(props) {

	const [mounted, setMounted] = useState(false);
	const [interactions, setInteractions] = useState(Object.assign({}, props.state));

	const updateInteractions = (objId) => {
		let ints = interactions;
		ints[objId] = !ints[objId];
		setInteractions(prevInts => { 
			return {...prevInts, ...ints};
		});
	}
	const [objects, setObjects] = useState(null);

	// moun/unmount
	useEffect(() => {
		setMounted(true);
		if (objects === null) {
			// build svg from foreground data and svgBuilder hook
			setObjects(svgBuild(props.fg, {
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
		if (objects !== null & interactions !== null) {
			let svg = Object.assign({}, objects);
			let newElem = [];
			objects.props.children.forEach((child, i) => {
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
				objects,
				{},
				newElem
			)
			console.log(newSvg)
			setObjects(newSvg);
		}
	}, [interactions])


	return(
		<div className="rx8p_scene" style={{background: `url(${bg}) no-repeat center center`, backgroundSize: "contain"}}>
			{objects}
		</div>
	);
}

export default Scene;