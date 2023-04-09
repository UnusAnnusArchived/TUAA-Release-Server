import { Typography } from "@mui/material";
import { NextPage } from "next";
import Layout from "../components/layout";
// import MetaHead from "../components/meta-head";
import styles from "../styles/404.module.scss";

const NotFound: NextPage = () => {
  return (
    <Layout>
      {/* <MetaHead baseTitle="404 Not Found" /> */}
      <div className={styles.container}>
        <Typography variant="h4" component="h1">
          404 Not Found
        </Typography>
        <Typography>The page you requested does not exist!</Typography>
      </div>
    </Layout>
  );
};

export default NotFound;
