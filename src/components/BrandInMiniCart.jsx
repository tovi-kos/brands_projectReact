import{ListItem,ListItemAvatar,ListItemText, Avatar} from '@mui/material'
 import {renderUrl}from "../../basicUrl"

function BrandInMiniCart({brnd}) {

    return (

<ListItem divider sx={{ display: "flex", alignItems: "center" }}>
      <ListItemAvatar>
        <Avatar
          variant="square"
          src={`${renderUrl}/${brnd.srcImg}`}
          alt={brnd.nameBrand}
          sx={{ width: 80, height: 80, borderRadius: 2 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={brnd.nameBrand}
        secondary={
            <>
            {`Model: ${brnd.modelBrand}`}
            <br/>
            {`quentity: ${brnd.qty}`}
            </>}
        sx={{ flexGrow: 1, mx: 2 }}
      />
    </ListItem>
      );
}

export default BrandInMiniCart;