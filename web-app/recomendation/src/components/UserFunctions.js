import axios from 'axios'

export const register = newUser => {
    console.log(newUser.Preferences)
    return axios
        .post('http://localhost:8090/user/register', {
            Age: newUser.Age,
            Gender: newUser.Gender,
            Occupation: newUser.Occupation,
            Email: newUser.Email,
            Password: newUser.Password,
            Preferences: newUser.Preferences,
            headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then((res) => {
            return res.data;
          })
          .catch(err => {
            if(err.response === undefined){
                return 500
            }else if(err.response.status === 400){
                return err.response
            }
        })
}

export const login = user => {
    return axios
        .post('http://localhost:8090/login', {
            Email: user.Email,
            Password: user.Password,
            headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then(res => {
            localStorage.setItem('userToken', res.data.access_token)
            return res.data
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 400){
                return err.response
            }else if(err.response === undefined){
                return 500
            }
        })
}

export const demografico = id => {
    return axios
        .get('http://localhost:8090/user/'+id, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then(res => {
            console.log("Respuesta:",res.data.Data.Items_demografico)
            return res.data.Data
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 400){
                return err.response
            }else if(err.response === undefined){
                return 500
            }
        })
}