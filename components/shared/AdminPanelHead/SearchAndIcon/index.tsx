import React from 'react';
import { InputGroup, FormControl, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import StyledButton from '../../StyledButton';

import styles from '../../../../styles/AdminPanelHead.module.css';

interface SearchAndIconProps {
  icon: IconProp
}

const SearchAndIcon: React.FC<SearchAndIconProps> = ({ icon }) => {
  return (
    <Row>
      <Col lg={9} xs>
        <Row>
          <Col lg={9} xs={10}>
            <InputGroup>
              <FormControl placeholder="Pesquisar" className={styles.input} />
            </InputGroup>
          </Col>

          <Col lg={3} xs={2} className="mt-1" style={{cursor: 'pointer'}}>
            <FontAwesomeIcon icon={faSearch} size="lg" color="var(--color-gray-light)" className="float-left" />
          </Col>
        </Row>
      </Col>

      <Col lg={2} xs={{span: 3}}>
        <StyledButton icon={icon} type_button="blue" />
      </Col>
    </Row>
  )
}

export default SearchAndIcon;