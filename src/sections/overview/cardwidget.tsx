import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Avatar,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';

interface DefaultProps {
  startContent?: JSX.Element;
  endContent?: JSX.Element;
  name: string;
  growth?: string | number;
  value: string | number;
}

export default function Cardwidget(props: DefaultProps) {
  const { startContent, endContent, name, growth, value } = props;
  const theme = useTheme();

  const textColor = theme.palette.mode === 'light' ? grey[900] : '#fff';
  const textColorSecondary = grey[600];

  return (
    <Card
      sx={{
        padding: '15px',
        borderRadius: '8px',
        boxShadow: theme.shadows[1],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Start Content */}
        {startContent && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '18px',
            }}
          >
            {startContent}
          </Box>
        )}

        {/* Stat Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: textColorSecondary, lineHeight: 1 }}
          >
            {name}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: textColor, fontWeight: 500, lineHeight: 1.2 }}
          >
            {value}
          </Typography>
          {growth && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '4px',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: green[500], fontWeight: 700, marginRight: '5px' }}
              >
                {growth}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: textColorSecondary, fontWeight: 400 }}
              >
                Charges
              </Typography>
            </Box>
          )}
        </Box>

        {/* End Content */}
        {endContent && (
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {endContent}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
