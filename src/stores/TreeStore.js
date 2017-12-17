import { extendObservable } from 'mobx';
import { NodeStore } from './NodeStore';

class TreeStore {
    constructor() {
    	extendObservable(this,{
    		curNode: undefined,
            nodesTree: [],
    	});
    }
    initiateTree(){
    	let root = new NodeStore();
    	root.id = 1;
    	this.nodesTree.push(root);
    	this.curNode = root;
    }
    renderNewNode(){
    	
    		let newNode = new NodeStore();
    		newNode.nodeId = this.nodesTree.length + 1;
    		newNode.show = true;
    		this.nodesTree.push(newNode);
    		this.curNode = newNode;
    }
}



const treeStore = new TreeStore();

export default treeStore;
export {TreeStore};