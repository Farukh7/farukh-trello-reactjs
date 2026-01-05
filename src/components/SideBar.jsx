import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import HomeIcon from "@mui/icons-material/Home";

const SideBar = () => {
  return (
    <Box
      sx={{
        pt: 5,
        pl: 3,
        width: 280,
        display: { xs: "none", lg: "block" },
      }}
    >
      {/* Top Menu */}
      <List>
        <ListItemButton selected>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Boards"
            primaryTypographyProps={{
              fontWeight: 600,
              color: "primary.main",
            }}
          />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ViewQuiltIcon />
          </ListItemIcon>
          <ListItemText
            primary="Templates"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Workspaces */}
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          Workspaces
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" mt={2}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              bgcolor: "success.main",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            T
          </Avatar>

          <Typography fontSize={14} fontWeight={600}>
            Trello Workspace
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default SideBar;
