import RecipeTitle from './component/RecipeTitle.js';
import OrderNum from './component/orderNum.js';
import OrderList from './component/OrderList.js';
import RecipeContainer from './component/RecipeContainer.js';

export default function RecipeApp({ $target }) {
    this.state = {
        data: [],
        choosedOrder: 0,
    }

    const recipeTitle = new RecipeTitle({
        $target
    });

    const orderNum = new OrderNum({
        $target,
        initialState: {
            data: this.state.data
        }
    });

    const orderList = new OrderList({
        $target,
        initialState: {
            orderData: this.state.data[this.state.choosedOrder]
        }
    })

    const recipeContainer1 = new RecipeContainer({
        $target,
        initialState: {
            m_name: ''
        }
    })
    const recipeContainer2 = new RecipeContainer({
        $target,
        initialState: {
            m_name: ''
        }
    })
    const recipeContainer3 = new RecipeContainer({
        $target,
        initialState: {
            m_name: ''
        }
    })
    const recipeContainer4 = new RecipeContainer({
        $target,
        initialState: {
            m_name: ''
        }
    })

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        };

        orderNum.setState({
            data: this.state.data
        });

        orderList.setState({
            orderData: this.state.data[this.state.choosedOrder]
        })

        recipeContainer1.setState({
        })

        recipeContainer2.setState({
            
        })

        recipeContainer3.setState({
            
        })

        recipeContainer4.setState({
            
        })
    }

    const recipeChat = io('/recipe');
    
    recipeChat.emit("recipe transfer", {
        name: 'recipeDevice',
        room: 'recipe',
        msg: 'logged in'
    });

    recipeChat.on("recipe transfer", function(recievedData) {
        dataRecieved(recievedData)

    });

    const dataRecieved = (recievedData) => {
        if(recievedData == 'logged in') return;
        recievedData = JSON.parse(recievedData)
        recievedData.order.map(item => {
            let option_arr = [];
            if(item.m_options != '') {
                option_arr = item.m_options.split(',');
                for(let i=0; i< option_arr.length; i++) {
                    if(option_arr[i].slice(-1) == ')') {
                        option_arr[i] = option_arr[i].replaceAll(')','')
                        let temp = option_arr[i].split('(');
                        option_arr[i] = { name: temp[0], quantity: temp[1]}
                    }else {
                        option_arr[i] = { name: option_arr[i], quantity: "1"}
                    }
                }
            }

            item.m_options = option_arr;
        })
        this.state.data.push(recievedData)

        this.setState({
            data: this.state.data
        })
    }

    $target.addEventListener('click', {

    })
}