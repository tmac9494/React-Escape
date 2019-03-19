import React from 'react';

const gameData = {
	Scenes: [
		// ------------------------
		//	test
		// ------------------------
		{
			id: "scene-test",
			foreground: ["scene-fg-test"],
			background: ["scene-bg-test"],
			sceneIndex: 0,
		},
		// ------------------------
		//	INTRO
		// ------------------------
		{
			// id of scene
			id: "pod-awake",
			foreground: [
				// id of the foregrounds used in this scene
					// ?? - should these just be assigned from the asset ??
				"intro_in-pod-closed_fg",
				"intro_in-pod-broken_fg",
				"intro_in-pod-open_fg"
			],
			background: [
				// id of the backgrounds used in this scene
					// ?? - should these just be assigned from the asset ??
				"intro_in-pod-closed_bg",
				"intro_in-pod-closed-broken_bg",
				"intro_in-pod-open_bg",
			]
			// hold scene specific state declarations here??
		},
		{
			id: "esc-intro",
			foreground: [
				"intro_stand-by-pod-look-pod_fg",
				"intro_stand-by-pod-look-room_fg"
			],
			background: [
				"intro_by-pod-look-pid_bg",
				"intro_by-pod-look-room_bg"
			]
		},
	],


	Foregrounds: [
		{
			// forground id
			id: "scene-fg-test",
			svg: "fg.svg",
			state: {
				testDoor: false,
				testWindow: false,
				testCabinetLeft: false,
				testCabinetRight: false,
			},
			sceneObjects: {
				testDoor: {
					state: "doorOpen",
					interactType: "hover",
					reference: true,
					refValue: "width",
					interactCss: {transform: "translateX(100%)"}
					// conditional
							//  ^^ ??? use bool here to know if this object's interaction is locked until something is true
				},
				testWindow: {
					state: "windowClicked",
					interactType: "click",
					interactCss: {display: "none"}
				},
				testCabinetLeft: {
					state: "leftCabinetOpen",
					interactType: "click",
					interactCss: {transform: "rotate3d(0, 1, 0, 40deg)"}
				},
				testCabinetRight: {
					state: "rightCabinetOpen",
					interactType: "click",
					interactCss: {transform: "rotate3d(0, 1, 0, -40deg)"}
				}
			},
			svgFG: (
				<svg version="1.1" id="Layer_1" x="0px" y="0px"
					 viewBox="0 0 1920 1080" style={{enableBackground:"new 0 0 1920 1080"}}>
					<g key="testWindow" className="scene-object window" data-id="testWindow">
						<rect key="target-0" className="scene-object-target" x="848" y="372.6" width="245" height="189.4" />
					</g>
					<g key="testDoor" className="scene-object door" data-id="testDoor">
						<rect key="target-0" className="scene-object-target" x="289" y="754" width="182" height="326"/>
					</g>
					<g key="testCabinetLeft" className="scene-object cab-left" data-id="testCabinetLeft">
						<rect key="target-0" className="scene-object-target orig-l-b" x="938" y="824" width="212" height="212"/>
					</g>
					<g key="testCabinetRight" className="scene-object cab-right" data-id="testCabinetRight">
						<rect key="target-0" className="scene-object-target orig-r-b" x="1152" y="824" width="212" height="212"/>
					</g>
				</svg>
			),
		},
	],

	backgrounds: [
		{
			id: "scene-bg-test",
			svg: "background.png"
		},
	]
}

export default gameData;