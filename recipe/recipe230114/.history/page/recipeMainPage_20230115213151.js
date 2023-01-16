import orderNum from '../component/orderNum.js';
import orderList from '../component/orderList.js';

export default function recipeMainPage({ $target, initialState }) {
    //상태관리
    this.state = {
        ...initialState
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
        this.$element = document.createElement('div');
        this.$element.className = 'recipe_wrap';
        document.getElementById('recipe').appendChild(this.$element);
        // const recipe_wrap = document.querySelector(
        //     '.recipe_wrap'
        // );

        new orderNum({
            $target,
            initialState: this.state
        }).render();

        new orderList({
            $target,
            initialState: this.state
        }).render();

        // new MenuList({
        //     $target: section__container,
        //     initialState: this.state
        // }).render()

        // new ShoppingBk({
        //     $target: $target,
        //     initialState: {
        //         basket: this.state.basket,
        //         nth_content: this.state.nth_content
        //     }
        // })
    };

    this.render();

    // // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
