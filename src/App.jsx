import { createRoot } from "react-dom/client";
import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdoptedPetContext from "./AdoptedPetContext";

const Details = lazy(()=> import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <AdoptedPetContext.Provider value={adoptedPet}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>

          <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🌀</h2>
            </div>
          }
          >
          <header>
            <Link to="/">Adopt me</Link>,
          </header>
          <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>

          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </AdoptedPetContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
// ReactDOM.render(React.createElement(App), container);
