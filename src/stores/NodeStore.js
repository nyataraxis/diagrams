import React from 'react';
import TreeNode from '../components/TreeNode';

import { extendObservable, computed } from 'mobx';

class NodeStore {
	constructor () {
		extendObservable(this,{
		    
		    id: 0,
        	name: '',
        	show: true,
    	    clickable: false,
    	    depth: 0,
    	    minY: 0,
    	    maxY: 0,
            nodeX: 0,
            get nodeY(){
               return (this.maxY+this.minY)/2;
            },
            get nodeRend(){
                return (<TreeNode key={this.id*1000} circleX={this.nodeX} circleY={this.nodeY} circleR={10} label={this.name} />);
            }
    	});
	}
	initNode(node){
		this.id = node.id;
		this.name = node.name;
		this.show = node.show;
		this.clickable = node.clickable;
		this.depth = node.depth;
		this.minY = node.minY;
		this.maxY = node.maxY;
		this.nodeX = node.nodeX;
		this.linksTo = node.linksTo;
		this.linksArr = node.linksArr;
	}
    changeNodeCoord(newCoordX, newCoordY) {
        this.xCoord = newCoordX;
        this.yCoord = newCoordY;
    }
}

const nodeStore = new NodeStore();

export default nodeStore;
export { NodeStore };