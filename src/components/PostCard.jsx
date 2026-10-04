import { API_BASE_URL } from '../api/client'

function PostCard({ posts, categories, onSelect }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <button
          key={post.id}
          className="block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
          onClick={() => onSelect(post)}
          type="button"
        >
          <div className="flex flex-col gap-4 p-5 sm:flex-row">
            {post.image ? (
              <img
                alt=""
                className="h-40 w-full rounded-2xl object-cover sm:w-44"
                src={new URL(post.image, API_BASE_URL || window.location.origin).toString()}
              />
            ) : (
              <div className="h-40 w-full rounded-2xl bg-[linear-gradient(135deg,#e0f2fe,#dbeafe,#f8fafc)] sm:w-44" />
            )}

            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-cyan-700">
                  {categories.find((category) => String(category.id) === String(post.category))?.name || 'Story'}
                </span>
                <span>{post.created_at ? new Date(post.created_at).toLocaleString() : 'Time unavailable'}</span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {post.content.length > 240
                  ? `${post.content.slice(0, 240).trimEnd()}...`
                  : post.content}
              </p>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-800">
                  {post.author_name || 'Unknown author'}
                </p>
                <span className="text-xs text-cyan-700">Open post</span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default PostCard
