module.exports = {
	Scenes: [
		// ------------------------
		//	test
		// ------------------------
		{
			id: "scene-test",
			forground: ["scene-fg-test"],
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


	foregrounds: [
		{
			// forground id
			id: "screen-fg-test",
			svg: "fg.svg",
			state: {
				doorOpen: false,
				windowClicked: false,
				leftCabinetOpen: false,
				rightCabinetOpen: false,
			},
			sceneObjects: {
				testDoor: {
					state: "doorOpen",
					interactType: "hover",
					reference: true,
					refValue: "width",
					interactCss: {transorm: "translateX(%%ref%%)"}
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
			}
		},
	],

	backgrounds: [
		{
			id: "scene-bg-test",
			svg: "background.png"
		},
	]
}