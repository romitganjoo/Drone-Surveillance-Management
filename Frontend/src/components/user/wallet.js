import  React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {AuthContext} from '../authenticaion/ProvideAuth';

function Wallet(props) {


  const authContext = useContext(AuthContext);
  const { user, loading } = authContext;
    var post = {
        image: "https://payspacemagazine.com/wp-content/uploads/2018/10/dollar1-1.jpg",
        imageLabel:"img"
    }
  return (
    <>
    {!loading && (
    <Grid item xs={12} md={15}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" paragraph>
              {/* {post.description} */}
              Wallet
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {/* {post.date} */}
              Current balance
            </Typography>
            <Typography component="h2" variant="h2">
              {user.walletBalance > 0 ? user.walletBalance : 0} $
            </Typography>
            
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
    )}
    </>
  );
}

Wallet.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Wallet;