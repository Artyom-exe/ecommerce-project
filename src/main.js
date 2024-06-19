import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "./style.scss";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Products } from "./pages/Products/Products";
import { Product } from "./pages/Products/Product";

const routes = {
  "/contact": Contact,
  "/produit": Product,
  "/": Products,
};

app("#app", routes);
