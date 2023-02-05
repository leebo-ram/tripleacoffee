
export default function RecipeTitle({ $target, initialState }) {
    //상태관리
    this.state = {
        presentPage: 'recipe',
        ...initialState
    };
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        this.render();
    };

    // 최상단 요소
    this.$element = document.createElement('section');
    this.$element.id = 'main_recipe';

    $target.appendChild(this.$element);
    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
                <div class="main__recipe_title">
                <p>${this.state.presentPage == 'recipe' ? 'Triple A Coffee Recipe' : 'Base Recipe'}</p>
                <a>
                    <button id="recipe_page_btn">${this.state.presentPage == 'recipe' ? '베이스 만들기' : '주문목록'}</button>
                </a>
                </div>
            `;
    };



    this.render();

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {
    });
}
