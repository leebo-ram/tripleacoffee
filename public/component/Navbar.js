export default function Navbar({ $target, initialState }) {

    //상태관리
    this.state = {
        $target,
        initialState
    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    // 최상단 요소
    this.$element = document.createElement('section');
    this.$element.className = 'navbar___logo';
    
    $target.prepend(this.$element)

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `    
        <a id="logo_home"><i class="fas fa-home"></i></a>  
        <img src="../img/0_logo/logo_h.jpg" alt="tripleacoffee_logo" class="logo___img">
        `
    }
    
    this.render()

    // // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
