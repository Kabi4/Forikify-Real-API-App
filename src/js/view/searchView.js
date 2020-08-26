import {element} from './../DOM Elements/Elements';

export const getInputValue = ()=>{
    return element.searchInput.value;
};

export const clearInputField = ()=>{
    element.searchInput.value = "";
};

export const cropTitle = (title,limit=17)=>{
    if(title.length>limit){
        let answer = "";
        answer = title.split(' ').reduce((res,cur)=>{
            if(res.length+cur.length<limit){
                res=res +" "+ cur;
            }
            return res;
        })
        title=answer+"...";
        return title;
    }
    return title;
};

const renderRecipe = (recipe)=>{
    const markup =`
    <li>
        <a class="results__link" href="#${recipe.recipe_id}" <!--id="${recipe.recipe_id}-->">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Recipe Img">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${cropTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    element.resultList.insertAdjacentHTML('beforeend',markup);
};

export const clearButtons = ()=>{
    element.pages.innerHTML = "";
};

const rederButton = (page,type) => {
    if(type==='prev'){
        return `
        <button class="btn-inline results__btn--prev" data-goto="${page-1}">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-left"></use>
            </svg>
            <span>Page ${page-1}</span>
        </button>
    `;
    }else if(type==='next'){
        return `
        <button class="btn-inline results__btn--next" data-goto="${page+1}">
            <span>Page ${page+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </button>
    `;
    }
    
};

const renderButtons = (page,totalPage)=>{
    if(page===1 && totalPage>1){
        const buttonHtml = rederButton(page,'next');
        clearButtons();
        element.pages.insertAdjacentHTML('afterbegin',buttonHtml);
    }else if(page<totalPage){
        const buttonHtml = `
        ${rederButton(page,'next')}
        ${rederButton(page,'prev')}
        `;
        clearButtons();
        element.pages.insertAdjacentHTML('afterbegin',buttonHtml);
    }
    else if(page===totalPage && totalPage>1){ 
        const buttonHtml = rederButton(page,'prev');
        clearButtons();
        element.pages.insertAdjacentHTML('afterbegin',buttonHtml);
    }
};

export const renderingRecipes = (recipes,page=1,itemsPerPage=10)=>{
    const totalPages = Math.ceil(recipes.length/itemsPerPage);

    const start = (page-1)*itemsPerPage;
    const end = page*itemsPerPage;
    recipes.slice(start,end).forEach(renderRecipe);

    renderButtons(page,totalPages);
};

export const clearRecipes = ()=>{
    element.resultList.innerHTML = " ";
}