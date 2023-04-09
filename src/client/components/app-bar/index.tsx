import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { hamburgerOpen, userAtom } from "../../src/atoms";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/AppRegistration";
import { Avatar, Fade, LinearProgress, Tooltip, useMediaQuery } from "@mui/material";
import getPbImagePath from "../../src/utils/getPbImagePath";
import Link from "next/link";
import { Logout, Settings } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IApp } from "../../../types";
import pb from "../../src/pocketbase";
import { siteRoot } from "../../../endpoints";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MiniDrawer: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const theme = useTheme();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [isRouting, setIsRouting] = useState(false);
  const [apps, setApps] = useState<IApp[]>([]);
  const [open, setOpen] = useRecoilState(hamburgerOpen);
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();

  const handleRoutingEnd = () => {
    setIsRouting(false);
  };
  const handleRoutingStart = () => {
    setIsRouting(true);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRoutingStart);
    router.events.on("routeChangeComplete", handleRoutingEnd);

    (async () => {
      setApps(await pb.collection("apps").getFullList());
    })();

    return () => {
      router.events.off("routeChangeStart", handleRoutingStart);
      router.events.off("routeChangeComplete", handleRoutingEnd);
    };
  }, []);

  const handleDrawerOpen = () => {
    console.log(open);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    if (open) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  };

  const handlePageChange = (url: string) => {
    router.push(url);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              opacity: open ? 0 : 1,
              transition: theme.transitions.create("opacity", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration[open ? "leavingScreen" : "enteringScreen"],
              }),
              cursor: open ? "initial" : "pointer",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/_" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{
                transition: theme.transitions.create("margin-left", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration[open ? "leavingScreen" : "enteringScreen"],
                }),
                marginLeft: open ? "-26px" : 5,
                cursor: "pointer",
              }}
            >
              TUAA Releases
            </Typography>
          </Link>
        </Toolbar>
        <Fade in={isRouting}>
          <LinearProgress />
        </Fade>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {[
            { name: "Home", url: "/_", icon: <HomeIcon /> },
            { name: "Settings", url: "/_/settings/", icon: <Settings /> },
            { type: "divider" },
            ...apps.map((app) => {
              return {
                name: app.name,
                url: `/_/app/${app.app_id}`,
                icon: (
                  <Avatar
                    src={getPbImagePath(app.collectionName, app.id, app.icon, 72, 72)}
                    alt={app.name}
                    sx={{ width: 24, height: 24 }}
                  />
                ),
              };
            }),
            { type: "divider" },
            ...(!loggedInUser?.model
              ? [
                  {
                    name: "Login",
                    url: `https://unusann.us/external-login?redirectUrl=${siteRoot}/_/login&imageUrl=/ua.png&appName=TUAA%20Releases`,
                    icon: <LoginIcon />,
                  },
                ]
              : [
                  {
                    name: "Logout",
                    onClick: () => {
                      setLoggedInUser(null);
                    },
                    icon: <Logout />,
                  },
                ]),
          ].map((page, index) => (
            <>
              {page.type === "divider" ? (
                <Divider key={index} />
              ) : (
                <ListItem
                  key={page.url}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => {
                    if (page.onClick) {
                      page.onClick();
                    } else {
                      handlePageChange(page.url!);
                    }
                  }}
                >
                  <Tooltip title={page.name} placement="right" arrow>
                    <ListItemButton
                      selected={page.url === router.pathname}
                      sx={{
                        height: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          marginRight: open ? 3 : 0,
                          justifyContent: "center",
                          transition: theme.transitions.create("margin-right", {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration[open ? "enteringScreen" : "leavingScreen"],
                          }),
                        }}
                      >
                        {page.icon ?? undefined}
                      </ListItemIcon>
                      <ListItemText
                        primary={page.name}
                        primaryTypographyProps={{
                          sx: {
                            width: 151,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            opacity: open ? 1 : 0,
                            transition: theme.transitions.create("opacity"),
                          },
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              )}
            </>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <>{children}</>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
