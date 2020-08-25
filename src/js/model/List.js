import {element} from './../DOM Elements/Elements';

export default class List{
    constructor(){
        this.items = [];
    }
    addItems(count,type,indigrent){
        const item = {
            id: indigrent+type,
            count: parseFloat(count),
            type,
            indigrent
        };
        const index = this.items.findIndex(ele=>{
            return ele.id===item.id;
        });
        if(index===-1)this.items.push(item);
        else if(this.items[index].type===item.type){
            this.items[index].count = parseFloat(this.items[index].count)+parseFloat(item.count); 
        }else{
            this.items.push(item);
        }
    }

    updateItems(id,newValue){
        const ele = this.items.find(ele=>{
            return ele.id===id;
        });
        ele.count = newValue;
    }

    deleteItem(id){
        const index = this.items.findIndex(ele=>{
            return ele.id===id;
        });
        this.items.splice(index,1);
    }
}