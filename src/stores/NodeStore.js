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
    	    parentX: 0,
    	    parentY: 0,

            nodeX: 0,
            /*get transor(){
            	let trans = this.show ? `translate(${this.nodeX-this.parentX})` : `translate(${this.parentX-this.nodeX})`;
            	return { webkitTransformOrigin: `${this.parentX} ${this.parentY} 0`, webkitTransform: `${trans}` }
            },*/
            get styleName(){
            	if (this.show){
            		return '';
            	} else {
            		return 'hidden';
            	}
            },
            get curX(){
            	return (this.show ? this.nodeX : this.parentX);
            },
            get curY(){
                
            	return (this.show ? this.nodeY : this.parentY);
            },
            get nodeY(){
               return (this.maxY+this.minY)/2;
            },
            get nodeRend(){
                return (<TreeNode nodeId={this.id} styleName={this.styleName} clickable={this.clickable} circleX={this.curX} circleY={this.curY} circleR={10} label={this.name} />);
            }
    	});
	}

	nodeClicked(){
        
	}

    nodeExpand(node){
    	
    	this.parentX = node.nodeX;
    	this.parentY = node.nodeY;
    	this.expanded = true;

    }

    nodeCollapse(node){
    	this.parentX = node.nodeX;
    	this.parentY = node.nodeY;
    	this.expanded = false;
    }

	toggleVisibility(){

		this.show = !this.show;
	}
	makeVisible(node){
		this.parentX = node.nodeX;
    	this.parentY = node.nodeY;
		this.show = true;
	}
	makeHidden(node){
		this.parentX = node.nodeX;
    	this.parentY = node.nodeY;
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
		this.parentX = node.parentX ? node.parentX : 0;
		this.parentY = node.parentX ? node.parentY : 0;
	}
    changeNodeCoord(newCoordX, newCoordY) {
        this.xCoord = newCoordX;
        this.yCoord = newCoordY;
    }
}

const nodeStore = new NodeStore();

export default nodeStore;
export { NodeStore };