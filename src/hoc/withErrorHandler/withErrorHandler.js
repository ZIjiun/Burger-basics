import React, {Component} from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Auxiliary/auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    // 沒有 class name 是因為我們不需要用到，只需要將他 return 回去就好
    return class extends Component {
        state = {
            error: null
        };

        componentDidMount() {
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