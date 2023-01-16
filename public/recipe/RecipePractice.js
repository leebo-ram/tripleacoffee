
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
        console.log(data)
        dataRecieved(data)

    });

    const dataRecieved = (recievedData) => {
        this.setState({
            receivedData: recievedData
        })
    }

    this.render();
}