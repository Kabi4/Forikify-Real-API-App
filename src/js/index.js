import Search from './model/Search';
import Recipe from './model/Recipie';
import List from './model/List'
import {element,addLoader,removeLoader, elementsString} from './DOM Elements/Elements';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/Listview';

const state = {};

const Searching = async ()=>{
    const query = searchView.getInputValue();
    searchView.clearInputField();
    if(query){
        searchView.clearRecipes();
        searchView.clearButtons();

        addLoader(element.result);

        state.search = new Search(query);

        await state.search.getData();

        removeLoader();

        searchView.renderingRecipes(state.search.recipes);
    }
}

element.searchButton.addEventListener('submit',e=>{
    e.preventDefault();
    Searching();
});

element.pages.addEventListener('click',(e)=>{
    const btn = e.target.closest(`.${elementsString.changePageButton}`);
    const goto = parseInt(btn.dataset.goto);
    searchView.clearRecipes();
    searchView.renderingRecipes(state.search.recipes,goto);
});

const GettingRecipe = async ()=>{
    const id = window.location.hash.replace('#','');
    if(id){
        recipeView.clearRecipies();
        addLoader(element.recipeDescription);
        recipeView.highlightSelected(id); 
        state.recipe = new Recipe(id);
        await state.recipe.getRecipe();
        state.recipe.calcServing();
        state.recipe.calcTime();
        state.recipe.parseIngredients();
        recipeView.renderRecipies(state.recipe);
        removeLoader();
    }
};

window.addEventListener('hashchange',(e)=>{
    e.preventDefault();
    GettingRecipe();
});

window.addEventListener('load',GettingRecipe);

// ['hashchange','load'].forEach((e)=>{
//     window.addEventListener(e,GettingRecipe);
// })

element.recipeDescription.addEventListener('click',(e)=>{
    const btn = e.target.closest('.recipe__btn');
    if(btn){
        if(!state.list)state.list = new List();
        //console.log(state.recipe.ingredients)
        state.recipe.ingredients.forEach(ele=>{
            state.list.addItems(ele.count,ele.unit,ele.ingredient);
        })
        //console.log(state.list);
        window.l = state.list;
        state.list.items.forEach(ele=>{
            listView.addItemToCart(ele);
        });
    }
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings>1){
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    }
    else if(e.target.matches('recipe__btn, recipe__btn *')){
        
    }    
});


element.shoppingCart.addEventListener('click',(e)=>{
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //console.log("delete");
        const item = e.target.closest('.shopping__item');
        //console.log(item.parentElement);
        state.list.deleteItem(item.dataset.id);
        //console.log(state.list);
        listView.deleteItemFromCart(item);
    }
    if(e.target.matches('.shopping__count, .shopping__count *')){
        const item = e.target.closest('.shopping__item');
        state.list.updateItems(item.dataset.id,e.target.value);
        //console.log(state.list);
    }
});

element.shoppingCart.addEventListener('change',(e)=>{
    if(e.target.matches('.shopping__count, .shopping__count *')){
        const item = e.target.closest('.shopping__item');
        state.list.updateItems(item.dataset.id,e.target.value);
        //console.log(state.list);
    }
});