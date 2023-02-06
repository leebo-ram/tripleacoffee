import {request} from "./api.js";

import ImportRecipe from "./component/ImportRecipe.js";


export default function App({ $target }) {

    this.state = {

    }

    new ImportRecipe({
        $target,
        initialState: {}
    })

    this.setState = (nextState) => {


        this.state = {
            ...this.state,
            ...nextState
        }

        this.render();
    }

    this.render = () => {

    }




    $target.addEventListener('click',(e) => {
    })
    //new ImportRecipe({ $target }).render()
}