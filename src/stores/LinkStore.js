
import { extendObservable } from 'mobx';
import TreeLink from '../components/TreeLink';
import React from 'react';

class LinkStore {
    constructor () {
        extendObservable(this,{
            
            rootId: 0,
            endId: 0,
            show: true,
            expanded: true,
            startX: 0,
            endX: 0,
            startY: 0,
            endY: 0,
            expandX: 0,
            expandY: 0,

            get curEndX(){
                return (this.show ? this.endX : this.expandX);

            },
            get curStartX(){
                return (this.show ? this.startX : this.expandX);
            },
            get curEndY(){
                return (this.show ? this.endY : this.startY);
            },
            get curStartY(){
                return (this.show ? this.startY : this.expandY);
            },
            get trans(){
                },
            get styler() {
                return this.show? '':'hidden';
            },
            get linkRend(){
                return (<TreeLink style={this.trans} styler={this.styler} key={this.rootId+"-"+this.endId} startX={this.curStartX} endX={this.curEndX} startY={this.curStartY} endY={this.curEndY} />);
            }
        });
    }
    initLink(nodeFrom, nodeTo, nodeRadius){
        this.rootId = nodeFrom.id;
        this.endId = nodeTo.id;
        this.show = nodeTo.show;
        this.startX = nodeFrom.nodeX+nodeRadius;
        this.endX = nodeTo.nodeX-nodeRadius;
        this.startY = nodeFrom.nodeY;
        this.endY = nodeTo.nodeY;
    }
    toggleVisibility(){

        this.show = !this.show;
    }

    makeVisible(node){
        this.expandX = node.nodeX;
        this.expandY = node.nodeY;
        this.show = true;

    }

    makeHidden(node){
        this.expandX = node.nodeX;
        this.expandY = node.nodeY;
        this.show = false;
    }
}

const linkStore = new LinkStore();

export default linkStore;
export { LinkStore };