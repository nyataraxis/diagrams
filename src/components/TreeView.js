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
    linksTo: [4],
    onionLinksTo: [4,5],
  },
  {
    id: 3,
    name: "firstlev chil2",
    depth: 1,
    linksTo:[7]
  },
  {
    id: 4,
    onionArr: [
    	{
    		id: 8,
    		name: "oni"
    	},
    	{
    		id: 9,
    		name: "on"
    	}
    ],

    name: "onionPair",
    linksTo: [6],
    //onionChild:[6],
    depth: 2
  },
  {
    id: 5,
    name: "onionPair",
    //linksTo: [6],
    //onionChild:[6],
    depth: 2
  },
  {
  	id: 6,
  	name: "onionchild",
  	depth: 4
  },
  {
    id: 7,
    name: "onemoreChild",
    depth: 2
  }
];

function recNode(nodeId, arr, minY, maxY, stepWidth, retArr){
    let node = arr[nodeId-1];
    
    let nodeCount = node.linksTo ? node.linksTo.length : 0;
    let onionCount = node.onionArr ? node.onionArr.length : 0;
    let onionLinksTo = null;
    let onionLinksRend = null;
    let linksToRend = null;
    //let onionCount = node.onionLinksTo ? node.onionLinksTo.length : 0;
    //let totalCount = nodeCount+onionCount;
    if (nodeCount > 0) {
      if( onionCount>0 ){
      	onionLinksTo = [];
      	onionLinksRend = [];
        let nodes = node.onionArr.map((it,ind) => {
        	let offY = Math.round((maxY-minY)/onionCount);
    	    let minNY = ind*offY+minY;
    	    let maxNY = (ind+1)*offY+minY;
    	    let nX =(node.depth+1)*stepWidth;
    	    let nY = (minNY+maxNY)/2;
            
        	let curOni = {
        		id: it.id,
            	name: it.name,
            	show: false,
            	depth: node.depth+1,
                nodeX: nX,
                nodeY: nY,
                linksTo: node.linksTo,
                nodeRend: <TreeNode key={it.id} circleX={nX} circleY={nY} circleR={10} label={it.name} />,
			    linksRend: [(<TreeLink key={it.id} startX={nX} endX={(node.depth+2)*stepWidth} startY={nY} endY={(minY+maxY)/2} />)]
        	};
            
            let onionLink = <TreeLink key={it.id} startX={node.depth*stepWidth} endX={nX} startY={(minY+maxY)/2} endY={nY} />;
		    onionLinksRend.push(onionLink);
        	onionLinksTo.push(it.id);
        	retArr.push(curOni);
        	recNode(node.linksTo[0], arr, minY, maxY, stepWidth, retArr);
        })
      } else {
      	linksToRend = [];
        let nodes = node.linksTo.map((it,ind) => {
    	let offY = Math.round((maxY-minY)/nodeCount);
    	let minNY = ind*offY+minY;
    	let maxNY = (ind+1)*offY+minY;
        let linkRend = <TreeLink key={it} startX={node.depth*stepWidth} endX={(node.depth+1)*stepWidth} startY={(minY+maxY)/2} endY={(minNY+maxNY)/2} />
		linksToRend.push(linkRend);		
    	console.log("it: "+it+" minNY "+minNY+" maxNY: "+maxNY+" minY: "+minY+" maxY: "+maxY);
        recNode(it, arr, minNY, maxNY, stepWidth, retArr);
      });
      }/*
      let onions = node.onionLinksTo.map((it, ind) => {
      	let offY=maxY/
      })	*/
    }
    let nX = node.depth*stepWidth;
    let nY = (minY+maxY)/2;
    let retNode = {
    	id: node.id,
    	name: node.name,
    	show: false,
    	depth: node.depth,
        nodeX: nX,
        nodeY: nY,
        linksTo: onionLinksTo ? onionLinksTo : (node.linksTo ? node.linksTo : null),
        nodeRend: <TreeNode key={node.id} circleX={nX} circleY={nY} circleR={10} label={node.name} />,
        linksRend: onionLinksRend ? onionLinksRend : (linksToRend ? linksToRend : null)
    }
    retArr.push(retNode)
	
}


function TreeRendRight(tree){
	console.log(tree);
    let nodes = tree.map((item, index) => {
		
		return (
            <svg>
			<TreeNode key={item.id} circleX={item.nodeX} circleY={item.nodeY} circleR={10} label={item.name} />
			{item.linksTo && item.linksTo.map((it, ind) => {
				let linked = tree.find((element, i)=>{return (element.id == it)});
				return(
				<TreeLink key={it.id} startX={item.nodeX} endX={linked.nodeX} startY={item.nodeY} endY={linked.nodeY} />
				);
			}
			)
		    }
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
		/*const treeR = TreeRend(treeData);*/
		const nodeArr = [];
		recNode(1, treeData, 0, 500, 100, nodeArr);
		const treeRight = TreeRendRight(nodeArr);
/*		const treeRaw = recursiveRand(0, rawNodes, 1, 300, 300);*/
		return (
			<div>
			  <button onClick={this.handleClickX.bind(this)}>X++</button>
              <button onClick={this.handleClickY.bind(this)}>Y++</button>
              <button onClick={this.handleClickAdd.bind(this)}>new node</button>
            
            <svg width={600} height={600} id="svg-list-new" className="tree-node">
              {nodeArr.map((item, index) => item.nodeRend)}
              {nodeArr.map((item, index) => {return(item.linksRend && item.linksRend.map((elem, val) => elem))})}
            </svg>
            </div>
		);
	}
});

export default TreeView;

/*

const treeDataRec = [
  {
  	id: 1,
    name: "root",
    depth: 0,
    children: [
        {
            id: 2,
            name: "firstlev onion child",
            depth: 1,
            oniChildren: [
                {
                    id: 4,
                    name: "onionPair",
                    depth: 2
                },
                {
                    id: 5,
                    name: "onionPair",
                    depth: 2
                },
            ],
            oniRoot: {
  	            id: 6,
  	            name: "onionchild",
  	            depth: 3
            }, 
        },
        {
            id: 3,
            name: "firstlev chil2",
            depth: 1,
            children:[
            {
                id: 7,
                name: "onemoreChild",
                depth: 2
            }
            ]
        }
    ]
  },
  
  
  
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
    depth: 3,
    isOnion: true
  },
  {
    id: 5,
    name: "onionPair",
    depth: 3,
    isOnion: true
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
}*/