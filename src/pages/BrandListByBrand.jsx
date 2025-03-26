import React, { useEffect, useState } from "react";
import {Outlet,useLocation}from "react-router-dom";
import {useSelector} from "react-redux"
import { Grid2, Box, Typography ,IconButton} from "@mui/material";
import Brand from "../components/Brand";
import { httpGetBrandByBrand } from "../api/brandService"; // קריאה לפונקציה

const BrandListByBrand = () => {
  const [arr, setArr] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brand = queryParams.get("brand");
  const {  currentPage } = useSelector((state) => state.filter);

  useEffect(() => {
    if (brand) {
        httpGetBrandByBrand(brand)
        .then((res) => {
          setArr(res.data);
        })
        .catch((err) => {
          console.error("Error fetching products by brand:", err);
        });
    }
  }, [brand]);



  const brandDeleted = (id) => {
    setArr(prevArr => prevArr.filter(item => item._id !== id));
};


  return (
   <div>
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
                  

</div>
  );
};

export default BrandListByBrand;