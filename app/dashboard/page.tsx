'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserProfile from '../components/UserProfile'
import CreateProjectModal from '../components/CreateProjectModal'
import { trpc } from '../../lib/trpc/client'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Fetch user stats and projects using tRPC
  const { data: userStats, isLoading: statsLoading, refetch: refetchStats } = trpc.user.getStats.useQuery(
    undefined,
    { enabled: !!session }
  )
  const { data: projects, isLoading: projectsLoading, refetch: refetchProjects } = trpc.project.getAll.useQuery(
    undefined,
    { enabled: !!session }
  )

  const handleProjectCreated = () => {
    refetchStats()
    refetchProjects()
  }

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) router.push('/auth/signin') // Not signed in
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

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
              <UserProfile />
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
            <div className="metric-value">
              {statsLoading ? '...' : userStats?.projectCount || 0}
            </div>
            <div className="metric-change positive">
              {userStats?.projectCount ? '↗ Active projects' : '+ Create your first project'}
            </div>
          </div>

          <div className="metric-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="metric-icon" style={{ background: 'linear-gradient(135deg, var(--emerald-50), var(--emerald-100))' }}>
              🔑
            </div>
            <div className="metric-label">Keywords</div>
            <div className="metric-value">
              {statsLoading ? '...' : userStats?.keywordCount || 0}
            </div>
            <div className="metric-change positive">
              {userStats?.keywordCount ? '↗ Tracking keywords' : '+ Add keywords to track'}
            </div>
          </div>

          <div className="metric-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="metric-icon" style={{ background: 'linear-gradient(135deg, var(--amber-50), var(--amber-100))' }}>
              📈
            </div>
            <div className="metric-label">Avg. Position</div>
            <div className="metric-value">
              {statsLoading ? '...' : userStats?.avgPosition ? userStats.avgPosition.toFixed(1) : '--'}
            </div>
            <div className="metric-change positive">
              {userStats?.avgPosition ? '↗ Current average' : 'Start tracking rankings'}
            </div>
          </div>

          <div className="metric-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="metric-icon" style={{ background: 'linear-gradient(135deg, var(--rose-50), var(--rose-100))' }}>
              🔗
            </div>
            <div className="metric-label">Rankings</div>
            <div className="metric-value">
              {statsLoading ? '...' : userStats?.totalRankings || 0}
            </div>
            <div className="metric-change positive">
              {userStats?.totalRankings ? '↗ Total data points' : 'Rankings will appear here'}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="modern-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Your Projects</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn btn-primary"
            >
              + Add Project
            </button>
          </div>

          {projectsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="spinner"></div>
              <span className="ml-3 text-slate-600">Loading projects...</span>
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <div>
                      <div className="project-title">{project.name}</div>
                      <div className="project-url">{project.domain}</div>
                    </div>
                    <div className="project-stats">
                      <div className="project-stat">
                        <strong>{project._count.keywords}</strong> keywords
                      </div>
                      <div
                        className="project-stat"
                        style={{
                          color: project.avgPosition <= 10 ? 'var(--emerald-600)' :
                                 project.avgPosition <= 20 ? 'var(--amber-500)' : 'var(--slate-600)'
                        }}
                      >
                        <strong>
                          {project.avgPosition > 0 ? `Avg. #${project.avgPosition}` : 'No rankings yet'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects yet</h3>
              <p className="text-slate-600 mb-6">
                Create your first SEO project to start tracking keywords and rankings.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn btn-primary"
              >
                Create Your First Project
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleProjectCreated}
      />
    </div>
  )
}
