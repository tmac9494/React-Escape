import React, {useState, useEffect} from 'react';
import gameFile from '../../game-data-structure.js';


function GameMaster(props) {

	const [sceneIndex, setSceneIndex] = useState(0);
	const [roomIndex, setRoomIndex] = useState(0)

	return(
		<div id="game-master-viewport">

		</div>
	)
}

export default GameMaster;