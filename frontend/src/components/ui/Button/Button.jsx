import PropTypes from "prop-types";
import { StyledButton } from "./Button.styled";

const Button = ({ children, variant = "primary", ...rest }) => {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "outline"]),
};

export default Button;
