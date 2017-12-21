import React, { Component } from 'react';
import TreeNode from './TreeNode';
import TreeLink from './TreeLink';
import { Provider, observer } from 'mobx-react';
import treeStore from '../stores/TreeStore';
import '../style/TreeView.css';

const treeDatas = [
  {
  	id: 0,
    name: "root",
    depth: 0,
    linksTo: [1,2]
  },
  {
    id: 1,
    name: "firstlev onion child",
    depth: 1,
    linksTo: [3],
    onionLinksTo: [3,4],
  },
  {
    id: 2,
    name: "firstlev chil2",
    depth: 1,
    linksTo:[6]
  },
  {
    id: 3,
    onionArr: [7, 8],

    name: "onionPair",
    linksTo: [5],
    depth: 2
  },
  {
    id: 4,
    name: "onionPair",
    depth: 2
  },
  {
  	id: 5,
  	name: "onionchild",
  	depth: 4
  },
  {
    id: 6,
    name: "onemoreChild",
    depth: 2
  },
  {
   		id: 7,
    	name: "oni",
    	depth: 3
  },
  {
    	id: 8,
	  name: "on",
	  depth: 3
   	}
];


  const maxHeight = window.innerHeight;
  const maxWidth = window.innerWidth;
  const offX = 30;
  const offY = 30;
  const nodeRadius = 10;



const TreeView = observer(class TreeView extends Component {
	constructor(props){
		super(props);	
    

    treeStore.initiateTree(offX, nodeRadius, maxHeight, maxWidth, treeDatas);
	}

	render(){
		
    
    const trLinks = treeStore.linksTree.map((item,index)=> { 
                let links = item.map((it,i)=>it.linkRend);
                return links;
              });
    const trNodes = treeStore.nodesTree.map((item, index) => item.nodeRend);
    return (

			<Provider treeState={treeStore}>
            
            <svg width={maxWidth} height={maxHeight} id="svg-list-new" className="tree-node">
              
              {trLinks}

              {trNodes}

            </svg>

            
            
            </Provider>
		);
	}
});

export default TreeView;
