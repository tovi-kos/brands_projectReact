import { 
    List, ListItemButton, IconButton, Typography, Collapse, Checkbox, 
    FormControlLabel, Divider } from "@mui/material";
  import { ChevronDown, ChevronUp } from "lucide-react";
  import { useDispatch, useSelector } from "react-redux";
  import { setObjFilter } from "../features/filterSlice.js";
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  
  function FilterCategory({ filterName, options, open, toggleFilter, selectOption, selectedOptions }) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const objFilter = useSelector(state => state.filter.objFilter);
    const gender = useSelector(state => state.filter.gender);
  
    useEffect(() => {
      if (gender) {
        dispatch(setObjFilter({
          gender: gender,
          size: null,
          category: null
        }));
      }
    }, [gender, dispatch]);
  
    const handleCheckboxChange = (filterName, option) => {
      const updatedFilter = objFilter[filterName]?.includes(option)
        ? objFilter[filterName].filter(item => item !== option)
        : [...(objFilter[filterName] || []), option];
  
      dispatch(setObjFilter({ ...objFilter, [filterName]: updatedFilter }));
  
      const currentUrl = new URL(window.location.href);
      const params = new URLSearchParams(currentUrl.search);
      params.set(filterName, updatedFilter.join(','));
      navigate(`${currentUrl.pathname}?${params.toString()}`);
    };
  
    return (
        <div>
        {/* כותרת הפילטר */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "black" }}>
            {filterName}
          </Typography>
          <IconButton 
            onClick={() => toggleFilter(filterName)} 
            sx={{ color: "black", padding: "5px" }} // אייקון כהה ללא רקע/מסגרת
          >
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </IconButton>
        </div>
  
        {/* אפשרויות הסינון */}
        <Collapse in={open}>
          <List sx={{ padding: 0 }}>
            {options.map((option) => (
              <ListItemButton key={option} sx={{ padding: "5px 10px" }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      size="small"
                      checked={selectedOptions.includes(option)} 
                      onChange={() => {
                        selectOption(filterName, option);
                        handleCheckboxChange(filterName, option);
                      }} 
                      sx={{ 
                        color: "black", // צבע ברירת מחדל שחור
                        "&.Mui-checked": { 
                          color: "white", // וי לבן
                        },
                        "&.Mui-checked .MuiSvgIcon-root": { 
                          backgroundColor: "black", 
                          borderRadius: "4px", 
                          borderWidth:"0.25"
                    
                        }
                      }}
                    />
                  }
                  label={<Typography sx={{ color: "black" }}>{option}</Typography>}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
  
        {/* Divider בהיר מאוד */}
        <Divider sx={{ margin: "8px 0", borderColor: "black", opacity: 0.2 }} />
      </div>
    );
  }
  
  export default FilterCategory;
  