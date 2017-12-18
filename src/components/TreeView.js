import React, { Component } from 'react';
import TreeNode from './TreeNode';
import TreeLink from './TreeLink';
import { observer } from 'mobx-react';
import treeStore from '../stores/TreeStore';
import '../style/TreeView.css';


/*const rawNodes = [
    {
    	name: "rootname",
    	linkTo: [2,6]
    },
    {
    	name: "mainChild",
    	linkTo: [3,4]
    },
    {
    	name: "child sec lecelname",
    	linkTo: [5]
    },
    {
    	name: "surprize onion sec",
    	linkTo: [5]
    },
    {
    	name: "onionrootthird",
    	linkTo: [7,8,9]
    },
    {
    	name: "oh boy here we go its a second level",
    	linkTo: [10]
    },
    {
    	name: "maybeonion",
    	linkTo: [10]
    },
    {
    	name: "onionion",
    	linkTo: [10]
    },
    {
    	name: "last",
    	linkTo: [10]
    },
    {
    	name:"rootiwe"
    }
    
];

function recursiveRand(ind, itemArr, depth, initX, initY){
	console.log(itemArr[ind]);
    let links = itemArr[ind].linkTo ? itemArr[ind].linkTo.length : 0;
	if(links > 0){
		let newXInit = initX + 100;
		let newYdiff = Math.round(200/links);
		let depth = depth+1;
		itemArr[ind].linkTo.map((linkItem, index) => {
			recursiveRand(linkItem-1, itemArr, depth, newXInit, (initY-newYdiff*index));
		});
	}
	return(<TreeNode key={ind*100} circleX={initX} circleY={initY} circleR={7} label={itemArr[ind].name} />)
}*/
const treeData = [
  {
  	id: 1,
    name: "root",
    depth: 0,
    linksTo: [2,3]
  },
  {
    id: 2,
    name: "firstlev onion child",
    depth: 1,
    linksTo: [4,5]
  },
  {
    id: 3,
    name: "firstlev chil2",
    depth: 1,
    linksTo:[7]
  },
  {
    id: 4,
    name: "onionPair",
    linksTo: [6],
    depth: 2
  },
  {
    id: 5,
    name: "onionPair",
    linksTo: [6],
    depth: 2
  },
  {
  	id: 6,
  	name: "onionchild",
  	depth: 3
  },
  {
    id: 7,
    name: "onemoreChild",
    depth: 2
  }
];

const treeNodes = [
  {
  	id: 1,
    name: "root",
    depth: 1
  },
  {
    id: 2,
    name: "firstlev onion child",
    depth: 2
  },
  {
    id: 3,
    name: "firstlev chil2",
    depth: 2
  },
  {
    id: 4,
    name: "onionPair",
    depth: 3
  },
  {
    id: 5,
    name: "onionPair",
    depth: 3
  },
  {
  	id: 6,
  	name: "onionchild",
  	depth: 4
  },
  {
    id: 7,
    name: "onemoreChild",
    depth: 3
  }
];

const treeLinks = [{1:[2,3]},{2:[4,5]},{3:[7]},{4:[6]},{5:[6]}];

function TreeRend(tree){
	console.log(tree);
    let nodes = tree.map((item, index) => {
		
		return (
            <svg>
			<TreeNode key={item.id} circleX={(item.depth+1)*100} circleY={(item.id/(item.depth+1))*100} circleR={item.id} label={item.name} />
			{item.linksTo && item.linksTo.map((it, ind) => {return(
				<TreeLink key={it.id} startX={(item.depth+1)*100} endX={((item.depth+2)*100)} startY={(item.id/(item.depth+1))*100} endY={(it/(item.depth+2))*100} />
				)})}
			</svg>
			);
	});

	return nodes;
}

const TreeView = observer(class TreeView extends Component {
	constructor(props){
		super(props);	
	}
	componentWillMount(){
      treeStore.initiateTree();
    }
    handleClickX(e){
      let xNew = treeStore.curNode.xCoord+10;
      treeStore.curNode.changeNodeCoord(xNew, treeStore.curNode.yCoord);
    }
    handleClickY(e){
      let yNew = treeStore.curNode.yCoord+10;
      treeStore.curNode.changeNodeCoord(treeStore.curNode.xCoord, yNew);
    }
    handleClickAdd(e){
    	treeStore.renderNewNode();
    }
	render(){
		const treeR = TreeRend(treeData);
/*		const treeRaw = recursiveRand(0, rawNodes, 1, 300, 300);*/
		return (
			<div>
			  <button onClick={this.handleClickX.bind(this)}>X++</button>
              <button onClick={this.handleClickY.bind(this)}>Y++</button>
              <button onClick={this.handleClickAdd.bind(this)}>new node</button>
            <svg width={window.innerWidth} height={window.innerHeight} id="svg-list" className="tree-node">
                   
                {
                	treeStore.nodesTree.map((item,index) => {return <TreeNode circleX={item.xCoord} circleY={item.yCoord} circleR={item.nodeId} key={index} />})
           		}

               
                {treeR}
            </svg>
            </div>
		);
	}
});

export default TreeView;