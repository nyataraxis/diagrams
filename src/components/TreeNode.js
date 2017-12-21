import React, { Component } from 'react';
import '../style/TreeView.css';
import TreeStore from '../stores/TreeStore';
import { inject } from 'mobx-react';


class TreeNod extends Component {
	
	constructor(props){
		super(props);
		this.onClick = (data) => this.handleClick.bind(data, this);
	}

	handleClick(data, e){
		let nodeId = data.props.nodeId;
        data.props.treeStore.nodeClicked(nodeId);
	}
	render(){
		const {circleX, circleY, circleR, key, label, nodeId, styleName, clickable} = this.props;
		
		return (
			<svg>
			    <circle id={styleName} className="tree-node_item" cx={circleX} cy={circleY} r={circleR} onClick={clickable ? this.onClick(key) : undefined}/>
                <text x={circleX-20} y={circleY-20} className="tree-node_label" id={styleName} fontFamily="sans-serif" fontSize="11px" fill="red">{label}</text>
                           
           </svg>

		);
	}
}

const TreeNode = inject(
	stores => ({
		treeStore: stores.treeState,
	})
)(TreeNod);

export default TreeNode;