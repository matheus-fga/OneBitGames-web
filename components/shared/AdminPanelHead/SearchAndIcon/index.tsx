import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Row, Col } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import {
  setSearch as setSearchRedux,
  clearSearch
} from '../../../../store/modules/admin/shared/search/reducer';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import StyledButton from '../../StyledButton';

import styles from '../../../../styles/AdminPanelHead.module.css';

interface SearchAndIconProps {
  icon: IconProp,
  newPath: string
}

const SearchAndIcon: React.FC<SearchAndIconProps> = ({ icon, newPath }) => {
  const [search, setSearch] = useState('');
  const dispacth = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispacth(clearSearch());
  }, []);

  const handleSearch = (): void => {
    router.replace(router.pathname, '?page=1');
    dispacth(setSearchRedux(search));
  };

  return (
    <Row>
      <Col lg={9} xs>
        <Row>
          <Col lg={9} xs={10}>
            <InputGroup>
              <FormControl 
                placeholder="Pesquisar" 
                className={styles.input} 
                value={search}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(event.target.value)
                }}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if(event.key.toLocaleLowerCase() === 'enter') {
                    handleSearch();
                  }
                }}
              />
            </InputGroup>
          </Col>

          <Col lg={3} xs={2} className="mt-1" style={{cursor: 'pointer'}}>
            <FontAwesomeIcon 
              icon={faSearch} 
              size="lg" 
              color="var(--color-gray-light)" 
              className="float-left"
              onClick={handleSearch}
            />
          </Col>
        </Row>
      </Col>

      <Col lg={2} xs={{span: 3}}>
        <Link href={newPath}> 
          <a>
            <StyledButton icon={icon} type_button="blue" />
          </a>
        </Link>
      </Col>
    </Row>
  )
}

export default SearchAndIcon;