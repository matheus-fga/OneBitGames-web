import React from 'react';

import styles from '../../../styles/BlueBackground.module.css';

interface BlueBackgroundProps {
  children?: React.ReactNode
}

const BlueBackground: React.FC<BlueBackgroundProps> = ({ children }) => {
  return (
    <div className={styles.main}>
      { children }
    </div>
  )
}

export default BlueBackground;