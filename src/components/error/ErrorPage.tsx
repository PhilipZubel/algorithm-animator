import { Typography } from '@mui/material';

const ErrorPage = () => {
  return (
    <>
    <div hidden={true}>ErrorPage</div>
    <Typography variant="h1" color="primary" sx={{textAlign:"center", mt:6, mb: 3}}>404</Typography>
    <Typography variant="h5" color="gray" sx={{textAlign:"center"}}>We can't find the page you're looking for 🥺</Typography>
    </>
  )
}

export default ErrorPage;