import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import OpenCalculatorButton from "./OpenCalculatorButton";
import Button from "../../common/Button";

export default function SavedRecipeButtons({ switchToForm }) {
  const navigate = useNavigate(-1);

  return (
    <>
      <OpenCalculatorButton />
      <Button text="Back" type="button" handleClick={() => navigate(-1)} />
      <Button text="Edit" type="button" handleClick={switchToForm} />
    </>
  );
}

SavedRecipeButtons.propTypes = {
  switchToForm: PropTypes.func.isRequired,
};