import { BrowserRouter, Route, Routes } from "react-router";
import { FeedPage } from "../pages/page";
import { AppShell } from "../pages/layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<FeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
