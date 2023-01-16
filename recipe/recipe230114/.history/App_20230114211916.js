import Orderlist from './orderNum.js';

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

    new Orderlist({
        $target

    }).render()

    
    // 렌더 함수
    this.render = () => {
        
    };


    this.render();
    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {});
}
