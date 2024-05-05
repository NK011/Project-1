import { useEffect, useState } from "react";

import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FilterOptions } from "../../../commonUtils/types";
import { filterDefaults } from "../../../redux/slices/filterBarSlice";
import styles from "../style.module.css";

type Props = {
    name: keyof FilterOptions; // Specify that name should be one of the keys of FilterOptions
    placeholder: string;
    value: string | number;
    handleFilterChange: (name: string, value: string | number) => void;
};

function SearchFilter({ value, name, placeholder, handleFilterChange }: Props) {
    // states
    const [searchTerm, setSearchTerm] = useState("");

    // useEffects
    useEffect(() => {
        setSearchTerm(value ? value : "");
    }, [value]);

    useEffect(() => {
        // debounce
        const timeout = setTimeout(() => handleFilterChange(name, searchTerm), 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm]);

    return (
        <div className={styles.container}>
            <label
                className={
                    searchTerm ? styles.label_visible : styles.label_hidden
                }
            >
                {name}
            </label>
            <div className={styles.searchFilter}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: "none" }}
                />
                {searchTerm ? (
                    <IconButton
                        onClick={() => {
                            setSearchTerm("");
                            handleFilterChange(name, filterDefaults[name]);
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default SearchFilter;
