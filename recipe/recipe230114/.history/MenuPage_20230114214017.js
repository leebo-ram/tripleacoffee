import orderNum from './component/orderNum';
import orderList from './component/orderList';

export default function MenuPage({ $target, initialState }) {
    //상태관리
    this.state = {
        data: '',
    };
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        this.render();
    };

    // 렌더 함수
    this.render = () => {
        // 최상단 요소
        this.$element = document.createElement('div');
        this.$element.className = 'recipe_wrap';

        $target.appendChild(this.$element);

        new orderNum({
            $target,
            initialState: this.state,
        }).render();

        new orderList({
            $target,
            initialState: this.state,
        }).render();
    };

    this.render();

    // // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
