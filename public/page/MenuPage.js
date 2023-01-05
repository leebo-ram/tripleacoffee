import Navbar from "../component/Navbar.js";
import MenuCategory from "../component/MenuCategory.js";
import MenuList from '../component/MenuList.js';
import BottomArrow from "../component/BottomArrow.js";
import ShoppingBk from "../component/ShoppingBk.js";

export default function MenuPage({ $target, initialState }) {
    console.log(1)
    //상태관리
    this.state = {
        $target,
        menuData: initialState.menuData,
        initialized: initialState.initialized
    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }







    // 렌더 함수
    this.render = () => {

        // 최상단 요소
        // this.$element2 = document.createElement('section');
        // this.$element2.className = "section";
        // this.$element2.id = "work";
        // $target.appendChild(this.$element2);
        this.$element = document.createElement('div');
        this.$element.className = 'section__container';
        document.getElementById('work').appendChild(this.$element);
        const section__container = document.querySelector('.section__container');

        new Navbar({
            $target,
            initialState: this.state
        }).render();
        new MenuCategory({
            $target: section__container,
            initialState: this.state
        }).render();
    
        new MenuList({
            $target: section__container,
            initialState: this.state
        }).render()

        new BottomArrow({
            $target: section__container,
            initialState: this.state
        }).render()

        new ShoppingBk({
            $target: $target,
            initialState: this.state
        })
    }
    
    this.render()

    // // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
