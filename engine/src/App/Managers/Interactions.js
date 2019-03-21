import React from 'react';

// className of object wrap
const rx8pParentClass = "scene-object";
// className of Object target
const rx8pTargetClass = "scene-object-target";


function InteractionManager(interactions, svgElement, sceneObjects) {
	let interactionUpdate = null;

	// test to see if tranformation is true
	let style = interactions[svgElement.props['data-id']] 
			? sceneObjects[svgElement.props['data-id']].interactCss 
			: {};

	// generate new svg children after interaction 
 	let newChildren = svgElement.props.children.map((dirChild, i) => {

 		let returnChild;

 		if (dirChild.props.className.includes(rx8pTargetClass)) {
 			console.log("clone 2");
	 		const clone = React.cloneElement(
		 		dirChild,
		 		{style: style},
		 	);
		 	returnChild = clone;
 		} else { returnChild = dirChild };
 		
 		return returnChild;
	});

 	// clone group wrapper and add to new svg
	interactionUpdate = React.cloneElement(
		svgElement,
		svgElement.props,
		newChildren
	);

	return(interactionUpdate)
}

export default InteractionManager;