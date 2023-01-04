import {request} from "./api.js";

import ImportRecipe from "./component/ImportRecipe.js";
import HomePage from "./page/HomePage.js";
import MenuPage from "./page/MenuPage.js";
import MenuList from "./component/MenuList.js";

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
        
    // const menuList = new MenuList({
    //     $target: $target,
    //     initialState: {
    //         menuData: this.state.menuData,
    //         initialized: this.state.initialized
    //     }
    // });



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
        console.log()
        if(e.target.closest('div').className === "touch___btn") {
            this.setState({
                initialized: true,
                presentPage: 'menuPage'
            })
        }
    })




    //new ImportRecipe({ $target }).render()
}