import React from 'react';

import styles from '../../../../styles/AdminPanelHead.module.css';

interface TitleAndPathProps {
  title: String,
  path: String
}

const TitleAndPath: React.FC<TitleAndPathProps> = ({ title, path }) => {
  return (
    <div className={styles.title_and_path}>
      <h4>{ title }</h4>
      <span className={styles.styledPath}>{ path }</span>
    </div>
  )
}

export default TitleAndPath;