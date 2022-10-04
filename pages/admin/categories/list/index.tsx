import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { setCategoryToEdit } from '../../../../store/modules/admin/category/reducer';

import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faGhost } from '@fortawesome/free-solid-svg-icons';

import AdminListTable from '../../../../components/shared/AdminListTable';
import AdminDeleteModal from '../../../../components/shared/AdminDeleteModal';
import AdminComponent from '../../../../components/shared/AdminComponent';
import AdminPanelHead from '../../../../components/shared/AdminPanelHead';
import NoData from '../../../../components/shared/NoData';
import WithAuthAdmin from '../../../../components/WithAuthAdmin';

import useSWR from 'swr';

import Category from '../../../../dtos/Category';
import Searchstate from '../../../../dtos/SearchState';

import CategoriesService from '../../../../services/categories';
import UrlService from '../../../../util/UrlService';

import styles from '../../../../styles/AdminPanel.module.css';

const defaultUrl = '/admin/v1/categories';

const List: React.FC = () => {
  const [show, setShow] = useState(false);
  const [categoryToRemove, setCategoryToRemove] = useState(0);
  const [url, setUrl] = useState(defaultUrl);
  const { data, error, mutate } = useSWR(url, CategoriesService.index);

  const search: string = useSelector((state: Searchstate) => state.search);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setUrl(
      defaultUrl +
      UrlService.execute({ page: router.query.page, search })
    )
  }, [search, router.query.page]);

  const handleShow = (id: number): void => {
    setShow(true);
    setCategoryToRemove(id);
  }

  const handleClose = async (confirm: boolean): Promise<void> => { 
    setShow(false);

    if (!confirm) return;

    try {
      await CategoriesService.delete(categoryToRemove);
      toast.info('Categoria removida com sucesso!');
      mutate();
    } catch (err){
      toast.error('Ocorreu um erro ao remover uma categoria, tente novamente.');
      console.log(error);
    }
  }

  const handleEdit = (category: Category): void => {
    dispatch(setCategoryToEdit(category));
    router.push('/admin/categories/edit');
  }

  if (error) {
    toast.error('Erro ao listar categorias');
    console.log(error);
  }

  return (
    <AdminComponent>
      <AdminPanelHead 
        title="Categorias" 
        path="Dashboard > Categorias" 
        icon={faGhost} 
        newPath="/admin/categories/new"
      />

      <AdminDeleteModal handleClose={handleClose} show={show} target="categoria" />

      {
        data && data.categories && data.categories.length > 0 ? (
          <AdminListTable first_title="Nome da categoria" meta={data.meta}>
            {
              data.categories.map(category => (
                <tr className={styles.table_line} key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <div className={styles.hover}>
                      <FontAwesomeIcon 
                        icon={faEdit} 
                        onClick={() => handleEdit(category)}
                      />
                    </div>
                  </td>

                  <td>
                    <div className={styles.hover}>
                      <FontAwesomeIcon 
                        icon={faTrash} 
                        onClick={() => handleShow(category.id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </AdminListTable>
        ) : (
          <NoData />
        )
      }
    </AdminComponent>
  )
}

export default WithAuthAdmin(List);