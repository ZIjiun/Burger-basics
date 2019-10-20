import React, {Component} from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Auxiliary/auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    // 沒有 class name 是因為我們不需要用到，只需要將他 return 回去就好
    return class extends Component {
        // 當使用 componentDidMount 時，因為實際上先 render 完，才會執行 componentDodMount
        // 所以實際上是沒有設定到這 interceptor，因此改成使用 constructor，在建立物件時就會直接執行
        constructor(props) {
            super(props);

            this.state = {
                error: null
            };
            this.reqInterceptor = null;
            this.resInterceptor = null;

            // 確定在送出請求前，是沒有錯誤的
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            // error 是由伺服器回傳給我們的錯誤，通常這是一個物件
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        // 因為 withErrorHabndler hoc 可以重複使用，但是裡面的 interceptor 會被設定很多次，相同但是舊的 interceptor 會造成記憶體的浪費，
        // 甚至會造成錯誤，因此當我們不再需要 hoc 這個包裝的時候，要將他卸載掉
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        };

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;