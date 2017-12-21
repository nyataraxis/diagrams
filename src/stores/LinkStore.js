
import { extendObservable } from 'mobx';
import TreeLink from '../components/TreeLink';
import React from 'react';

class LinkStore {
    constructor () {
        extendObservable(this,{
            
            rootId: 0,
            endId: 0,
            show: true,
            startX: 0,
            endX: 0,
            startY: 0,
            endY: 0,
            get linkRend(){
                let displayer = this.show ? 'block' : 'none';
                return (<TreeLink key={this.rootId+"-"+this.endId} startX={this.startX} endX={this.endX} startY={this.startY} endY={this.endY} style={{"display": displayer,}} />);
            }
        });
    }
    initLink(nodeFrom, nodeTo){
        this.rootId = nodeFrom.id;
        this.endId = nodeTo.id;
        this.show = nodeTo.show;
        this.startX = nodeFrom.nodeX;
        this.endX = nodeTo.nodeX;
        this.startY = nodeFrom.nodeY;
        this.endY = nodeTo.nodeY;
    }
}

const linkStore = new LinkStore();

export default linkStore;
export { LinkStore };