import { extendObservable, computed } from 'mobx';

class NodeStore {
	constructor () {
		extendObservable(this,{
		show: false,
		title: '',
		nodeId: 0,
		xCoord: 100,
		yCoord: 100,
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