import classes from "../Assets/Header.module.css";

const Header = (props) => {
  return (
    <div {...props} className={`${classes["form-header"]} ${props.className}`}>
      <h4>{props.name}</h4>
    </div>
  );
};

export default Header;
