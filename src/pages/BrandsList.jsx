import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {Outlet,useLocation}from "react-router-dom";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Grid2, IconButton, Box, Typography } from '@mui/material';

import Brand from "../components/Brand";
import FilterBar from '../components/FilterBar'
import { setPage } from '../features/filterSlice'; 
import { httpGetAllBrands, httpGetNumPages } from "../api/brandService";


function BrandList() {
    const dispatch = useDispatch();
    let [arr, setArr] = useState([]);
    const { objFilter, currentPage } = useSelector((state) => state.filter);
    const [totalPages, setTotalPages] = useState(1); //
    const location = useLocation(); // גישה ל-URL הנוכחי
    console.log(objFilter);
    

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const gender = urlParams.get("gender");
        if (!gender) return;
        const newObjFilter = { ...objFilter, gender: gender };
    
        // שליפת הנתונים כולל דפדוף
        httpGetAllBrands(currentPage, newObjFilter)
            .then(res => {
                setArr(res.data);
                console.log(`aaa ${newObjFilter}`);
                return httpGetNumPages(newObjFilter); // שליפת מספר עמודים לפי הפילטרים
            })
            .then(res => {
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.log(err));
    
    }, [location.search, currentPage, objFilter]);

    const brandDeleted = (id) => {
        setArr(prevArr => prevArr.filter(item => item._id !== id));
    };

    const prevPage = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1));
        }
    };
    
    const nextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setPage(currentPage + 1));
        }
    };
    return (
        <div>
        <FilterBar/>
            <Outlet/>
            {/* רשימת המותגים המסוננת */}
            <ul style={{ padding: 0, margin: 0 }}>
                <Grid2 container spacing={3}> {/* שינוי spacing ל-3 (מרווחים יותר רחבים) */}
                    {arr.map(item => (
                        <Grid2 item xs={6} sm={4} md={3} key={item._id}> {/* 4 כרטיסים בשורה */}
                            {/* <Card sx={{ padding: 2, margin: 2 }}> שוליים רחבים מסביב לכרטיס */}
                                <Brand brnd={item}
                                onBrandDeleted={brandDeleted} />
                            {/* </Card> */}
                        </Grid2>
                    ))}
                </Grid2>
            </ul>
                            {/* לשים לב!!!! הדפדוף לא מעודכן !!!*/}
            {/* כפתורי דפדוף */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
                {/* כפתור "Previous" */}
                <IconButton onClick={prevPage} disabled={currentPage === 1} sx={{ color: currentPage === 1 ? "gray" : "black" }}>
                    <KeyboardArrowLeft sx={{color:"black"}}/>
                </IconButton>

                {/* מספר העמוד הנוכחי */}
                <Typography variant="body2" sx={{fontWeight: 'bold', margin: '0 20px' }}>
                    {currentPage}
                </Typography>

                {/* כפתור "Next" */}
                <IconButton onClick={nextPage} disabled={currentPage === totalPages}  sx={{ color: currentPage === totalPages ? "gray" : "black" }}>
                    <KeyboardArrowRight sx={{color:"black"}} />
                </IconButton>
            </Box>

        </div>
    );
}

export default BrandList;
