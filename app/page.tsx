'use client'

import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false)
  const { data: session, status } = useSession()

  if (showDemo) {
    return (
      <div className="min-h-screen">
        {/* Modern Header */}
        <header className="modern-header">
          <div className="container">
            <div className="header-content">
              <div className="flex items-center gap-8">
                <div className="logo">SEO Pro</div>
                <nav className="nav-menu">
                  <span className="nav-item active">Dashboard</span>
                  <span className="nav-item">Keywords</span>
                  <span className="nav-item">Rankings</span>
                  <span className="nav-item">Audits</span>
                  <span className="nav-item">Backlinks</span>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>Welcome, Demo User</span>
                <button
                  onClick={() => setShowDemo(false)}
                  className="btn btn-secondary"
                >
                  Back to Landing
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="container py-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl text-slate-900 mb-2">Dashboard</h1>
            <p className="text-lg text-slate-600">
              Welcome to your SEO command center. Here's an overview of your projects and performance.
            </p>
          </div>

          {/* Modern Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="metric-card animate-fade-in">
              <div className="metric-icon" style={{ background: 'linear-gradient(135deg, var(--blue-50), var(--blue-100))' }}>
                📊
              </div>
              <div className="metric-label">Projects</div>
              <div className="metric-value">3</div>
              <div className="metric-change positive">
                ↗ +1 this month
              </div>
            </div>

            <div className="metric-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="metric-icon" style={{ background: 'linear-gradient(135deg, var(--emerald-50), var(--emerald-100))' }}>
                🔑
              </div>
              <div className="metric-label">Keywords</div>
              <div className="metric-value">247</div>
              <div className="metric-change positive">
                ↗ +23 this week
              </div>
            </div>

            <div className="metric-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="metric-icon" style={{ background: 'linear-gradient(135deg, var(--amber-50), var(--amber-100))' }}>
                📈
              </div>
              <div className="metric-label">Avg. Position</div>
              <div className="metric-value">12.4</div>
              <div className="metric-change positive">
                ↗ +2.1 positions
              </div>
            </div>

            <div className="metric-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="metric-icon" style={{ background: 'linear-gradient(135deg, var(--rose-50), var(--rose-100))' }}>
                🔗
              </div>
              <div className="metric-label">Backlinks</div>
              <div className="metric-value">1,234</div>
              <div className="metric-change positive">
                ↗ +45 new links
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="modern-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Your Projects</h2>
              <button className="btn btn-primary">
                + Add Project
              </button>
            </div>

            <div className="space-y-6">
              <div className="project-card">
                <div className="project-header">
                  <div>
                    <div className="project-title">E-commerce Store</div>
                    <div className="project-url">mystore.com</div>
                  </div>
                  <div className="project-stats">
                    <div className="project-stat">
                      <strong>156</strong> keywords
                    </div>
                    <div className="project-stat" style={{ color: 'var(--emerald-600)' }}>
                      <strong>Avg. #8.2</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <div>
                    <div className="project-title">Tech Blog</div>
                    <div className="project-url">techblog.com</div>
                  </div>
                  <div className="project-stats">
                    <div className="project-stat">
                      <strong>67</strong> keywords
                    </div>
                    <div className="project-stat" style={{ color: 'var(--amber-500)' }}>
                      <strong>Avg. #15.7</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <div>
                    <div className="project-title">Local Business</div>
                    <div className="project-url">localbiz.com</div>
                  </div>
                  <div className="project-stats">
                    <div className="project-stat">
                      <strong>24</strong> keywords
                    </div>
                    <div className="project-stat" style={{ color: 'var(--emerald-600)' }}>
                      <strong>Avg. #5.1</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, var(--slate-50) 0%, var(--blue-50) 100%)' }}>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6" style={{
            background: 'linear-gradient(135deg, var(--slate-900), var(--blue-600))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            SEO Pro
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Advanced SEO Analytics & Optimization Platform
          </p>
          <p className="text-lg text-slate-500 mb-12" style={{ maxWidth: '42rem', margin: '0 auto 3rem' }}>
            Professional SEO tools for keyword research, rank tracking, site audits,
            and competitor analysis. Get actionable insights to improve your search rankings.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="modern-card">
              <div style={{ color: 'var(--blue-600)', fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Keyword Research</h3>
              <p className="text-slate-600">
                Discover high-value keywords with AI-powered suggestions and difficulty analysis.
              </p>
            </div>

            <div className="modern-card">
              <div style={{ color: 'var(--emerald-500)', fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Rank Tracking</h3>
              <p className="text-slate-600">
                Monitor your keyword positions with daily updates and competitor comparison.
              </p>
            </div>

            <div className="modern-card">
              <div style={{ color: 'var(--amber-500)', fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Site Audits</h3>
              <p className="text-slate-600">
                Comprehensive technical SEO analysis with prioritized recommendations.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            {session ? (
              <Link href="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="btn btn-primary"
                >
                  Get Started - Sign In
                </button>

                <button
                  onClick={() => setShowDemo(true)}
                  className="btn btn-secondary"
                >
                  View Demo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
