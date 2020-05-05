import styled from 'styled-components';

export const LoginForm = (Form) => {
    return styled(Form)`
        width: 100%;
        max-width: 330px;
        border-radius: 5px;
        padding: 15px;
        margin: auto;
        height: 100%;
        background: rgba(130,130,130,.3);
        border: 1px solid;
        border-radius= 10px;
        border-top-color: rgba(255,255,255,.4);
        border-left-color: rgba(255,255,255,.4);
        border-bottom-color: rgba(60,60,60,.4);
        border-right-color: rgba(60,60,60,.4);
        @media (max-width: 740px) {
            
        }
    }`
};