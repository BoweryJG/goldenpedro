import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAdaptiveNavigation } from '../contexts/AdaptiveNavigationContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { CornerScrews, cartierScrewStyles } from './effects/CartierScrews';
import { professionalIcons, ProfessionalIconType } from './icons/ProfessionalIcons';
import '../styles/luxury-design-system.css';

// Center data with professional medical icons
const centers = [
  {
    id: 'tmj' as ProfessionalIconType,
    title: 'TMJ & Orofacial Pain',
    subtitle: 'Expert jaw disorder care',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', // GOLD
    stats: { label: 'Patients Treated', value: '2,500+' },
    features: ['Custom Oral Appliances', 'Physical Therapy', 'Pain Management'],
    icon: 'tmj' as ProfessionalIconType,
    theme: 'gold',
    textColor: '#1A1A1A',
  },
  {
    id: 'implants' as ProfessionalIconType,
    title: 'Dental Implants',
    subtitle: 'Permanent tooth replacement',
    gradient: 'linear-gradient(135deg, #000000 0%, #1A1A1A 100%)', // BLACK
    stats: { label: 'Success Rate', value: '99.2%' },
    features: ['Single & Full Arch', 'Bone Grafting', 'Lifetime Warranty'],
    icon: 'implants' as ProfessionalIconType,
    theme: 'black',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },
  {
    id: 'robotic' as ProfessionalIconType,
    title: 'Robotic Surgery',
    subtitle: 'Precision implant placement',
    gradient: 'linear-gradient(135deg, #E5E5E5 0%, #A8A8A8 100%)', // SILVER
    stats: { label: 'Healing Time', value: '50% Faster' },
    features: ['Computer Precision', 'Minimally Invasive', 'Yomi Technology'],
    icon: 'robotic' as ProfessionalIconType,
    theme: 'silver',
    textColor: '#2B2B2B',
  },
  {
    id: 'medspa' as ProfessionalIconType,
    title: 'MedSpa & Aesthetics',
    subtitle: 'Facial rejuvenation',
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)', // WHITE
    stats: { label: 'Treatments', value: '10,000+' },
    features: ['EMFACE Technology', 'Facial Contouring', 'Anti-Aging'],
    icon: 'medspa' as ProfessionalIconType,
    theme: 'white',
    textColor: '#000000',
    accentColor: '#FF4500',
  },
  {
    id: 'aboutface' as ProfessionalIconType,
    title: 'AboutFace Aesthetics',
    subtitle: 'Complete smile makeovers',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', // GOLD AGAIN
    stats: { label: 'Google Rating', value: '5.0★' },
    features: ['Veneers', 'Teeth Whitening', 'Smile Design'],
    icon: 'aboutface' as ProfessionalIconType,
    theme: 'gold',
    textColor: '#1A1A1A',
  },
];

const CenterCarouselHero: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { setCurrentCenter, setMode, addToJourneyPath } = useAdaptiveNavigation();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showFeatures, setShowFeatures] = useState<number | null>(null);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle card click
  const handleCardClick = (centerId: string, index: number) => {
    if (showFeatures === index) {
      // Navigate on second click
      setCurrentCenter(centerId as any);
      setMode('center-focused');
      addToJourneyPath(`selected-${centerId}`);
      navigate(`/${centerId}`);
    } else {
      // Show features on first click
      setShowFeatures(index);
    }
  };

  // Update active index based on scroll position
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const scrollLeft = carousel.scrollLeft;
    const cardWidth = carousel.offsetWidth * 0.8; // 80% width cards
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      setShowFeatures(null);
    }
  }, [activeIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !carouselRef.current) return;

    autoPlayRef.current = setInterval(() => {
      if (!carouselRef.current) return;
      
      const nextIndex = (activeIndex + 1) % centers.length;
      const cardWidth = carouselRef.current.offsetWidth * 0.8;
      
      carouselRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth',
      });
    }, 8000); // Increased interval to reduce CPU usage

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [activeIndex, isAutoPlaying]);

  // Pause auto-play on interaction
  const handleInteractionStart = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleInteractionEnd = () => {
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Setup intersection observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      className="hero-spectrum spectrum-mesh"
      sx={{
        position: 'relative',
        minHeight: { xs: '100vh', md: '90vh' },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Hero Particles */}
      <Box className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            className="particle"
            sx={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </Box>
      
      {/* Floating Service Orbs */}
      {centers.map((center, index) => (
        <Box
          key={`orb-${center.id}`}
          sx={{
            position: 'absolute',
            width: { xs: 60, md: 80 },
            height: { xs: 60, md: 80 },
            borderRadius: '50%',
            background: center.gradient,
            opacity: 0.3,
            filter: 'blur(40px)',
            left: `${20 + (index * 15)}%`,
            top: `${20 + (index % 2 ? 30 : 10)}%`,
            animation: `float-subtle ${20 + index * 2}s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`,
            transform: 'translate3d(0, 0, 0)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Header Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-block',
              mb: 3,
              position: 'relative',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                px: 3,
                py: 1.5,
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%)',
                border: '3px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '40px',
                color: '#ffffff',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.4rem' },
                fontWeight: 800,
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                boxShadow: `
                  0 12px 40px rgba(0, 0, 0, 0.6),
                  0 4px 12px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 0 80px rgba(102, 126, 234, 0.2)
                `,
                textShadow: `
                  0 2px 4px rgba(0, 0, 0, 0.8),
                  0 1px 2px rgba(0, 0, 0, 0.6)
                `,
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  animation: 'shimmer 3s infinite',
                },
                '@keyframes shimmer': {
                  '0%': { left: '-100%' },
                  '100%': { left: '100%' },
                },
              }}
            >
              Staten Island's Premier Dental Excellence
            </Typography>
          </Box>
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 800,
              mb: 1,
              color: 'white',
            }}
          >
            Discover Your Path to Excellence
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 400,
              mb: 2,
            }}
          >
            Explore our world-class specialties and revolutionary treatments
          </Typography>

          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'rgba(255, 255, 255, 0.5)' }}>
              <TouchAppIcon sx={{ fontSize: 20 }} />
              <Typography variant="caption">Swipe or tap cards</Typography>
            </Box>
          )}
        </Box>
      </Container>

      {/* Carousel Container */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Box
          ref={carouselRef}
          className="carousel-container"
          onScroll={handleScroll}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            px: { xs: '10%', md: '10%' },
            py: 3,
            gap: { xs: 2, md: 3 },
            // Ensure first and last cards can center
            '&::before, &::after': {
              content: '""',
              flex: '0 0 auto',
              width: { xs: '10%', md: '10%' },
            },
          }}
        >
          {centers.map((center, index) => (
            <Box
              key={center.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="carousel-card"
              onClick={() => handleCardClick(center.id, index)}
              sx={{
                flex: '0 0 auto',
                width: { xs: '80%', md: '80%' },
                maxWidth: 400,
                scrollSnapAlign: 'center',
                cursor: 'pointer',
                transform: `scale(${activeIndex === index ? 1 : 0.9})`,
                opacity: activeIndex === index ? 1 : 0.7,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&.visible': {
                  animation: 'fadeInUp 0.6s ease-out',
                },
              }}
            >
              <Box
                className="glassmorphism luxury-carousel-card"
                sx={{
                  height: showFeatures === index ? 600 : 500,
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: center.gradient,
                  backdropFilter: 'blur(30px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                  border: '3px solid transparent',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -4,
                    left: -4,
                    right: -4,
                    bottom: -4,
                    borderRadius: '28px',
                    background: activeIndex === index
                      ? center.gradient
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                    opacity: activeIndex === index ? 1 : 0.5,
                    zIndex: -1,
                    animation: activeIndex === index ? `borderPulse-${index} 2s ease-in-out infinite` : 'none',
                    transition: 'all 0.4s ease',
                    willChange: 'filter, opacity, transform', // Optimize for all animated properties
                    transformOrigin: 'center',
                    boxShadow: activeIndex === index 
                      ? `0 0 40px ${center.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] || '#667eea'}` 
                      : 'none',
                  },
                  boxShadow: activeIndex === index 
                    ? `
                        0 30px 80px rgba(0, 0, 0, 0.15),
                        0 12px 40px rgba(0, 0, 0, 0.1),
                        inset 0 0 60px rgba(255, 255, 255, 0.05),
                        inset 0 2px 4px rgba(255, 255, 255, 0.2)
                      `
                    : `
                        0 20px 50px rgba(0, 0, 0, 0.08),
                        0 8px 20px rgba(0, 0, 0, 0.05),
                        inset 0 0 30px rgba(255, 255, 255, 0.03),
                        inset 0 1px 2px rgba(255, 255, 255, 0.1)
                      `,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeIndex === index ? 'scale(1)' : 'scale(0.95)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: activeIndex === index
                      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                    borderRadius: '24px 24px 0 0',
                    pointerEvents: 'none',
                    transition: 'all 0.4s ease',
                  },
                  '&:hover': {
                    transform: activeIndex === index 
                      ? 'translateY(-12px) scale(1.02)'
                      : 'translateY(-8px) scale(0.97)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)',
                    border: activeIndex === index
                      ? '2px solid rgba(255, 255, 255, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: `
                      0 40px 100px rgba(0, 0, 0, 0.2),
                      0 15px 50px rgba(0, 0, 0, 0.15),
                      inset 0 0 80px rgba(255, 255, 255, 0.08),
                      inset 0 2px 6px rgba(255, 255, 255, 0.3)
                    `,
                    '&::after': {
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)',
                    },
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                {/* Inner content wrapper for proper masking - removed for theme colors */}

                {/* Cartier Corner Screws */}
                <Box sx={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
                  <CornerScrews
                    containerWidth={400}
                    containerHeight={showFeatures === index ? 600 : 500}
                    screwSize={3.6}
                    metalType="steel"
                    interactive={true}
                    offset={24}
                  />
                </Box>

                {/* Card Content */}
                <Box sx={{ 
                  p: { xs: 4, sm: 5 }, 
                  position: 'relative', 
                  zIndex: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Icon and Title */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        transform: activeIndex === index ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          width: '140px',
                          height: '140px',
                          borderRadius: '50%',
                          background: center.gradient,
                          opacity: activeIndex === index ? 0.3 : 0.2,
                          filter: 'blur(40px)',
                          transform: 'translate(-50%, -50%)',
                          top: '50%',
                          left: '50%',
                          transition: 'opacity 0.3s ease',
                          zIndex: -1,
                        },
                        '&:hover': {
                          transform: 'scale(1.2)',
                          '&::before': {
                            opacity: 0.4,
                          },
                        },
                      }}
                    >
                      {React.createElement(professionalIcons[center.icon], {
                        size: 120,
                        className: `professional-icon ${activeIndex === index ? 'active' : ''}`
                      })}
                    </Box>
                    
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontFamily: 'var(--font-secondary)',
                        fontWeight: 800, 
                        mb: 1, 
                        color: center.textColor || '#000000',
                        fontSize: { xs: '1.75rem', sm: '2.25rem' },
                        textShadow: center.theme === 'black' ? '0 2px 4px rgba(0, 0, 0, 0.8)' : 'none',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {center.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: center.accentColor || (center.theme === 'black' ? '#FFD700' : center.theme === 'white' ? '#FF4500' : center.textColor),
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        textShadow: center.theme === 'black' ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none',
                        fontWeight: 500,
                      }}
                    >
                      {center.subtitle}
                    </Typography>
                  </Box>

                  {/* Stats */}
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2.5,
                      borderRadius: '24px',
                      background: center.theme === 'white' 
                        ? 'rgba(0, 0, 0, 0.05)'
                        : center.theme === 'black'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: `2px solid ${center.theme === 'black' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                      mb: 3,
                      boxShadow: center.theme === 'gold' 
                        ? '0 0 20px rgba(255, 215, 0, 0.3)'
                        : center.theme === 'silver'
                        ? '0 5px 15px rgba(192, 192, 192, 0.4)'
                        : center.theme === 'black'
                        ? '0 10px 30px rgba(0, 0, 0, 0.5)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: center.textColor || '#000000',
                        opacity: 0.7,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {center.stats.label}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontFamily: 'var(--font-secondary)',
                        fontWeight: 800, 
                        color: center.textColor || '#000000',
                        fontSize: { xs: '1.5rem', sm: '1.75rem' },
                        textShadow: center.theme === 'black' ? '0 2px 4px rgba(0, 0, 0, 0.8)' : 'none',
                      }}
                    >
                      {center.stats.value}
                    </Typography>
                  </Box>

                  {/* Features (show on tap/click) */}
                  <Box
                    sx={{
                      overflow: 'hidden',
                      maxHeight: showFeatures === index ? 200 : 0,
                      transition: 'max-height 0.3s ease',
                      mb: showFeatures === index ? 2 : 0,
                      flexGrow: 1,
                    }}
                  >
                    {center.features.map((feature, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          color: center.textColor || '#000000',
                          fontSize: '1rem',
                          fontWeight: 500,
                          textShadow: center.theme === 'black' ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none',
                        }}
                      >
                        <Box component="span" sx={{ color: center.accentColor || center.textColor, mr: 1, fontWeight: 800 }}>•</Box> {feature}
                      </Typography>
                    ))}
                  </Box>

                  {/* CTA Button */}
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                      background: center.theme === 'white' ? '#000000' : center.theme === 'black' ? '#FFFFFF' : 'transparent',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: center.theme === 'gold' || center.theme === 'silver' ? `2px solid ${center.textColor}` : 'none',
                      color: center.theme === 'white' ? '#FFFFFF' : center.theme === 'black' ? '#000000' : center.textColor,
                      py: 2,
                      px: 3,
                      fontSize: '1.125rem',
                      fontFamily: 'var(--font-secondary)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      borderRadius: '12px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translate3d(0, 0, 0)',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                      boxShadow: `0 8px 24px ${center.gradient}40, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-3px) translate3d(0, 0, 0)',
                        boxShadow: `0 16px 40px ${center.gradient}60, inset 0 1px 0 rgba(255, 255, 255, 0.5)`,
                        filter: 'brightness(1.1)',
                        '&::before': {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                      {showFeatures === index ? 'Enter Center' : 'Learn More'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Progress Indicators */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            pb: 3,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {centers.map((center, index) => (
            <Box
              key={index}
              sx={{
                width: activeIndex === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: activeIndex === index 
                  ? center.gradient
                  : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&::after': activeIndex === index ? {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: center.gradient,
                  filter: 'blur(8px)',
                  opacity: 0.5,
                  transform: 'translate3d(0, 0, 0)',
                } : {},
              }}
              onClick={() => {
                if (carouselRef.current) {
                  const cardWidth = carouselRef.current.offsetWidth * 0.8;
                  carouselRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth',
                  });
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Cartier Screw Styles */}
      <style>{`
        ${cartierScrewStyles}
        
        /* ULTRA VISIBLE pulsating border animations */
        ${centers.map((center, idx) => `
          @keyframes borderPulse-${idx} {
            0%, 100% { 
              filter: hue-rotate(0deg) saturate(1.5) brightness(1.2) drop-shadow(0 0 20px ${center.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] || '#667eea'});
              opacity: 1;
              transform: scale(1);
            }
            25% { 
              filter: hue-rotate(20deg) saturate(2) brightness(1.5) drop-shadow(0 0 40px ${center.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] || '#667eea'});
              opacity: 1;
              transform: scale(1.05);
            }
            50% { 
              filter: hue-rotate(-20deg) saturate(1.8) brightness(1.3) drop-shadow(0 0 30px ${center.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] || '#667eea'});
              opacity: 0.85;
              transform: scale(1.02);
            }
            75% { 
              filter: hue-rotate(15deg) saturate(2.2) brightness(1.6) drop-shadow(0 0 50px ${center.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] || '#667eea'});
              opacity: 1;
              transform: scale(1.03);
            }
          }
        `).join('')}
        
        /* Professional Icon Animations */
        .professional-icon {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .professional-icon.active {
          transform: scale(1.05);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        
        .professional-icon:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25));
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes borderPulse {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 300% 50%;
          }
        }
        
        /* GPU Optimization */
        .hero-spectrum {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .carousel-container {
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        
        .carousel-card {
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .hero-particles {
            display: none;
          }
          
          .glassmorphism {
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
          }
        }
        
        /* Icon specific styles */
        .center-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .center-icon:hover {
          transform: rotate(5deg) scale(1.05);
        }
        
        /* Pulsing animation for active icon */
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        .active-icon {
          animation: iconPulse 2s ease-in-out infinite;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* SVG Gradient Definitions for Icons */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {centers.map((center) => {
            const gradientId = `gradient-${center.id}`;
            const colors = center.gradient.match(/#[0-9a-fA-F]{6}/g) || ['#000', '#fff'];
            return (
              <linearGradient key={gradientId} id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: colors[0], stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: colors[1], stopOpacity: 1 }} />
              </linearGradient>
            );
          })}
        </defs>
      </svg>
    </Box>
  );
};

export default CenterCarouselHero;