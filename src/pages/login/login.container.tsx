import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { MobXProviderContext } from 'mobx-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginInterface } from 'src/interfaces';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { accessTokenFunction } from 'src/libs';
import Login from './login';
import 'react-toastify/dist/ReactToastify.css';

function LoginContainer(): JSX.Element {
  const rootStore = useContext(MobXProviderContext);
  const navigator = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || '/friend';
  const login = rootStore.graphStore.getLogin;
  useEffect(() => {
    if (accessTokenFunction.getAccessToken()) navigator(from, { replace: true });
  }, []);

  const [loginMutation] = useMutation(login, {
    onError: (error) => {
      toast.error(error.message, { autoClose: 1500 });
    },
    onCompleted: (data) => {
      accessTokenFunction.setAccessToken(data.login.accessToken);
      rootStore.loginStore.setUserInfo(data.login);
      rootStore.loginStore.toggleIsLogin();
      toast.success('Login Success', { autoClose: 1000 });
      navigator(from, { replace: true });
    },
  });

  const onRegister = () => {
    navigator('/register');
  };
  const onPressEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') formik.handleSubmit();
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: loginInterface.loginSchema,
    onSubmit: async (values) => {
      await loginMutation({
        variables: {
          userName: values.userName,
          password: values.password,
        },
      });
    },
  });

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Login onRegister={onRegister} onPressEnter={onPressEnter} formik={formik} />
    </Box>
  );
}

export default LoginContainer;
