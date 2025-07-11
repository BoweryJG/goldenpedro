import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Divider
} from '@mui/material'
import { motion } from 'framer-motion'
import { 
  AttachMoney, 
  Calculate,
  CreditCard,
  Schedule,
  Savings,
  Chat
} from '@mui/icons-material'
import aboutFaceContent from '../../../data/subdomain-content/aboutface/aboutFaceContent.json'
import { useChatStore } from '../../../chatbot/store/chatStore'
import { trackChatOpen, trackEvent } from '../../../utils/analytics'

const FacialCostCalculator: React.FC = () => {
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [financingTerm, setFinancingTerm] = useState(12)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [showFinancing, setShowFinancing] = useState(false)
  const { toggleChat, sendMessage } = useChatStore()

  const handleChatWithJulie = async (context: string) => {
    trackChatOpen('aboutface_cost_calculator')
    trackEvent({
      action: 'financing_interest',
      category: 'conversion',
      label: context
    })
    toggleChat()
    setTimeout(() => {
      const message = context === 'financing' 
        ? `I'm interested in financing options for EmFace treatments. My estimated investment is $${totalAmount.toLocaleString()}`
        : `I'd like to schedule a consultation for EmFace treatments at AboutFace Aesthetics`
      sendMessage(message)
    }, 500)
  }

  const { treatments, facialPackages, financing } = aboutFaceContent

  const treatmentPrices: { [key: string]: number } = {
    'dermal-fillers': 850,
    'botox-facial': 360,
    'facial-threading': 1800,
    'chemical-peels': 275,
    'microneedling': 500,
    'facial-contouring': 3200
  }

  const handleTreatmentToggle = (treatmentId: string) => {
    setSelectedTreatments(prev => 
      prev.includes(treatmentId)
        ? prev.filter(id => id !== treatmentId)
        : [...prev, treatmentId]
    )
  }

  const calculateTotal = () => {
    const total = selectedTreatments.reduce((sum, id) => {
      return sum + (treatmentPrices[id] || 0)
    }, 0)
    setTotalAmount(total)
  }

  const calculateMonthlyPayment = () => {
    if (totalAmount === 0) {
      setMonthlyPayment(0)
      return
    }

    // Simple financing calculation (actual would use proper interest rates)
    const interestRate = 0.1299 / 12 // 12.99% APR divided by 12 months
    const payment = totalAmount * (interestRate * Math.pow(1 + interestRate, financingTerm)) / (Math.pow(1 + interestRate, financingTerm) - 1)
    setMonthlyPayment(Math.round(payment))
  }

  useEffect(() => {
    calculateTotal()
  }, [selectedTreatments])

  useEffect(() => {
    calculateMonthlyPayment()
    setShowFinancing(totalAmount >= 500)
  }, [totalAmount, financingTerm])


  return (
    <Box sx={{ py: 8, background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)' }}> // Charcoal to black gradient
      <Container maxWidth="xl">
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" gutterBottom sx={{ color: '#D4AF37' }}> // Gold heading
            Investment Calculator
          </Typography>
          <Typography variant="h6" sx={{ color: '#999999' }}> // Silver text
            Plan your facial aesthetic journey with flexible financing options
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Treatment Selection */}
          <Grid xs={12} lg={6}>
            <Card sx={{ p: 3, height: '100%', backgroundColor: '#1a1a1a', borderColor: '#999999' }}> // Charcoal card
              <Typography variant="h5" gutterBottom sx={{ color: '#FFFFFF' }}>
                <Calculate sx={{ color: '#D4AF37' }} /> Select Your Treatments
              </Typography>
              <Typography variant="body2" sx={{ color: '#999999', mb: 3 }}> // Silver text
                Choose the facial treatments you're interested in
              </Typography>

              <Stack spacing={2}>
                {treatments.map(treatment => (
                  <motion.div
                    key={treatment.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      variant={selectedTreatments.includes(treatment.id) ? 'elevation' : 'outlined'}
                      sx={{
                        cursor: 'pointer',
                        border: selectedTreatments.includes(treatment.id) 
                          ? '2px solid #D4AF37' 
                          : '1px solid #999999',
                        backgroundColor: selectedTreatments.includes(treatment.id) 
                          ? 'rgba(212, 175, 55, 0.1)' 
                          : 'rgba(26, 26, 26, 0.8)', // Charcoal background
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handleTreatmentToggle(treatment.id)}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
                              {treatment.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#999999' }}> // Silver text
                              {treatment.category}
                            </Typography>
                          </Box>
                          <Box textAlign="right">
                            <Typography variant="h6" sx={{ color: '#D4AF37' }} fontWeight="bold"> // Gold price
                              ${treatmentPrices[treatment.id]?.toLocaleString() || treatment.price}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#999999' }}> // Silver text
                              {treatment.duration}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Stack>

              {/* Package Suggestions */}
              <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#FFFFFF' }}>
                <Savings sx={{ color: '#D4AF37' }} /> Money-Saving Packages
              </Typography>
              <Stack spacing={2}>
                {facialPackages.map(pkg => (
                  <Card key={pkg.id} variant="outlined" sx={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderColor: '#999999' }}> // Gold tinted background
                    <CardContent sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
                            {pkg.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {pkg.description}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#999999' }}> // Silver strikethrough
                              ${pkg.originalPrice}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#D4AF37' }} fontWeight="bold"> // Gold price
                              ${pkg.packagePrice}
                            </Typography>
                          </Stack>
                          <Chip
                            label={`Save $${pkg.savings}`}
                            color="success"
                            size="small"
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Card>
          </Grid>

          {/* Cost Summary & Financing */}
          <Grid xs={12} lg={6}>
            <Stack spacing={3}>
              {/* Total Cost */}
              <Card sx={{ p: 4, backgroundColor: '#1a1a1a', borderColor: '#999999' }}> // Charcoal card
                <Typography variant="h5" gutterBottom sx={{ color: '#FFFFFF' }}>
                  <AttachMoney sx={{ color: '#D4AF37' }} /> Investment Summary
                </Typography>
                
                {selectedTreatments.length > 0 ? (
                  <>
                    <Stack spacing={2} sx={{ mb: 3 }}>
                      {selectedTreatments.map(id => {
                        const treatment = treatments.find(t => t.id === id)
                        return treatment ? (
                          <Box key={id} display="flex" justifyContent="space-between">
                            <Typography variant="body1" sx={{ color: '#FFFFFF' }}>{treatment.name}</Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ color: '#D4AF37' }}> // Gold price
                              ${treatmentPrices[id]?.toLocaleString()}
                            </Typography>
                          </Box>
                        ) : null
                      })}
                    </Stack>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h5" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
                        Total Investment:
                      </Typography>
                      <Typography variant="h4" sx={{ color: '#D4AF37' }} fontWeight="bold"> // Gold total
                        ${totalAmount.toLocaleString()}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body1" sx={{ color: '#999999', py: 4 }} textAlign="center"> // Silver text
                    Select treatments above to see your investment summary
                  </Typography>
                )}
              </Card>

              {/* Financing Options */}
              {showFinancing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card sx={{ p: 4, backgroundColor: '#1a1a1a', borderColor: '#999999' }}> // Charcoal card
                    <Typography variant="h5" gutterBottom sx={{ color: '#FFFFFF' }}>
                      <CreditCard sx={{ color: '#D4AF37' }} /> Financing Options
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: '#999999', mb: 3 }}> // Silver text
                      Make your investment more manageable with flexible payment plans
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Payment Term</InputLabel>
                      <Select
                        value={financingTerm}
                        onChange={(e) => setFinancingTerm(Number(e.target.value))}
                        label="Payment Term"
                      >
                        <MenuItem value={6}>6 months</MenuItem>
                        <MenuItem value={12}>12 months</MenuItem>
                        <MenuItem value={18}>18 months</MenuItem>
                        <MenuItem value={24}>24 months</MenuItem>
                        <MenuItem value={36}>36 months</MenuItem>
                      </Select>
                    </FormControl>

                    <Box sx={{ p: 3, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: 2, mb: 3 }}> // Gold tinted box
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                          Monthly Payment:
                        </Typography>
                        <Typography variant="h4" sx={{ color: '#D4AF37' }} fontWeight="bold"> // Gold payment
                          ${monthlyPayment}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#999999' }}> // Silver text
                        Based on {financingTerm} month term at 12.99% APR
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      {financing.providers.map((provider, index) => (
                        <Card key={index} variant="outlined" sx={{ backgroundColor: '#1a1a1a', borderColor: '#999999' }}> // Charcoal card
                          <CardContent sx={{ p: 2 }}>
                            <Box display="flex" alignItems="center" mb={2}>
                              <Box
                                component="img"
                                src={provider.logo}
                                alt={provider.name}
                                sx={{ height: 30, mr: 2 }}
                              />
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
                                  {provider.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#999999' }}> // Silver text
                                  {provider.description}
                                </Typography>
                              </Box>
                            </Box>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              {provider.benefits.map((benefit, i) => (
                                <Chip key={i} label={benefit} size="small" variant="outlined" />
                              ))}
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<Chat />}
                      onClick={() => handleChatWithJulie('financing')}
                      sx={{ mt: 3 }}
                    >
                      Chat with Julie about Financing
                    </Button>
                  </Card>
                </motion.div>
              )}

              {/* Quick Contact */}
              <Card sx={{ p: 4, background: 'linear-gradient(135deg, #C8A882 0%, #8B6F8B 100%)', color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  Ready to Schedule?
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                  Book your consultation to discuss your personalized treatment plan
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<Chat />}
                    onClick={() => handleChatWithJulie('consultation')}
                    sx={{ 
                      backgroundColor: 'white', 
                      color: '#C8A882',
                      '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                  >
                    Chat with Julie
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Schedule />}
                    onClick={() => handleChatWithJulie('consultation')}
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Book Consultation
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default FacialCostCalculator
