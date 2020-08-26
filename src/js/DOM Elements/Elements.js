export const element = {
    searchButton: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    resultList: document.querySelector('.results__list'),
    result: document.querySelector('.results'),
    pages: document.querySelector('.results__pages'),
    recipeDescription: document.querySelector('.recipe'),
    shoppingCart: document.querySelector('.shopping__list'),
    likeList: document.querySelector('.likes__list'),
    likeMenu: document.querySelector('.likes__field')
};

export const elementsString = {
    loaderString: 'loader',
    changePageButton: 'btn-inline'
};

export const addLoader = (parent)=>{
    const loader =`
        <div class="${elementsString.loaderString}">
            <svg>
                <use xlink:href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    if(document.querySelector(`.${elementsString.loaderString}`)===null)parent.insertAdjacentHTML('afterbegin',loader);
};

export const removeLoader = ()=>{
    const loader = document.querySelector(`.${elementsString.loaderString}`);
    if(loader)loader.parentElement.removeChild(loader);
}
