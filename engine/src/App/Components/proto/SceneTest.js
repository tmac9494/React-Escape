import React, {useState, useEffect} from 'react';
import bg from '../../Assets/doorTestBg.png';
import svgBuild from './SvgElementConstructor';
import InteractionManager from '../../Managers/Interactions.js';

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
	const [sceneFG, setSceneFG] = useState(null);

	// moun/unmount
	useEffect(() => {
		setMounted(true);
		if (sceneFG === null) {
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
		if (sceneFG !== null & interactions !== null) {
			let svg = Object.assign({}, sceneFG);
			let newElem = [];
			sceneFG.props.children.forEach((svgElement, i) => {

				if (svgElement.props['data-id']) { // if Element has a sceneOBject id run it through the interaction Manger with the needed props

					let elementUpdate = InteractionManager(interactions, svgElement, props.sceneObjects);
				 	newElem.push(elementUpdate);

				} else newElem.push(svgElement);

			})

			const newSvg = React.cloneElement(
				sceneFG,
				{},
				newElem
			)
			console.log(newSvg)
			setSceneFG(newSvg);
		}
	}, [interactions])


	return(
		<div className="rx8p_scene" style={{background: `url(${bg}) no-repeat center center`, backgroundSize: "contain"}}>
			{sceneFG}
		</div>
	);
}

export default Scene;