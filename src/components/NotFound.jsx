import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontSize={50} fontWeight={600}>
        NotFound...😭
      </Typography>
    </Box>
  );
};

export default NotFound;
