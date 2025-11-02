"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedCard, AnimatedProgress, AnimatedSkeleton } from "@/components/ui/micro-interactions"
import { Activity, AlertTriangle, CheckCircle, Clock, Database, Server, Users, Zap } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface HealthStatus {
  status: 'healthy' | 'error'
  timestamp: string
  uptime: number
  version: string
  environment: string
  checks: {
    database: {
      status: string
      responseTime: number
      error?: string
    }
    environment: {
      status: string
      requiredVars: number
      configuredVars: number
    }
  }
  memory: {
    used: number
    total: number
    external: number
  }
}

interface SystemMetrics {
  activeUsers: number
  totalUsers: number
  pageViews: number
  errorRate: number
  avgResponseTime: number
  uptime: number
}

export function MonitoringDashboard() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const response = await fetch('/api/health')
        if (response.ok) {
          const data = await response.json()
          setHealthStatus(data)
        }
      } catch (error) {
        console.error('Failed to fetch health status:', error)
      }
    }

    const fetchMetrics = async () => {
      // Mock metrics - in a real app, you'd fetch from your analytics service
      setMetrics({
        activeUsers: 42,
        totalUsers: 1250,
        pageViews: 15420,
        errorRate: 0.02,
        avgResponseTime: 245,
        uptime: 99.8
      })
    }

    const loadData = async () => {
      await Promise.all([fetchHealthStatus(), fetchMetrics()])
      setLoading(false)
    }

    loadData()

    // Refresh every 30 seconds
    const interval = setInterval(fetchHealthStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!user) {
    return (
      <AnimatedCard>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Please sign in to view monitoring data</p>
        </CardContent>
      </AnimatedCard>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Monitoring</h2>
          <p className="text-muted-foreground">Monitor application health and performance</p>
        </div>
        <Button variant="outline" size="sm">
          <Activity className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="health" className="space-y-6">
        <TabsList>
          <TabsTrigger value="health">Health Status</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="errors">Error Tracking</TabsTrigger>
        </TabsList>

        {/* Health Status Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Overall Status */}
            <AnimatedCard>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                {healthStatus?.status === 'healthy' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus?.status === 'healthy' ? 'Healthy' : 'Issues'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last checked: {healthStatus ? new Date(healthStatus.timestamp).toLocaleTimeString() : 'Never'}
                </p>
              </CardContent>
            </AnimatedCard>

            {/* Database Status */}
            <AnimatedCard>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus?.checks.database.status === 'healthy' ? (
                    <span className="text-green-600">Connected</span>
                  ) : (
                    <span className="text-red-600">Error</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {healthStatus?.checks.database.responseTime}ms response time
                </p>
              </CardContent>
            </AnimatedCard>

            {/* Memory Usage */}
            <AnimatedCard>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus?.memory.used}MB
                </div>
                <p className="text-xs text-muted-foreground">
                  of {healthStatus?.memory.total}MB total
                </p>
              </CardContent>
            </AnimatedCard>

            {/* Uptime */}
            <AnimatedCard>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus ? Math.floor(healthStatus.uptime / 3600) : 0}h
                </div>
                <p className="text-xs text-muted-foreground">
                  Since last restart
                </p>
              </CardContent>
            </AnimatedCard>
          </div>

          {/* Environment Details */}
          <AnimatedCard>
            <CardHeader>
              <CardTitle>Environment Information</CardTitle>
              <CardDescription>Current deployment and configuration details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Environment:</span>
                    <Badge variant="outline">{healthStatus?.environment}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Version:</span>
                    <span className="text-sm text-muted-foreground">{healthStatus?.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Environment Variables:</span>
                    <span className="text-sm">
                      {healthStatus?.checks.environment.configuredVars}/
                      {healthStatus?.checks.environment.requiredVars} configured
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">External Memory:</span>
                    <span className="text-sm text-muted-foreground">
                      {healthStatus?.memory.external}MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Database Status:</span>
                    <Badge variant={healthStatus?.checks.database.status === 'healthy' ? 'default' : 'destructive'}>
                      {healthStatus?.checks.database.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <AnimatedCard key={i}>
                  <CardHeader>
                    <AnimatedSkeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <AnimatedSkeleton className="h-8 w-16 mb-2" />
                    <AnimatedSkeleton className="h-3 w-32" />
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedCard>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently online
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Registered accounts
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.pageViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(metrics?.errorRate || 0) * 100}%</div>
                  <p className="text-xs text-muted-foreground">
                    Last 24 hours
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.avgResponseTime}ms</div>
                  <p className="text-xs text-muted-foreground">
                    API endpoints
                  </p>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.uptime}%</div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                  <AnimatedProgress value={metrics?.uptime || 0} className="mt-2" />
                </CardContent>
              </AnimatedCard>
            </div>
          )}
        </TabsContent>

        {/* Error Tracking Tab */}
        <TabsContent value="errors" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>Error Tracking</CardTitle>
              <CardDescription>Monitor and track application errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Error Tracking Setup</h3>
                <p className="text-muted-foreground mb-4">
                  Configure Sentry DSN in your environment variables to enable error tracking.
                </p>
                <div className="space-y-2 text-sm text-left max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span>Sentry Client:</span>
                    <Badge variant="outline">Not Configured</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sentry Server:</span>
                    <Badge variant="outline">Not Configured</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Reporting:</span>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  Configure Sentry
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
