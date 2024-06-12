import "./style.scss";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users/Users";
import { User } from "./pages/Users/User";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/utilisateur": User,
  "/utilisateurs": Users,
};

app("#app", routes);
