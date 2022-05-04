import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './components/Shop';
import { ContextProvider } from './reducer/context';

const App = () => {
  return (
    <>
      <Header />
      <ContextProvider>
        <Shop />
      </ContextProvider>
      <Footer />
    </>
  );
};

export default App;
