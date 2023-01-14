import {io} from '../../node_modules/socket.io-client/build/esm/index.js';

export default function RecipePractice({ $target, initialState }) {
    this.state = {
        ...initialState,
        receivedData: ''
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

    this.render()
    }

    this.$element = document.createElement('div');
    this.$element.className = 'recipePractice';
    

    this.render = () => {
        $target.appendChild(this.$element);
        this.$element.innerHTML = `${this.state.receivedData}`;
    }

    const recipeChat = io('/recipe');
    
    recipeChat.emit("recipe transfer", {
        name: 'recipeDevice',
        room: 'recipe',
        msg: 'logged in'
    });

    recipeChat.on("recipe transfer", function(data) {
        this.setState({
            receivedData: data
        });
    });



    this.render();
}