import { useState, useEffect } from 'react';
import { supabase, fetchProjects, saveProject, deleteProject, fetchBlogs, saveBlog, deleteBlog } from '@/lib/supabaseClient';
import { LogOut, Search, User, Mail, Calendar, Briefcase, FileText, Lock, Plus, Edit2, Trash2 } from 'lucide-react';
import PageHero from '@/components/site/PageHero';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'projects' | 'blogs'
  
  // Data lists
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Form states for creating/editing projects
  const [editingProject, setEditingProject] = useState(null); // null means not editing or creating new
  const [projectForm, setProjectForm] = useState({
    id: undefined,
    project_slug: '',
    name: '',
    tagline: '',
    desc_text: '',
    badge: 'iOS App',
    features: '',
  });

  // Form states for creating/editing blogs
  const [editingBlog, setEditingBlog] = useState(null); // null means not editing or creating new
  const [blogForm, setBlogForm] = useState({
    id: undefined,
    category: 'tech-strategy',
    tag: 'Tech Strategy',
    title: '',
    excerpt: '',
    author: 'Amit Sharma',
    date_text: '',
    read_time: '5 min read',
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadAllData();
    }
  }, [session]);

  const loadAllData = async () => {
    fetchContacts();
    loadProjects();
    loadBlogs();
  };

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const loadProjects = async () => {
    const res = await fetchProjects();
    if (res.success) setProjects(res.data || []);
  };

  const loadBlogs = async () => {
    const res = await fetchBlogs();
    if (res.success) setBlogs(res.data || []);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Invalid credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- PROJECT CRUD HANDLERS ---
  const startAddProject = () => {
    setEditingProject('new');
    setProjectForm({
      id: undefined,
      project_slug: '',
      name: '',
      tagline: '',
      desc_text: '',
      badge: 'iOS App',
      features: '',
    });
  };

  const startEditProject = (proj) => {
    setEditingProject(proj.id);
    setProjectForm({
      id: proj.id,
      project_slug: proj.project_slug,
      name: proj.name,
      tagline: proj.tagline,
      desc_text: proj.desc_text,
      badge: proj.badge,
      features: (proj.features || []).join('\n'),
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formattedProject = {
      id: projectForm.id,
      project_slug: projectForm.project_slug.trim(),
      name: projectForm.name.trim(),
      tagline: projectForm.tagline.trim(),
      desc_text: projectForm.desc_text.trim(),
      badge: projectForm.badge.trim(),
      features: projectForm.features.split('\n').map(f => f.trim()).filter(Boolean),
    };

    const res = await saveProject(formattedProject);
    if (res.success) {
      setEditingProject(null);
      loadProjects();
    } else {
      alert('Error saving project: ' + res.error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const res = await deleteProject(id);
      if (res.success) loadProjects();
    }
  };

  // --- BLOG CRUD HANDLERS ---
  const startAddBlog = () => {
    setEditingBlog('new');
    setBlogForm({
      id: undefined,
      category: 'tech-strategy',
      tag: 'Tech Strategy',
      title: '',
      excerpt: '',
      author: 'Amit Sharma',
      date_text: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      read_time: '5 min read',
    });
  };

  const startEditBlog = (post) => {
    setEditingBlog(post.id);
    setBlogForm({
      id: post.id,
      category: post.category,
      tag: post.tag,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date_text: post.date_text,
      read_time: post.read_time,
    });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const res = await saveBlog({
      id: blogForm.id,
      category: blogForm.category,
      tag: blogForm.tag.trim(),
      title: blogForm.title.trim(),
      excerpt: blogForm.excerpt.trim(),
      author: blogForm.author.trim(),
      date_text: blogForm.date_text.trim(),
      read_time: blogForm.read_time.trim(),
    });

    if (res.success) {
      setEditingBlog(null);
      loadBlogs();
    } else {
      alert('Error saving blog post: ' + res.error);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const res = await deleteBlog(id);
      if (res.success) loadBlogs();
    }
  };

  if (loading) {
    return (
      <main className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="card-copy">Loading Dashboard...</p>
      </main>
    );
  }

  // --- LOGIN SCREEN ---
  if (!session) {
    return (
      <main>
        <PageHero
          eyebrow="Admin Portal"
          title="Secure Dashboard Login"
          description="Log in with your administrator credentials to view project inquiries."
          centered
        />

        <section className="section section-muted" style={{ minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '480px' }}>
            <div className="surface-panel">
              <div className="lead-form-header">
                <div className="contact-icon" style={{ margin: '0 auto 16px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="lead-form-title" style={{ textAlign: 'center' }}>Enter Credentials</h3>
              </div>

              <form onSubmit={handleLogin} className="lead-form-grid" style={{ marginTop: 24 }}>
                {authError && (
                  <div className="form-error" style={{ padding: 12, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 8, display: 'block', marginBottom: 16 }}>
                    {authError}
                  </div>
                )}

                <div className="form-field">
                  <label htmlFor="loginEmail">Email Address</label>
                  <input
                    id="loginEmail"
                    type="email"
                    className="site-input"
                    placeholder="admin@androinframind.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    id="loginPassword"
                    type="password"
                    className="site-input"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="site-button site-button-primary" style={{ width: '100%', marginTop: 16 }} disabled={authLoading}>
                  {authLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // --- MAIN DASHBOARD INTERFACE ---
  return (
    <main>
      <PageHero
        eyebrow="Admin Panel"
        title="Agency Manager"
        description="Review incoming client requests, write blogs, and manage showcase projects."
        centered
      />

      <section className="section section-muted">
        <div className="container">
          
          {/* Dashboard Tabs & Logout Header */}
          <div className="dual-panel" style={{ marginBottom: 32, gap: 16 }}>
            <div className="pill-row">
              <button 
                className={`pill-button ${activeTab === 'inquiries' ? 'active' : ''}`}
                onClick={() => { setActiveTab('inquiries'); setEditingProject(null); setEditingBlog(null); }}
              >
                Inquiries ({contacts.length})
              </button>
              <button 
                className={`pill-button ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => { setActiveTab('projects'); setEditingProject(null); setEditingBlog(null); }}
              >
                Showcase Projects ({projects.length})
              </button>
              <button 
                className={`pill-button ${activeTab === 'blogs' ? 'active' : ''}`}
                onClick={() => { setActiveTab('blogs'); setEditingProject(null); setEditingBlog(null); }}
              >
                Blog Posts ({blogs.length})
              </button>
            </div>

            <button onClick={handleLogout} className="site-button site-button-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Search bar inside lists (only visible when not editing) */}
          {!editingProject && !editingBlog && (
            <div className="surface-panel" style={{ padding: '12px 20px', marginBottom: 24, maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="site-input"
                  style={{ border: 'none', padding: 0, boxShadow: 'none', background: 'transparent', width: '100%' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* TAB CONTENT: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="timeline-grid" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {contacts.filter(c => c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || c.work_email?.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                <div className="surface-panel" style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <p className="card-copy">No inquiries found.</p>
                </div>
              ) : (
                contacts.filter(c => c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || c.work_email?.toLowerCase().includes(searchQuery.toLowerCase())).map((contact) => (
                  <div key={contact.id} className="surface-panel" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span className="card-kicker" style={{ margin: 0 }}>{contact.service}</span>
                        <span className="inline-pill" style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-text)' }}>{contact.budget}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--copy-muted)' }}>
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(contact.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </div>
                    </div>

                    <div className="grid-two" style={{ gap: 24 }}>
                      <div>
                        <h4 className="card-title" style={{ fontSize: 18, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <User className="w-4 h-4 text-indigo-400" /> {contact.full_name}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Mail className="w-4 h-4 text-slate-400" />
                            <a href={`mailto:${contact.work_email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{contact.work_email}</a>
                          </div>
                          {contact.phone && <div><strong>Phone:</strong> {contact.phone}</div>}
                          {contact.company && <div><strong>Company:</strong> {contact.company}</div>}
                        </div>
                      </div>

                      <div>
                        <h4 className="card-title" style={{ fontSize: 16, marginBottom: 8 }}>Project Details</h4>
                        <p className="card-copy" style={{ fontSize: 14, backgroundColor: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 8, border: '1px solid var(--border)', whiteSpace: 'pre-wrap' }}>
                          {contact.project_details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB CONTENT: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              {/* If in edit/add mode */}
              {editingProject ? (
                <div className="surface-panel" style={{ padding: 24, maxWidth: '600px', margin: '0 auto' }}>
                  <h3 className="card-title" style={{ marginBottom: 24 }}>{editingProject === 'new' ? 'Add Showcase Project' : 'Edit Showcase Project'}</h3>
                  <form onSubmit={handleProjectSubmit} className="lead-form-grid">
                    
                    <div className="form-field">
                      <label>Project ID / Slug (unique URL safe, e.g. `leave-only`)*</label>
                      <input 
                        type="text" 
                        className="site-input" 
                        value={projectForm.project_slug}
                        onChange={e => setProjectForm(prev => ({...prev, project_slug: e.target.value}))}
                        required
                        placeholder="my-project-slug"
                      />
                    </div>

                    <div className="form-field">
                      <label>Project Name*</label>
                      <input 
                        type="text" 
                        className="site-input" 
                        value={projectForm.name}
                        onChange={e => setProjectForm(prev => ({...prev, name: e.target.value}))}
                        required
                        placeholder="Leave Only"
                      />
                    </div>

                    <div className="form-field">
                      <label>Tagline*</label>
                      <input 
                        type="text" 
                        className="site-input" 
                        value={projectForm.tagline}
                        onChange={e => setProjectForm(prev => ({...prev, tagline: e.target.value}))}
                        required
                        placeholder="Employee Leave & PTO Management App"
                      />
                    </div>

                    <div className="form-field">
                      <label>Badge / Category*</label>
                      <input 
                        type="text" 
                        className="site-input" 
                        value={projectForm.badge}
                        onChange={e => setProjectForm(prev => ({...prev, badge: e.target.value}))}
                        required
                        placeholder="iOS App"
                      />
                    </div>

                    <div className="form-field">
                      <label>Project Description*</label>
                      <textarea 
                        rows={4} 
                        className="site-textarea" 
                        value={projectForm.desc_text}
                        onChange={e => setProjectForm(prev => ({...prev, desc_text: e.target.value}))}
                        required
                        placeholder="Detailed explanation of the project features, challenges, and context."
                      />
                    </div>

                    <div className="form-field">
                      <label>Key Features (One feature per line)*</label>
                      <textarea 
                        rows={5} 
                        className="site-textarea" 
                        value={projectForm.features}
                        onChange={e => setProjectForm(prev => ({...prev, features: e.target.value}))}
                        required
                        placeholder="PTO Balance Tracking&#10;Push Notifications&#10;Admin Approval Workflow"
                      />
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                      <button type="submit" className="site-button site-button-primary">Save Project</button>
                      <button type="button" className="site-button site-button-secondary" onClick={() => setEditingProject(null)}>Cancel</button>
                    </div>
                  </form>
                </div>
              ) : (
                // List mode
                <div>
                  <button onClick={startAddProject} className="site-button site-button-primary" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus className="w-4 h-4" /> Add New Project
                  </button>

                  <div className="timeline-grid" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {projects.map(proj => (
                      <div key={proj.id} className="surface-panel" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                        <div>
                          <span className="card-kicker">{proj.badge}</span>
                          <h4 className="card-title" style={{ fontSize: 18, marginTop: 4 }}>{proj.name}</h4>
                          <p className="card-copy" style={{ fontSize: 13, marginTop: 4 }}>{proj.tagline}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => startEditProject(proj)} className="site-button site-button-secondary" style={{ padding: 8 }}>
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteProject(proj.id)} className="site-button site-button-secondary" style={{ padding: 8, color: '#ef4444', borderColor: '#ef4444' }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: BLOG POSTS */}
          {activeTab === 'blogs' && (
            <div>
              {/* If in edit/add mode */}
              {editingBlog ? (
                <div className="surface-panel" style={{ padding: 24, maxWidth: '600px', margin: '0 auto' }}>
                  <h3 className="card-title" style={{ marginBottom: 24 }}>{editingBlog === 'new' ? 'Add Blog Post' : 'Edit Blog Post'}</h3>
                  <form onSubmit={handleBlogSubmit} className="lead-form-grid">
                    
                    <div className="form-field">
                      <label>Title*</label>
                      <input 
                        type="text" 
                        className="site-input" 
                        value={blogForm.title}
                        onChange={e => setBlogForm(prev => ({...prev, title: e.target.value}))}
                        required
                        placeholder="Scale Offshore Delivery: Why Software Development Should Be Cost-Effective"
                      />
                    </div>

                    <div className="form-field">
                      <label>Excerpt*</label>
                      <textarea 
                        rows={3} 
                        className="site-textarea" 
                        value={blogForm.excerpt}
                        onChange={e => setBlogForm(prev => ({...prev, excerpt: e.target.value}))}
                        required
                        placeholder="A short summary of the blog post to display in grid cards."
                      />
                    </div>

                    <div className="form-split">
                      <div className="form-field">
                        <label>Category Key (e.g. `tech-strategy`)*</label>
                        <input 
                          type="text" 
                          className="site-input" 
                          value={blogForm.category}
                          onChange={e => setBlogForm(prev => ({...prev, category: e.target.value}))}
                          required
                          placeholder="tech-strategy"
                        />
                      </div>

                      <div className="form-field">
                        <label>Tag Label (e.g. `Tech Strategy`)*</label>
                        <input 
                          type="text" 
                          className="site-input" 
                          value={blogForm.tag}
                          onChange={e => setBlogForm(prev => ({...prev, tag: e.target.value}))}
                          required
                          placeholder="Tech Strategy"
                        />
                      </div>
                    </div>

                    <div className="form-split">
                      <div className="form-field">
                        <label>Author Name*</label>
                        <input 
                          type="text" 
                          className="site-input" 
                          value={blogForm.author}
                          onChange={e => setBlogForm(prev => ({...prev, author: e.target.value}))}
                          required
                          placeholder="Amit Sharma"
                        />
                      </div>

                      <div className="form-field">
                        <label>Read Time*</label>
                        <input 
                          type="text" 
                          className="site-input" 
                          value={blogForm.read_time}
                          onChange={e => setBlogForm(prev => ({...prev, read_time: e.target.value}))}
                          required
                          placeholder="7 min read"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Publish Date*</label>
                      <input 
                        type="text" 
                        className="site-input" 
                        value={blogForm.date_text}
                        onChange={e => setBlogForm(prev => ({...prev, date_text: e.target.value}))}
                        required
                        placeholder="June 12, 2026"
                      />
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                      <button type="submit" className="site-button site-button-primary">Save Blog Post</button>
                      <button type="button" className="site-button site-button-secondary" onClick={() => setEditingBlog(null)}>Cancel</button>
                    </div>
                  </form>
                </div>
              ) : (
                // List mode
                <div>
                  <button onClick={startAddBlog} className="site-button site-button-primary" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus className="w-4 h-4" /> Add New Blog Post
                  </button>

                  <div className="timeline-grid" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {blogs.map(post => (
                      <div key={post.id} className="surface-panel" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                        <div>
                          <span className="card-kicker">{post.tag}</span>
                          <h4 className="card-title" style={{ fontSize: 18, marginTop: 4 }}>{post.title}</h4>
                          <p className="card-copy" style={{ fontSize: 13, marginTop: 4 }}>By {post.author} on {post.date_text}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => startEditBlog(post)} className="site-button site-button-secondary" style={{ padding: 8 }}>
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteBlog(post.id)} className="site-button site-button-secondary" style={{ padding: 8, color: '#ef4444', borderColor: '#ef4444' }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
