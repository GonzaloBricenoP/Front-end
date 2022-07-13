import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../helpers/useAuth';
import config from '../helpers/config.json';


const Login = () => {
    const { setAuth } = useAuth();
    let navigate = useNavigate();

    const changeButtonState = (button, enable) => {
      if(enable){
        button.disable = false;
        button.innerHTML = "<i class='fa fa-sign-in'></i> Acceder";
      } else {
        button.disable = true;
        button.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Acceder";
      }
    }

    const showMessage = (visible, message) => {
      const messageBox = document.querySelector('.alert');
      const reasonBox = document.querySelector('#reason');
      if(visible){
        reasonBox.innerHTML = message;
        messageBox.classList.remove('d-none');
      } else {
        reasonBox.innerHTML = "";
        messageBox.classList.add('d-none');
      }

    }

    const logger = async(event) => {
      event.preventDefault();
      const button = document.querySelector("button");
      changeButtonState(button, false);
      var {username, pass} = document.forms[0];
      const user = username.value;
      const password = pass.value;
      if(user.length === 0 || password.length === 0){
        showMessage(true, "Debe completar todos los campos");
        changeButtonState(button, true);
        return;
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({nickname: user, password: password, operatorId: config.operatorId})
      }
      fetch(config.apiURL+"login", requestOptions).then((response) => {
        switch(response.status){
          case 400:
            showMessage(true, "La consulta esta mal forma, faltan");
            changeButtonState(button, true);
            break;
          case 403:
            showMessage(true, "Acceso prohibido");
            changeButtonState(button, true);
            break;
          case 404:
              showMessage(true, "Nombre de usuario y/o contraseña ingresados son incorrectos, intentelo nuevamente");
              changeButtonState(button, true);
              break;
          case 500:
              showMessage(true, "Error interno del servidor");
              changeButtonState(button, true);
              break;
              
          default:
            //
        }
        return response.json();
      }).then((result) => {
        if(!result.data[0].active){
          showMessage(true, "El usuario no se encuentra activo. Acceso denegado");
          changeButtonState(button, true);
          return;
        }
        try {
          const infoData = result.data[0];
          const infoUser = JSON.stringify(infoData);
          showMessage(false, "");
          changeButtonState(button, false);
          localStorage.setItem("user", infoUser);
          const roles = [infoData['level']];
          setAuth({user, password, roles})
          navigate("/panel");
        } catch (error) {
          console.log(error);
        }
      })
    }



    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="/">Gigantes del<b> Pacífico</b></a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg"><strong>Inicia la sesión</strong></p>

                        <form onSubmit={logger}>
                            <div className="input-group mb-3">
                                <input type="text" name="username" id="username" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" name="pass" id="pass" className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary btn-block"><i className="fa fa-sign-in"></i> Iniciar sesión</button>
                                </div>
                            </div>
                            <hr />
                        </form>
                        <div className="alert alert-warning d-none" role="alert" displa>
                            <strong>Se ha detectado un error!</strong><br />
                            <small>A continuación se le presenta la razón: </small>
                            <strong><p id="reason"></p></strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;