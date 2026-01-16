import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(()=>import('./pages/PageNotFound'));
const SellForm = lazy(()=>import("./pages/SellForm"));
const MyListing = lazy(()=>import("./pages/MyListing"));
const EditListing = lazy(()=>import("./pages/EditListing"));
import PageLoader from "./components/PageLoader";

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/seller/add-new" element={<SellForm/>}/>
          <Route path="/seller/my-sells" element={<MyListing/>}/>
          <Route path="/seller/listings/edit/:id" element={<EditListing />} />
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
