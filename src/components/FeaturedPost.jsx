import { API_BASE_URL } from '../api/client'

function FeaturedPost({ post, categoryName, onSelect }) {
  const imageUrl = post.image
    ? new URL(post.image, API_BASE_URL || window.location.origin).toString()
    : ''
  const publishedDate = post.created_at
    ? new Date(post.created_at).toLocaleString()
    : 'Time unavailable'

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="min-h-[260px] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.25),transparent_40%),linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
            Featured story
          </div>

          <p className="text-sm text-slate-300">{categoryName || 'Story'}</p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            {post.content}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
              AS
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {post.author_name || 'Unknown author'}
              </p>
              <p className="text-xs text-slate-300">{publishedDate}</p>
            </div>
          </div>
          <button
            className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            onClick={() => onSelect(post)}
            type="button"
          >
            Open post
          </button>
        </div>

        <div className="flex min-h-64 items-center justify-center bg-slate-50 p-6">
          {imageUrl ? (
            <img
              alt={post.title}
              className="h-64 w-full rounded-2xl object-cover"
              src={imageUrl}
            />
          ) : (
            <div className="h-64 w-full rounded-2xl bg-[linear-gradient(135deg,#cffafe,#dbeafe,#f8fafc)]" />
          )}
        </div>
      </div>
    </article>
  )
}

export default FeaturedPost
