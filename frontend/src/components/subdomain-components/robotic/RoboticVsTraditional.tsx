import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Switch,
  FormControlLabel,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SmartToy,
  Build,
  CompareArrows,
  CheckCircle,
  Cancel,
  Speed,
  Healing,
  AttachMoney,
  ExpandMore,
  TrendingUp,
  Science,
  AccessTime,
  Engineering,
  Chat
} from '@mui/icons-material'
import roboticContent from '../../../data/subdomain-content/robotic/roboticContent.json'
import { useChatStore } from '../../../chatbot/store/chatStore'
import { trackChatOpen, trackEvent } from '../../../utils/analytics'

interface ComparisonMetric {
  category: string
  icon: React.ReactNode
  roboticValue: string | number
  traditionalValue: string | number
  roboticAdvantage: boolean
  description: string
  details: string[]
}

const RoboticVsTraditional: React.FC = () => {
  const { toggleChat, sendMessage } = useChatStore()
  const [showDetails, setShowDetails] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null)

  const comparisonMetrics: ComparisonMetric[] = [
    {
      category: 'Precision Accuracy',
      icon: <Engineering />,
      roboticValue: '99.5%',
      traditionalValue: '85-90%',
      roboticAdvantage: true,
      description: 'Sub-millimeter precision vs. human hand limitations',
      details: [
        'Robotic: ±0.1mm accuracy with computer guidance',
        'Traditional: ±2-3mm variation due to hand tremor',
        'Robotic: Consistent depth and angle placement',
        'Traditional: Dependent on surgeon experience'
      ]
    },
    {
      category: 'Surgery Duration',
      icon: <AccessTime />,
      roboticValue: '45 min',
      traditionalValue: '90 min',
      roboticAdvantage: true,
      description: 'Faster procedures with pre-planned robotic guidance',
      details: [
        'Robotic: Pre-planned surgical path reduces time',
        'Traditional: Manual measurements and adjustments',
        'Robotic: Automated positioning saves 50% time',
        'Traditional: Multiple repositioning attempts'
      ]
    },
    {
      category: 'Healing Time',
      icon: <Healing />,
      roboticValue: '2-3 months',
      traditionalValue: '4-6 months',
      roboticAdvantage: true,
      description: 'Minimally invasive approach promotes faster healing',
      details: [
        'Robotic: Smaller incisions preserve tissue',
        'Traditional: Larger incisions require more healing',
        'Robotic: Less trauma to surrounding bone',
        'Traditional: More tissue disruption'
      ]
    },
    {
      category: 'Success Rate',
      icon: <CheckCircle />,
      roboticValue: '98.7%',
      traditionalValue: '95%',
      roboticAdvantage: true,
      description: 'Higher success rates due to optimal placement',
      details: [
        'Robotic: Precise bone engagement optimizes integration',
        'Traditional: Variable placement affects success',
        'Robotic: Real-time feedback prevents errors',
        'Traditional: Limited intraoperative guidance'
      ]
    },
    {
      category: 'Patient Comfort',
      icon: <Healing />,
      roboticValue: 'Minimal discomfort',
      traditionalValue: 'Moderate discomfort',
      roboticAdvantage: true,
      description: 'Less post-operative pain and swelling',
      details: [
        'Robotic: Gentle, controlled movements',
        'Traditional: More forceful manual placement',
        'Robotic: Reduced tissue trauma',
        'Traditional: Greater surgical stress'
      ]
    },
    {
      category: 'Cost Range',
      icon: <AttachMoney />,
      roboticValue: '$4,500-6,500',
      traditionalValue: '$3,500-5,000',
      roboticAdvantage: false,
      description: 'Advanced technology includes premium for precision',
      details: [
        'Robotic: Includes advanced technology fee',
        'Traditional: Lower upfront cost',
        'Robotic: Better long-term value with higher success',
        'Traditional: May require additional procedures'
      ]
    }
  ]

  const advantageComparison = {
    robotic: roboticContent.robotic_vs_traditional.robotic_advantages,
    traditional: roboticContent.robotic_vs_traditional.traditional_limitations
  }

  const handleMetricSelect = (index: number) => {
    setSelectedMetric(selectedMetric === index ? null : index)
  }

  return (
    <Box 
      id="robotic-vs-traditional"
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: 'grey.50',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" sx={{ mb: 6 }}>
            <CompareArrows sx={{ fontSize: '3rem', color: '#D4AF37', mb: 2 }} />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                color: '#D4AF37'
              }}
            >
              Robotic vs Traditional Implants
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              See how Yomi robotic technology compares to traditional implant methods 
              across key metrics that matter to you
            </Typography>
          </Box>

          {/* Toggle for Details */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showDetails}
                  onChange={(e) => setShowDetails(e.target.checked)}
                  color="primary"
                />
              }
              label="Show detailed breakdown"
            />
          </Box>

          {/* Comparison Table */}
          <Card sx={{ mb: 6, overflow: 'hidden' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#000000' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Science sx={{ mr: 1 }} />
                        Comparison Factor
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SmartToy sx={{ mr: 1 }} />
                        Yomi Robotic
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Build sx={{ mr: 1 }} />
                        Traditional
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>
                      Advantage
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comparisonMetrics.map((metric, index) => (
                    <React.Fragment key={index}>
                      <TableRow
                        hover
                        sx={{
                          cursor: 'pointer',
                          bgcolor: selectedMetric === index ? '#1a1a1a' : 'inherit',
                          color: selectedMetric === index ? '#FFFFFF' : 'inherit'
                        }}
                        onClick={() => handleMetricSelect(index)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                bgcolor: selectedMetric === index ? 'white' : '#1a1a1a',
                                color: selectedMetric === index ? '#D4AF37' : '#FFFFFF',
                                mr: 2,
                                width: 32,
                                height: 32
                              }}
                            >
                              {metric.icon}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {metric.category}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {metric.description}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                            {metric.roboticValue}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.main' }}>
                            {metric.traditionalValue}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {metric.roboticAdvantage ? (
                            <Chip
                              icon={<SmartToy />}
                              label="Robotic"
                              color="primary"
                              size="small"
                            />
                          ) : (
                            <Chip
                              icon={<AttachMoney />}
                              label="Traditional"
                              color="warning"
                              size="small"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                      
                      {showDetails && selectedMetric === index && (
                        <TableRow>
                          <TableCell colSpan={4} sx={{ bgcolor: 'grey.50' }}>
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Box sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                  Detailed Comparison
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                  {metric.details.map((detail, detailIndex) => (
                                    <Box
                                      key={detailIndex}
                                      sx={{
                                        flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' },
                                        p: 1,
                                        bgcolor: detail.includes('Robotic:') ? '#1a1a1a' : '#000000',
                                        borderRadius: 1,
                                        color: '#FFFFFF'
                                      }}
                                    >
                                      <Typography variant="body2">
                                        {detail}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Advantages Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', bgcolor: '#1a1a1a', color: '#FFFFFF' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <SmartToy sx={{ fontSize: '2rem', mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      Robotic Advantages
                    </Typography>
                  </Box>
                  {advantageComparison.robotic.map((advantage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CheckCircle sx={{ mr: 2, color: '#FFFFFF' }} />
                        <Typography variant="body1">
                          {advantage}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', bgcolor: '#000000', color: '#FFFFFF' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Build sx={{ fontSize: '2rem', mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      Traditional Limitations
                    </Typography>
                  </Box>
                  {advantageComparison.traditional.map((limitation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Cancel sx={{ mr: 2, color: '#FFFFFF' }} />
                        <Typography variant="body1">
                          {limitation}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* ROI Analysis */}
          <Card sx={{ mb: 6 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#D4AF37' }} textAlign="center">
                Long-Term Value Analysis
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 2 }}>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <TrendingUp sx={{ fontSize: '3rem', color: '#D4AF37', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Higher Success Rate
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    98.7% vs 95% success rate means fewer complications and replacements
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Speed sx={{ fontSize: '3rem', color: '#FFD700', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Faster Recovery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Return to work and normal activities 50% faster with robotic precision
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Engineering sx={{ fontSize: '3rem', color: '#e3e3e3', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Predictable Outcomes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Computer-guided placement ensures optimal positioning every time
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Cost Justification */}
          <Accordion sx={{ mb: 4 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                Understanding the Technology Investment
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Why Robotic Costs More:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      FDA-approved robotic system investment
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Advanced 3D imaging and planning software
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Specialized training and certification
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Premium materials and precision components
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Long-term Value:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Reduced risk of complications
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Lower likelihood of implant failure
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Faster healing saves time and money
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Better aesthetic and functional outcomes
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Card sx={{ p: 4, bgcolor: '#000000', color: '#FFFFFF' }}>
              <CompareArrows sx={{ fontSize: '3rem', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Experience the Robotic Difference
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
                Don't just read about the advantages - schedule a consultation to see 
                how Yomi robotic technology can transform your implant experience.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Chat />}
                  onClick={() => {
                    trackChatOpen('robotic_vs_traditional_cta')
                    trackEvent({
                      action: 'robotic_comparison_consultation',
                      category: 'robotic_surgery',
                      label: 'comparison_section'
                    })
                    
                    toggleChat()
                    
                    setTimeout(() => {
                      sendMessage("I've been comparing robotic vs traditional implants and I'm interested in learning more about Yomi robotic surgery. Can you help me schedule a consultation to see the technology in action?")
                    }, 500)
                  }}
                  sx={{
                    bgcolor: '#D4AF37',
                    color: '#000000',
                    fontSize: '1.1rem',
                    py: 1.5,
                    px: 4,
                    '&:hover': {
                      bgcolor: '#B8860B'
                    }
                  }}
                >
                  Chat with Julie about Robotic Consultation
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    const element = document.getElementById('yomi-chatbot')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  sx={{
                    borderColor: '#e3e3e3',
                    color: '#FFFFFF',
                    fontSize: '1.1rem',
                    py: 1.5,
                    px: 4,
                    '&:hover': {
                      bgcolor: 'rgba(227, 227, 227, 0.1)',
                      borderColor: '#e3e3e3'
                    }
                  }}
                >
                  Ask Our Yomi Expert
                </Button>
              </Box>
            </Card>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default RoboticVsTraditional
