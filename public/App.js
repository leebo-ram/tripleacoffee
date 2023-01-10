import {request} from "./api.js";

import HomePage from "./page/HomePage.js";
import MenuPage from "./page/MenuPage.js";
import OptionPage from "./page/OptionPage.js";
import PaymentPage from "./page/PaymentPage.js";


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
            menuData: this.state.menuData,
            basket: this.state.basket
        }
    });

    const optionPage = new OptionPage({
        $target,
        initialState: {
            selectedMenu: this.state.selectedMenu
        }
    });

    const paymentPage = new PaymentPage({
        $target,
        initialState: {
            basket: this.state.basket
        }
    })
    const optionPopup = document.createElement('div');
    optionPopup.className = 'optionPopup';


    this.setState = (nextState) => {
        if(this.state.presentPage != nextState.presentPage && !nextState.isPopup) $target.innerHTML = ``;

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
                    initialized: this.state.initialized,
                    basket: this.state.basket
                })
                
                //menuPage.render();
                break;
            
            case 'option':
                if(!document.querySelector('.optionPopup')) {
                    $target.appendChild(optionPopup);
                }
                optionPage.setState({
                    selectedMenu: this.state.selectedMenu,
                    loaded: false
                })
                break;

            case 'payment':
                if(!document.querySelector('.optionPopup')) {
                    $target.appendChild(optionPopup);
                }
                paymentPage.setState({
                })
                break;
        
            default:
                homePage.render();
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
        if(this.state.presentPage == 'home') {
            if(e.target.closest('div').className === "bigconts") {
                this.setState({
                    initialized: true,
                    presentPage: 'menuPage'
                })
                return;
            }
        }
        


        // menuPage 클릭이벤트 
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
            if(e.target.closest('a')) {
                if(e.target.closest('a').classList) {

                    const dataset = e.target.closest('a').dataset;
                    this.setState({ 
                        presentPage: 'option',
                        selectedMenu: {
                            m_idx: dataset.idx,
                            m_name: dataset.name,
                            m_price: dataset.price,
                            m_img: dataset.img,
                            m_options: dataset.options
                        },
                        isPopup: true,
                    })
                    return;
                }
            }

            // 장바구니 수량증감
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'showMenu__plus__btn') {
                    const target = e.target.closest('button').parentNode.firstElementChild
                    target.value++;
                    for(let i=0; i<this.state.basket.length; i++) {
                        if(this.state.basket[i].m_idx == e.target.closest('button').dataset.idx) {
                            this.state.basket[i].m_price = parseInt(parseInt(this.state.basket[i].m_price) / parseInt(this.state.basket[i].m_quantity))*target.value
                            this.state.basket[i].m_quantity = target.value;
                        }
                    }
                    console.log(this.state.basket)
                    this.setState({
                        basket: this.state.basket
                    })

                }else if(e.target.closest('button').className == 'showMenu__minus__btn') {
                    const target = e.target.closest('button').parentNode.firstElementChild
                    if(target.value > 1) target.value--;
                    for(let i=0; i<this.state.basket.length; i++) {
                        if(this.state.basket[i].m_idx == e.target.closest('button').dataset.idx) {
                            this.state.basket[i].m_price = parseInt(parseInt(this.state.basket[i].m_price) / parseInt(this.state.basket[i].m_quantity))*target.value
                            this.state.basket[i].m_quantity = target.value;
                        }
                    }
                    this.setState({
                        basket: this.state.basket
                    })
                }
            }

            // 전체취소 버튼 클릭
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'cancel___btn') {
                    this.setState({
                        basket: []
                    });
                }
            }


            // 결제버튼 클릭
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'payment___btn') {
                    if(this.state.basket.length > 0) {
                        console.log('payment클릭')
                        this.setState({ 
                            presentPage: 'payment',
                            isPopup: true,
                        })
                        return;
                        
                    }

                }
            }

        }

        // optionPage 클릭이벤트
        // 취소, 메뉴담기 버튼 클릭
        if(this.state.presentPage == 'option') {
            if(e.target.closest('button')) {
                if(e.target.closest('button').classList.contains('cart__cancel__Btn')) {
                    this.setState({
                        presentPage: 'menuPage',
                        isPopup: false
                    })
                }else if(e.target.closest('button').classList.contains('cart__ok__Btn')) {
                    console.log('메뉴담기 버튼 클릭');
                    let optionstr = '';
                    let price = 0;
                    const options = document.getElementsByClassName('option__text__hiden');
                    const quantity = document.getElementById('option_show_input').value;
                    for(let i=0; i<options.length; i++) {
                        if(options[i].firstElementChild.textContent) {
                            optionstr += options[i].firstElementChild.textContent + ";";
                            price += parseInt(options[i].lastElementChild.textContent.replace('원','').replace(',',''));
                        }
                    }
                    this.state.basket.push({
                        m_idx: this.state.selectedMenu.m_idx,
                        m_name: this.state.selectedMenu.m_name,
                        m_quantity: quantity,
                        m_price: (price + parseInt(this.state.selectedMenu.m_price))*parseInt(quantity),
                        m_options: optionstr,
                        m_img: this.state.selectedMenu.m_img
                    })
                    this.setState({
                        presentPage: 'menuPage',
                        isPopup: false,
                        basket: this.state.basket
                    })
                    
                }
            }

        }

    })




    //new ImportRecipe({ $target }).render()
}