import axios from "axios";

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getData(){
        try {
            const jsonData = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.recipes = jsonData.data.recipes;
            //console.log(this.recipes);
            
        } catch (error) {
            this.recipes = [{
                recipe_id : "N/A",
                image_url: "N/A",
                publisher: 'Please Try Again',
                title: 'No Recipes Found'
            }]
        } 
    }
}
