import React, {Component} from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Auxiliary/auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    // 沒有 class name 是因為我們不需要用到，只需要將他 return 回去就好
    return class extends Component {
        state = {
            error: null
        };

        // 當使用 componentDidMount 時，因為實際上先 render 完，才會執行 componentDodMount
        // 所以實際上是沒有設定到這 interceptor，因此改成使用 constructor，在建立物件時就會直接執行
        constructor(props) {
            super(props);
            // 確定在送出請求前，是沒有錯誤的
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            // error 是由伺服器回傳給我們的錯誤，通常這是一個物件
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
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