import { Button, Drawer, List, ListItemButton, IconButton, Typography, Collapse, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"; // אייקונים
import { httpGetAllFilter } from "../api/filterService.js"
import { useDispatch, useSelector } from "react-redux";
import { setOption ,setObjFilter} from "../features/filterSlice.js";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "./FilterDrawer.jsx";


// קומפוננטה ראשית - הצגת כפתורי הסינון
function FilterBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openFilters, setOpenFilters] = useState({}); // מצב שמחזיק אילו פילטרים פתוחים
  const [selectedOptions, setSelectedOptions] = useState({}); // מצב שמחזיק את הבחירות עבור כל פילטר

  const dispatch = useDispatch();

  const { gender } = useSelector(state => state.filter.objFilter) || {};
  // console.log(gender+"  gender")

  useEffect(() => {
    if (!gender) return;
    setSelectedOptions({});
    setOpenFilters({});
    httpGetAllFilter(gender)
      .then(res => {
        console.log(res.data);
        dispatch(setOption(res.data))
      })
      .catch(err => { console.log(err + " oops not get all filter") });
  }, [gender, dispatch])

  const optionFilter = useSelector(state => state.filter.optionFilter) || {};
  console.log(JSON.stringify(optionFilter, null, 2));

  const filters = Object.keys(optionFilter);
  console.log(`filters: ${filters}`);


  const handleOpenDrawer = (filter, openAll = false) => {
    setOpenDrawer(true);
  
    setOpenFilters((prev) => {
      if (openAll) {
        // אם נלחץ על All Filters - פותחים את כל הפילטרים
        return Object.keys(optionFilter).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
      }
  
      // לוגיקה רגילה - שומרים את הפילטרים שנבחרו
      const filtersWithSelection = Object.keys(selectedOptions).reduce((acc, key) => {
        if (selectedOptions[key]?.length > 0) {
          acc[key] = true;
        }
        return acc;
      }, {});
  
      return { ...filtersWithSelection, [filter]: true }; // פותחים את הפילטר החדש שנבחר
    });
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter], // אם הפילטר פתוח אז נסגור אותו, ולהפך
    }));
  };

  const selectOption = (filter, option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[filter] || [];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter(opt => opt !== option)
        : [...currentOptions, option];
      return { ...prev, [filter]: newOptions };
    });
  };

   
  return (
    <div style={{ marginBottom: "20px" , display: "flex", gap: "10px" }}>
      {filters.map((filter) => (
        <Button 
          key={filter} 
          variant="outlined" 
          onClick={() => handleOpenDrawer(filter)}
          endIcon={<ChevronDown size={16} />} 
          sx={{ 
            color: "black", 
            borderColor: "gray", 
            borderRadius: "25px", 
            padding: "8px 16px", 
            transition: "all 0.3s", 
            "&:hover": { 
              backgroundColor: "transparent", // מוודא שאין שינוי רקע
              borderColor: "black", // משאיר את הצבע שחור
              borderWidth: "0.5px" // מדגיש את המסגרת
            } 
            
          }}
        >
          {filter}
        </Button>
      ))}

      <Button 
        variant="outlined" 
        startIcon={<Filter />} 
        endIcon={<ChevronDown size={16} />} 
        onClick={() => handleOpenDrawer(null, true)}
        sx={{ 
          color: "black", 
          borderColor: "gray", 
          borderRadius: "25px", 
          padding: "8px 16px", 
          transition: "all 0.3s", 
          "&:hover": { 
            backgroundColor: "transparent", // מוודא שאין שינוי רקע
            borderColor: "black", // משאיר את הצבע שחור
            borderWidth: "0.5px" // מדגיש את המסגרת
          } 
        }}
      >
        All Filters
      </Button>

      <FilterDrawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        openFilters={openFilters}
        toggleFilter={toggleFilter}
        selectOption={selectOption}
        selectedOptions={selectedOptions}
      />
    </div>
  );

 
}
export default FilterBar;