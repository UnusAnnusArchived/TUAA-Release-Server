import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { theme } from "../theme/theme";
import classNames from "classnames";
import AppBar from "../app-bar";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: theme.palette?.background.default,
    },
  })
);

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const classes = useStyles(theme);

  const refetchUser = async () => {
    if (loggedInUser) {
      try {
        await pb.collection("users").authRefresh();
      } catch (err) {
        console.error(err);
        console.info("Logging out due to error (printed above)!");
        setLoggedInUser(null);
      }
    }
  };

  useEffect(() => {
    if (loggedInUser) refetchUser();
  }, []);

  return (
    <React.Fragment>
      <noscript>
        <style>{`body { all: unset; } #main { display: none!important; }`}</style>
        {/*eslint-disable-next-line*/}
        <h1>Please enable JavaScript.</h1>
      </noscript>

      <div id="main" className={classNames(classes.main, styles.main)}>
        <AppBar />
        <div className={styles.toolbar} />
        <main id="main" className="container pb-5 text-white">
          {children}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
