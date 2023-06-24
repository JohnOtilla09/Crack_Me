import styles from './Button.module.css';

const Button = (props) => {

    const disabled = props.disabled;

    return <button className={`${styles["button-92"]} ${disabled ? styles.disable : ''}`} onClick={props.onClick}>{props.children}</button>
};

export default Button;