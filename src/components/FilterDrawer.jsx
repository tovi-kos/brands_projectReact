import { Button, Drawer, List, ListItemButton, IconButton, Typography, Collapse, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"; // אייקונים
import { httpGetAllFilter } from "../api/filterService.js"
import { useDispatch, useSelector } from "react-redux";
import { setOption ,setObjFilter} from "../features/filterSlice.js";
import FilterCategory from "./FilterCategory.jsx";


// קומפוננטת Drawer - תפריט צד
function FilterDrawer({ open, onClose, filterName, openFilters, toggleFilter, selectOption, selectedOptions }) {
    const dispatch = useDispatch();
    const { gender } = useSelector(state => state.filter.objFilter) || {};
    console.log(gender + "gender")
  
    useEffect(() => {
      if (!gender) return;
      httpGetAllFilter(gender)
        .then(res => {
          console.log(res + "res");
  
          dispatch(setOption(res.data))
        })
        .catch(err => { console.log(err + " oops not get all filter") });
    }, [gender, dispatch])
  
    const optionFilter = useSelector(state => state.filter.optionFilter) || {};
  
    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div style={{ width: "300px", padding: "20px" }}>
          {/* כותרת וסגירה */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={onClose}>
              <X />
            </IconButton>
          </div>
  
          {/* הצגת כל הפילטרים */}
          {Object.keys(optionFilter).map((filter) => (
            <FilterCategory
              key={filter}
              filterName={filter}
              options={optionFilter[filter]}
              open={openFilters[filter]}
              toggleFilter={toggleFilter}
              selectOption={selectOption}
              selectedOptions={selectedOptions[filter] || []}
            />
          ))}
        </div>
      </Drawer>
    );
  }
  export default FilterDrawer;