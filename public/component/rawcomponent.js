export default function ComponentName({ $target, initialState }) {

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
    this.$element = document.createElement('div');
    this.$element.className = 'ComponentName';
    
    $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `

        `
    }
    
    this.render()

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {

    })
}
