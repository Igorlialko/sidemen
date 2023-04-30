import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {HomePage} from "./pages/home/home";
import {AdminPage} from "./pages/admin/admin";
import {StreamPage} from "./pages/stream/stream";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage/>}/>
          <Route path="admin" element={<AdminPage/>}/>
          <Route path="stream" element={<StreamPage/>}/>
        </Route>
        <Route path="*" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
