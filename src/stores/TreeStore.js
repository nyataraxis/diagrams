import { extendObservable } from 'mobx';
import { NodeStore } from './NodeStore';
import { LinkStore } from './LinkStore';

class TreeStore {
    constructor() {
    	extendObservable(this,{
    		curNode: undefined,
            nodesTree: [],
            linksTree: [],
            offX: 0,
            nodeRad: 0,
            stepWidth: 0,
    	});
    }
    initiateTree(offsetX, nodeRadius, maxHeight, maxWidth, tree){
    	this.offX = offsetX;
    	this.nodeRad = nodeRadius;
    	let root = tree[0];
        let maxDepth = this.findMaxDepth(tree);
        console.log("maxDepth " + maxDepth);
        this.stepWidth = (maxWidth - (offsetX * 2))/(maxDepth + 1);
        this.linksTree = [];
        this.pushLinks(tree);
        this.pushNodeWithLinksToState(0, tree, 30, maxHeight-30);
    }
    pushLinks(tree){
    	tree.map((item, ind) => 
            {
            	this.linksTree.push([]);
        });
        	
    }
    findMaxDepth(tree){
    	let maxDepth = 0;
    	tree.map((item, ind) => {
        maxDepth = (maxDepth > item.depth) ? maxDepth : item.depth;
   
    });
    	return maxDepth;
        
    }
    printTest(){
    	console.log("successss");
    }

    nodeClicked(nodeId){
        let curNode = this.nodesTree.find(i=>(i.id==nodeId));
        if (curNode.expanded) {
        	this.collapseSubTree(curNode);
        }
        else {
        	this.expandSubTree(curNode, curNode);
        }
    }

    toggleVision(nodeId){
    	
    	let locked = [];

    	this.linksTree[nodeId].map(
    		(item,ind)=>{
              item.toggleVisibility();
              this.toggleVisibility(item.endId,locked);
    	});
    	
    }

    expandSubTree(node, rootN){
        node.nodeExpand(rootN);
        this.linksTree[node.id].map((item, ind)=>{
        	item.makeVisible(rootN);
        	let endNode = this.nodesTree.find(i=>(i.id==item.endId));
            endNode.makeVisible(rootN);
        	if(endNode.expanded){
        		this.expandSubTree(endNode, rootN);
        	}
        })
    }

    collapseSubTree(node){
    	node.nodeCollapse(node);
    	this.linksTree[node.id].map((item,ind) => {
    		item.makeHidden(node);
    		let endNode = this.nodesTree.find(i => (i.id == item.endId));
    		endNode.makeHidden(node);
    		this.hideSubTree(endNode, node);

    	})
    }

    hideSubTree(node, rootN){
        this.linksTree[node.id].map((item,ind) =>{
    		item.makeHidden(rootN);
    		let endNode = this.nodesTree.find(i => (i.id == item.endId));
    		endNode.makeHidden(rootN);
    		this.hideSubTree(endNode, rootN);
    	})
    }

    showSubTree(nodeId){

    }
    toggleVisibility(nodeId, lockedId){
    	let lock=lockedId;
        let curNode=this.nodesTree.find(i=>(i.id==nodeId));
        curNode.toggleVisibility();
        let counter=this.linksTree[nodeId].length;

    	this.linksTree[nodeId].map((item, ind)=>{

    		if (curNode.isOnionSibling) {

    			item.toggleVisibility();
    			
    			if(lock.includes(item.endId)){} else {
    				console.log('hui');
    				lock.push(item.endId);
		    		this.toggleVisibility(item.endId,lock);
    			}
    		} else {
    			item.toggleVisibility();
    		this.toggleVisibility(item.endId,lock);
    		}
    		
    	});
    }
    pushNodeWithLinksToState(nodeId, tree, minY, maxY){

        let node = tree[nodeId];
        
        let nodX = this.offX + (node.depth)*this.stepWidth;

        let nodY = (minY+maxY)/2;
        let nodeProto = {
    		id: node.id,
    		name: node.name,
    		show: true,
    		clickable: true,
    		depth: node.depth,
    		nodeX: nodX,
    		nodeY: nodY,
    		minY: minY,
    		maxY: maxY
    	};

    	let succCount = node.linksTo ? node.linksTo.length : 0;

    	let onionCount = node.onionArr ? node.onionArr.length : 0;
    	
    	if (succCount > 0) {
	    	
	    	if(onionCount > 0) {
	    		let child = tree[node.linksTo[0]];
	    		let childX = this.offX + (child.depth)*this.stepWidth;
    			let childY = nodY;
	    		let childProto = {
	    			id: child.id,
	    			name: child.name,
	    			nodeX: childX,
	    			nodeY: childY,
	    			show: true,
	    			clickable: true,
	    			depth: child.depth,
                    /*parentX: this.offX+(node.depth)*this.stepWidth,
                    parentY: (minY+maxY)/2,*/
	    			maxY: maxY,
	    			minY: minY,
    			};

	    		let nodes = node.onionArr.map((it, ind) => {
	    	        
	    			let elem = tree[it];
	    			let offY = (maxY-minY)/onionCount;
	    			let minNY = ind*offY + minY;
	    			let maxNY = (ind+1)*offY + minY;
	    			let nX = this.offX + (node.depth+1)*this.stepWidth;

	    			let nY = (minNY + maxNY)/2;
	    			console.log(elem);
	    			let curOniProto = {
	                    id: elem.id,
	                    name: elem.name,
	                    show: true,
	                    clickable: false,
	                    depth: node.depth+1,
	                    nodeX: nX,
	                    nodeY: nY,
	                    minY: minNY,
	                    maxY: maxNY,
	                    /*parentX: this.offX+(node.depth)*this.stepWidth,
	                    parentY: (minY+maxY)/2,*/
	    			isOnionSibling: true
	    			};

	    			let curOni = new NodeStore();
	    			
	    			curOni.initNode(curOniProto);
	    			this.nodesTree.push(curOni);

                    let curOniLink = new LinkStore();
                    curOniLink.initLink(nodeProto, curOniProto,this.nodeRad);
    				this.linksTree[nodeProto.id].push(curOniLink);
    				

	    			let oniRootLink = new LinkStore();
	    			oniRootLink.initLink(curOniProto, childProto, this.nodeRad);
	    			
	    			this.linksTree[curOniProto.id].push(oniRootLink);

	    			});
	    		    this.pushNodeWithLinksToState(child.id, tree, minY, maxY/*, childProto.parentY*/);
	    		} else {
                    let nodes = node.linksTo.map((it,ind) => {

                    	let succ = tree[it];
                    	let offY = (maxY - minY)/succCount;
                    	let minNY = ind*offY + minY;
                    	let maxNY = (ind+1)*offY + minY;
                    	let nX = this.offX + (succ.depth)*this.stepWidth;
                    	let nY = (minNY+maxNY)/2;
                    	let succProto = {
                    		id: succ.id,
	                        name: succ.name,
	                        show: true,
	                        clickable: false,
	                        depth: succ.depth,
	                        nodeX: nX,
	                        nodeY: nY,
	                        minY: minNY,
	                        maxY: maxNY/*,
		                    parentX: this.offX+(node.depth)*this.stepWidth,
		                    parentY: (minY+maxY)/2*/
                    	}
                    	let succNodeLink = new LinkStore();
                    	succNodeLink.initLink(nodeProto, succProto,this.nodeRad);

                    	this.linksTree[node.id].push(succNodeLink); 

                    	this.pushNodeWithLinksToState(it, tree, minNY, maxNY/*, succProto.parentY*/);
                    })
	    		}
    		}
    		
    	let newNode = new NodeStore();
    	newNode.initNode(nodeProto);
    	console.log('node');
    	console.log(newNode);
            this.nodesTree.push(newNode);
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