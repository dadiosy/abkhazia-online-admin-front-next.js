import { DefaultSeo } from "next-seo";
import "../../public/css/globals.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';

import SEO from "../../next-seo.config";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { Providers } from '../components/providers'
import { store } from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Providers>
        <Provider store={store}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Providers>
    </>
  );
}

export default MyApp;
