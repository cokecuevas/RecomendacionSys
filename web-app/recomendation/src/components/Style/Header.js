import styled from 'styled-components';

export const header = (image) => {
    return styled.header`
            background:linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.06), 
                rgba(0, 0, 0, 0.09)
                ),
                        url(${image});
                        height: 100vh;
                        max-width:100%;
                        background-size:cover;
            @media (max-width: 1000px) {
            height: 100vh;
            }`
};

