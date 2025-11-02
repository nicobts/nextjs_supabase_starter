"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap } from "lucide-react"
import { AnimatedCard, AnimatedButton } from "@/components/ui/micro-interactions"
import { db } from "@/lib/database"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface SubscriptionPlansProps {
  onSelectPlan?: (planId: string) => void
  showCurrentPlan?: boolean
}

export function SubscriptionPlans({ onSelectPlan, showCurrentPlan = false }: SubscriptionPlansProps) {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  // Load subscription plans
  React.useEffect(() => {
    const loadPlans = async () => {
      try {
        const subscriptionPlans = await db.subscriptionPlans.getAll()
        setPlans(subscriptionPlans)
      } catch (error) {
        console.error('Error loading plans:', error)
        toast.error('Failed to load subscription plans')
      } finally {
        setLoading(false)
      }
    }

    loadPlans()
  }, [])

  const handleSelectPlan = async (planId: string) => {
    if (!user) {
      toast.error('Please sign in to subscribe')
      router.push('/login')
      return
    }

    if (onSelectPlan) {
      onSelectPlan(planId)
    } else {
      // Default behavior - redirect to checkout or handle subscription
      toast.info('Subscription management coming soon!')
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <AnimatedCard key={i} className="h-96">
            <div className="animate-pulse space-y-4 p-6">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AnimatedCard className={`relative h-full ${plan.name === 'Pro' ? 'border-primary shadow-lg' : ''}`}>
            {plan.name === 'Pro' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                {plan.name === 'Free' && <Check className="w-6 h-6 text-primary" />}
                {plan.name === 'Pro' && <Zap className="w-6 h-6 text-primary" />}
                {plan.name === 'Enterprise' && <Star className="w-6 h-6 text-primary" />}
              </div>

              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>

              <div className="mt-4">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">
                    ${plan.price_monthly || 0}
                  </span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                {plan.price_yearly && (
                  <div className="text-sm text-muted-foreground mt-1">
                    or ${plan.price_yearly}/year (save ${((plan.price_monthly || 0) * 12 - plan.price_yearly) * 100 / ((plan.price_monthly || 0) * 12)}%)
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features List */}
              <div className="space-y-3">
                {plan.features && JSON.parse(plan.features).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limits */}
              {plan.limits && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Limits</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    {Object.entries(JSON.parse(plan.limits)).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace('_', ' ')}:</span>
                        <span>{value === -1 ? 'Unlimited' : value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                <AnimatedButton
                  className="w-full"
                  variant={plan.name === 'Pro' ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.price_monthly === 0 ? 'Get Started' : 'Subscribe Now'}
                </AnimatedButton>
              </div>
            </CardContent>
          </AnimatedCard>
        </motion.div>
      ))}
    </div>
  )
}

// Individual plan card component
interface PlanCardProps {
  plan: any
  isPopular?: boolean
  onSelect: (planId: string) => void
  currentPlan?: boolean
}

export function PlanCard({ plan, isPopular = false, onSelect, currentPlan = false }: PlanCardProps) {
  return (
    <AnimatedCard className={`relative h-full ${isPopular ? 'border-primary shadow-lg' : ''} ${currentPlan ? 'ring-2 ring-primary' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      {currentPlan && (
        <div className="absolute -top-3 right-4">
          <Badge variant="secondary">Current Plan</Badge>
        </div>
      )}

      <CardHeader className="text-center pb-8">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>

        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-bold">
              ${plan.price_monthly || 0}
            </span>
            <span className="text-muted-foreground ml-1">/month</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 mb-6">
          {plan.features && JSON.parse(plan.features).map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <AnimatedButton
          className="w-full"
          variant={currentPlan ? 'secondary' : isPopular ? 'default' : 'outline'}
          disabled={currentPlan}
          onClick={() => onSelect(plan.id)}
        >
          {currentPlan ? 'Current Plan' : plan.price_monthly === 0 ? 'Get Started' : 'Upgrade'}
        </AnimatedButton>
      </CardContent>
    </AnimatedCard>
  )
}
