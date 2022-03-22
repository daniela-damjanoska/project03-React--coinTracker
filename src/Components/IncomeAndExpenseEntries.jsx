import React, { useContext, useState } from 'react';
import { Context } from '../Context/Context';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';
import EntryModal from '../Components/EntryModal';
import RightClickMenu from './RightClickMenu';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import MenuItem from '@mui/material/MenuItem';

export default function IncomeAndExpenseEntries() {
    const { entries, deleteEntry } = useContext(Context);

    const [editEntry, setEditEntry] = useState(false);
    const [item, setItem] = useState();
    const [contextMenu, setContextMenu] = useState(null);
    const [expenseOrIncome, setExpenseOrIncome] = useState('');

    console.log(item);

    const handleContextMenu = e => {
        e.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: e.clientX - 2,
                      mouseY: e.clientY - 4,
                  }
                : null
        );
    };

    const handleClose = () => setContextMenu(null);
    const closeEntryCategory = () => setEditEntry(false);

    return (
        <IncomeAndExpenseWrapper
            title="Entries"
            customTopMarginMob={0}
            customBottomMarginMob={13}
            customLeftMarginPC={4}
            customLeftMarginMob={0}
        >
            {entries.map((entry, idx) => (
                <>
                    <ListItem
                        key={idx}
                        disablePadding
                        onClick={() => {
                            setItem(entry);
                            setEditEntry(true);
                        }}
                        onMouseDown={() => {
                            setItem(entry);
                        }}
                        onContextMenu={handleContextMenu}
                        style={{ cursor: 'context-menu' }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>{entry.categoryIcon}</Icon>
                            </ListItemIcon>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <ListItemText
                                    primary={`${entry.category} (${entry.name})`}
                                    primaryTypographyProps={{
                                        color: 'dark.main',
                                        mb: -1,
                                    }}
                                />
                                <ListItemText
                                    primary={entry.date}
                                    primaryTypographyProps={{
                                        color: 'lightGrey.main',
                                        mt: 0,
                                    }}
                                />
                            </Box>
                            <ListItemText
                                primary={
                                    entry.type === 'income'
                                        ? `+${entry.amount}`
                                        : `-${entry.amount}`
                                }
                                primaryTypographyProps={{
                                    fontSize: '22px',
                                    textAlign: 'right',
                                    color:
                                        entry.type === 'income'
                                            ? 'info.main'
                                            : 'danger.main',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    {editEntry ? (
                        <EntryModal
                            closeModal={closeEntryCategory}
                            addOrEditEntry={item}
                        />
                    ) : (
                        ''
                    )}
                </>
            ))}
            <RightClickMenu contextMenu={contextMenu} handleClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        setEditEntry(true);
                        handleClose();
                    }}
                >
                    Duplicate
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setItem(null);
                        setEditEntry(true);
                        handleClose();
                    }}
                >
                    Create New
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        deleteEntry(item);
                    }}
                >
                    Delete
                </MenuItem>
            </RightClickMenu>
        </IncomeAndExpenseWrapper>
    );
}
