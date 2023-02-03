export default function BaseRecipe({ $target, initialState }) {
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
    
    this.render = () => {
        this.$element.innerHTML = `

        `;
    }

    this.render();
}