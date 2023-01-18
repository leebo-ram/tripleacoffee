export default function AllCooked({ $target, initialState }) {
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

    this.$element = document.createElement('div');
    this.$element.className = 'all__cooked';
    $target.appendChild(this.$element);
    
    this.render = () => {
        this.$element.innerHTML = `
            <button id="allcooked">
                <p>전체완료</p>
            </button>
        `;
    }

    this.render();
}