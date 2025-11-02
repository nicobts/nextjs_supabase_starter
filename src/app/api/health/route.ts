import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check database connectivity
    const { data: dbHealth, error: dbError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
      .single()

    const dbStatus = dbError ? 'error' : 'healthy'
    const dbResponseTime = Date.now() - startTime

    // Check environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    ]

    const envStatus = requiredEnvVars.every(envVar =>
      process.env[envVar] && process.env[envVar] !== ''
    ) ? 'healthy' : 'error'

    const overallStatus = (dbStatus === 'healthy' && envStatus === 'healthy')
      ? 'healthy'
      : 'error'

    const healthData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: {
          status: dbStatus,
          responseTime: dbResponseTime,
          error: dbError?.message
        },
        environment: {
          status: envStatus,
          requiredVars: requiredEnvVars.length,
          configuredVars: requiredEnvVars.filter(envVar =>
            process.env[envVar] && process.env[envVar] !== ''
          ).length
        }
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024)
      }
    }

    return NextResponse.json(healthData, {
      status: overallStatus === 'healthy' ? 200 : 503
    })

  } catch (error) {
    console.error('Health check failed:', error)

    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 })
  }
}

// Support HEAD requests for load balancer health checks
export async function HEAD(request: NextRequest) {
  try {
    // Quick database check
    const { error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
      .single()

    return new NextResponse(null, {
      status: error ? 503 : 200
    })
  } catch {
    return new NextResponse(null, { status: 503 })
  }
}
