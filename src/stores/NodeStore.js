import { extendObservable, computed } from 'mobx';

class NodeStore {
	constructor () {
		extendObservable(this,{
		show: false,
		title: '',
		nodeId: 0,
		xCoord: 0,
		yCoord: 0,
		linkTo: {},
    	
    	});
	}
    changeNodeCoord(newCoordX, newCoordY) {
        this.xCoord = newCoordX;
        this.yCoord = newCoordY;
    }
}

const nodeStore = new NodeStore();

export default nodeStore;
export { NodeStore };