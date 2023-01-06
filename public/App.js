import {request} from "./api.js";

import HomePage from "./page/HomePage.js";
import MenuPage from "./page/MenuPage.js";
import OptionPage from "./page/OptionPage.js";


export default function App({ $target }) {

    this.state = {
        menuData: '',
        initialized: false,
        presentPage: 'home',
        selectedMenu: { 
            m_idx: '',
            m_name: '',
            m_price: '',
            m_img: '',
            m_options: '',
        },
        isPopup: false,
        basket: []
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

    const optionPage = new OptionPage({
        $target,
        initialState: {
            selectedMenu: this.state.selectedMenu
        }
    });
        


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
            
            case 'option':
                optionPage.setState({
                    selectedMenu: this.state.selectedMenu,
                    loaded: false
                })
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
        console.log(e.target)
        // 초기 페이지에서 메뉴리스트로 넘어감
        if(this.state.presentPage == 'home') {
            if(e.target.closest('div').className === "bigconts") {
                this.setState({
                    initialized: true,
                    presentPage: 'menuPage'
                })
                return;
            }
        }
        


        // 카테고리 필터링
        if(this.state.presentPage == 'menuPage') {
            if(e.target.classList.contains('category__btn')) {
                const active = document.querySelector('.category__btn.selected');
                if (active != null) {
                  active.classList.remove('selected');
                }
                if(!e.target.classList.contains('selected')) e.target.classList.add('selected');
                const filter = e.target.closest('button').dataset.filter
                const menus = document.querySelectorAll('.wrap');
                menus.forEach((wrap) => {
                  // console.log(wrap.dataset.type);
                  if(filter ==='*' || filter === wrap.dataset.type) {
                    wrap.classList.remove('invisible');
                  } else {
                    wrap.classList.add('invisible');
                  }
                });
                return;
            }
    
    
            // 메뉴 선택시 옵션화면으로 넘어감
            
            if(e.target.closest('a').classList) {
                console.log(33)
                const dataset = e.target.closest('a').dataset;
                this.setState({ 
                    presentPage: 'option',
                    isPopup: true,
                    selectedMenu: {
                        m_idx: dataset.idx,
                        m_name: dataset.name,
                        m_price: dataset.price,
                        m_img: dataset.img,
                        m_options: dataset.options
                    }
                })
                return;
            }
        }

        if(this.state.presentPage == 'option') {
            console.log(e.target.closest('button'))
            if(e.target.closest('button').classList.contains('cart__cancel__Btn')) {
                console.log(3)
                this.setState({
                    presentPage: 'menuPage',
                    isPopup: false
                })
            }else {
    
            }
        }

    })




    //new ImportRecipe({ $target }).render()
}