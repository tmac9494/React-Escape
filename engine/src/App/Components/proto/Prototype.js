import React, {useState, useEffect, useLayoutEffect} from 'react';
import gameFile from '../../game-data-structure.js';
import SceneTest from './SceneTest';

const vpRatios = {w: 1.777777777777778, h:0.5626}

function GameMaster(props) {

	const [mounted, setMounted] = useState(false);
	const [sceneIndex, setSceneIndex] = useState(0);
	const [roomIndex, setRoomIndex] = useState(0);
	const [sceneId, setSceneId] = useState("proto-test")
	const [synthViewPort, setSynthViewPort] = useState({
		width: "1920px",
		height: "1080px",
	});

	// mount
	useEffect(() => {
		setMounted(true);
		let vpNew = {};
		
		const max = {width: (window.innerWidth * .9), height: (window.innerHeight * .9)}
		// width fiz
		if (max.width < parseInt(synthViewPort.width)) {
			vpNew.width = max.width + "px";
			vpNew.height = (max.width * vpRatios.h) + "px";
			setSynthViewPort(vpNew);
		}
		// hieght fix
		if (max.height < parseInt(vpNew.height)) {
			vpNew.height = max.height + "px";
			vpNew.width = max.height * vpRatios.w + "px";
			setSynthViewPort(vpNew);
		}

		return ( // unmount
			() => setMounted(false));
	}, [])


	const currentScene = gameFile.Scenes.slice().filter(scene => scene.id === sceneId)[0];
	const foreGround = gameFile.Foregrounds.slice().filter(fg => fg.id === currentScene.foreground[0])[0];
	// console.log(foreGround);

	return(
		<div id="game-master-viewport" style={{display:"block", width: synthViewPort.width, height:synthViewPort.height}}>
			<SceneTest 
				sceneId={sceneId} 
				gameData={gameFile} 
				scene={currentScene}
				fg={foreGround.svgFG}
				sceneObjects={foreGround.sceneObjects}
				state={foreGround.state}
			/>
		</div>
	)
}

export default GameMaster;