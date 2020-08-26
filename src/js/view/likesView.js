import {element} from './../DOM Elements/Elements';
import {cropTitle} from './../view/searchView'

export const toggleHeart = (isLiked)=>{
    const icon = isLiked?'':'-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#icon-heart${icon}`);
};

export const toggleLikemenu = (nooflikes)=>{
    const bool = nooflikes>0?true:false;
    element.likeMenu.style.visibility = bool?'visible':'hidden';
    element.likeMenu.style.opacity = bool?'1':'0';
}

export const addItemToLikeUI = (item)=>{
    const markup = `
        <li>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.imgurl}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${cropTitle(item.title)}</h4>
                    <p class="likes__author">${item.author}</p>
                </div>
            </a>
        </li>
    `;
    element.likeList.insertAdjacentHTML('beforeend',markup);
};

export const deleteItemFormUI = (id)=>{
    const ele = document.querySelector(`.likes__link[href='#${id}']`).parentElement;
    ele.parentElement.removeChild(ele);
};