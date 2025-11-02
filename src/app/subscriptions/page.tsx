"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionPlans, PlanCard } from "@/components/subscription-plans"
import { AnimatedPage, AnimatedFadeIn } from "@/components/ui/animated"
import { AnimatedButton, AnimatedCard } from "@/components/ui/micro-interactions"
import { db } from "@/lib/database"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { CreditCard, Calendar, Users, BarChart3, Settings, CheckCircle, AlertCircle } from "lucide-react"

export default function SubscriptionsPage() {
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
  const [currentPlan, setCurrentPlan] = useState<any>(null)
  const [allPlans, setAllPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadSubscriptionData = async () => {
      if (!user) return

      try {
        // Load all plans
        const plans = await db.subscriptionPlans.getAll()
        setAllPlans(plans)

        // For now, we'll simulate a free plan subscription
        // In a real app, you'd fetch the user's actual subscription
        const freePlan = plans.find(p => p.name === 'Free')
        if (freePlan) {
          setCurrentPlan(freePlan)
          setCurrentSubscription({
            id: 'free-sub',
            plan_id: freePlan.id,
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: null,
            created_at: new Date().toISOString()
          })
        }
      } catch (error) {
        console.error('Error loading subscription data:', error)
        toast.error('Failed to load subscription data')
      } finally {
        setLoading(false)
      }
    }

    loadSubscriptionData()
  }, [user])

  const handlePlanChange = async (planId: string) => {
    const selectedPlan = allPlans.find(p => p.id === planId)
    if (!selectedPlan) return

    if (selectedPlan.price_monthly === 0) {
      // Free plan - just update locally for now
      setCurrentPlan(selectedPlan)
      toast.success(`Switched to ${selectedPlan.name} plan!`)
    } else {
      // Paid plan - would integrate with Stripe here
      toast.info('Payment integration coming soon!')
    }
  }

  if (loading) {
    return (
      <AnimatedPage className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard className="h-64">
              <div className="animate-pulse space-y-4 p-6">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </AnimatedCard>
            <AnimatedCard className="h-64">
              <div className="animate-pulse space-y-4 p-6">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <AnimatedFadeIn>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Subscription Management</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Manage your subscription, view usage, and upgrade your plan as your needs grow.
            </p>
          </div>
        </AnimatedFadeIn>

        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="plans">All Plans</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Current Plan Tab */}
          <TabsContent value="current" className="space-y-8">
            <AnimatedFadeIn>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Current Subscription Card */}
                <AnimatedCard>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Current Subscription
                      </CardTitle>
                      <Badge variant={currentSubscription?.status === 'active' ? 'default' : 'secondary'}>
                        {currentSubscription?.status || 'Inactive'}
                      </Badge>
                    </div>
                    <CardDescription>
                      Your current plan and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentPlan && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{currentPlan.name} Plan</span>
                          <span className="text-2xl font-bold">
                            ${currentPlan.price_monthly || 0}/month
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {currentSubscription?.current_period_start ?
                              `Started ${new Date(currentSubscription.current_period_start).toLocaleDateString()}` :
                              'Started today'
                            }
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Auto-renewal enabled
                          </div>
                        </div>

                        <div className="pt-4 space-y-2">
                          <AnimatedButton variant="outline" className="w-full">
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Subscription
                          </AnimatedButton>
                          <AnimatedButton variant="ghost" className="w-full text-destructive hover:text-destructive">
                            Cancel Subscription
                          </AnimatedButton>
                        </div>
                      </>
                    )}
                  </CardContent>
                </AnimatedCard>

                {/* Usage Stats Card */}
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Usage This Month
                    </CardTitle>
                    <CardDescription>
                      Track your current usage against plan limits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentPlan?.limits && (
                      <div className="space-y-3">
                        {Object.entries(JSON.parse(currentPlan.limits)).map(([key, limit]: [string, any]) => {
                          const usage = Math.floor(Math.random() * (limit === -1 ? 50 : limit)) // Mock usage
                          const percentage = limit === -1 ? 0 : (usage / limit) * 100

                          return (
                            <div key={key} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="capitalize">{key.replace('_', ' ')}</span>
                                <span>{usage}{limit === -1 ? '+' : `/${limit}`}</span>
                              </div>
                              {limit !== -1 && (
                                <div className="w-full bg-secondary rounded-full h-2">
                                  <motion.div
                                    className="bg-primary h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <div className="pt-4">
                      <AnimatedButton variant="outline" className="w-full">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Detailed Analytics
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </div>
            </AnimatedFadeIn>
          </TabsContent>

          {/* All Plans Tab */}
          <TabsContent value="plans" className="space-y-8">
            <AnimatedFadeIn>
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Choose Your Plan</h2>
                <p className="text-muted-foreground">
                  Upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>

              <SubscriptionPlans
                onSelectPlan={handlePlanChange}
                showCurrentPlan={true}
              />
            </AnimatedFadeIn>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-8">
            <AnimatedFadeIn>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Payment Method Card */}
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>
                      Manage your payment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-muted rounded mr-3 flex items-center justify-center">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Primary</Badge>
                    </div>

                    <div className="space-y-2">
                      <AnimatedButton variant="outline" className="w-full">
                        Add Payment Method
                      </AnimatedButton>
                      <AnimatedButton variant="ghost" className="w-full">
                        Update Billing Address
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </AnimatedCard>

                {/* Billing History Card */}
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Billing History
                    </CardTitle>
                    <CardDescription>
                      View and download your invoices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Free Plan</p>
                          <p className="text-sm text-muted-foreground">Nov 1, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$0.00</p>
                          <AnimatedButton variant="ghost" size="sm">
                            Download
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <AnimatedButton variant="outline" className="w-full">
                        View All Invoices
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </div>
            </AnimatedFadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  )
}
