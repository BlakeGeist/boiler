import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export default function BasicList({executeScroll}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => executeScroll()}>
              <ListItemText primary="Summary" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="#article">
              <ListItemText primary="Article" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="#faqs">
              <ListItemText primary="Faqs" />
            </ListItemButton>
          </ListItem>             
          <ListItem disablePadding>
            <ListItemButton href="#recent-posts">
              <ListItemText primary="Recent Posts" />
            </ListItemButton>
          </ListItem>     
          <ListItem disablePadding>
            <ListItemButton href="#recent-posts">
              <ListItemText primary="Related Posts" />
            </ListItemButton>
          </ListItem>                       
        </List>
      </nav>
    </Box>
  )
}