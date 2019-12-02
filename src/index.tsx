// tslint:disable-next-line:no-import-side-effect
import "normalize.css";
import * as React from "react";
import { render } from "react-dom";

import App from "./components/app";
import "./index.less";

render(<App />, document.getElementById("root"));
