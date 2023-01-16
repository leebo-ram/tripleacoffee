

export default function App({ $target }) {


const json_import = async () => {
    const data = await fetch('./recipeJson/1coffeeRecipe.json');
    console.log(data);
}

    //상태관리
    this.state = {

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
    this.$element.className = 'recipe_wrap';
    
    $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
            // json에서 받아온 데이터를 이용해 이곳에다가 html코드 적으면 됩니다
        `
    }
    
    this.render()

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {

    })
}
