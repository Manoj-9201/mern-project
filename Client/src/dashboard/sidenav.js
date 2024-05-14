import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';

const handleLogout = () => {
    window.location.href = "/";
};
const handleHome = () => {
    window.location.href = "/firstpage";
};
const handleReport = () => {
    window.location.href = "/reports";
};



export const MainListItems = () => {

    return (

        <React.Fragment>
            <ListItemButton>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" onClick={handleHome} />
            </ListItemButton>
            {/* <ListItemButton >
                <ListItemIcon>
                    <SummarizeIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" onClick={handleReport} />
            </ListItemButton> */}
            {/* <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItemButton> */}
            <ListItemButton>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" onClick={handleLogout} />
            </ListItemButton>
            {/* <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItemButton> */}
        </React.Fragment>
    );
}

export const SecondaryListItems = () => (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        {/* <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton> */}
    </React.Fragment>
);