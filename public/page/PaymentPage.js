import ChooseOrderPage from "./paymentPages/ChooseOrderPage.js";
import StampMemberCheck from "./paymentPages/StampMemberCheck.js";
import StampUseAndEarn from "./paymentPages/StampUseAndEarnPage.js";


export default function PaymentPage({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState,
        presentPage: 'chooseOrder',
        choosedOrder: 'for_here',

    }

    const chooseOrderPage = new ChooseOrderPage({
        $target
    });

    const stampMemberCheck = new StampMemberCheck({
        $target,
        presentPage: this.state.presentPage,
    });

    const stampUseAndEarn = new StampUseAndEarn({
        $target,
        presentPage: this.state.presentPage,
        mem_mobile: ''
    });

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        
        switch(this.state.presentPage) {
            case 'chooseOrder':
                chooseOrderPage.render();
                break;

            case 'stampMemberCheck':
                stampMemberCheck.setState({
                    presentPage: this.state.presentPage,
                });
                break;
            case 'stampUseAndEarn':
                stampUseAndEarn.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile
                });
                
                break;
            default:

                break;
        }
    }

    // 최상단 요소
    

    // 이벤트리스너
    $target.addEventListener('click', (e) => {
        // chooseOrderPage 클릭이벤트
        if(this.state.presentPage == 'chooseOrder') {
            if(e.target.closest('div').id) {
                if(e.target.closest('div').id == 'for_here') {
                    console.log('먹고가기')
                    this.setState({
                        chooseOrder: 'for_here',
                        presentPage: 'stampMemberCheck'
                    })
                }else if(e.target.closest('div').id == 'to_go') {
                    console.log('포장하기')
                    this.setState({
                        chooseOrder: 'to_go',
                        presentPage: 'stampMemberCheck'
                    })
                }
            }
            return;
        }else if(this.state.presentPage == 'stampMemberCheck') {
            if(e.target.closest('div')) {
                if(e.target.closest('div').className == 'input__mobileNumber__btn') {
                    const mobileInput = document.querySelector('#mobileNumber');
                    const mem_mobile = mobileInput.value + mobileInput.dataset.masked;
                    if(mobileInput.value.length == 13) {
                        this.setState({ 
                            mem_mobile: mem_mobile.replaceAll("-",'').replaceAll('*',''),
                            presentPage: 'stampUseAndEarn'
                        })
                    }
                }
            }
        }




    })
}