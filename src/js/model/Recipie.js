import axios from "axios";

export default class Recepie{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            this.title = "Failed to Get Data";
            this.author = "Failed to Get Data";
            this.image = "Error Loading";
            this.url = "Not Avaiable";
            this.ingredients = ["No Data To Show"];
        }
    }

    calcTime(){
        const time = Math.ceil((this.ingredients.length/3)*15);
        this.cookingTime = time;
    }

    calcServing(){
        this.servings = 4;
    }
    
    parseIngredients(){
        const newIngredients = this.ingredients.map(el => {
            let ingredients = el+".";
            ingredients = ingredients.replace(/\([^()]*\)/g, ' ');
            ingredients = ingredients.replace(/\-/g," ");
            ingredients = ingredients.replace(/\s+/g," ");
            let ingredientsArr = ingredients.split(' ');

            let indexLast = ingredientsArr.reverse().findIndex((ele,i)=>parseInt(ele[ele.length-1])?true:false);
            ingredientsArr.reverse();

            let objingredients;


            if(indexLast==-1){
                objingredients = {
                    count: 1,
                    unit: "",
                    ingredient: ingredientsArr.join(" ")
                }
            }
            else{
                objingredients = {
                    count: eval(ingredientsArr.slice(0,(ingredientsArr.length-(indexLast))).join("+")).toFixed(2),
                    unit: ingredientsArr[ingredientsArr.length-(indexLast)],
                    ingredient: ingredientsArr.slice(ingredientsArr.length-(indexLast-1)).join(" ")
                }
            }

            //console.log(objingredients);

            return objingredients;
        });

        

        this.ingredients = newIngredients;
    }
    updateServings(type){
        const newServings = type==='dec'?this.servings-1:this.servings+1;
        const doUpdate = (ele) =>{
            ele.count = ((ele.count)*(newServings/this.servings)).toFixed(2);
        };
        this.ingredients.forEach((ele)=>{
            doUpdate(ele);
        });
        this.servings = newServings;
        //console.log(this.ingredients);
        //console.log(this.servings);
    }
};

//.replace(/\([^()]*\)/g, '')
