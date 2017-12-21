import React from 'react';
import TreeNode from '../components/TreeNode';
import TreeStore from './TreeStore';
import { extendObservable} from 'mobx';

class NodeStore {
	constructor () {
		extendObservable(this,{
		    
		    id: 0,
        	name: '',
        	show: true,
        	expanded: true,
    	    clickable: false,
    	    depth: 0,
    	    isOnionSibling: false,
    	    minY: 0,
    	    maxY: 0,
            nodeX: 0,
            
            get styleName(){
            	if (this.show){
            		return '';
            	} else {
            		return 'hidden';
            	}
            },

            get nodeY(){
               return (this.maxY+this.minY)/2;
            },
            get nodeRend(){
                return (<TreeNode nodeId={this.id} styleName={this.styleName} clickable={this.clickable} circleX={this.nodeX} circleY={this.nodeY} circleR={10} label={this.name} />);
            }
    	});
	}

	nodeClicked(){
        
	}

    nodeExpand(){
    	this.expanded = true;
    }

    nodeCollapse(){
    	this.expanded = false;
    }

	toggleVisibility(){
		this.show = !this.show;
	}
	makeVisible(){
		this.show = true;
	}
	makeHidden(){
		this.show = false;
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
		this.isOnionSibling = node.isOnionSibling ? node.isOnionSibling : false;
	}
    changeNodeCoord(newCoordX, newCoordY) {
        this.xCoord = newCoordX;
        this.yCoord = newCoordY;
    }
}

const nodeStore = new NodeStore();

export default nodeStore;
export { NodeStore };