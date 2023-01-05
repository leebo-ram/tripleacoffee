import {request} from "./api.js";

import HomePage from "./page/HomePage.js";
import MenuPage from "./page/MenuPage.js";


export default function App({ $target }) {

    this.state = {
        menuData: '',
        initialized: false,
        presentPage: 'home'
    }

    // 전체 페이지 객체생성
    const homePage = new HomePage({
        $target: $target,
        initialState: {
            intiialized: this.state.initialized
        }
    });

    const menuPage = new MenuPage({
        $target: $target,
        initialState: {
            intiialized: this.state.initialized,
            menuData: this.state.menuData
        }
    })
        


    this.setState = (nextState) => {

        if(this.state.presentPage != nextState.presentPage) $target.innerHTML = ``;

        this.state = {
            ...this.state,
            ...nextState
        }
        
        switch(this.state.presentPage) {
            case 'home':
                homePage.render();
                break;
            
            case 'menuPage':
                menuPage.setState({ 
                    menuData: this.state.menuData,
                    initialized: this.state.initialized
                })
                
                //menuPage.render();
                break;
        
            default:
                break;
        }
    }


    // 메뉴 리스트 호출 함수
    const init = async () => {
        try {
            const menuData = await request('callmenu');
            this.setState({
                ...this.state,
                menuData: menuData
            })
        } catch(e) {
            console.log(e);
        }
    }


    // 초기 1회 homePage 렌더
    homePage.render();

    // 초기 1회 메뉴데이터 호출
    init();

    $target.addEventListener('click',(e) => {
        // 초기 페이지에서 메뉴리스트로 넘어감
        if(e.target.closest('div').className === "bigconts") {
            this.setState({
                initialized: true,
                presentPage: 'menuPage'
            })
        }

        // 카테고리 필터링
        console.log(e.target)
        const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
        if (filter == null) {
          return;
        }

        const active = document.querySelector('.category__btn.selected');
        if (active != null) {
          active.classList.remove('selected');
        }
        if(!e.target.classList.contains('selected')) e.target.classList.add('selected');
        

        const menus = document.querySelectorAll('.wrap');
        menus.forEach((wrap) => {
          // console.log(wrap.dataset.type);
          if(filter ==='*' || filter === wrap.dataset.type) {
            wrap.classList.remove('invisible');
          } else {
            wrap.classList.add('invisible');
          }
        });
    })




    //new ImportRecipe({ $target }).render()
}