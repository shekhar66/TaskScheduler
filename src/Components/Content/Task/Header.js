import classes from "../../../Assets/Header.module.css";

const Header = (props) => {
  return (
    <div {...props} className={`${classes["form-header"]} ${props.className}`}>
      <h5>{props.name}</h5>
    </div>
  );
};

export default Header;
