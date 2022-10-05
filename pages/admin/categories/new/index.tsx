import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import AdminComponent from '../../../../components/shared/AdminComponent';
import AdminPanelHead from '../../../../components/shared/AdminPanelHead';
import CategoryForm from '../../../../components/Admin/CategoryForm';
import WithAuthAdmin from '../../../../components/WithAuthAdmin';

import Category from '../../../../dtos/Category';

import CategoriesService from '../../../../services/categories';

const New: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async ({ name }: Category): Promise<void> => {
    try {
      await CategoriesService.create(name);
      toast.info('Categoria cadastrada com sucesso!');

      router.back();
    } catch (err) {
      toast.error('Ocorreu algum erro, tente novamente!');
      console.log(err);
    }
  }

  return (
    <AdminComponent>
      <AdminPanelHead title="Adicionar Categoria" path="Dashboard > Categorias > Adicionar Categoria" />

      <CategoryForm handleSubmit={handleSubmit} action="Adicionar" />
    </AdminComponent>
  )
}

export default WithAuthAdmin(New);