import React from "react";

import styles from './CrackPage.module.css';
import Card from "../UI/Card";
import Button from "../UI/Button";

const CrackPage = (props) => {
    return (
      <Card>
        <div className={styles.crackpage}>
          <h1>Welcome Master</h1>
          <h2>John C. Otilla</h2>
          <Button className={`${styles['button-92']}`} onClick={props.onLogout}>Logout</Button>
        </div>
      </Card>
    );
};

export default CrackPage;