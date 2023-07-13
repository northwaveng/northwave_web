import React from 'react';
import styles from '@/components/loader/Loader.module.css';

export default function Loader({ fullHeight = false }) {
  return (
    <div className={`d-flex justify-content-center align-items-center ${fullHeight && "vh-100"}`}>
      <div className={styles.loader}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
    </div>
  );
};