import React from 'react';

// className of object wrap
const rx8pParentClass = "scene-object";
// className of Object target
const rx8pTargetClass = "scene-object-target";

function ElementConstruct(svg, options={}) {
	// svg elements
	const elements = svg.props.children;
	const build = elements.slice().map((elem, i) => {
		let clone = false;
		let newElem = false;


		// get child to frame
		if (elem.props.className.includes(rx8pParentClass)) {
			// console.log(elem.props.children)
			let groupChildren = elem.props.children;
			let shouldClone = Array.isArray(groupChildren)
				? groupChildren.filter(item => item.props.className.includes(rx8pTargetClass))[0]
				: groupChildren.props.className.includes(rx8pTargetClass) 
				? groupChildren
				: null;

			// if valid clone element
			if (shouldClone !== null) {

				let customProps = {key:i, className: "scene-object-frame"};
				console.log(shouldClone)
				if (elem.props["data-id"]) {
					//add props for state updates
					const settings = options.sceneObjects[elem.props["data-id"]];
					const event = settings.interactType === "click" ? "onClick" : "hover" ? "onMouseOver" : "onClick";

					if (event === "onMouseOver") {
						customProps["onMouseOver"] = () => options.stateSetter(elem.props["data-id"], true);
						customProps["onMouseOut"] = () => options.stateSetter(elem.props["data-id"], false);
					} else customProps[event] = () => options.stateSetter(elem.props["data-id"]);
				}
				console.log(customProps)
				// frame
				clone = React.cloneElement(
					shouldClone,
					customProps,
					shouldClone.props.children,
				)
				// craft new grouped element
				newElem = React.cloneElement(
					elem,
					{},
					[shouldClone,clone]
				)
			}

			return(clone ? newElem : elem)

			// console.log(clone)
		}


	})

	// finally clone svg and return updated version
	const newSvg = React.cloneElement(
		svg,
		{className: "rx8p_generated"},
		build
	);
	// newSvg.props.children = build;

	return(newSvg);
}

export default ElementConstruct;