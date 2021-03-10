import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from '../react-redux/react-redux'
import { Redirect } from '../x-react-router-dom';
// import {connect} from 'react-redux';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
@connect(
    ({ user }) => ({ isLogin: user.isLogin, err: user.err }),
    {
        login:(userInfo)=>({type: 'LOGIN_SUCCESS',payload:userInfo})
    }
)
class LoginIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }
    }
    componentDidMount() { }

    // loginFn = () => {
    //     const { userName, password } = this.state
    //     console.log('userName,password', userName, password); //log
    // }

    onFinish = (values) => {
        console.log('values', values); //log
        const { login } = this.props
        // dispatch({ type: 'LOGIN_SUCCESS' })
        login(values)
        // console.log('Success:', values);
    };

    onFinishFailed = ({ values }) => {
        console.log('values', values); //log
        // console.log('Failed:', errorInfo);
    };


    render() {
        // const {} = this.props;
        console.log('this.props', this.props); //log
        const { isLogin, location } = this.props
        const { from = '/' } = location.state || {}

        if (isLogin) {
            return <Redirect to={from} />
        }

        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={(values) => this.onFinish(values)}
                onFinishFailed={(values) => this.onFinishFailed(values)}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
          </Button>
                </Form.Item>
            </Form>
            // <React.Fragment>
            //     <h5>登录</h5>
            //     <p>
            //         <label>用户名：</label>
            //         <input type="text" onChange={e => this.setState({ userName: e.target.value })} />
            //     </p>
            //     <p>
            //         <label>密码：</label>
            //         <input type="password" onChange={e => this.setState({ password: e.target.value })} />
            //     </p>
            //     <button onClick={() => { this.loginFn() }}>登录</button>
            // </React.Fragment>
        )
    }
}

export default LoginIn






