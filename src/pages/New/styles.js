import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas:
        "header"
        "content"
    ;

    .tags {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    > main {
        grid-area: content;
        overflow-y: auto;
    }
`;

export const Form = styled.form`
    max-width: 550px;
    margin: 38px auto;

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 36px;

        > button {
            font-size: 20px;
            color: ${({theme}) => theme.COLORS.GRAY_100};
        }
    }
`;