import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { APP_ROUTES } from '@/types/routes';
import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import Organizer from '@/pages/Organizer';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          <Route path={APP_ROUTES.EDITOR} element={<Editor />} />
          <Route path={APP_ROUTES.ORGANIZER} element={<Organizer />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

