import orderNum from './component/orderNum.js';
import orderList from './component/orderList.js';

export default function App({ $target }) {


    //상태관리
    this.state = {
        
    };
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };


        this.render();
    };

    // 최상단 요소


    new orderNum({
        $target,
        initialState: this.state
    }).render();

    new orderList({
        $target: recipe_wrap,
        initialState: this.state
    }).render();

    
    // 렌더 함수
    this.render = () => {
        
    };


    this.render();
    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {});
}
