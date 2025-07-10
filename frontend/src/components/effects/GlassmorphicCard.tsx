import type { PaperProps } from '@mui/material';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface GlassmorphicCardProps extends PaperProps {
  blur?: number;
  transparency?: number;
  borderGradient?: string;
  variant?: 'dark' | 'light' | 'gold';
}

const GlassmorphicCard = styled(Paper)<GlassmorphicCardProps>(({ 
  theme, 
  blur = 20, 
  transparency = 0.8,
  borderGradient = 'linear-gradient(145deg, #f5d76e, #f8c059)',
  variant = 'dark'
}) => ({
  background: variant === 'gold' 
    ? `rgba(212, 175, 55, ${transparency * 0.1})`
    : variant === 'light' 
    ? `rgba(255, 255, 255, ${transparency * 0.1})`
    : `rgba(61, 61, 61, ${transparency})`,
  backdropFilter: `blur(${blur}px)`,
  WebkitBackdropFilter: `blur(${blur}px)`,
  border: '1px solid transparent',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: borderGradient,
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    WebkitMaskComposite: 'xor',
    pointerEvents: 'none',
  },
  
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 12px 40px rgba(212, 175, 55, 0.2)',
  }
}));

export default GlassmorphicCard;