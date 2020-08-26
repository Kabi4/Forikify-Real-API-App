import {element} from './../DOM Elements/Elements';
import {Fraction} from "fractional";

export const clearRecipies = () =>{
    element.recipeDescription.innerHTML = "";
};

const MakeFractional = (digit) =>{
    if(digit){
        const [inte,deci] = digit.toString().split(".").map(el=>parseInt(el));

        if(deci===0){
            return `${inte}`;
        }
        
        if(!deci){
            return digit;
        }
        
        if(inte === 0){
            const fr = new Fraction(digit);
            if(fr.numerator===33&&fr.denominator===100){
                fr.numerator = 1;
                fr.denominator = 3;
            }
            return `${fr.numerator}/${fr.denominator}`
        }
        else{
            const fr = new Fraction(digit-inte);
            if(fr.numerator===33&&fr.denominator===100){
                fr.numerator = 1;
                fr.denominator = 3;
            }
            return `${inte} ${fr.numerator}/${fr.denominator}`
        }
    }
}

export const highlightSelected = (id)=>{
    const getAll = Array.from(document.querySelectorAll(".results__link"))
    getAll.forEach(ele=>{
        ele.classList.remove('results__link--active');
    })
    const ele = document.querySelector(`a[href='#${id}']`);
    if(ele){
        ele.classList.toggle('results__link--active');
    }
}

const getItem = (item) => {
    //console.log(MakeFractional(item.count));
    return `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${MakeFractional(item.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${item.unit}</span>
            ${item.ingredient}
        </div>
    </li>
    `;
};

export const renderRecipies = (recepie,isLiked)=>{
    const markup = `
    <figure class="recipe__fig">
        <img src="${recepie.image}" alt="Tomato" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recepie.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recepie.cookingTime}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recepie.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked?"":'-outlined'}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recepie.ingredients.map(ele=>{
                return getItem(ele);
            }).join("")}
        </ul>
        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;
    element.recipeDescription.insertAdjacentHTML('afterbegin',markup);
};

export const updateServings = (recepie) =>{
    document.querySelector('.recipe__info-data--people').textContent = recepie.servings;

    const allIng = Array.from(document.querySelectorAll('.recipe__count'));
    allIng.forEach((ele,i)=>{
        ele.textContent = MakeFractional(recepie.ingredients[i].count);
    })
};