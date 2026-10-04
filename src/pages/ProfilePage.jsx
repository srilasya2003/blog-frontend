import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  API_BASE_URL, fetchCategories, fetchPosts, fetchProfile, updatePost,
} from '../api/client'
import Navbar from '../components/Navbar'

function isPublished(value) {
  return value === true || String(value).toLowerCase() === 'true'
}

function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [profileError, setProfileError] = useState('')
  const [myPosts, setMyPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState('')
  const [postFilter, setPostFilter] = useState('all')
  const [editingPost, setEditingPost] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', category: '', content: '', is_published: false })
  const [editImage, setEditImage] = useState(null)
  const [editImagePreview, setEditImagePreview] = useState('')
  const [editError, setEditError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let isActive = true

    async function loadProfileAndPosts() {
      try {
        const [profileData, postsData, categoriesData] = await Promise.all([
          fetchProfile(),
          fetchPosts(),
          fetchCategories(),
        ])

        if (isActive) {
          const postList = Array.isArray(postsData) ? postsData : postsData?.results || []
          setProfile(profileData)
          setMyPosts(
            postList.filter((post) => String(post.author) === String(profileData.id)),
          )
          setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.results || [])
        }
      } catch (error) {
        if (isActive) {
          setProfileError(error.message || 'Unable to load your profile.')
          setPostsError(error.message || 'Unable to load your posts.')
        }
      } finally {
        if (isActive) {
          setPostsLoading(false)
        }
      }
    }

    loadProfileAndPosts()

    return () => {
      isActive = false
    }
  }, [])

  const visiblePosts = myPosts.filter((post) => {
    if (postFilter === 'drafts') {
       return !isPublished(post.is_published)
    }
    if (postFilter === 'published') {
       return isPublished(post.is_published)
    }
    return true
  })

  function openEditDialog(post) {
    setEditingPost(post)
    setEditImage(null)
    setEditImagePreview(
      post.image
        ? new URL(post.image, API_BASE_URL || window.location.origin).toString()
        : '',
    )
    setEditForm({
      title: post.title,
      category: String(post.category),
      content: post.content,
      is_published: isPublished(post.is_published),
    })
    setEditError('')
  }

  function handleEditChange(event) {
    const { name, value, checked, type } = event.target
    setEditForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleEditImageChange(event) {
    const file = event.target.files?.[0] || null
    setEditImage(file)
    setEditImagePreview(file ? URL.createObjectURL(file) : '')
  }

  async function handleEditSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setEditError('')

    try {
      const payload = new FormData()
      payload.append('title', editForm.title)
      payload.append('category', editForm.category)
      payload.append('content', editForm.content)
          payload.append('is_published', isPublished(editForm.is_published) ? 'true' : 'false')
      if (editImage) {
        payload.append('image', editImage)
      }

      const updatedPost = await updatePost(editingPost.id, payload)
      setMyPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === editingPost.id ? { ...post, ...updatedPost } : post,
        ),
      )
      setEditingPost(null)
    } catch (error) {
      setEditError(error.message || 'Unable to save your changes.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-32 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.35),transparent_38%),linear-gradient(135deg,#0f172a,#1e293b)]" />
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-cyan-400 text-2xl font-bold text-slate-950 shadow-sm">
                  U
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                    {profile?.username || 'Your profile'}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    {profile ? `@${profile.username}` : 'Loading profile...'}
                  </p>
                  {profile?.email && (
                    <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
                  )}
                  {profileError && (
                    <p className="mt-1 text-sm text-red-600">{profileError}</p>
                  )}
                </div>
              </div>

              <Link
                className="rounded-full border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700"
                to="/write"
              >
                Write a post
              </Link>
            </div>

            <div className="mt-6 flex gap-8 border-t border-slate-200 pt-5 text-sm">
              <div>
                <p className="font-semibold text-slate-950">{myPosts.length}</p>
                <p className="mt-1 text-slate-500">Posts</p>
              </div>
              {/* <div>
                <p className="font-semibold text-slate-950">24</p>
                <p className="mt-1 text-slate-500">Followers</p>
              </div>
              <div>
                <p className="font-semibold text-slate-950">18</p>
                <p className="mt-1 text-slate-500">Following</p>
              </div> */}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Your writing
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                My posts
              </h2>
            </div>
            <div className="flex gap-2" aria-label="Filter my posts">
              {[
                { id: 'all', label: 'All' },
                { id: 'published', label: 'Published' },
                { id: 'drafts', label: 'Drafts' },
              ].map((filter) => (
                <button
                  aria-pressed={postFilter === filter.id}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                    postFilter === filter.id
                      ? 'border-cyan-300 bg-cyan-50 text-cyan-800'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700'
                  }`}
                  key={filter.id}
                  onClick={() => setPostFilter(filter.id)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {postsLoading ? (
            <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              Loading your posts...
            </p>
          ) : postsError ? (
            <p className="rounded-2xl border border-red-200 bg-white p-6 text-sm text-red-700" role="alert">
              {postsError}
            </p>
          ) : visiblePosts.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              {myPosts.length === 0
                ? 'You have not posted anything yet.'
                : `You do not have any ${postFilter} posts.`}
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {visiblePosts.map((post) => (
                <article
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  key={post.id}
                >
                  {post.image ? (
                    <img
                      alt=""
                      className="h-36 w-full object-cover"
                      src={new URL(post.image, API_BASE_URL || window.location.origin).toString()}
                    />
                  ) : (
                    <div className="h-36 bg-[linear-gradient(135deg,#cffafe,#dbeafe,#f8fafc)]" />
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="rounded-full bg-cyan-50 px-2.5 py-1 font-semibold text-cyan-700">
                        {categories.find((category) => String(category.id) === String(post.category))?.name || 'Story'}
                      </span>
                      <span className={`font-medium ${isPublished(post.is_published) ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {isPublished(post.is_published) ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                      {post.title}
                    </h3>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                      {post.content.length > 240
                        ? `${post.content.slice(0, 240).trimEnd()}...`
                        : post.content}
                    </p>
                    <p className="mt-4 text-xs text-slate-500">
                      {post.created_at ? new Date(post.created_at).toLocaleString() : 'Time unavailable'}
                    </p>
                    <div className="mt-5 border-t border-slate-200 pt-4">
                      <button
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700"
                        onClick={() => openEditDialog(post)}
                        type="button"
                      >
                        Edit post
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {editingPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setEditingPost(null)}
        >
          <section
            aria-labelledby="edit-post-title"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase text-cyan-700">Your writing</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-950" id="edit-post-title">
                  Edit post
                </h2>
              </div>
              <button
                aria-label="Close edit dialog"
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setEditingPost(null)}
                type="button"
              >
                Close
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleEditSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="edit-post-title-input">
                  Title
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  id="edit-post-title-input"
                  name="title"
                  onChange={handleEditChange}
                  required
                  value={editForm.title}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="edit-post-category">
                  Category
                </label>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  id="edit-post-category"
                  name="category"
                  onChange={handleEditChange}
                  required
                  value={editForm.category}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="edit-post-content">
                  Content
                </label>
                <textarea
                  className="min-h-64 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  id="edit-post-content"
                  name="content"
                  onChange={handleEditChange}
                  required
                  value={editForm.content}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="edit-post-image">
                  Cover image
                </label>
                {editImagePreview && (
                  <img
                    alt="Cover image preview"
                    className="mb-3 max-h-56 w-full rounded-xl object-cover"
                    src={editImagePreview}
                  />
                )}
                <input
                  accept="image/png,image/jpeg"
                  className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-50 file:px-4 file:py-2 file:font-semibold file:text-cyan-800 hover:file:bg-cyan-100"
                  id="edit-post-image"
                  onChange={handleEditImageChange}
                  type="file"
                />
                <p className="mt-2 text-xs text-slate-500">Choose a JPG or PNG to replace the current cover.</p>
              </div>

              <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <input
                  checked={editForm.is_published}
                  className="h-4 w-4 accent-cyan-700"
                  name="is_published"
                  onChange={handleEditChange}
                  type="checkbox"
                />
                Publish this post
              </label>

              {editError && (
                <p className="text-sm text-red-700" role="alert">{editError}</p>
              )}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-500"
                  onClick={() => setEditingPost(null)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-wait disabled:opacity-60"
                  disabled={isSaving}
                  type="submit"
                >
                  {isSaving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
