import React, { Component } from 'react';
import '../style/TreeView.css';

class TreeNode extends Component {
	constructor(props){
		super(props)
	}
	render(){
		const {circleX, circleY, circleR, label} = this.props;
		
		return (
			<svg>
			    <text x={circleX} y={circleY} fontFamily="sans-serif" fontSize="20px" fill="red">{label}</text>
                <circle className="tree-node_item" cx={circleX} cy={circleY} r={circleR} />
           </svg>

		);
	}
}

export default TreeNode;