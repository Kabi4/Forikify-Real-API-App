import {element} from './../DOM Elements/Elements';

export const addItemToCart = (item) =>{
    const markup = `
        <li class="shopping__item" data-id="${item.id}">
            <div class="shopping__count">
                <input type="number" value=${item.count} step=${item.count} min=0>
                <p>${item.type}</p>
            </div>
            <p class="shopping__description">${item.indigrent}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    element.shoppingCart.insertAdjacentHTML('beforeend',markup);
};

export const deleteItemFromCart = (ele) =>{
    ele.parentElement.removeChild(ele);
};