import React, { Component } from 'react';
import '../style/TreeView.css';

class TreeLink extends Component {
	constructor(props){
		super(props)
	}
	render(){
		const { startX, startY, endX, endY, styler } = this.props;
		const lineStartX = parseInt(startX);
		const lineStartY = parseInt(startY);
		const lineEndX = parseInt(endX);
		const lineEndY = parseInt(endY);
		const midX = Math.floor((lineEndX+lineStartX)/2);
		const midY = Math.floor((lineEndY + lineStartY)/2);
		const controlXComp = Math.floor((lineEndX - lineStartX)/2);
		const transYComp = Math.floor((lineEndY - lineStartY)/2);
		const polylineProps = lineStartY+","+lineStartY+" "+midX+","+lineStartY+" "+midX+","+lineEndY+" "+lineEndX+","+lineEndY;
        const polylinePathStart = "M " + lineStartX + " " + lineStartY + " q " + controlXComp + " " + 0 + " " + controlXComp + " " + transYComp + " ";
        const polylinePathEnd = "M "+midX+" "+midY+" q "+0+" "+transYComp+" "+controlXComp+" "+transYComp;
        const polylinePath = polylinePathStart + polylinePathEnd;
		return (
			
  				<path d={polylinePath} id={styler} className="tree-link" />
         
		);
	}
}

export default TreeLink;
