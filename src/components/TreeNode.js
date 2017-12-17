import React, { Component } from 'react';
import '../style/TreeView.css';

class TreeNode extends Component {
	constructor(props){
		super(props)
	}
	render(){
		const {circleX, circleY, circleR} = this.props;
		
		return (
                <circle className="tree-node_item" cx={circleX} cy={circleY} r={circleR} />
           

		);
	}
}

export default TreeNode;