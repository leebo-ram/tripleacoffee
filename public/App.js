import ImportRecipe from "./component/ImportRecipe.js"

export default function App({ $target }) {
    this.state = {}
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
    }

    new ImportRecipe({ $target }).render()
}