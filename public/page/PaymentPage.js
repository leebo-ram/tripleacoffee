import ChooseOrderPage from "./paymentPages/ChooseOrderPage.js";
import StampMemberCheck from "./paymentPages/StampMemberCheck.js";
import StampUseAndEarnPage from "./paymentPages/StampUseAndEarnPage.js";
import StampUsePage from "./paymentPages/StampUsePage.js";
import InputCertificatioinPage from "./paymentPages/InputCertificationPage.js";

import { request } from "../api.js";


export default function PaymentPage({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState,
        presentPage: 'chooseOrder',
        choosedOrder: 'for_here',
        mem_stamp: 0,
        mem_mobile: ''
    }

    const chooseOrderPage = new ChooseOrderPage({
        $target
    });

    const stampMemberCheck = new StampMemberCheck({
        $target,
        presentPage: this.state.presentPage,
    });

    const stampUseAndEarnPage = new StampUseAndEarnPage({
        $target,
        presentPage: this.state.presentPage,
        mem_mobile: ''
    });

    const stampUsePage = new StampUsePage({
        $target,
        presentPage: this.state.presentPage,
        basket: this.state.basket,
        mem_stamp: this.state.mem_stamp,
        mem_mobile: this.state.mem_mobile
    })

    const inputcertificationPage = new InputCertificatioinPage({
        $target,
        presentPage: this.state.presentPage,
        mem_mobile: this.state.mem_mobile
    })

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        console.log(this.state)
        
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
                stampUseAndEarnPage.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile
                });
                
                break;

            case 'stampUse':
                stampUsePage.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile,
                    mem_stamp: this.state.mem_stamp,
                    basket: this.state.basket
                });
                break;

            case 'inputcertification':
                inputcertificationPage.setState({
                    presentPage: this.state.presentPage,
                    mem_mobile: this.state.mem_mobile,
                    mem_stamp: this.state.mem_stamp,
                })
                break;

            default:

                break;
        }
    }

    const smsCertification = async (req) => {
        if(req) {
            try {
                const smsResponse = await request('verifysms', { 
                    phoneNumber: this.state.mem_mobile,
                    verifyCode: req 
                });
                console.log(smsResponse)
            } catch(e) {
                console.log(e);
            }
        }else {
            try {
                const smsResponse = await request('smsCertification', { phoneNumber: this.state.mem_mobile });
                console.log(smsResponse)
            } catch(e) {
                console.log(e);
            }
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
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'pop__former__Btn') {
                    console.log('2')
                    this.setState({
                        presentPage: 'chooseOrder'
                    })
                }
            }
        }else if(this.state.presentPage == 'stampUseAndEarn') {
            if(e.target.closest('div')) {
                if(e.target.closest('div').className == 'pop__boxing' && e.target.closest('div').id=="stamp_use") {
                    this.setState({
                        mem_stamp: e.target.closest('div').dataset.stamp,
                        presentPage: 'stampUse'
                    })

                }else if(e.target.closest('div').className == 'pop__boxing' && e.target.closest('div').id=="stamp_save") {

                }
            }
        }else if(this.state.presentPage == 'stampUse') {
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'pop__use__Btn') {
                    smsCertification();
                    this.setState({
                        presentPage: 'inputcertification',
                    })
                }
            }
        }else if(this.state.presentPage == 'inputcertification') {
            if(e.target.closest('button')) {
                if(e.target.closest('button').className == 'pop__order__Btn') {
                    const verifyCode = document.getElementById('certification__Num').value;
                    smsCertification(verifyCode);
                }
            }
        }




    })
}
