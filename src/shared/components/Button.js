const { default: styled } = require("styled-components");

const Button = styled.button`
  background: #a328d6;
  border-radius: 5px;
  height: 46px;
  outline: none;
  border: none;
  width: ${(props) => (props.w ? props.w : "100%")};

  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
`;

export default Button;
