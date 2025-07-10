import React, { useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  styled,
  keyframes
} from '@mui/material'
import { motion } from 'framer-motion'
import { Spa, Star, Schedule, Chat, AutoAwesome } from '@mui/icons-material'
import aboutFaceContent from '../../../data/subdomain-content/aboutface/aboutFaceContent.json'
import { useChatStore } from '../../../chatbot/store/chatStore'
import { trackChatOpen, trackEvent } from '../../../utils/analytics'

// Keyframes for animations
const sunburstPulse = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 0.3;
  }
`

const particleFloat = keyframes`
  0% {
    transform: translateY(0) translateX(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(-20px) translateX(10px) scale(1);
  }
  100% {
    transform: translateY(-200px) translateX(-30px) scale(0.5);
    opacity: 0;
  }
`

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(212, 175, 55, 0.5), 0 0 60px rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(255, 255, 255, 0.2);
  }
`

// Styled components
const StyledHeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(135deg, #e3e3e3 0%, #ffffff 50%, #e3e3e3 100%)', // Platinum to white gradient
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)', // Gold accent shimmer
    pointerEvents: 'none'
  }
}))

const SunburstContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '150%',
  height: '150%',
  pointerEvents: 'none',
  opacity: 0.3,
  animation: `${sunburstPulse} 20s ease-in-out infinite`
})

const SunburstRay = styled(Box)(({ rotation }: { rotation: number }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '200%',
  height: '2px',
  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  transformOrigin: 'center'
}))

const FacialContourOverlay = styled(Box)({
  position: 'absolute',
  top: '50%',
  right: '10%',
  transform: 'translateY(-50%)',
  width: '400px',
  height: '500px',
  opacity: 0.1,
  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cpath d='M200 50 Q150 100 150 200 T200 400 Q250 300 250 200 T200 50' stroke='white' stroke-width='2' fill='none' opacity='0.5'/%3E%3C/svg%3E") no-repeat center`,
  backgroundSize: 'contain',
  pointerEvents: 'none'
})

const WarmParticle = styled(Box)(({ delay }: { delay: number }) => ({
  position: 'absolute',
  width: '6px',
  height: '6px',
  background: 'radial-gradient(circle, #D4AF37 0%, #ffffff 100%)', // Luxury gold to white
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
  animation: `${particleFloat} 8s ease-out infinite`,
  animationDelay: `${delay}s`
}))

const GlowButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(145deg, #f5d76e, #f8c059)', // Luxury gold gradient
  color: '#000000', // Deep black text
  fontWeight: 600,
  padding: '12px 32px',
  fontSize: '1.1rem',
  animation: `${glowPulse} 3s ease-in-out infinite`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(145deg, #f8c059, #f5d76e)', // Reverse gold gradient
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)'
  }
}))

const ElegantTypography = styled(Typography)({
  fontFamily: '"Bodoni Moda", "Playfair Display", serif',
  letterSpacing: '0.02em'
})

const AboutFaceHero: React.FC = () => {
  const { hero, doctor } = aboutFaceContent
  const { toggleChat, sendMessage } = useChatStore()
  const particlesRef = useRef<HTMLDivElement>(null)

  const handleChatWithJulie = async () => {
    trackChatOpen('aboutface_hero')
    trackEvent({
      action: 'emface_interest',
      category: 'procedure_interest',
      label: 'hero_cta'
    })
    toggleChat()
    // Add a small delay to ensure chat opens, then send context message
    setTimeout(() => {
      sendMessage("I'm interested in EmFace treatments and would like to learn more about AboutFace Aesthetics services")
    }, 500)
  }

  useEffect(() => {
    // Create warm echo particles dynamically
    if (particlesRef.current) {
      const particleCount = 20
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.style.position = 'absolute'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.bottom = '-10px'
        particlesRef.current.appendChild(particle)
      }
    }
  }, [])

  return (
    <StyledHeroSection className="hero-aboutface">
      {/* Sunburst Pattern */}
      <SunburstContainer>
        {[...Array(12)].map((_, i) => (
          <SunburstRay key={i} rotation={i * 30} />
        ))}
      </SunburstContainer>

      {/* Facial Contour Lines */}
      <FacialContourOverlay />

      {/* Warm Particles Container */}
      <Box ref={particlesRef} sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (
          <WarmParticle
            key={i}
            delay={i * 0.5}
            sx={{
              left: `${Math.random() * 100}%`,
              bottom: '-10px'
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={<AutoAwesome sx={{ color: '#D4AF37 !important' }} />}
                  label="Premium Facial Aesthetics"
                  sx={{
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.95)', // White overlay
                    color: '#000000', // Deep black text
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    '& .MuiChip-icon': {
                      color: '#D4AF37' // Luxury gold
                    }
                  }}
                />
                <ElegantTypography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{
                    color: '#000000', // Black text on platinum/white background
                    mb: 2,
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    textShadow: '2px 4px 8px rgba(0,0,0,0.1)',
                    letterSpacing: '0.03em'
                  }}
                >
                  {hero.title}
                </ElegantTypography>
                <ElegantTypography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  sx={{
                    color: '#1a1a1a', // Charcoal for subheading
                    fontWeight: 400,
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    letterSpacing: '0.02em'
                  }}
                >
                  {hero.subtitle}
                </ElegantTypography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#1a1a1a', // Charcoal for body text
                    mb: 4,
                    fontSize: '1.2rem',
                    lineHeight: 1.8,
                    maxWidth: '600px'
                  }}
                >
                  {hero.description}
                </Typography>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <GlowButton
                  variant="contained"
                  size="large"
                  startIcon={<Chat />}
                  onClick={handleChatWithJulie}
                >
                  Chat with Julie about EmFace
                </GlowButton>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Schedule />}
                  onClick={handleChatWithJulie}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: '#D4AF37', // Gold border
                    color: '#000000', // Black text on platinum/white background
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(212, 175, 55, 0.1)', // Gold overlay
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#D4AF37', // Gold border
                      background: 'rgba(212, 175, 55, 0.2)', // Gold overlay
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Book Consultation
                </Button>
              </Stack>

              {/* Trust Indicators */}
              <Grid container spacing={3}>
                {[
                  { value: '15+', label: 'Years Experience' },
                  { value: '5,000+', label: 'Facial Treatments' },
                  { value: '4.9★', label: 'Patient Rating' }
                ].map((stat, index) => (
                  <Grid item xs={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <Box
                        textAlign="center"
                        sx={{
                          background: 'rgba(255, 255, 255, 0.95)', // White overlay
                          backdropFilter: 'blur(10px)',
                          borderRadius: 2,
                          p: 2,
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.25)',
                            transform: 'translateY(-4px)'
                          }
                        }}
                      >
                        <ElegantTypography
                          variant="h4"
                          sx={{
                            color: '#000000', // Black text on platinum/white background
                            fontWeight: 'bold',
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {stat.value}
                        </ElegantTypography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* Right Content - Doctor Card & Images */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Grid container spacing={3}>
                {/* Doctor Card */}
                <Grid item xs={12}>
                  <Card
                    elevation={0}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.98)', // Pure white card
                      backdropFilter: 'blur(20px)',
                      borderRadius: 3,
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box display="flex" alignItems="center" mb={3}>
                        <Avatar
                          src={doctor.image}
                          sx={{
                            width: 80,
                            height: 80,
                            mr: 3,
                            border: '3px solid #D4AF37', // Luxury gold border
                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
                          }}
                        />
                        <Box>
                          <ElegantTypography
                            variant="h5"
                            sx={{
                              fontWeight: 'bold',
                              color: '#000000', // Deep black text
                              mb: 0.5
                            }}
                          >
                            {doctor.name}
                          </ElegantTypography>
                          <Typography
                            variant="body1"
                            sx={{ color: '#1a1a1a', fontWeight: 500 }} // Charcoal
                          >
                            {doctor.title}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Stack spacing={1}>
                        {doctor.credentials.map((credential, index) => (
                          <Box key={index} display="flex" alignItems="center">
                            <Star
                              sx={{
                                fontSize: 16,
                                mr: 1,
                                color: '#D4AF37' // Luxury gold
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: '#1a1a1a' }} // Charcoal
                            >
                              {credential}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Treatment Gallery Preview */}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {hero.images.map((image, index) => (
                      <Grid item xs={4} key={index}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box
                            component="img"
                            src={image}
                            alt={`Facial treatment result ${index + 1}`}
                            sx={{
                              width: '100%',
                              height: 200,
                              objectFit: 'cover',
                              borderRadius: 2,
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                              border: '2px solid rgba(212, 175, 55, 0.3)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 8px 30px rgba(212, 175, 55, 0.3)',
                                borderColor: '#D4AF37' // Luxury gold
                              }
                            }}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </StyledHeroSection>
  )
}

export default AboutFaceHero
