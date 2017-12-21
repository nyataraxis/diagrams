
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
            get styler() {
                return this.show? '':'hidden';
            },
            get linkRend(){
                return (<TreeLink styler={this.styler} key={this.rootId+"-"+this.endId} startX={this.startX} endX={this.endX} startY={this.startY} endY={this.endY} />);
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
    toggleVisibility(){

        this.show = !this.show;
    }

    makeVisible(){
        this.show = true;
    }

    makeHidden(){
        this.show = false;
    }
}

const linkStore = new LinkStore();

export default linkStore;
export { LinkStore };