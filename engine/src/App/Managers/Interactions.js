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
	const childUpdates = sceneObjects[svgElement.props['data-id']].childUpdates;

	// generate new svg children after interaction 
 	let newChildren = svgElement.props.children.map((dirChild, i) => {

 		let returnChild;

 		if (dirChild.props.className.includes(rx8pTargetClass)) {
 			console.log("clone 2");
 			let newNestedChildren = false;
 			const nested = dirChild.props.children
 				? dirChild.props.children
 				: null;
 			console.log(nested)
 			if (nested !== null) {

				newNestedChildren = nested.map((nestedElem, i) => {
					console.log(nestedElem.props.childid)
					if (nestedElem.props.childid) {
						const newNestStyle = interactions[svgElement.props['data-id']] === childUpdates[nestedElem.props.childid][0]
							? childUpdates[nestedElem.props.childid][1]
							: {}
						console.log(newNestStyle)
						return(
							React.cloneElement(
								nestedElem, 
								{style: newNestStyle}
							)
						);
					} else {return nestedElem} 
				})
 				
 			}

 			// clone element and return with new styles
	 		const clone = React.cloneElement(
		 		dirChild,
		 		{style: style},
		 		(newNestedChildren ? newNestedChildren : dirChild.props.children)
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