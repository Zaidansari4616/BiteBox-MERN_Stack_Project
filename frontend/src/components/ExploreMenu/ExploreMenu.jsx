import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../config/menuConfig";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore menu</h1>
      <p className="explore-menu-text">
        Explore our menu and choose from a wide selection of freshly prepared
        dishes crafted to satisfy every craving.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
