import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import routes from "./Routes";
export default function Navbar(props) {
    const { collapsed, setCollapsed } = props.myCollapse;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    // const userRole = localStorage.getItem('userRoles');
    useEffect(() => {
        // Filter routes based on the search term without spaces
        const filtered = routes.filter((route) => {
            if (route.name && searchTerm) {
                return route.name
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .includes(searchTerm.toLowerCase().replace(/\s/g, ""));
            }
            return false;
        });
        setFilteredRoutes(filtered);
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <nav className="navbar" style={{ backgroundColor: "#010445" }}>
            <div className="d-flex justify-content-start">
                <div
                    className="p-2 my-2 container-fluid d-flex justify-content-center"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <GiHamburgerMenu color="white" />
                </div>
                <Link
                    className="navbar-brand text-light pt-2 d-none d-sm-block"
                    to={"/"}
                >
                    Dispatch Management System
                </Link>
            </div>
            <form className="d-flex mx-2 justify-content-end" role="search">
                <input
                    className="form-control me-2 form-control-md"
                    type="search"
                    name="navBarSearch"
                    placeholder="Search"
                    aria-label="Search"
                // value={searchTerm}
                // onChange={handleSearch}
                />

            </form>

            <div
                className="filtered-routes"
                style={{ display: filteredRoutes.length > 0 ? "block" : "none" }}
            >
                {filteredRoutes.length > 0 &&
                    filteredRoutes.map((route) => (
                        <div
                            key={route.path}
                            className="searchResult p-2 my-1 text-decoration-none"
                        >
                            <Link to={route.path} className="text-decoration-none searchResultText">
                                <IoMdSearch className="me-3" />
                                {route.name}
                            </Link>
                        </div>
                    ))}
                {filteredRoutes.length === 0 && searchTerm !== "" && (
                    <div>No results found</div>
                )}
            </div>
        </nav>
    );
}
