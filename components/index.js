import '../assets/styles/style.scss';
import { renderSideMenu } from './SideMenu/SideMenu';
import { renderMain } from './Main/Main';
import { renderCardInfo } from './CardInfo/CardInfo';
import { el } from '../utils/createElement';
import { renderBookmark } from './Bookmark/Bookmark';
import { MainSearch } from './MainSearch/MainSearch';
import { MainExploreRecipes } from './MainExploreRecipes/MainExploreRecipes';
import bookmark from '../assets/svg/bookmark.svg';
import bookmarkWhite from '../assets/svg/bookmarkWhite.svg';
import { getData } from '../utils/getData'; //спросить как это работает, пери удаленнии ломается, при закомментированном виде работае

export const renderAll = ({component, selectedItem, isOpenModal, isRecipeSelected, data}) => {
  // console.log()
  const $container = document.querySelector('.container');
  console.log({component, selectedItem, isOpenModal, isRecipeSelected, data});

  if (isOpenModal !== undefined && isOpenModal !== null) {

    if (isOpenModal) {
      $container.style.position = 'fixed';
    } else {
      $container.style.position = 'static';
    }
  }

  if (component !== undefined && component !== null) {
    const selected = isRecipeSelected ? `${bookmark}` : `${bookmarkWhite}`;

    if ($container.childNodes.length === 3) {
      $container.childNodes?.[2].replaceWith($container.appendChild(renderCardInfo({
        recipe: component,
        isSelected: selected
      })));
      return;
    }

    document.querySelector('.main').style.width = '850px';
    document.querySelector('.cards-container').style.overflowY = 'scroll';
    document.querySelector('.cards-container').style.height = '200px';

    $container.appendChild(renderCardInfo({recipe: component, isSelected: selected}));
  }

  if (selectedItem) {
    if (document.querySelector(`.${selectedItem}`) !== null) {

      if (document.querySelector(`.${selectedItem}`).classList.contains('side-menu__selected')) {
        for (let i = 0; i < document.querySelector('.side-menu').children.length; i++) {
          document.querySelector(`.side-menu`).children[i].classList.remove('side-menu__selected');
        }
      } else {
        for (let i = 0; i < document.querySelector('.side-menu').children.length; i++) {
          document.querySelector(`.side-menu`).children[i].classList.remove('side-menu__selected');
        }
        document.querySelector(`.${selectedItem}`).classList.add('side-menu__selected');
      }

    }

    const $main = document.querySelector('.main');

    if (selectedItem === 'side-menu__bookmark-icon') {

      for (let i = 0; i < $main.children.length; i++) {
        if ($main.children[i].className === 'search') {
          $main.children[i].replaceWith(renderBookmark());
        }
        if ($main.children[i].className === 'explore') {
          $main.children[i].remove();
        }
      }
    } else {
      const data = JSON.parse(localStorage.getItem('db'));
      for (let i = 0; i < $main.children.length; i++) {
        if ($main.children[i].className === 'bookmark') {
          $main.children[i].replaceWith(MainSearch(data.recipes));
          $main.appendChild(MainExploreRecipes(data.recipes));
        }
      }
    }
  }

  return el('div', {
    className: 'container'
  }, [
    renderSideMenu(),
    renderMain(data),
  ]);
};

window.onload = () => getData();

