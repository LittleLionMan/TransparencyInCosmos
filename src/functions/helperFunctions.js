import { data } from "../data/data";
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";

export const objSearch = (arg, chain) => {
    for (let name in data) {
        if (name === chain) {
            return data[name][arg];
        }
    }
};

export function ToText(node) {
    let tag = document.createElement("div");
    tag.innerHTML = node;
    node = tag.innerText;
    return node;
};

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  };