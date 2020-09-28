import * as React from 'react';
import { FadeIn } from "ts-react-fade";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.exWrapper}>
      <FadeIn delay={500}>
        <div>fade with delay 500</div>
      </FadeIn>
      <FadeIn delay={1000}>
        <div>fade with delay 1000</div>
      </FadeIn>
      <FadeIn delay={1500}>
        <div>fade with delay 1500</div>
      </FadeIn>
      <FadeIn delay={2000}>
        <div>fade with delay 2000</div>
      </FadeIn>
    </div>
  );
}