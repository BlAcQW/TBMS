import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import ViewAccount from 'src/components/account/View-account';
import UpdateAccount from 'src/components/account/UpdateAccount';



// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
  }[];
};

export function Messagelist({ title, subheader, list, ...other }: Props) {
  const [selected, setSelected] = useState(['2']);

  const handleClickComplete = (taskId: string) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 304 }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{ minWidth: 560 }}>
          {list.map((item) => (
            <Item
              key={item.id}
              item={item}
              checked={selected.includes(item.id)}
              onChange={() => handleClickComplete(item.id)}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  checked: boolean;
  item: Props['list'][number];
  onChange: (id: string) => void;
};

function Item({ item, checked, onChange, sx, ...other }: ItemProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleview = useCallback(() => {
    handleClosePopover();
    console.info('MARK COMPLETE', item.id);
  }, [handleClosePopover, item.id]);

  const handleShare = useCallback(() => {
    handleClosePopover();
    console.info('SHARE', item.id);
  }, [handleClosePopover, item.id]);

  const handleEdit = useCallback(() => {
    handleClosePopover();
    console.info('EDIT', item.id);
  }, [handleClosePopover, item.id]);

  const handleDelete = useCallback(() => {
    handleClosePopover();
    console.info('DELETE', item.id);
  }, [handleClosePopover, item.id]);

  return (
    <>
      <Box
        sx={{
          pl: 2,
          pr: 1,
          py: 1.5,
          display: 'flex',
          ...(checked && { color: 'text.disabled', textDecoration: 'line-through' }),
          ...sx,
        }}
        {...other}
      >
       
        <Box sx={{ m: 0, flexGrow: 1 }}>
  {item.name}
</Box>


       
      </Box>

      
    </>
  );
}
