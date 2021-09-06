import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { Link as RouterLink } from 'react-router-dom';
import JwtLogin from './JwtLogin';

import { Card, CardContent, Divider, Grid, Link, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    maxWidth: 'calc(100% + 16px)'
  },
  card: {
    margin: theme.spacing(0) + ' auto',
    maxWidth: '475px',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%'
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '400px'
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%'
    }
  },
  content: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(3)
    }
  },
  title: {
    color: theme.palette.grey[600],
    textDecoration: 'none'
  }
}));



const Login = (props) => {
  //Copy from BErry
  const classes = useStyles();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        (result) => {
          console.log(result);

          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent={matchDownSM ? 'center' : 'space-between'} alignItems="center" className={classes.root}>
      <Grid item xs={12} sx={{ minHeight: '100vh', height: '100%' }}>
        <Grid
          sx={{ minHeight: '100vh', height: '100%', p: matchDownSM ? 0 : '0 80px' }}
          container
          direction="column"
          alignItems={matchDownSM ? 'center' : 'flex-start'}
          spacing={matchDownSM ? 5 : 6}
          justifyContent="space-between"
        >
          <Grid item xs={12} sx={{ mt: '40px', width: '100%', textAlign: 'center' }}>
            <RouterLink to="#">
              {/*<img alt="Auth method" src={logo} width="100" /> */}
            </RouterLink>
            <Grid item xs={12} container justifyContent="center" alignItems="center">
              <Card className={classes.card}>
                <Grid container direction="column" spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? 'column-reverse' : 'row'}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Grid container direction="column" alignItems="center" spacing={1}>
                          <Grid item container direction="column" alignItems="center">
                            <Grid item>{/*color={theme.palette.purple.main}*/}
                              <Typography
                                
                                gutterBottom
                                variant={matchDownSM ? 'h3' : 'h2'}
                              >
                                Olá, bem vindo
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography variant="caption" fontSize="16px">
                              {' '}
                              Informe seus dados para acessar o sistema
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/*Componente de login*/}
                  <Grid item xs={12}>
                    <JwtLogin login={3} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={RouterLink}
                        to="/pages/register/register3"
                        variant="subtitle1"
                        className={classes.title}
                      >
                       Não tem conta? clique aqui para criar
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>



  )
};

export default Login;