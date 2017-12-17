import React, { Component } from 'react';
import TreeNode from './TreeNode';
import TreeLink from './TreeLink';
import { observer } from 'mobx-react';
import treeStore from '../stores/TreeStore';
import '../style/TreeView.css';

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
		return (
			<div>
			 <button onClick={this.handleClickX.bind(this)}>X++</button>
        <button onClick={this.handleClickY.bind(this)}>Y++</button>
        <button onClick={this.handleClickAdd.bind(this)}>new node</button>
            <svg width={window.innerWidth} height={window.innerHeight} id="svg-list" className="tree-node">
                   
                {
                	treeStore.nodesTree.map((item,index) => {return <TreeNode circleX={item.xCoord} circleY={item.yCoord} circleR={item.nodeId} />})
           		}

                <TreeLink startX="40" startY="40" endX="140" endY="220"/>
            </svg>
            </div>
		);
	}
});

export default TreeView;