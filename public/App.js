import { request } from "./api.js";

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
            m_category: '',
        },
        isPopup: false,
        basket: [],
        nth_content: 0,
        orderNum: 100
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
            basket: this.state.basket,
            nth_content: this.state.nth_content
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
            basket: this.state.basket,
            orderNum: this.state.orderNum
        }
    })

    const optionPopup = document.createElement('div');
    optionPopup.className = 'optionPopup';


    this.setState = (nextState) => {
        if(nextState.presentPage) console.log(nextState.presentPage);
        
        if (this.state.presentPage != nextState.presentPage && !nextState.isPopup) $target.innerHTML = ``;

        this.state = {
            ...this.state,
            ...nextState
        }

        switch (this.state.presentPage) {
            case 'home':
                homePage.render();
                break;

            case 'menuPage':
                menuPage.setState({
                    menuData: this.state.menuData,
                    initialized: this.state.initialized,
                    basket: this.state.basket,
                    nth_content: this.state.nth_content
                })
                break;

            case 'option':
                if (!document.querySelector('.optionPopup')) {
                    $target.appendChild(optionPopup);
                }
                optionPage.setState({
                    selectedMenu: this.state.selectedMenu,
                    loaded: false
                })
                break;

            case 'payment':
                if (!document.querySelector('.optionPopup')) {
                    $target.appendChild(optionPopup);
                }
                paymentPage.setState({
                    presentPage: 'chooseOrder',
                    choosedOrder: 'for_here',
                    mem_stamp: 0,
                    mem_mobile: '',
                    saving_stamp: 0,
                    used_stamp: 0,
                    verified: false,
                    basket: this.state.basket,
                    orderNum: this.state.orderNum
                })
                break;

            case 'recipe':
                recipePractice.setState({

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
        } catch (e) {
            console.log(e);
        }
    }


    // 초기 1회 homePage 렌더
    homePage.render();

    // 초기 1회 메뉴데이터 호출
    init();

    $target.addEventListener('click', (e) => {

        // 초기 페이지에서 메뉴리스트로 넘어감
        if (this.state.presentPage == 'home') {
            if (e.target.closest('div').className === "bigconts") {
                this.setState({
                    initialized: true,
                    presentPage: 'menuPage'
                })
                return;
            }
        }



        // menuPage 클릭이벤트 
        // 카테고리 필터링
        if (this.state.presentPage == 'menuPage') {
            if (e.target.classList.contains('category__btn')) {
                const active = document.querySelector('.category__btn.selected');
                if (active != null) {
                    active.classList.remove('selected');
                }
                if (!e.target.classList.contains('selected')) e.target.classList.add('selected');
                const filter = e.target.closest('button').dataset.filter
                const menus = document.querySelectorAll('.wrap');
                menus.forEach((wrap) => {
                    // console.log(wrap.dataset.type);
                    if (filter === '*' || filter === wrap.dataset.type) {
                        wrap.classList.remove('invisible');
                    } else {
                        wrap.classList.add('invisible');
                    }
                });

                return;
            }


            // 메뉴 선택시 옵션화면으로 넘어감, 홈 로고 클릭시 홈화면 이동
            if (e.target.closest('a')) {
                if (e.target.closest('a').className == 'wrap') {
                    const dataset = e.target.closest('a').dataset;
                    this.setState({
                        presentPage: 'option',
                        selectedMenu: {
                            m_idx: dataset.idx,
                            m_name: dataset.name,
                            m_price: dataset.price,
                            m_img: dataset.img,
                            m_options: dataset.options,
                            m_category: dataset.type,
                        },
                        isPopup: true,
                    })
                    return;
                } else if (e.target.closest('a').id == 'logo_home') {
                    this.setState({
                        presentPage: 'home',
                        isPopup: false,
                        selectedMenu: '',
                        basket: [],
                        nth_content: 0
                    })
                }
            }

            // 장바구니 수량증감
            if (e.target.closest('button')) {
                if (e.target.closest('button').className == 'showMenu__plus__btn') {
                    const target = e.target.closest('button').parentNode.firstElementChild
                    target.value++;
                    for (let i = 0; i < this.state.basket.length; i++) {
                        if (this.state.basket[i].m_idx == e.target.closest('button').dataset.idx) {
                            this.state.basket[i].m_price = parseInt(parseInt(this.state.basket[i].m_price) / parseInt(this.state.basket[i].m_quantity)) * target.value
                            this.state.basket[i].m_quantity = target.value;
                        }
                    }
                    console.log(this.state.basket)
                    this.setState({
                        basket: this.state.basket
                    })

                } else if (e.target.closest('button').className == 'showMenu__minus__btn') {
                    const target = e.target.closest('button').parentNode.firstElementChild
                    if (target.value > 1) target.value--;
                    for (let i = 0; i < this.state.basket.length; i++) {
                        if (this.state.basket[i].m_idx == e.target.closest('button').dataset.idx) {
                            this.state.basket[i].m_price = parseInt(parseInt(this.state.basket[i].m_price) / parseInt(this.state.basket[i].m_quantity)) * target.value
                            this.state.basket[i].m_quantity = target.value;
                        }
                    }
                    this.setState({
                        basket: this.state.basket
                    })
                }
            }

            // 전체취소 버튼 클릭
            if (e.target.closest('button')) {
                if (e.target.closest('button').className == 'cancel___btn cancel_all') {
                    this.setState({
                        basket: []
                    }); 
                // 물건 개별삭제
                } else if (e.target.closest('button').className == 'cancel___btn') {
                    console.log(e.target.closest('button').dataset.idx)
                    console.log(this.state.nth_content)
                    const basket_idx = e.target.closest('button').dataset.idx;
                    const temp_arr = [];
                    for (let i = 0; i < this.state.basket.length; i++) {
                        if (basket_idx != i) {
                            temp_arr.push(this.state.basket[i])
                        }
                    }
                    console.log(temp_arr)
                    if(this.state.nth_content > temp_arr.length -3 && this.state.nth_content > 0) {
                        this.setState({
                            basket: temp_arr,
                            nth_content: this.state.nth_content-1
                        })
                    }else {
                        this.setState({
                            basket: temp_arr
                        })
                    }

                }
            }
            // 장바구니 위아래 버튼
            if (e.target.closest('div')) {
                if (e.target.closest('div').className == 'shoppigBk__arrow_top') {
                    if (this.state.nth_content > 0) {
                        this.setState({
                            nth_content: this.state.nth_content - 1,
                            total_price: '0',
                            total_quantity: '0'
                        })
                    }
                } else if (e.target.closest('div').className == 'shoppigBk__arrow__down') {
                    if (this.state.nth_content < this.state.basket.length - 3) {
                        this.setState({
                            nth_content: this.state.nth_content + 1,
                            total_price: '0',
                            total_quantity: '0'
                        });
                    }

                }
            }


            // 결제버튼 클릭
            if (e.target.closest('button')) {
                if (e.target.closest('button').className == 'payment___btn') {
                    if (this.state.basket.length > 0) {
                        console.log('payment클릭')
                        this.setState({
                            presentPage: 'payment',
                            isPopup: true,
                        })
                        return;

                    }

                }
            }

            // 레시피 페이지 이동(임시)
            if(e.target.closest('img')) {
                if(e.target.closest('img').className == 'logo___img') {
                    this.setState({
                        presentPage: 'recipe',
                        menuData: ''
                    })
                }
            }

        }

        // optionPage 클릭이벤트
        // 취소, 메뉴담기 버튼 클릭
        if (this.state.presentPage == 'option') {
            if (e.target.closest('button')) {
                if (e.target.closest('button').classList.contains('cart__cancel__Btn')) {
                    this.setState({
                        presentPage: 'menuPage',
                        isPopup: false
                    })
                } else if (e.target.closest('button').classList.contains('cart__ok__Btn')) {
                    console.log('메뉴담기 버튼 클릭');
                    let optionstr = '';
                    let price = 0;
                    const options = document.getElementsByClassName('option__text__hiden');
                    const quantity = document.getElementById('option_show_input').value;
                    for (let i = 0; i < options.length; i++) {
                        if (options[i].firstElementChild.textContent) {
                            optionstr += options[i].firstElementChild.textContent.replaceAll(' ','') + ",";
                            price += parseInt(options[i].lastElementChild.textContent.replace('원', '').replace(',', ''));
                        }
                    }
                    if(optionstr != '') optionstr = optionstr.slice(0, -1)
                    this.state.basket.push({
                        m_idx: this.state.selectedMenu.m_idx,
                        m_name: this.state.selectedMenu.m_name,
                        m_quantity: quantity,
                        m_price: (price + parseInt(this.state.selectedMenu.m_price)) * parseInt(quantity),
                        m_options: optionstr,
                        m_img: this.state.selectedMenu.m_img,
                        m_category: this.state.selectedMenu.m_category,
                    })
                    this.setState({
                        presentPage: 'menuPage',
                        isPopup: false,
                        basket: this.state.basket
                    })

                }
            }

        }

        if (this.state.presentPage == 'payment') {
            if (e.target.closest('button')) {
                if (e.target.closest('button').className == 'pop__cancel__Btn' || e.target.closest('button').className == 'stamp_use_cancel') {
                    this.setState({
                        presentPage: 'menuPage',
                        isPopup: false,
 

                    })
                } else if (e.target.closest('button').className == 'pop__cancel__Btn home_Btn') {
                    this.setState({
                        presentPage: 'home',
                        isPopup: false,
                        selectedMenu: '',
                        basket: [],
                        orderNum: this.state.orderNum + 1
                    })
                }
            }
        }

    })




    //new ImportRecipe({ $target }).render()
}