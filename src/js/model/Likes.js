export default class Likes{
    constructor(){
        this.likes=[];
    }

    addItem(id,author,title,imgurl){
        const item = {
            id,
            author,
            title,
            imgurl
        };

        this.likes.push(item);
        this.setLocalStorage();
        return item;
    }

    deleteItem(id){
        const index = this.likes.findIndex(ele=>{
            return ele.id===id;
        });
        this.likes.splice(index,1);
        this.setLocalStorage();
    }

    isLiked(id){
        console.log(this.likes)
        return this.likes.findIndex(ele=>{return ele.id===id;})!==-1;
    }

    setLocalStorage(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }

    getLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
};